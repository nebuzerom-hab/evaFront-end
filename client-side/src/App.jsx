import React, { useEffect, useState, createContext } from "react";
import Routing from "./Routing";
export const appState = createContext();
import axiosInstance from "./api/axios";
import { useNavigate } from "react-router";
function App() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  async function checkUser() {
    try {
      const { data } = await axiosInstance.get("/users/checkUser", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(data);
      setUser(data);
    } catch (error) {
      console.error("Error checking user:", error);
      navigate("/"); // Redirect to login on error
    }
  }
  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      <appState.Provider value={{ user, setUser, token }}>
        <Routing />
      </appState.Provider>
    </>
  );
}

export default App;
