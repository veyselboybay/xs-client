import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../features/AuthSlice';
import { toast } from 'react-toastify';

const Register = () => {
    const dispatch = useDispatch()
    const { success, msg, registerSuccess, registerMsg } = useSelector(state => state.auth);
    const initialLogin = {
        username: '',
        email: '',
        school: '',
        password: ''
    }
    const [login, setLogin] = useState(initialLogin);
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(register(login))

    }
    const handleChange = (e) => {
        setLogin(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    useEffect(() => {
        if (registerSuccess) {
            setLogin(prev => (initialLogin))
            toast.success('You can now login!')
        }
    }, [dispatch, registerSuccess, registerMsg])
    return (
        <Form>
            {registerSuccess === false && <p className='error'>{registerMsg}</p>}
            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Control type="text" name='username' placeholder="Enter username" value={login.username} onChange={(e) => handleChange(e)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="email" name='email' placeholder="Enter email" value={login.email} onChange={(e) => handleChange(e)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSchoolName">
                <Form.Control type="text" name='school' placeholder="Enter school name" value={login.school} onChange={(e) => handleChange(e)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" name='password' placeholder="Enter password" value={login.password} onChange={(e) => handleChange(e)} />
            </Form.Group>
            <Button className='btn form-control' variant="primary" onClick={(e) => handleSubmit(e)}>
                Register
            </Button>
        </Form>
    )
}

export default Register