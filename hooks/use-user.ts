import type { CognitoUser } from "@aws-amplify/auth";

import { Amplify, Auth, Hub } from "aws-amplify";
import { useCallback, useEffect, useState } from "react";

import awsExports from "../aws-exports";

export function useUser() {
  const [user, setUser] = useState<CognitoUser | null>(null);

  const signIn = useCallback(() => {
    Auth.federatedSignIn();
  }, []);

  const signOut = useCallback(() => {
    Auth.signOut();
  }, []);

  useEffect(() => {
    Amplify.configure(awsExports);
    Hub.listen("auth", ({ payload: { event } }) => {
      switch (event) {
        case "signIn":
        case "cognitoHostedUI":
        case "configured":
          return Auth.currentAuthenticatedUser()
            .then((user) => setUser(user))
            .catch(() => setUser(null));

        case "signOut":
        case "signIn_failure":
        case "cognitoHostedUI_failure":
          return setUser(null);
      }
    });
  }, []);

  return { user, signIn, signOut };
}
