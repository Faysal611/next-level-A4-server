import { app } from "../src/app";

// Export the Express app as the default export so Vercel's Node builder
// can use it as a serverless function entrypoint.
export default app;
