import {createContext, useContext, useEffect, useState} from "react";
import {toast} from "sonner";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (token) fetchUser();
    }, [token]);

    useEffect(() => {
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
            setUser(null);
        }
    }, [token]);

    const login = async (email, password) => {
        setLoading(true);

        try {
            const res = await fetch("http://localhost:5000/api/v1/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password})
            });

            if (!res.ok) throw new Error("Błędny login lub hasło");

            const data = await res.json();
            localStorage.setItem("token", data.token);
            setToken(data.token);

            await fetchUser(data.token);
            toast("Logged in successfully.", {type: "success"});

        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);

    };

    const fetchUser = async (authToken = token) => {
        setLoading(true);
        if (!authToken) return;
        try {
            const res = await fetch("http://localhost:5000/api/v1/user/me", {
                headers: {Authorization: `Bearer ${authToken}`}
            });

            if (!res.ok) throw new Error("Błąd autoryzacji");

            const data = await res.json();
            setUser(data);

        } catch (error) {
            console.error("Failed to fetch user data:", error);
            logout(); // token niepoprawny
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{token, user, login, logout, loading, isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);