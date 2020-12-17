import React from 'react';

export const FirstMenu = () => {
    return (
        <div id="firstMenu">
            <form>
                <label for="username">Input Username: </label>
                <input type="text" id="username" name="username"></input> <br />
                <label for="zip">Input Zip Code: </label>
                <input type="text" id="zip" name="zip"></input>
            </form>
        </div>
    )
}

export default FirstMenu;