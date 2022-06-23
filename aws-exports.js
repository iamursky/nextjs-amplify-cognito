module.exports = {
  Auth: {
    region: "us-east-1",
    userPoolId: "us-east-1_Abd5yPTuk",
    userPoolWebClientId: "2p20jmvbidrjf5rkcd311n5sie",
    mandatorySignIn: false,
    oauth: {
      domain: "testing-saml.auth.us-east-1.amazoncognito.com",
      scope: ["phone", "email", "profile", "openid", "aws.cognito.signin.user.admin"],
      redirectSignIn: "https://ok-cognito-amplify.vercel.app",
      redirectSignOut: "https://ok-cognito-amplify.vercel.app",
      responseType: "code",
    },
  },
};
