// Replace with
// const Seam = require("seamapi")
// if not using ES6 modules and/or TypeScript.
import Seam from "seamapi";

// Seam will automatically use the SEAM_API_KEY environment variable if you
// don't provide an apiKey to `new Seam()`
const seam = new Seam();

const inspectDeviceCapabilities = async () => {
  const devices = await seam.locks.list();
  const [someLock] = devices;
  
  console.log(someLock.capabilities_supported);
  
  // If the lock is opened, lock it, else unlock it
  if (someLock.properties.locked) {
    await seam.locks.unlockDoor(someLock.device_id);
  } else {
    await seam.locks.lockDoor(someLock.device_id);
  }

  const code1 = await seam.accessCodes.create({
    device_id: someLock.device_id,
    name: "some-code-2",
  });
  
  const code2 = await seam.accessCodes.create({
    device_id: someLock.device_id,
    code: '999999',
    name: 'some timebound code 2',
    starts_at: '2028-11-12T19:23:42+0000',
    ends_at: '2028-11-13T19:23:42+0000',
  })
  
};

inspectDeviceCapabilities();