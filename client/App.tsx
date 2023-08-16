import React from 'react';
import useLock from './useLock';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'

export function App() {
    const { isLocked, toggleLock } = useLock();

    const handleLock = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        toggleLock();
    }

    return <>
        {/* title */}
        <h1>Door Lock</h1>
        {/* form with input and an area to display output from an api call */}
        <form>
            <div id="controls">
                <button onClick={handleLock}>
                    {
                        isLocked ? 'Unlock' : 'Lock'
                    }
                </button>
            </div>
        </form>

        <section>
            <h2>Status</h2>
            <div id="status">
                <FontAwesomeIcon icon={isLocked ? faLock : faLockOpen} />
                <span>
                    {
                        isLocked ? 'Locked' : 'Unlocked'
                    }
                </span>
            </div>
        </section>
    </>
}
