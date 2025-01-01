import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const base_url = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${base_url}/api/validate`, {
          withCredentials: true,
        });
        const userInfo = response?.data?.payload;
        console.log('User ka info: ', userInfo);
        setCurrentUser(userInfo);
      } catch (error) {
        console.error("Error fetching user info, please re-login.", error);
        toast.error(error.message);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser()
  }, [base_url]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, loading, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
