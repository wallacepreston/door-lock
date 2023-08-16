// Replace with
// const Seam = require("seamapi")
// if not using ES6 modules and/or TypeScript.
import Seam from "seamapi";

// Seam will automatically use the SEAM_API_KEY environment variable if you
// don't provide an apiKey to `new Seam()`
const seam = new Seam();

const checkDevices = async () => {
  const devices = await seam.locks.list();
  console.log(devices);
};

checkDevices();