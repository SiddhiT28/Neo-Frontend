import axios from 'axios'
import React, { useEffect } from 'react'
import { devAPI } from '../API/constant'


export const AuthContext = React.createContext({
    isAuthenticated: false,

    login: () => { },
    logout: () => { },
})

function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false)
    const [user, setUser] = React.useState({})


    const login = (user) => {
        setIsAuthenticated(true)
        setUser(user)
    }

    const logout = () => {
        setIsAuthenticated(false)
        setUser({})
        sessionStorage.removeItem('user')
    }

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user'))
        if (user) {
            console.log(">>>AuthContext LOG", user)
            axios.post(`${devAPI}/api/user/update`, {
                id: user.id,
            })
                .then((res) => {
                    console.log(">>>AuthContext LOG", res.data)
                    setUser(res.data)
                    setIsAuthenticated(true)
                }).catch((err) => {
                    console.log(">>>AuthContext LOG", err)
                })
        }
    }, [])

    const updateUser = () => {
        if (isAuthenticated) {
            axios.post(`${devAPI}/api/user/update`, {
                id: user.id,
            })
                .then((res) => {
                    setUser(res.data)
                })
        }
    }

    return (

        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login, logout, user, updateUser }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => React.useContext(AuthContext)

export { AuthProvider, useAuth }
