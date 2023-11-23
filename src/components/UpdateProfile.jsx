import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileInfo } from '../features/ProfileSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AiFillSave } from 'react-icons/ai';

const base_url = import.meta.env.VITE_APP_BASE_URL;

const UpdateProfile = ({ username, email, school, password }) => {
    const dispatch = useDispatch()
    const { accessToken } = useSelector(state => state.auth);
    const initialLogin = {
        username,
        email,
        school,
        password
    }
    const [login, setLogin] = useState(initialLogin);
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(base_url + '/auth/profile/update', login, { headers: { Authorization: accessToken } });
            console.log(res.data)
            toast.success('Changes saved!')
        } catch (error) {
            return toast.error('Something went wrong!')
        }

        // update the profile info
        dispatch(getProfileInfo(accessToken))
    }
    const handleChange = (e) => {
        setLogin(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    return (
        <Form>
            {/* {success === false && <p className='error'>{msg}</p>} */}
            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" name='username' placeholder="Enter username" defaultValue={username} onChange={(e) => handleChange(e)} />
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email Address:</Form.Label>
                <Form.Control type="email" name='email' placeholder="Enter email" defaultValue={email} onChange={(e) => handleChange(e)} />
            </Form.Group> */}

            <Form.Group className="mb-3" controlId="formSchoolName">
                <Form.Label>School Name:</Form.Label>
                <Form.Control type="text" name='school' placeholder="Enter school name" defaultValue={school} onChange={(e) => handleChange(e)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" name='password' placeholder="Enter password" onChange={(e) => handleChange(e)} />
            </Form.Group>
            <Button className='btn' variant="outline-primary" onClick={(e) => handleSubmit(e)}>
                <AiFillSave /> Save Changes
            </Button>
        </Form>
    )
}

export default UpdateProfile