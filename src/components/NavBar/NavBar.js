import React, { useCallback, useState } from 'react';
import Menu from 'devextreme-react/menu';
import CheckBox from 'devextreme-react/check-box';
import notify from 'devextreme/ui/notify';
import service from '../NavBar/Data.js';
import '../NavBar//NavStyle.css'
import '../Login/Login.css';
import { useNavigate } from "react-router-dom";


const SUBMENU_HEIGHT = 200;
const products = service.getProducts();

// console.log(products)
const NavBar = () => {
  const [limitSubmenuHeight, setLimitSubmenuHeight] = useState(false);
  const navigate = useNavigate();

  const itemClick = useCallback((e) => {
    // console.log('Navigation' + e.itemData.path)
    // console.log(!localStorage.getItem('token'))
    if (!e.itemData.items ) 
    {
    if (localStorage.getItem('token') && e.itemData.path ==='')
    {
        localStorage.removeItem('token');
       // console.log('After token removal ' + localStorage.getItem('token'))
    }

    console.log('Navigation' + `/${e.itemData.path}`)
      navigate(`/${e.itemData.path}`);
    }
  }, []);
  const limitSubmenuHeightOnMouseClick = useCallback(
    (e) => {
      setLimitSubmenuHeight(e.value);
    },
    [setLimitSubmenuHeight],
  );
  const onSubmenuShowing = useCallback(
    ({ submenuContainer }) => {
      submenuContainer.style.maxHeight = limitSubmenuHeight ? `${SUBMENU_HEIGHT}px` : '';
    },
    [limitSubmenuHeight],
  );
  return (
    <div className="nav-container">
      <div className="nav-content" >
        <Menu
          dataSource={products}
          onItemClick={itemClick}
          onSubmenuShowing={onSubmenuShowing}
        />
      </div>
    </div>
  );
};
export default NavBar;
