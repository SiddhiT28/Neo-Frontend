import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext, useAuth } from '../../Data/AuthContext'
import "./navbar.css"
import { CartIcon, SearchIcon, WishlistIcon } from "../Icons";
import NavDropDown from './NavDropDown'
import { Wishlist } from '../../pages/Wishlist/Wishlist';
export default function Navbar() {


    const { user, isAuthenticated, logout } = useAuth();
    const [searchKey, setSearchKey] = React.useState("");

    const Navigate = useNavigate();

    const activeStyle = {
        color: '#39085f',
    }

    const Electronics = [
        {
            id: 1,
            name: 'Laptops',
            path: 'category/laptop'
        },
        {
            id: 2,
            name: 'Desktops',
            path: 'category/desktop'
        },
        {
            id: 3,
            name: 'Mobile Phones',
            path: 'category/mobilePhone'
        },
    ]

    const Fashion = [
        {
            id: 1,
            name: 'Footwears',
            path: 'category/footwear'
        },
        {
            id: 2,
            name: 'Clothes',
            path: 'category/clothes'
        },
    ]

    const UserDropDown = [
        {
            id: 1,
            name: 'My Profile',
            path: '/user/profile'
        },
        {
            id: 2,
            name: 'Change Password',
            path: '/user/changePassword'
        },
        {
            id: 3,
            name: 'Logout',
            path: 'login',
        }
    ]

    const handleSearchButton = () => {
        searchKey !== "" && Navigate("/search?key=" + searchKey.replace(/\s/g, "+"))
    }

    const handleSearchBarChange = (e) => {
        setSearchKey(e.target.value);
    }

    return (
        <header className='header'>
            <img src='/svgs/logo.svg' alt='' width={100} />
            <nav className='header_nav'>
                <ul className='nav_list'>
                    <li className='nav_item'>
                        <NavLink
                            style={({ isActive }) =>
                                isActive ? activeStyle : undefined
                            }
                            to="/">Home</NavLink>
                    </li>
                    <NavDropDown title={"Electronics"} navItems={Electronics} />
                    <NavDropDown title={"Fashion"} navItems={Fashion} />
                    <li className='nav_item searchField'>
                        <input type="text" value={searchKey} onKeyUp={(e) => {
                            if (e.key === "Enter") handleSearchButton();
                        }} onChange={handleSearchBarChange} placeholder="Search for any products..." />
                        <button className='searchBtn' onClick={handleSearchButton}>
                            <SearchIcon />
                        </button>
                    </li>
                    {isAuthenticated && <li className='nav_item'>
                        <NavLink
                            style={({ isActive }) =>
                                isActive ? activeStyle : undefined
                            }
                            to="/wishlist">
                            <WishlistIcon width={32} />
                        </NavLink>
                    </li>}
                    <li className='nav_item'>
                        <NavLink
                            style={({ isActive }) =>
                                isActive ? activeStyle : undefined
                            }
                            to="/cart">
                            <CartIcon size={32} />
                            {
                                isAuthenticated && user.cart && <span className='cart-count'>{user.cart.length}</span>
                            }
                        </NavLink>
                    </li>

                    {
                        isAuthenticated ? <li className='nav_item'>
                            <NavDropDown title={user.name} navItems={UserDropDown} logout={logout} />
                        </li>
                            :
                            <li className='nav_item loginRegister'>
                                <NavLink
                                    style={({ isActive }) =>
                                        isActive ? activeStyle : undefined
                                    }
                                    to="login">Login</NavLink>
                                <p>/</p>
                                <NavLink
                                    style={({ isActive }) =>
                                        isActive ? activeStyle : undefined
                                    }
                                    to="register">Register</NavLink>
                            </li>}
                </ul>
            </nav>
        </header>
    )
}
