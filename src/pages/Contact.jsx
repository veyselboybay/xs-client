import React, { useState } from 'react'
import { Col, Container, Row, Form, Button } from 'react-bootstrap'
import { AiFillLinkedin, AiFillFacebook, AiFillTwitterSquare, AiFillBook, AiFillPhone } from 'react-icons/ai'
import { BsFillGearFill, BsFillArrowDownSquareFill } from 'react-icons/bs'
import BottomNavBar from '../components/BottomNavBar'
import { toast } from 'react-toastify'
import imgUrl from '../assets/toronto.jpg'

const Contact = () => {
    const [contact, setContact] = useState({ email: '', message: '' })

    const handleChange = (e) => {
        e.preventDefault();
        setContact(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (contact.email === '' || contact.message === '') {
            toast.error("Please enter all fields!")
            return;
        }
        setContact({ email: '', message: '' })
        toast.success("We got your email and We'll get back to you soon!")
        console.log(contact)
    }
    return (
        <Container className='contact-container'>
            <p className='error'><BsFillGearFill /> Our website is currently under maintenance. <br />You can use our contact form below. <BsFillArrowDownSquareFill /></p>
            <Row>
                <Col md={2} />
                <Col md={4}>
                    <div
                        style={{ paddingTop: '40px' }}>
                        <p><AiFillLinkedin /> LinkedIn:</p>
                        <p><AiFillFacebook /> Facebook:</p>
                        <p><AiFillTwitterSquare /> X(formerly Twitter):</p>
                        <p><AiFillBook /> Address:</p>
                        <p><AiFillPhone /> Phone:</p>
                    </div>
                </Col>
                <Col md={4} style={{ textAlign: 'center' }}>
                    <img className='contact-img' src={imgUrl} />
                </Col>
                <Col md={2} />
            </Row>
            <Row style={{ marginTop: '20px', paddingTop: '30px', paddingBottom: '40px', marginBottom: '30px' }}>
                <Col md={3} />
                <Col md={6}>
                    <h3 style={{ textAlign: 'center', color: '#55f', borderBottom: '1px solid #55f' }}>Contact Form</h3>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name='email' placeholder="name@example.com" value={contact.email} onChange={(e) => handleChange(e)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Message</Form.Label>
                            <Form.Control as="textarea" name='message' value={contact.message} onChange={(e) => handleChange(e)} rows={3} />
                        </Form.Group>
                        <Form.Group>
                            <Button style={{ backgroundColor: '#55f' }} onClick={(e) => handleSubmit(e)}>Submit</Button>
                        </Form.Group>
                    </Form>
                </Col>
                <Col md={3} />
            </Row>
            <BottomNavBar />
        </Container>
    )
}

export default Contact