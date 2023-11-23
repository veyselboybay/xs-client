import React from 'react'
import { Navbar, Container } from 'react-bootstrap'
import { AiFillLinkedin, AiFillFacebook, AiFillTwitterSquare, AiFillBook, AiFillPhone } from 'react-icons/ai'


const BottomNavBar = () => {
    return (

        <Navbar expand="lg" fixed="bottom" style={{ backgroundColor: 'transparent' }}>
            <Container>
                <p style={{ fontSize: 'smaller' }}> &copy;2023 ExShare. All rights reserved.</p>
                <p><AiFillLinkedin /> <AiFillFacebook /> <AiFillTwitterSquare /> </p>
            </Container>
        </Navbar>
    )
}

export default BottomNavBar