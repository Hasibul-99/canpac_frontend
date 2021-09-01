import React, { createContext, useState, useEffect } from 'react'

export const authContext = createContext();

const AuthContext = props => {
    const [user, setUser] = useState();

    useEffect(() => {
        setUser();
    }, []);

    const setUserInfo = () => {
        console.log("hello");
    }

    return (
        <authContext.Provider>
            value={{
                user,
                setUserInfo,
            }}
        </authContext.Provider>
    )
}

export default AuthContext;
