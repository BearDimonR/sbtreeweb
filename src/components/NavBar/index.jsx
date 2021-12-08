import React from 'react';
import {NavLink} from 'react-router-dom';
import style from "./index.module.scss";
import {BiCollection, BiHomeAlt, BiGroup, BiLogOutCircle} from "react-icons/bi";
import { Dropdown } from 'semantic-ui-react';

const Navbar = ({logout}) => {
    const signOut = () => {
        logout();
    }
    return <div className={style.navbarContainer}>
        <div className={style.menuLeftContainer}>
            <div className={style.logoContainer}>
                <p className={style.logo}>SBTree</p>
                <p className={style.logoSmall}>SB</p>
                <p className={style.subLogo}>web</p>
            </div>
            <NavLink exact activeClassName={style.menuItemActive} to="/home" className={style.menuItem}>
                <BiHomeAlt className={style.menuItemIcon}/>
                <p className={style.menuItemText}>Home</p>
                <Dropdown item onClick={(e)=>{
                    e.preventDefault();
                }}>
                    <Dropdown.Menu>
                        <Dropdown.Item>
                            <NavLink exact 
                                to="/home"
                                activeClassName={style.subMenuActiveItem} 
                                className={style.subMenuItem}>
                                    Home
                            </NavLink>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <NavLink exact 
                                to="/home/tree" 
                                activeClassName={style.subMenuActiveItem} 
                                className={style.subMenuItem}>
                                    Tree
                            </NavLink>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <NavLink exact 
                                to="/home/about" 
                                activeClassName={style.subMenuActiveItem} 
                                className={style.subMenuItem}>
                                    About
                            </NavLink>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </NavLink>
            
            <div className={style.divider} />
            <NavLink exact activeClassName={style.menuItemActive} to="/events" className={style.menuItem}>
                <BiCollection className={style.menuItemIcon}/>
                <p className={style.menuItemText}>Events</p>
            </NavLink>
            <div className={style.divider} />
            <NavLink exact activeClassName={style.menuItemActive} to="/people" className={style.menuItem}>
                <BiGroup className={style.menuItemIcon}/>
                <p className={style.menuItemText}>People</p>
            </NavLink>
        </div>
        <div style={{marginBottom: "30px"}} onClick={signOut} className={style.menuItem}>
            <BiLogOutCircle className={style.menuItemIcon}/>
            <p className={style.menuItemText}>Log out</p>
        </div>
    </div>
}

export default Navbar;