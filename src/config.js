const config = {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "us-east-2",
    BUCKET: "shopping-buddy-upload",
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://h8mdiwgnk1.execute-api.us-east-1.amazonaws.com/prod",
  },
  cognito: {
    REGION: "us-east-2",
    USER_POOL_ID: "us-east-2_l18pkZ7vX",
    APP_CLIENT_ID: "36hcr4fprq3mfn1ahh53vrbi0v",
    IDENTITY_POOL_ID: "us-east-2:53b7d833-e090-4484-aa1e-9566c38c9814",
  },
};

export default config;
