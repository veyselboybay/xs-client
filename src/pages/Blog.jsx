import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router';
import { CiEdit } from "react-icons/ci";
import { FaRegTrashCan, FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import moment from 'moment'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

const base_url = import.meta.env.VITE_APP_BASE_URL;

const Blog = () => {
    const navigate = useNavigate()
    const { blogId, ownerId } = useParams()
    const { userId, accessToken } = useSelector(reduxState => reduxState.auth);
    const [blogData, setBlogData] = useState(null);
    const [userData, setUserData] = useState(null)
    const [notFound, setNotFound] = useState(false);
    const [serverError, setServerError] = useState(false);
    const [numberOfLikes, setNumberOfLikes] = useState(0);
    const [isLike, setIsLike] = useState(null);
    const [likesArray, setLikesArray] = useState(null)
    const location = useLocation();
    useEffect(() => {
        const getBlogData = async () => {
            try {
                const resp = await axios.get(base_url + `/blogs/${blogId}`, { headers: { Authorization: accessToken || localStorage.getItem('accessToken') } });
                if (resp.status === 200 && resp.data.success) {
                    setBlogData(resp.data.blog);
                    setNumberOfLikes(resp.data.blog.likes.length)
                    setLikesArray(resp.data.blog.likes)
                    setIsLike(resp.data.blog.likes.includes(userId) ? true : false)
                }
            } catch (error) {
                if (error.response.status === 404) {
                    return setNotFound(true);
                }
                if (error.response.status === 500) {
                    return setServerError(true)
                }
                if (error.response.status === 401 || error.response.status === 403) {
                    return navigate('/auth')
                }
                console.log(error)
                return toast(error.response.data.msg)
            }
        }
        const getUserData = async () => {
            try {
                const resp = await axios.get(base_url + `/auth/user/${ownerId}`, { headers: { Authorization: accessToken || localStorage.getItem('accessToken') } });
                if (resp.status === 200 && resp.data.success) {
                    setUserData(resp.data.user)
                }
            } catch (error) {
                if (error.response.status === 401 || error.response.status === 403) {
                    return navigate('/auth')
                }
                return toast(error.response.data.msg)
            }
        }
        if (!accessToken && !localStorage.getItem('accessToken')) {
            return navigate(`/auth?redirectTo=${location.pathname}`)
        }
        getBlogData()
        getUserData()
    }, [])

    const handleDelete = async (e) => {
        e.preventDefault();
        const res = confirm('Are you sure you want to delete this blog?')
        if (!res) {
            return;
        }
        if (res) {
            try {
                const resp = await axios.delete(base_url + `/blogs/${blogId}`, { headers: { Authorization: accessToken || localStorage.getItem('accessToken') } });
                if (resp.status === 204) {
                    navigate('/blog')
                }
                if (resp.status === 401 || resp.status === 403) {
                    return navigate('/auth')
                }
            } catch (error) {
                return toast(error.response.data.msg)
            }
        }
    }
    const handleEditButton = (e) => {
        e.preventDefault();
        navigate(`/blog/${ownerId}/${blogId}/edit`)
    }

    const handleLikeButton = async (e) => {
        e.preventDefault()

        await axios.get(base_url + `/blogs/${blogId}/${likesArray.includes(userId) ? 'unlike' : 'like'}`, { headers: { Authorization: accessToken || localStorage.getItem('accessToken') } }).then(res => {
            console.log(res)
            if (res.data.success) {
                if (likesArray.includes(userId)) {
                    setLikesArray(likesArray.filter(like => like !== userId));
                    setNumberOfLikes(prev => prev - 1);
                }
                if (likesArray.includes(userId) === false) {
                    setNumberOfLikes(prev => prev + 1)
                    likesArray.push(userId);
                }
                setIsLike(!isLike)
            } else {
                toast.error("something went wrong!")
            }
        }).catch(error => {
            console.log(error)
        })
    }
    return (
        <>
            {serverError && <div className='container mt-5 error'>
                <h3>Status 500: Server Error</h3>
                <p>Something went wrong, please check back later.</p>
                <p onClick={(e) => navigate('/blog')} style={{ padding: '10px 15px', backgroundColor: 'white', color: '#55f', display: 'inline-block', cursor: 'pointer', fontWeight: 'bold', borderRadius: '5px', boxShadow: '1px 1px 1px 1px lightgrey' }}>Browse other blogs</p>
            </div>}
            {notFound && <div className='container mt-5 error'>
                <p>The blog you are looking for does not exist. It might have been deleted by the creator.</p>
                <p onClick={(e) => navigate('/blog')} style={{ padding: '10px 15px', backgroundColor: 'white', color: '#55f', display: 'inline-block', cursor: 'pointer', fontWeight: 'bold', borderRadius: '5px', boxShadow: '1px 1px 1px 1px lightgrey' }}>Browse other blogs</p>
            </div>}
            {blogData && (blogData.ownerId === userId && <div className='preview-container' style={{ border: 'none', backgroundColor: 'transparent' }} >
                <div style={{ textAlign: 'end' }}><span className='blog-submit-btn' onClick={(e) => handleEditButton(e)}><CiEdit /> Edit</span> | <span className='blog-submit-btn' style={{ backgroundColor: 'red', color: 'white' }} onClick={(e) => handleDelete(e)}><FaRegTrashCan /> Delete</span></div>
            </div>)}
            {(notFound === false && serverError === false) && <div className='preview-container' style={{ marginBottom: '30px', border: 'none', boxShadow: '1px 1px 1px 1px grey' }}>
                <hr />
                <h3 style={{ textAlign: 'center', margin: '7px 1px' }}>{blogData && blogData.title}</h3>
                <p style={{ textAlign: 'center', fontSize: 'small', fontStyle: 'italic' }}>Written by @{userData && userData.username} - {blogData && moment(blogData.created_at).format('MMM Do YYYY')} - {blogData && Math.ceil(blogData.content.length / 1500) + ' min(s) reading'}</p>
                <p style={{ textAlign: 'center' }}>
                    <span style={{ cursor: 'pointer' }} onClick={(e) => handleLikeButton(e)}>{likesArray && likesArray.includes(userId) ? <FaHeart style={{ color: 'red' }} /> : <FaRegHeart style={{ color: 'red' }} />}</span>
                    <span style={{ fontSize: 'small', marginLeft: '10px', color: '#55f' }}>{numberOfLikes > 0 ? `${numberOfLikes} like(s)` : 'No like(s) yet!'}</span>
                </p>
                <hr />

                <div style={{ paddingRight: '5vw', paddingLeft: '5vw', paddingBottom: '5vw' }} id='content' dangerouslySetInnerHTML={{ __html: blogData && blogData.content }}></div>
            </div >}
        </>
    )
}

export default Blog