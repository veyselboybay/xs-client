import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from "react-redux"
import { Col, Row, Container, Spinner } from 'react-bootstrap'
import Post from '../components/Post'
import axios from 'axios'
import NewPost from '../components/NewPost'
import { BsNewspaper, BsFillPenFill } from 'react-icons/bs'
import moment from 'moment'
import { getPosts } from '../features/PostSlice'
import { getBlogs } from '../features/BlogSlice'

const base_url = import.meta.env.VITE_APP_BASE_URL;

const Home = () => {
    const dispatch = useDispatch()
    const { isLoggedIn, accessToken } = useSelector(state => state.auth)
    const { posts, isLoading } = useSelector(state => state.post)
    const { blogs } = useSelector(state => state.blogs);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            return navigate('/')
        }
    }, [isLoggedIn])

    useEffect(() => {
        dispatch(getPosts(accessToken || localStorage.getItem('accessToken')))
        dispatch(getBlogs(accessToken || localStorage.getItem('accessToken')))
    }, [])
    return (
        <Container className='home-body'>
            <Row>
                <Col md={3}>
                    <div className='news-sidebar'>
                        <div className='news-sidebar-header'><p><BsNewspaper /> News</p></div>
                        <div className="news-sidebar-body">
                            <p># We don't have any news so far!</p>
                            <p># We are going to share the headlines here!</p>
                        </div>
                    </div>
                </Col>
                <Col md={6}>
                    <NewPost />
                    {isLoading && <div style={{ textAlign: 'center' }}><Spinner /></div>}
                    {posts.length === 0 && <p>No posts yet!</p>}
                    <p style={{ textAlign: 'center', fontSize: 'small' }}>{moment(Date.now()).format("MMMM Do YYYY")}</p>
                    {posts.length !== 0 && posts.map(post => {
                        return <Post key={post._id} post={post} />
                    })}
                </Col>
                <Col md={3}>
                    <div className='blogs-sidebar'>
                        <div className='blogs-sidebar-header'><p><BsFillPenFill /> Blogs</p></div>
                        <div className="blogs-sidebar-body">
                            {blogs.length === 0 && <>
                                <p>* We don't have any blogs so far!</p>
                                <p>* We are going to share some of them here.</p>
                            </>}
                            {0 > blogs.length < 8 && blogs.map(blog => {
                                return <p key={blog._id} className='home-blogs-link' onClick={(e) => navigate(`/blog/${blog.ownerId}/${blog._id}`)} style={{ cursor: 'pointer' }}>* {blog.title}</p>
                            })}
                            {blogs.length > 8 && blogs.slice(0, 9).map(blog => {
                                return <p key={blog._id} className='home-blogs-link' onClick={(e) => navigate(`/blog/${blog.ownerId}/${blog._id}`)} style={{ cursor: 'pointer' }}>* {blog.title}</p>
                            })}
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Home