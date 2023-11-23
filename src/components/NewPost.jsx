import axios from 'axios';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { BsFillSendCheckFill, BsEar } from 'react-icons/bs'
import { GiSparkles } from 'react-icons/gi'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { newPost } from '../features/PostSlice';

const base_url = import.meta.env.VITE_APP_BASE_URL;

const NewPost = () => {
    const { accessToken } = useSelector(state => state.auth)
    const { isLoading, success, msg } = useSelector(state => state.post)
    const [content, setContent] = useState("");
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        if (content === "") {
            toast.error("You cannot submit a post with empty content!")
            return;
        }

        try {
            // const res = await axios.post(base_url + '/posts', { content }, { headers: { Authorization: accessToken } })
            // if (res.data.success) {
            //     setContent("")
            //     toast.success('New Post!')
            //     window.location.reload();
            // }
            dispatch(newPost({ content: content, token: accessToken }))
            setContent("")
            if (success) {
                setContent("")
                toast.success('New Post')
            }
        } catch (error) {
            setContent("")
            console.log(error)
            toast.error('Something went wrong!')
        }
    }

    return (
        <div className='post'>
            <p className='newpost-header'> <GiSparkles /><BsEar /> Share with us!</p>
            <InputGroup className="mb-3">
                <Form.Control
                    as="textarea"
                    placeholder="Type here..."
                    aria-describedby="basic-addon2"
                    rows={1}
                    name='content'
                    value={content}
                    onChange={(e) => {
                        setContent(e.target.value)
                    }}
                />
                <Button style={{ paddingLeft: '10px', paddingRight: '10px' }} className='interact-btn' id="button-addon2" onClick={(e) => handleSubmit(e)}>
                    <BsFillSendCheckFill /> Post
                </Button>
            </InputGroup>
        </div>
    )
}

export default NewPost