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
import { FormControl } from 'react-bootstrap';

const base_url = import.meta.env.VITE_APP_BASE_URL;

const NewPost = () => {
    const { accessToken } = useSelector(state => state.auth)
    const { isLoading, success, msg } = useSelector(state => state.post)
    const [addLink, setAddLink] = useState(false);
    const [content, setContent] = useState("");
    const [urlLink, setUrlLink] = useState("");
    const [showLinkBox, setShowLinkBox] = useState(false);
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
            dispatch(newPost({ content: content, token: accessToken, linkUrl: urlLink }))
            setContent("")
            if (success) {
                setContent("")
                setUrlLink("")
                setShowLinkBox(false)
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
            <InputGroup className="mb-1">
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
                    onFocus={(e) => {
                        setShowLinkBox(true);
                    }}
                />
                <Button style={{ paddingLeft: '10px', paddingRight: '10px' }} className='interact-btn' id="button-addon2" onClick={(e) => handleSubmit(e)}>
                    <BsFillSendCheckFill /> Post
                </Button>
            </InputGroup>
            {showLinkBox && <Form.Check // prettier-ignore
                type='checkbox'
                id={`link-checkbox`}
                label={'Attach a link? - (Unchecking will delete your url link)'}
                style={{ fontSize: 'small', paddingLeft: '25px' }}
                name='addLink'
                onChange={(e) => {
                    setAddLink(!addLink);
                    if (e.target.checked === false) {
                        setUrlLink("")
                    }
                }}
            />}
            {addLink && <Form.Control
                className="mb-1"
                placeholder="Paste your link here"
                value={urlLink}
                aria-label="postextralink"
                aria-describedby="basic-addon1"
                style={{ fontSize: 'small', height: '1.5rem', paddingLeft: '10px', marginLeft: '3px' }}
                name='linkUrl'
                onChange={(e) => {
                    setUrlLink(e.target.value)
                }}
            />}
        </div>
    )
}

export default NewPost