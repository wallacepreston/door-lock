import { useState } from 'react';
const { API_URL = 'http://localhost:3000/api' } = process.env;

const LockActionTypes = {
  LOCK_DOOR: "LOCK_DOOR",
  UNLOCK_DOOR: "UNLOCK_DOOR",
}

const useLock = () => {
  const [isLocked, setIsLocked] = useState(false);

  const toggleLock = async () => {

    const url = `${API_URL}/lock`;
    console.log(url);

    const res = await fetch(url, {
        method: 'POST',
    });

    const data = await res.json();

    if(data.actionAttempt.status === 'success') {
      if(data.actionAttempt.action_type === LockActionTypes.LOCK_DOOR) {
        setIsLocked(true);
      } else if(data.actionAttempt.action_type === LockActionTypes.UNLOCK_DOOR) {
        setIsLocked(false);
      }
    } else {
      console.log('ERROR: ', data.actionAttempt.error);
    }

  };

  return { isLocked, toggleLock };
};

export default useLock;
