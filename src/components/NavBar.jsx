import React, { useState, useEffect } from 'react'
import { Navbar, Container, Nav, Button, NavDropdown } from 'react-bootstrap'
import imgUrl from '../assets/favicon.ico';
import navbarpp from '../assets/avatar2.jpg';
import { FaRegCircleQuestion } from "react-icons/fa6";
import { BsFillPenFill, BsNewspaper, BsPen } from 'react-icons/bs'
import { ImExit, ImProfile } from 'react-icons/im'
import { AiFillHome, AiFillContacts, AiOutlineHome, AiOutlineContacts } from 'react-icons/ai'
import { RiLoginBoxFill } from 'react-icons/ri'
import { useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/AuthSlice'
import { logoutProfile } from '../features/ProfileSlice'

import avatarUrlOne from '../assets/avatar1.jpg'
import avatarUrlTwo from '../assets/avatar2.jpg'


const NavBar = () => {
    const { isLoggedIn, username, avatarNumber } = useSelector(state => state.auth);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutUser = (e) => {
        e.preventDefault()
        const res = confirm('Are you sure you want to logout?')
        if (res === true) {
            dispatch(logout())
            dispatch(logoutProfile())
            navigate('/')
        }
    }

    return (
        <Navbar expand="lg" className='navbar' sticky='top'>
            <Container>
                <Navbar.Brand onClick={(e) => navigate("/")} style={{ cursor: 'pointer' }}>
                    <img
                        src={imgUrl}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="Brand logo"
                    /> <span className='brand-name'>ExShare</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="d-flex me-auto order-5">
                        <Nav.Link onClick={(e) => navigate("/home")}><AiOutlineHome className='nav-logo' /> Home</Nav.Link>
                        <Nav.Link onClick={(e) => navigate("/blog")}><BsPen className='nav-logo' /> Blogs</Nav.Link>
                        {/* <Nav.Link onClick={(e) => navigate("/news")}><BsNewspaper className='nav-logo' /> News</Nav.Link> */}
                        <Nav.Link onClick={(e) => navigate("/contact")}><AiOutlineContacts className='nav-logo' /> Contact</Nav.Link>
                        <Nav.Link onClick={(e) => navigate("/faq")}><FaRegCircleQuestion className='nav-logo' /> FAQs</Nav.Link>
                    </Nav>
                    {isLoggedIn === true && <div className="d-flex ms-auto order-5">
                        <NavDropdown title={<><div className='avatar-container'>
                            <img src={avatarNumber === 'One' ? avatarUrlOne : avatarUrlTwo} className='avatar' style={{ width: '25px', float: 'left', borderRadius: '50px', border: '1px solid green' }} />
                        </div> <span style={{ marginLeft: '5px', }}>{username}</span></>} id="basic-nav-dropdown">
                            <NavDropdown.Item>{username !== null && <div className='navbar-logout' onClick={(e) => navigate("/profile")}><ImProfile className='nav-logo' /> Profile</div>}</NavDropdown.Item>
                            <NavDropdown.Item>{username !== null && <div className='navbar-logout' onClick={(e) => logoutUser(e)}> <ImExit className='nav-logo' /> Logout</div>}</NavDropdown.Item>
                        </NavDropdown>
                    </div>}
                    {isLoggedIn === false && <div className="d-flex ms-auto order-5">
                        <Nav.Link onClick={(e) => navigate("/auth")}><RiLoginBoxFill className='nav-logo' /> Login</Nav.Link>
                    </div>}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar