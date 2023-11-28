import axios from 'axios'
import moment from 'moment/moment'
import React, { useEffect, useState } from 'react'
import { AiFillLike, AiOutlineLike, AiOutlineComment, AiFillDelete, AiOutlineSend } from 'react-icons/ai'
import { BsThreeDotsVertical, BsFillSendCheckFill } from 'react-icons/bs'
import { TiTickOutline } from 'react-icons/ti'
import { GiCancel } from 'react-icons/gi'
import { useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { toast } from 'react-toastify'
import Comment from './Comment'
import avatarimg from '../assets/avatar2.jpg'

import avatarUrlOne from '../assets/avatar1.jpg'
import avatarUrlTwo from '../assets/avatar2.jpg'

const base_url = import.meta.env.VITE_APP_BASE_URL;

const Post = ({ post }) => {
    const { accessToken, userId, username } = useSelector(state => state.auth);
    const [like, setLike] = useState(false)
    const [showFullContent, setShowFullContent] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [user, setUser] = useState(null)
    const [numberOfLikes, setNumberOfLikes] = useState(post.likes.length)
    const [numberOfComments, setNumberOfComments] = useState(post.comments.length);
    const [comments, setComments] = useState([]);
    const [showDeleteOptions, setShowDeleteOptions] = useState(false)
    const [commentText, setCommentText] = useState("")

    const changeLike = async (action) => {
        await axios.get(base_url + `/posts/${post._id}/${action}`, { headers: { Authorization: accessToken } }).then(res => {
            if (res.data.success) {
                if (like) {
                    setNumberOfLikes(prev => prev - 1)
                }
                if (like === false) {
                    setNumberOfLikes(prev => prev + 1)
                }
                setLike(!like)
            } else {
                toast.error("something went wrong!")
            }
        }).catch(error => {
            console.log(error)
        })
    }

    const handleLike = (e) => {
        e.preventDefault();
        if (like === false) {
            changeLike('like')
        }
        if (like === true) {
            changeLike('unlike')
        }
    }

    const handleFullContent = (e) => {
        e.preventDefault();
        setShowFullContent(!showFullContent)
    }

    const handlePostComment = async (e) => {
        e.preventDefault();
        await axios.post(base_url + `/posts/${post._id}/comment`, { text: commentText }, { headers: { Authorization: accessToken } }).then(res => {
            if (res.data.success) {
                setComments(prev => ([...prev, { comment: res.data.comment, username: username }]))
                setNumberOfComments(prev => prev + 1)
                setCommentText("")
            }
        }).catch(error => {
            console.log(error)
        })
    }

    const deleteComment = async (e, commentId) => {
        e.preventDefault();
        await axios.delete(base_url + `/posts/${post._id}/comment/${commentId}`, { headers: { Authorization: accessToken } }).then(res => {
            if (res.data.success) {
                // setComments(prev => ([...prev, { comment: res.data.comment, username: username }]))
                // setNumberOfComments(prev => prev + 1)
                // setCommentText("")
                // window.location.reload()
                setComments(comments.filter(comment => comment.comment._id !== commentId));
                setShowDeleteOptions(false)
                setNumberOfComments(prev => prev - 1)
            }
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        const getUser = async () => {
            await axios.get(base_url + `/auth/user/${post.ownerId}`, { headers: { Authorization: accessToken } }).then(res => {
                if (res.data.success) {
                    setUser(res.data.user)
                } else {
                    setUser({ id: 'unknown', username: 'unknown', school: 'unknown', avatarNumber: 'One' })
                }
            }).catch(error => {
                console.log(error)
            })
        }
        const getComments = async () => {
            await axios.get(base_url + `/posts/${post._id}/comments`, { headers: { Authorization: accessToken } }).then(res => {
                if (res.data.success) {
                    setComments(res.data.comments)
                }
            }).catch(error => {
                console.log(error)
            })
        }
        getUser()
        if (post.likes.includes(userId)) {
            setLike(true)
        }
        if (numberOfComments > 0) {
            getComments()
        }
    }, [])
    return (
        <div className='post'>
            <div className='title-container'>
                <p className='threedots'><BsThreeDotsVertical style={{ color: 'black' }} /></p>
                <div className='avatar-container'>
                    <img src={user && user.avatarNumber === 'One' ? avatarUrlOne : avatarUrlTwo} className='avatar' />
                    <p className='title'><span className='name'>@{user !== null && user.username} - {user !== null && user.school}</span></p>
                </div>
            </div>
            {showFullContent && <p className='content'>{post.content} {post.linkUrl && <><br /><a style={{ fontSize: 'small' }} href={post.linkUrl} target='_blank'>Go to attached link</a></>} <span style={{ fontSize: 'smaller', color: 'blue', cursor: 'pointer' }} onClick={(e) => handleFullContent(e)}> ...less</span></p>}
            {!showFullContent && <p className='content'>{post.content.substring(0, 100)}{post.linkUrl && <><br /><a style={{ fontSize: 'small' }} href={post.linkUrl} target='_blank'>Go to  the attached link</a></>}{post.content.length > 100 && <span style={{ fontSize: 'smaller', color: 'blue', cursor: 'pointer' }} onClick={(e) => handleFullContent(e)}> ...more</span>}</p>}
            <p className='creator'>{moment(post.created_at).format('MMM Do YY')}</p>
            <p>
                <span className='interact-btn' onClick={(e) => handleLike(e)}>{like ? <AiFillLike /> : <AiOutlineLike />} <span className='interact-text'>Like  </span></span>
                <span className='interact-btn' onClick={() => setShowComments(!showComments)}><AiOutlineComment /> <span className='interact-text'>Comment</span></span> <span style={{ fontSize: 'smaller' }}> {numberOfLikes} like(s) <span style={{ cursor: 'pointer' }} onClick={() => setShowComments(!showComments)}>{numberOfComments} comment(s)</span></span>
            </p>
            {showComments && <div className='comments-container'>
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="Type your comment here..."
                        aria-describedby="basic-addon2"
                        style={{ height: '20px', fontSize: 'smaller' }}
                        name='text'
                        onChange={(e) => setCommentText(e.target.value)}
                        value={commentText}
                    />
                    <Button style={{ paddingLeft: '10px', paddingRight: '10px', height: '20px', lineHeight: '0px', fontSize: 'smaller' }} className='interact-btn' id="button-addon2" onClick={(e) => handlePostComment(e)}>
                        <AiOutlineSend />
                        {/* comment */}
                    </Button>
                </InputGroup>
                {numberOfComments > 0 && comments.map(comment => {
                    // return <div key={comment.comment._id} className='comments'>
                    //     {showDeleteOptions !== true && <p className='deleteBtn' onClick={() => setShowDeleteOptions(!showDeleteOptions)}>{comment.comment.ownerId === userId && <AiFillDelete style={{ color: 'brown' }} />}</p>}
                    //     {showDeleteOptions && <p className='deleteBtn'><TiTickOutline style={{ color: 'green' }} onClick={(e) => deleteComment(e, comment.comment._id)} /> || <GiCancel style={{ color: 'red' }} onClick={() => setShowDeleteOptions(!showDeleteOptions)} /></p>}
                    //     <p><span className='user-name'>@{comment.username}</span> - <span>{comment.comment.text}</span></p>
                    // </div>
                    return <Comment key={comment.comment._id} deleteComment={deleteComment} comment={comment} />
                })}
            </div>}
        </div >
    )
}

export default Post