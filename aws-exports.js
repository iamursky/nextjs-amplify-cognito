module.exports = {
  Auth: {
    region: "us-east-1",
    userPoolId: "us-east-1_Abd5yPTuk",
    userPoolWebClientId: "2p20jmvbidrjf5rkcd311n5sie",
    mandatorySignIn: false,
    cookieStorage: {
      domain: ".testing-saml.auth.us-east-1.amazoncognito.com",
      expires: 365,
      path: "/",
      sameSite: "lax",
      secure: true,
    },
    oauth: {
      domain: "testing-saml.auth.us-east-1.amazoncognito.com",
      scope: ["phone", "email", "profile", "openid", "aws.cognito.signin.user.admin"],
      redirectSignIn: "https://ok-cognito-amplify.vercel.app",
      redirectSignOut: "https://ok-cognito-amplify.vercel.app",
      // redirectSignIn: "http://localhost:3000",
      // redirectSignOut: "http://localhost:3000",
      responseType: "code",
    },
  },
};
