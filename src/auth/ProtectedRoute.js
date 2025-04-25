import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {isAuthenticated} from './TokenVerify';

const ProtectedRoute = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const Navigate =useNavigate();

    const checkUserToken = () => {
        const value = isAuthenticated();
        if (!value) {
            setIsLoggedIn(false);
            return Navigate('/');
        }else{
            setIsLoggedIn(true);
        }
    }
    useEffect(() => {
        checkUserToken();
    },[Navigate]);

    return (
        <React.Fragment>
            {
                isLoggedIn ? props.children : null
            }
        </React.Fragment>
    )
};

export default ProtectedRoute;