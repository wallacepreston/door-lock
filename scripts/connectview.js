// Replace with
// const Seam = require("seamapi")
// if not using ES6 modules and/or TypeScript.
import Seam from "seamapi";

// Seam will automatically use the SEAM_API_KEY environment variable if you
// don't provide an apiKey to `new Seam()`
const seam = new Seam(process.env.SEAM_API_KEY);

const createConnectView = async () => {
  const connectView = await seam.connectWebviews.create({
    accepted_providers: ["august"],
  });
  console.log(connectView);
};

createConnectView();