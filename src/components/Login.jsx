import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/AuthSlice';



const Login = () => {
    const dispatch = useDispatch()
    const { msg, success } = useSelector(state => state.auth)
    const [showError, setShowError] = useState(false);
    const initialLogin = {
        email: '',
        password: ''
    }
    const [loginData, setLoginData] = useState(initialLogin);
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(login(loginData))
        if (success === false) {
            setShowError(true)
            setTimeout(() => { setShowError(false) }, 3000)
        }

    }
    const handleChange = (e) => {
        setLoginData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    return (
        <Form>
            {showError === true && <p className='error'>{msg}</p>}
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name='email' placeholder="Enter email" onChange={(e) => handleChange(e)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name='password' placeholder="Password" onChange={(e) => handleChange(e)} />
            </Form.Group>
            <Button className='btn form-control' variant="primary" onClick={(e) => handleSubmit(e)}>
                Login
            </Button>
        </Form>
    )
}

export default Login