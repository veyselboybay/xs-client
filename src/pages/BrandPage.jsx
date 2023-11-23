import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import BottomNavBar from '../components/BottomNavBar'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { BsFillMegaphoneFill } from 'react-icons/bs'

const BrandPage = () => {
    const { isLoggedIn } = useSelector(state => state.auth)
    const navigate = useNavigate()
    useEffect(() => {
        if (isLoggedIn) {
            navigate('/home')
        }
    }, [isLoggedIn])
    return (
        <>
            <Container className='brandpage-container' fluid >
                <Container style={{ paddingTop: '20px', textAlign: 'center' }}>
                    <Row>
                        <Col><p className='brandpage-text'>Share Experiences</p></Col>
                    </Row>
                    <Row>
                        <Col><p className='brandpage-text'>Connect with Fellow Students</p></Col>
                    </Row>
                    <Row>
                        <Col><Button className='brandpage-getstarted' id="button-addon2" onClick={() => navigate('/auth')} >Get Started</Button></Col>
                    </Row>
                </Container>
            </Container>
            <BottomNavBar />
        </>
    )
}

export default BrandPage