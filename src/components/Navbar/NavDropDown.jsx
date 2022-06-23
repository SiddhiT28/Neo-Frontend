import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom'


const DropDownItem = ({ style, navItems, onClick, setIsOpen }) => {

    const dropDown = useRef(null)

    return (
        <ul className='dropDownContent' onMouseEnter={() => { setIsOpen(true) }} onMouseLeave={() => { setIsOpen(false) }} style={style}>
            {
                navItems.map(item => {
                    if (item.name === "Logout") {
                        return (
                            <li key={item.id} onClick={onClick} className='dropDownItem'>
                                <NavLink to={item.path}>{item.name}</NavLink>
                            </li>
                        )
                    }
                    return (
                        <li key={item.id} className='dropDownItem'>
                            <NavLink to={item.path}>{item.name}</NavLink>
                        </li>
                    )
                }
                )
            }
        </ul>
    )
}

export default function NavDropDown({ title, navItems, logout }) {

    const [isOpen, setIsOpen] = React.useState(false);


    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className='nav_item dropDown'>
            <div className='dropDown_title' onMouseEnter={() => { setIsOpen(true) }} onMouseLeave={() => { setIsOpen(false) }}>
                <p>{title}</p>
                <img src='/svgs/chevronDown.svg' style={{
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                }} alt='' width={20} />
            </div>
            <DropDownItem
                style={{
                    height: isOpen ? '20vh' : 0,
                    padding: isOpen ? '10px 20px' : '0',
                }}
                navItems={navItems}
                onClick={logout}
                setIsOpen={setIsOpen}
            />
        </div >

    )
}
