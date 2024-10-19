import { createContext, ReactNode, useContext, useState } from "react"

interface User {
    email: string
    password: string
}

interface IAuthContext {
    user: User | null
    users: User[]
    login: (email: string, password: string) => void
    signUp: (email: string, password: string) => void
    logout: () => void
    isAuthenticated: boolean
}

const AuthContext = createContext<IAuthContext | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [users, setUsers] = useState<User[]>([])

    const login = (email: string, password: string) => {
        const foundUser = users.find(u => u.email === email && u.password === password)
        if (foundUser) {
            setUser(user)
            console.log('AuthProvider :: login - usuário logado com sucesso')
        } else {
            console.log('AuthProvider :: login - usuário não encontrado')
        }
    }

    const signUp = (email: string, password: string) => {
        setUsers([...users, { email, password }])
    }

    const logout = () => {
        setUser(null)
    }

    const isAuthenticated = !!user

    return <AuthContext.Provider value={{
        user,
        users,
        login,
        signUp,
        logout,
        isAuthenticated
    }}> 
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('contexto não encontado, useAuth deve estar dentro de AuthProvider')
    }
    return context
}