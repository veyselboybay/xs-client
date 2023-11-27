import React, { useEffect, useState } from 'react';
import Login from '../components/Login'
import Register from '../components/Register'
import { Container, Col, Row, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import BottomNavBar from '../components/BottomNavBar';
import sideimg from '../assets/auth-side-pic.jpg';

import { useSearchParams } from 'react-router-dom';
// const sideimg = 'https://raw.githubusercontent.com/veyselboybay/xs-client/main/src/assets/auth-side-pic.jpg';

const Auth = () => {
    const navigate = useNavigate()
    const [isLogin, setIsLogin] = useState(true)
    const { isLoggedIn, accessToken } = useSelector(state => state.auth);
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        const redirect = searchParams.get('redirectTo');
        if (redirect && isLoggedIn) {
            return navigate(redirect)
        }
        if (isLoggedIn === true && accessToken !== null) {
            navigate('/home')
        }
    }, [isLoggedIn])
    return (
        <>
            <Container className='auth-container'>
                <Row>
                    <Col md={6} className='auth-img-container'>
                        <img className='auth-img' src={sideimg} />
                    </Col>
                    <Col md={6} className='auth-section'>
                        <Row>
                            <Col>
                                <Button className='btn form-control' variant='outline-primary' onClick={() => setIsLogin(true)}>Login</Button>
                            </Col>
                            <Col>
                                <Button className='btn form-control' variant='outline-success' onClick={() => setIsLogin(false)}>Register</Button>
                            </Col>
                        </Row>
                        <Row>
                            <p className='auth-header'>{isLogin ? 'Login' : 'Register'}</p>
                        </Row>
                        {isLogin ? <Login /> : <Register />}
                    </Col>
                </Row>
            </Container>
            <BottomNavBar />
        </>
    );
}

export default Auth;