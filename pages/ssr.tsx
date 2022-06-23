import type { FC } from "react";
import type { GetServerSideProps } from "next";

import { Auth } from "aws-amplify";

interface ISSRPageProps {
  data: string;
}

const SSRPage: FC<ISSRPageProps> = ({ data }) => {
  return (
    <section>
      <h2>SSR Data:</h2>
      <pre>
        <code>{data}</code>
      </pre>
    </section>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const session = await Auth.currentSession();
    const token = session.getAccessToken().getJwtToken();
    const data = fetch("https://messangers-ok-wiki.web.app/api/usersFromAWS", {
      headers: { Authorization: "Bearer " + token },
      method: "GET",
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => JSON.stringify(data, null, 2));

    return { props: { data } };
  } catch {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};

export default SSRPage;
