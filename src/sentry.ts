import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://708fa3f59cb2b89cbcc0f39096e7a4b7@o4510396971810816.ingest.de.sentry.io/4510397161537616",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
  enabled: true,
  debug: true,
});
