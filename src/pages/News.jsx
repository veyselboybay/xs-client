import React from 'react'

import { Container } from 'react-bootstrap'

const News = () => {
    return (
        <Container>
            <div style={{ margin: '20px 20px', padding: '20px 20px', backgroundColor: '#fea', borderRadius: '5px', }}>
                <p style={{ textAlign: 'center', color: '#55f', fontWeight: 'bold' }}>No News Yet, Check Back Later Again!</p>
            </div>
        </Container>
    )
}

export default News