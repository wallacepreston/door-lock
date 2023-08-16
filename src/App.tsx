import React from 'react';

export function App() {

    const handleLock = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log('lock');
    }

    const handleUnlock = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log('unlock');
    }

    return <>
        {/* title */}
        <h1>Door Lock</h1>
        {/* form with input and an area to display output from an api call */}
        <form>
            <div id="controls">
                <button onClick={handleLock}>Lock</button>
                <button onClick={handleUnlock}>Unlock</button>
            </div>
        </form>

        <section>
            <h2>Status</h2>
            <div id="status">
                <p>Locked</p>
            </div>
        </section>
    </>
}
