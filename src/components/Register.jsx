import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { register, login } from '../features/AuthSlice';
import { toast } from 'react-toastify';
import { Col, Row } from 'react-bootstrap';
import avatarUrlOne from '../assets/avatar1.jpg'
import avatarUrlTwo from '../assets/avatar2.jpg'

const Register = () => {
    const dispatch = useDispatch()
    const { success, msg, registerSuccess, registerMsg } = useSelector(state => state.auth);
    const initialLogin = {
        username: '',
        email: '',
        school: '',
        password: '',
        avatarNumber: 'One',
    }
    const [loginx, setLogin] = useState(initialLogin);
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(register(loginx))
        // console.log(loginx)

    }
    const handleChange = (e) => {
        setLogin(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    useEffect(() => {
        if (registerSuccess) {
            dispatch(login({ email: loginx.email, password: loginx.password }))
            setLogin(prev => (initialLogin))
        }
    }, [dispatch, registerSuccess, registerMsg])
    return (
        <Form>
            {registerSuccess === false && <p className='error'>{registerMsg}</p>}
            <Form.Group className="mb-3" controlId="formBasicAvatarNumber">
                <Row style={{ textAlign: 'center' }}>
                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img src={avatarUrlOne} style={{ width: '50px', float: 'left', borderRadius: '50px', border: '1px solid green', marginBottom: '10px' }} className='avatar' />
                        <Form.Check type="radio" aria-label="radio 1" id="formBasicAvatarNumber1" name='avatarNumber' defaultChecked value='One' onChange={(e) => handleChange(e)} />
                    </Col>
                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img src={avatarUrlTwo} style={{ width: '50px', float: 'left', borderRadius: '50px', border: '1px solid green', marginBottom: '10px' }} className='avatar' />
                        <Form.Check type="radio" aria-label="radio 2" id="formBasicAvatarNumber2" name='avatarNumber' value='Two' onChange={(e) => handleChange(e)} />
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Control type="text" name='username' placeholder="Enter username" value={loginx.username} onChange={(e) => handleChange(e)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="email" name='email' placeholder="Enter email" value={loginx.email} onChange={(e) => handleChange(e)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSchoolName">
                <Form.Control type="text" name='school' placeholder="Enter school name" value={loginx.school} onChange={(e) => handleChange(e)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" name='password' placeholder="Enter password" value={loginx.password} onChange={(e) => handleChange(e)} />
            </Form.Group>
            <Button className='btn form-control' variant="primary" onClick={(e) => handleSubmit(e)}>
                Register
            </Button>
        </Form>
    )
}

export default Register