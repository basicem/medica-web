import React, { useState } from 'react'
import { Menu, Dropdown } from 'semantic-ui-react'

const HomeMenu = () => {
  const [state, setState] = useState({ activeItem: 'patients' });

  const handleItemClick = (e, { name }) => {
    setState({ activeItem: name });
  }

  const { activeItem } = state

  return (
    <Menu pointing secondary>
      <Menu.Item
        name='patients'
        active={activeItem === 'patients'}
        onClick={handleItemClick}
      />
      <Menu.Item
        name='appointments'
        active={activeItem === 'appointments'}
        onClick={handleItemClick}
      />
      <Menu.Menu position='right'>

      <Dropdown item text='example@gmail.com'>
          <Dropdown.Menu>
            <Dropdown.Item name='account'
            active={activeItem === 'acount'}
            onClick={handleItemClick}>Account</Dropdown.Item>

            <Dropdown.Item name='logout'
            active={activeItem === 'logout'}
            onClick={handleItemClick}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </Menu>
  )
}

export default HomeMenu;
