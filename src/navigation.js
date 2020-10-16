import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react'

function NavigationBar() {

    return (
        <Menu pointing secondary>
            <Menu.Item  name='home' href="/somelink"/>
            <Menu.Item  name='posts' href="/somelink"/>
            <Menu.Item  name='contact' href="/somelink"/>
        </Menu>
    )
}

export default NavigationBar;