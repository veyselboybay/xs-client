import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router';
import { CiEdit } from "react-icons/ci";
import { FaRegTrashCan } from "react-icons/fa6";
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
    useEffect(() => {
        const getBlogData = async () => {
            try {
                const resp = await axios.get(base_url + `/blogs/${blogId}`, { headers: { Authorization: accessToken || localStorage.getItem('accessToken') } });
                if (resp.status === 200 && resp.data.success) {
                    setBlogData(resp.data.blog);
                }
                if (resp.status === 401 || resp.status === 403) {
                    return navigate('/auth')
                }
            } catch (error) {
                return toast(error.response.data.msg)
            }
        }
        const getUserData = async () => {
            try {
                const resp = await axios.get(base_url + `/auth/user/${ownerId}`, { headers: { Authorization: accessToken || localStorage.getItem('accessToken') } });
                if (resp.status === 200 && resp.data.success) {
                    setUserData(resp.data.user)
                }
                if (resp.status === 401 || resp.status === 403) {
                    return navigate('/auth')
                }
            } catch (error) {
                console.log(error)
                return toast(error.response.data.msg)
            }
        }
        if (!accessToken && !localStorage.getItem('accessToken')) {
            return navigate('/auth')
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
    return (
        <>
            {blogData && (blogData.ownerId === userId && <div className='preview-container' style={{ border: 'none', backgroundColor: 'transparent' }} >
                <div style={{ textAlign: 'end' }}><span className='blog-submit-btn' onClick={(e) => handleEditButton(e)}><CiEdit /> Edit</span> | <span className='blog-submit-btn' style={{ backgroundColor: 'red', color: 'white' }} onClick={(e) => handleDelete(e)}><FaRegTrashCan /> Delete</span></div>
            </div>)}
            <div className='preview-container' style={{ marginBottom: '30px', border: 'none', boxShadow: '1px 1px 1px 1px grey' }}>
                <hr />
                <h3 style={{ textAlign: 'center', margin: '7px 1px' }}>{blogData && blogData.title}</h3>
                <p style={{ textAlign: 'center', fontSize: 'small', fontStyle: 'italic' }}>Written by @{userData && userData.username} - {blogData && moment(blogData.created_at).format('MMM Do YYYY')} - {blogData && Math.ceil(blogData.content.length / 1500) + ' min(s) reading'}</p>
                <hr />

                <div id='content' dangerouslySetInnerHTML={{ __html: blogData && blogData.content }}></div>
            </div >
        </>
    )
}

export default Blog