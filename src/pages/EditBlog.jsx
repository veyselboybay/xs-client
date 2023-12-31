import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { BsFillSendCheckFill } from 'react-icons/bs'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import moment from 'moment/moment';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router';
const base_url = import.meta.env.VITE_APP_BASE_URL;

const EditBlog = () => {
    const { blogId, ownerId } = useParams();
    const [blogData, setBlogData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // const { state } = useLocation()
    // const { user, _id, titlex, contentx, ownerId, created_at } = state;
    const navigate = useNavigate()
    const { username, accessToken, userId } = useSelector(state => state.auth)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('');
    const [preview, setPreview] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (title === '' && content === '') {
            return toast.error('Fill out all required fields to submit!')
        }

        try {
            const res = await axios.post(base_url + `/blogs/${blogId}`, { title, content }, { headers: { Authorization: accessToken || localStorage.getItem('accessToken') } });
            if (!res.data.success) {
                return toast.error(res.data.msg)
            }
            if (res.status === 401 || res.status === 403) {
                return navigate('/auth')
            }
            toast.success(res.data.msg);
            toast.info('You are now being redirected')
            setTimeout(() => {
                navigate('/blog')
            }, 2000)
        } catch (error) {
            return toast.error(error.response.data.msg);
        }

    }
    const handlePreview = (e) => {
        e.preventDefault()
        if (preview === false) {
            if (title === '' && content === '') {
                return toast.info('Nothing to Preview!')
            }
            document.getElementById('preview').innerHTML = content;
        }
        if (preview) {
            document.getElementById('preview').innerHTML = '';
        }
        setPreview(!preview)
    }
    useEffect(() => {
        if (!accessToken && !localStorage.getItem('accessToken')) {
            return navigate('/auth')
        }
        const getBlogData = async () => {
            try {
                const resp = await axios.get(base_url + `/blogs/${blogId}`, { headers: { Authorization: accessToken || localStorage.getItem('accessToken') } });
                if (resp.status === 200 && resp.data.success) {
                    setBlogData(resp.data.blog);
                    setTitle(resp.data.blog.title)
                    setContent(resp.data.blog.content);
                }
                if (resp.status === 401 || resp.status === 403) {
                    return navigate('/auth')
                }
            } catch (error) {
                return toast(error.response.data.msg)
            }
        }
        getBlogData();
    }, [])
    return (
        <div className='blog-container'>
            <h2>Edit Your Blog</h2>
            <Form.Label htmlFor="basic-url">* Title of Your Blog</Form.Label>
            <InputGroup className="mb-3">
                <Form.Control id="basic-url" aria-describedby="basic-addon3" value={title} onChange={(e) => setTitle(e.target.value)} />
            </InputGroup>
            <p>* Content of Your Blog </p>
            <ReactQuill value={content} onChange={setContent} style={{ backgroundColor: 'white' }} />
            <div style={{ textAlign: 'center' }}>
                <button className='blog-submit-btn' onClick={(e) => handleSubmit(e)}><BsFillSendCheckFill /> Edit</button>
                <button className='blog-submit-btn' onClick={(e) => handlePreview(e)} style={{ marginLeft: '20px' }}> {preview ? 'Close' : 'Open'} Preview</button>
            </div>

            {preview && <p style={{ color: 'red', marginTop: '10px', textAlign: 'center', fontSize: 'smaller' }}>Close Preview first, If you need to update your preview content!</p>}
            <div className='preview-container'>
                {preview && <div>
                    <hr />
                    <h3 style={{ textAlign: 'center', margin: '7px 1px' }}>{title}</h3>
                    <p style={{ textAlign: 'center', fontSize: 'small', fontStyle: 'italic' }}>Written by @{username} - {moment(Date.now()).format('MMM Do YYYY')} - {Math.ceil(content.length / 1500) + ' min(s) reading'}</p>
                    <hr />
                </div>}
                <div id='preview'></div>
            </div>

        </div>
    )
}

export default EditBlog