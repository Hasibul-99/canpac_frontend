import React, { createContext, useState, useEffect } from 'react';
import { USER_PROFILE, ROLE_LIST } from "../scripts/api";
import { postData } from '../scripts/api-service';

export const authContext = createContext();

const AuthContext = props => {
    const [user, setUser] = useState();
    const [permissions, setPermissions] = useState();

    useEffect(() => {
        setUser();
        getPermissions();
    }, []);

    const getPermissions = async () => {
        let res = await postData(ROLE_LIST, {})

        if (res) setPermissions(res.data.data[5].permissions);
    }

    const setUserInfo = async () => {
        let res = await postData(USER_PROFILE, {});
        setUser(res?.data?.data);
    }

    const getUserInfo = () => {
        return user;
    }

    const DeleteUserInfo = () => {
        setUser(null);
    }

    return (
        <authContext.Provider
            value={{
                user,
                setUserInfo,
                getUserInfo,
                DeleteUserInfo,
                permissions
            }}>
            {props.children}
        </authContext.Provider>
    )
}

export default AuthContext;
