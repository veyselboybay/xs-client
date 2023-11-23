import React from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
import { AiFillDelete } from 'react-icons/ai'
import { useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/AuthSlice'
import { logoutProfile } from '../features/ProfileSlice'
import axios from 'axios'
import { toast } from 'react-toastify'

const base_url = import.meta.env.VITE_APP_BASE_URL;

const AccountTab = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { accessToken } = useSelector(state => state.auth);

    const deleteUser = async (e) => {
        e.preventDefault()
        const res = confirm('Are you sure you want to delete your account?')
        if (res === true) {
            try {
                const resp = await axios.delete(base_url + '/auth/profile/delete', { headers: { Authorization: accessToken } });
                console.log(resp)
                if (resp.status === 204) {
                    dispatch(logout())
                    dispatch(logoutProfile())
                    navigate('/')
                }
            } catch (error) {
                toast.error(error.response.data.msg)
            }
        }
    }
    return (
        <Container fluid>
            <Row>
                <Col md={9}>You can delete your account here, your data will be deleted permanently.</Col>
                <Col md={3}>
                    <Button onClick={(e) => deleteUser(e)} variant='outline-danger'><AiFillDelete /> Delete Account</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default AccountTab