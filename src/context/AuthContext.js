import React, { createContext, useState, useEffect } from 'react';
import { USER_PROFILE, ROLE_LIST } from "../scripts/api";
import { postData } from '../scripts/api-service';

export const authContext = createContext();

const AuthContext = props => {
    const [user, setUser] = useState();
    const [permissions, setPermissions] = useState();

    useEffect(() => {
        setUser();
    }, []);

    const setUserInfo = async () => {
        let res = await postData(USER_PROFILE, {});
        if (res) {
            let masterData = res?.data?.data;
            setUser(masterData);
            setPermissions(masterData?.roles[0].permissions);
        }
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
