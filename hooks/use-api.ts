import { Auth } from "aws-amplify";
import { useCallback, useState } from "react";

export function useApi() {
  const [data, setData] = useState<string>("Call API to get data...");

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

  return { data, getApiData };
}
