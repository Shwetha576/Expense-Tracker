import{ useNavigate } from "react-router-dom";
import React from "react";
import { UserContext } from "../context/UserContext";
import  axiosInstance  from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const useUserAuth = () => {
    const {user, updateUser, clearUser} = React.useContext(UserContext);
    const navigate = useNavigate();

    React.useEffect(() => {
        if(user) return;

        let isMounted = true;

        const fetchUserInfo = async () => {
            try{
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);

                if(isMounted && response.status) {
                    updateUser(response.data);
                }
            }
            catch(error){
                console.error("Failed to fetch user info:", error);
                if(isMounted) {
                    clearUser();
                    navigate("/login");
                }
            }
        };

        fetchUserInfo();
        return () => {
            isMounted = false;
        };
    }, [user, updateUser, clearUser, navigate]);
}
