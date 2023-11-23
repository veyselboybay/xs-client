import React, { useEffect } from 'react'
import { Container, Spinner } from 'react-bootstrap'
import BlogSummary from '../components/BlogSummary'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogs } from '../features/BlogSlice'
import { AiFillFileAdd } from 'react-icons/ai'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { BsFillSendCheckFill, BsEar } from 'react-icons/bs'
import { GiSparkles } from 'react-icons/gi'

const Blogs = () => {
    const navigate = useNavigate()
    const { accessToken } = useSelector(state => state.auth)
    const { isLoading, success, msg, blogs } = useSelector(state => state.blogs)
    const dispatch = useDispatch()
    useEffect(() => {
        if (!accessToken || !localStorage.getItem('accessToken')) {
            navigate('/auth')
        }
        dispatch(getBlogs(accessToken || localStorage.getItem('accessToken')))
    }, [])
    return (
        <Container>
            {!success && <div style={{ margin: '20px 20px', padding: '10px 10px' }} className='error'>{msg}</div>}
            <div className='newpost-header' style={{ margin: '20px 20px', padding: '10px 10px' }}>
                <p style={{}}><GiSparkles /> <BsEar /> Share your experiences and pass your knowledge to others. </p>
                <span onClick={(e) => {
                    e.preventDefault()
                    navigate('/newBlog')
                }} className='blog-submit-btn' style={{ cursor: 'pointer', backgroundColor: 'white', padding: '5px 5px' }}><AiFillFileAdd /> Start a New Blog</span>
            </div>
            {isLoading && <div style={{ textAlign: 'center', marginTop: '40px' }}><Spinner /><p>Loading...</p></div>}
            {
                blogs.length === 0 && <div style={{ margin: '20px 20px', padding: '20px 20px', borderRadius: '5px', }}>
                    <p style={{ textAlign: 'center', color: '#55f', fontWeight: 'bold' }}>No Blog Yet, Check Back Later Again!</p>
                    {/* <p style={{ textAlign: 'center' }}>or</p>
                    <p style={{ textAlign: 'center' }}> <span onClick={(e) => {
                        e.preventDefault()
                        navigate('/newBlog')
                    }} className='blog-submit-btn' style={{ cursor: 'pointer', backgroundColor: 'white' }}><AiFillFileAdd /> Write A Blog</span></p> */}
                </div>
            }
            {
                blogs.length > 0 && blogs.map(item => {
                    return <BlogSummary key={item._id} {...item} />
                })
            }
        </Container >
    )
}

export default Blogs