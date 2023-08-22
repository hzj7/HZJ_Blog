import { createContext, useEffect, useState } from "react";
import { login as loginApi, logout as logoutApi } from "../utils/api/users/index.js";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

export const UserContext = createContext(null);

export const UserContextProvider = (({ children }) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const login = (inputs) => {
        return loginApi(inputs).then(res => {
            if (res.code === 200) {
                setCurrentUser(res?.data)
            } else {
                message.error(res?.msg)
            }
            return res
        })

    }

    const logout = (inputs) => {
        logoutApi().then(res => {
            if (res.code === 200) {
                message.success(res?.msg)
                setCurrentUser(null)
            } else {
                message.error(res?.msg)
            }
        })
    }

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(currentUser))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser]);

    return (
        <UserContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </UserContext.Provider>
    )
})