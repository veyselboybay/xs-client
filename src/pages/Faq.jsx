import React from 'react'
import { Container, Accordion } from 'react-bootstrap'
import BottomNavBar from '../components/BottomNavBar'

const Faq = () => {
    return (
        <>
            <Container className='faq-container'>
                <h2 style={{ textAlign: 'center', color: '#55f', paddingBottom: '10px' }}>Frequently Asked Questions</h2>
                <Accordion defaultActiveKey="0" flush>

                    <Accordion.Item eventKey="0">
                        <Accordion.Header><p style={{ fontWeight: 'bold' }}>How can I update my account information?</p></Accordion.Header>
                        <Accordion.Body>
                            You can update your account information by going to your Profile page, there you will see 'Update Profile' tab. You can change your account information there.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header><p style={{ fontWeight: 'bold' }}>Is my account information shared with third parties?</p></Accordion.Header>
                        <Accordion.Body>
                            Of course not, we are not sharing any user information with anybody or organization. Your information is confidential and stays secure in our system.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header><p style={{ fontWeight: 'bold' }}>How can I delete my account?</p></Accordion.Header>
                        <Accordion.Body>
                            You can delete your account by going to your Profile page and then clicking Account tab, there you will see 'Delete Account' button. After confirming the action, your account will be deleted permanently.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header><p style={{ fontWeight: 'bold' }}>Can I retrieve my account information after I delete my account?</p></Accordion.Header>
                        <Accordion.Body>
                            Unfortunately, you cannot retrieve you account information If you delete your account. We don't back up deleted account information. Your data will be permanently deleted from our system when you delete your account.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Container>
            <BottomNavBar />
        </>
    )
}

export default Faq