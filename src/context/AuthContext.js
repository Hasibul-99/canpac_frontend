import React, { createContext, useState, useEffect } from 'react';
import { USER_PROFILE } from "../scripts/api";
import { postData } from '../scripts/api-service';

export const authContext = createContext();

const AuthContext = props => {
    const [user, setUser] = useState();

    useEffect(() => {
        setUser();

        console.log("props", props);
    }, []);

    const setUserInfo = async () => {
        let res = await postData(USER_PROFILE, {});

        console.log("ressss", res);
        setUser(res?.data?.data);
    }

    const getUserInfo = () => {
        return user;
    }

    return (
        <authContext.Provider
            value={{
                user,
                setUserInfo,
                getUserInfo
            }}>
            {props.children}
        </authContext.Provider>
    )
}

export default AuthContext;
