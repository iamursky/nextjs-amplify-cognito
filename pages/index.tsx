import type { NextPage } from "next";
import type { CognitoUser } from "@aws-amplify/auth";

import { Auth, Hub } from "aws-amplify";
import { useCallback, useEffect, useState } from "react";

const HomePage: NextPage = () => {
  const [data, setData] = useState<string>("Call API to get data...");
  const [user, setUser] = useState<CognitoUser | null>(null);

  const getApiData = useCallback(() => {
    Auth.currentSession()
      .then((session) => session.getAccessToken().getJwtToken())
      .then((token) =>
        fetch("https://messangers-ok-wiki.web.app/api/usersFromAWS", {
          headers: { Authorization: "Bearer " + token },
          method: "GET",
          mode: "cors",
        }).then((res) => res.json())
      )
      .then((data) => setData(JSON.stringify(data, null, "\t")));
  }, []);

  const signIn = useCallback(() => {
    Auth.federatedSignIn();
  }, []);

  const signOut = useCallback(() => {
    Auth.signOut();
  }, []);

  useEffect(() => {
    Hub.listen("auth", ({ payload: { event } }) => {
      switch (event) {
        case "signIn":
        case "cognitoHostedUI":
        case "configured":
          Auth.currentAuthenticatedUser()
            .then((user) => setUser(user))
            .catch(() => setUser(null));
          break;

        case "signOut":
        case "signIn_failure":
        case "cognitoHostedUI_failure":
          setUser(null);
          break;
      }
    });
  }, []);

  return user ? (
    <div>
      <button onClick={signOut}>Sign Out</button>

      <h2>User:</h2>
      <pre>
        <code>{JSON.stringify(user, null, 2)}</code>
      </pre>

      <h2>API Data:</h2>
      <button onClick={getApiData}>Call API</button>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </div>
  ) : (
    <div>
      <button onClick={signIn}>Sign In</button>
    </div>
  );
};

export default HomePage;
