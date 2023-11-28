import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router'
import { logout, setCredentials } from '../features/AuthSlice';



const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]))
    } catch (e) {
        return null;
    }
}

const AuthVerify = () => {
    const { accessToken, isLoggedIn } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const location = useLocation()
    useEffect(() => {
        const token = window.localStorage.getItem("accessToken")
        if (accessToken === null && token !== null) {
            const username = window.localStorage.getItem('username')
            const userId = window.localStorage.getItem('userId')
            const avatarNumber = window.localStorage.getItem('avatarNumber')
            dispatch(setCredentials({ accessToken: token, userId, username, avatarNumber }))
        }

        if (accessToken) {
            const decoded = parseJwt(accessToken)
            if (decoded.exp * 1000 < Date.now()) {
                dispatch(logout())
            }
        }

    }, [location]);
    return;
}

export default AuthVerify