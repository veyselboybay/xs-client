import React, { useState } from 'react'
import { TiTickOutline } from 'react-icons/ti'
import { GiCancel } from 'react-icons/gi'
import { useSelector } from 'react-redux'
import { AiFillDelete } from 'react-icons/ai'

const Comment = ({ deleteComment, comment }) => {
    const [showDeleteOptions, setShowDeleteOptions] = useState(false);
    const { accessToken, userId, username } = useSelector(state => state.auth);
    return (
        <div key={comment.comment._id} className='comments'>
            {showDeleteOptions !== true && <p className='deleteBtn' onClick={() => setShowDeleteOptions(!showDeleteOptions)}>{comment.comment.ownerId === userId && <AiFillDelete style={{ color: 'brown' }} />}</p>}
            {showDeleteOptions && <p className='deleteBtn'><TiTickOutline style={{ color: 'green' }} onClick={(e) => deleteComment(e, comment.comment._id)} /> || <GiCancel style={{ color: 'red' }} onClick={() => setShowDeleteOptions(!showDeleteOptions)} /></p>}
            <p><span className='user-name'>@{comment.username}</span> - <span>{comment.comment.text}</span></p>
        </div>
    )
}

export default Comment