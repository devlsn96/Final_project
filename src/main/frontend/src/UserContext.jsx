import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext({
    user: [],
    setUser: [],
    token: [],
    setToken: [],
    checkLoginStatus: () => { }
});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    // 세션 상태 확인
    function checkLoginStatus() {
        axios
            .get("http://localhost:9090/api/session", {
                withCredentials: true,
            })
            .then((response) => {
                if (response.status === 200) {
                    const { user: fetchedUser, accessToken } = response.data;
                    setUser({ ...fetchedUser, id: fetchedUser.userId });
                    setToken(accessToken || null);
                } else {
                    setUser(null);
                    setToken(null);
                }
            })
            .catch((error) => {
                console.error(
                    "세션 확인 실패:",
                    error?.response?.data?.message || error.message
                );
                setUser(null);
                setToken(null);
            })
        // .finally(() => {
        //     setLoading(false); // 로딩 완료
        // });
    };

    useEffect(() => {
        checkLoginStatus(); // 세션 상태 확인
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, token, setToken, checkLoginStatus }}>
            {children}
        </UserContext.Provider>
    );
};

