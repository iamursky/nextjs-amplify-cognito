import type { NextPage } from "next";

import { useUser } from "../hooks/use-user";
import { useApi } from "../hooks/use-api";

const HomePage: NextPage = () => {
  const { user, signIn, signOut } = useUser();
  const { data, getApiData } = useApi();

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
