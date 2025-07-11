import React,{ createContext, useState} from "react";

interface UserContextType {
    user: any;
    updateUser: (userData: any) => void;
    clearUser: () => void;
}

export const UserContext = createContext<UserContextType>({
    user: null,
    updateUser: () => {},
    clearUser: () => {},
});

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const updateUser = (userData) => {
        setUser(userData);
    };
    const clearUser = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider
            value={{ user, updateUser, clearUser }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;