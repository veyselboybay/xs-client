import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import BottomNavBar from '../components/BottomNavBar'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { BsFillMegaphoneFill } from 'react-icons/bs'
import img0 from '../assets/zero.jpg'
import img1 from '../assets/one.png'
import img2 from '../assets/two.png'
import img3 from '../assets/three.png'
import img4 from '../assets/four.png'

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
                <Row>
                    <Col md={6}>
                        <p className='brandpage-text'>Engage, Share, and Connect</p>
                        <p className='brandpage-text-two'>Write a blog, share a post and give them a like!</p>
                        <p style={{ textAlign: 'center' }}><button className='brandpage-text-two' style={{ backgroundColor: '#dfa', color: '#55f', padding: '5px 5px', border: 'none', fontWeight: 'bold', borderRadius: '5px', boxShadow: '1px 1px #55f' }} onClick={(e) => {
                            e.preventDefault();
                            navigate('/auth')
                        }}>Get Started!</button></p>
                    </Col>
                    <Col md={6} style={{ textAlign: 'center' }}><img src={img0} alt="image0" className='brandpage-img' /></Col>
                </Row>
                <Row>
                    <p className='brandpage-header'>How It Works?</p>
                    <div style={{ textAlign: 'center' }}>
                        <p className='brandpage-text-two'>1. Create a post, and share it with everyone!</p>
                        <img src={img1} alt="image1" className='brandpage-image' />
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '35px' }}>
                        <p className='brandpage-text-two'>2. Check out the posts people shared!</p>
                        <img src={img2} alt="image2" className='brandpage-image' />
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '35px' }}>
                        <p className='brandpage-text-two'>3. Create a new blog and share it with the community!</p>
                        <img src={img3} alt="image3" className='brandpage-image' />
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '35px', marginBottom: '65px' }}>
                        <p className='brandpage-text-two'>4. Browse blogs that interests you!</p>
                        <img src={img4} alt="image4" className='brandpage-image' />
                    </div>
                    <p style={{ textAlign: 'center', padding: '20px 5px', backgroundColor: 'rgba(85, 85, 255, 0.082)', marginBottom: '50px' }}><button className='brandpage-text-two' style={{ backgroundColor: '#dfa', color: '#55f', padding: '5px 5px', border: 'none', fontWeight: 'bold', borderRadius: '5px', boxShadow: '1px 1px #55f' }} onClick={(e) => {
                        e.preventDefault();
                        navigate('/auth')
                    }}>Get Started!</button></p>
                </Row>
            </Container>
            <BottomNavBar />
        </>
    )
}

export default BrandPage