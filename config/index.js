module.exports = () => {
  const env = {
    database: {},
    stripeCredentials: {
      publishableKey: process.env.PUBLISHABLE_KEY,
      secretKey: process.env.SECRET_KEY,
      endpointSecretKey: process.env.STRIPE_WEBHOOK_SECRET,
    },
    stripePlans: {
      standardMonthly: process.env.STANDARD_MONTHLY,
      standardYearly: process.env.STANDARD_YEARLY,
      premiumMonthly: process.env.PREMIUM_MONTHLY,
      premiumYearly: process.env.PREMIUM_YEARLY,
    },
  };

  if (process.env.NODE_ENV === "production") {
    env.database.dbName = process.env.DB_NAME_PROD;
    env.database.username = process.env.DB_USERNAME_PROD;
    env.database.password = process.env.DB_PASSWORD_PROD;
    env.database.host = process.env.DB_HOST_PROD;
  } else {
    env.database.dbName = process.env.DB_NAME_DEV;
    env.database.username = process.env.DB_USERNAME_DEV;
    env.database.password = process.env.DB_PASSWORD_DEV;
    env.database.host = process.env.DB_HOST_DEV;
  }

  return { ...env };
};
