module.exports = {
  Auth: {
    region: "us-east-1",
    userPoolId: "us-east-1_Abd5yPTuk",
    userPoolWebClientId: "2p20jmvbidrjf5rkcd311n5sie",
    mandatorySignIn: false,
    cookieStorage: {
      domain: ".vercel.app",
      expires: 365,
      path: "/",
      sameSite: "strict",
      secure: true,
    },
    oauth: {
      domain: "testing-saml.auth.us-east-1.amazoncognito.com",
      redirectSignIn: "https://ok-cognito-amplify.vercel.app",
      redirectSignOut: "https://ok-cognito-amplify.vercel.app",
      responseType: "code",
      scope: ["phone", "email", "profile", "openid", "aws.cognito.signin.user.admin"],
    },
  },
};
