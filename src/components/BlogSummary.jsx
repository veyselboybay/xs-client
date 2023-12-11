import axios from 'axios';
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { AiOutlineRead } from 'react-icons/ai'
import { FaRegHeart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const base_url = import.meta.env.VITE_APP_BASE_URL;

const BlogSummary = ({ _id, title, content, ownerId, created_at, likes }) => {
    const { accessToken } = useSelector(state => state.auth)
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        const getUser = async () => {
            await axios.get(base_url + `/auth/user/${ownerId}`, { headers: { Authorization: accessToken } }).then(res => {
                if (res.data.success) {
                    setUser(res.data.user)
                } else {
                    setUser({ id: 'unknown', username: 'unknown', school: 'unknown' })
                }
            }).catch(error => {
                console.log(error)
            })
        }
        getUser()
    }, [])

    const handleClick = (e) => {
        e.preventDefault();
        navigate(`/blog/${ownerId}/${_id}`);
    }
    return (
        <div className='blog-summary'>
            <h5>{title}</h5>
            <hr style={{ margin: '0px' }} />
            {/* <p className='blog-submit-btn' style={{ display: 'inline', float: 'right', cursor: 'pointer' }}><AiOutlineRead /> Read</p> */}
            <p style={{ fontSize: 'smaller', fontStyle: 'italic' }}>Written by @{user !== null && user.username} - {moment(created_at).format('MMM Do YYYY')} - {Math.ceil(content.length / 1500) + ' min(s) reading'} </p>
            <span className='blog-submit-btn' style={{ cursor: 'pointer', marginTop: '0px' }} onClick={(e) => handleClick(e)}><AiOutlineRead /> Read</span>
            {likes && <span style={{ marginLeft: '20px' }}><FaRegHeart style={{ color: 'red' }} /> <span style={{ fontSize: 'small', color: '#55f' }}>{likes.length > 0 ? `${likes.length} like(s)` : 'No like(s) yet'}</span></span>}
        </div>
    )
}

export default BlogSummary