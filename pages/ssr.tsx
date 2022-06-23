import type { FC } from "react";
import type { GetServerSideProps } from "next";

import { Amplify, Auth } from "aws-amplify";
import awsExports from "../aws-exports";

interface ISSRPageProps {
  data: string;
}

Amplify.configure({ ...awsExports, ssr: true });

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
