import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from "react-redux"
import { Col, Container, Row, Tabs, Tab, Spinner } from 'react-bootstrap'
import { getProfileInfo } from '../features/ProfileSlice'
import moment from 'moment/moment'
import { BiSolidSchool, BiRegistered } from 'react-icons/bi'
import { MdAlternateEmail, MdVerifiedUser } from 'react-icons/md'
import { AiFillCheckCircle, AiFillDelete } from 'react-icons/ai'
import { GrUpdate } from 'react-icons/gr'
import { BsPersonGear, BsFillFileEarmarkPostFill } from 'react-icons/bs'
import UpdateProfile from '../components/UpdateProfile'
import AccountTab from '../components/AccountTab'
import Post from '../components/Post'
import axios from 'axios'
import { FaRegTrashCan } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa";
import { toast } from 'react-toastify'
import { BsFillPenFill } from 'react-icons/bs'

import { AiOutlineRead } from 'react-icons/ai'

const base_url = import.meta.env.VITE_APP_BASE_URL;

const Profile = () => {
    const dispatch = useDispatch()
    const { isLoading, success, msg, profile } = useSelector(state => state.profile);
    const { isLoggedIn, accessToken } = useSelector(state => state.auth)
    const [posts, setPosts] = useState(null);
    const [blogs, setBlogs] = useState(null);
    const navigate = useNavigate()
    useEffect(() => {
        if (!isLoggedIn || !localStorage.getItem('accessToken')) {
            return navigate('/')
        }
    }, [])
    useEffect(() => {
        if (profile === null) {
            dispatch(getProfileInfo(accessToken))
        }
    }, [success])
    useEffect(() => {
        const getPosts = async () => {
            await axios.get(base_url + '/posts/mine', { headers: { Authorization: accessToken } }).then(res => {
                setPosts(res.data.posts)
            }).catch(error => {
                console.log(error)
            })
        }
        const getBlogs = async () => {
            await axios.get(base_url + '/blogs/mine', { headers: { Authorization: accessToken } }).then(res => {
                setBlogs(res.data.blogs)
            }).catch(error => {
                console.log(error)
            })
        }
        getPosts();
        getBlogs();
    }, [])

    const handleDelete = async (e, postId) => {
        e.preventDefault();
        const ans = confirm('Are you sure you want to delete your post?');
        if (!ans) {
            return;
        }
        if (ans) {
            try {
                const res = await axios.delete(base_url + `/posts/${postId}`, { headers: { Authorization: accessToken } });
                if (res.status === 204) {
                    setPosts(posts.filter(post => post._id !== postId))
                }
            } catch (error) {
                console.log(error);
                toast.error('Something went wrong, try again later!')
            }
        }
    }
    return (
        <Container className='profile-container'>
            {isLoading && <Spinner />}
            {success && <Row>
                <Col md={3} className='profile-head'>
                    <img src="./src/assets/avatar2.jpg" alt="profile pic" className='profile-pic' />
                    <div className='profile-head-info'>
                        <p><MdAlternateEmail /> {profile.username}</p>
                        <p><AiFillCheckCircle style={{ color: 'green' }} /> Active User since {moment(profile.created_at).format('YYYY')}</p>
                        <p><BiSolidSchool style={{ color: 'blue' }} /> {profile.school}</p>
                        <p><MdVerifiedUser style={{ color: 'red' }} /> Email is not verified!</p>
                        <p><MdVerifiedUser style={{ color: 'red' }} /> ID is not verified!</p>
                    </div>
                </Col>
                <Col md={9} className='profile-body'>
                    <Tabs
                        defaultActiveKey="myposts"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                        style={{ borderBottom: '1px solid green' }}
                    >

                        <Tab eventKey="myposts" title={<><BsFillFileEarmarkPostFill /> My Posts</>}>
                            {(posts === null || posts.length === 0) && <div style={{ backgroundColor: '#dfa', textAlign: 'center', fontWeight: 'bold', padding: '8px 0px', borderRadius: '5px' }}>You haven't posted yet!</div>}
                            {posts !== null && posts.map(post => {
                                return (<div key={post._id}>
                                    <p style={{ textAlign: 'end', paddingRight: '0px', marginBottom: '1px' }}><span onClick={(e) => handleDelete(e, post._id)} style={{ backgroundColor: 'red', color: 'white', padding: '2px 4px', borderRadius: '5px 5px 0px 0px', cursor: 'pointer' }}><FaRegTrashCan /> Delete <FaArrowDown /></span></p>
                                    <Post post={post} />
                                </div>)
                            })}
                        </Tab>
                        <Tab eventKey="myblogs" title={<><BsFillPenFill /> My Blogs</>}>
                            {(blogs === null || blogs.length === 0) && <div style={{ backgroundColor: '#dfa', textAlign: 'center', fontWeight: 'bold', padding: '8px 0px', borderRadius: '5px' }}>You haven't created any blog yet! <br /> <span style={{ color: 'blue', cursor: 'pointer' }} onClick={(e) => {
                                e.preventDefault()
                                navigate('/blog')
                            }}>Create one!</span></div>}
                            {blogs !== null && blogs.map(blog => {
                                return (<div className='blog-summary' key={blog._id}>
                                    <h5>{blog.title}</h5>
                                    <hr style={{ margin: '0px' }} />
                                    <p style={{ fontSize: 'smaller', fontStyle: 'italic' }}> {moment(blog.created_at).format('MMM Do YYYY')} - {Math.ceil(blog.content.length / 1500) + ' min(s) reading'} </p>
                                    <span className='blog-submit-btn' style={{ cursor: 'pointer', marginTop: '0px' }} onClick={(e) => {
                                        e.preventDefault();
                                        navigate(`/blog/${blog.ownerId}/${blog._id}`)
                                    }} ><AiOutlineRead /> Read</span>
                                </div>)
                            })}
                        </Tab>
                        <Tab eventKey="update" title={<><GrUpdate /> Update Profile</>}>
                            <UpdateProfile {...profile} />
                        </Tab>
                        <Tab eventKey="delete" title={<><BsPersonGear /> Account</>}>
                            <AccountTab />
                        </Tab>
                    </Tabs>
                </Col>
            </Row>}
        </Container>
    )
}

export default Profile