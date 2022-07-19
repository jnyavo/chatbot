import React, { createContext, useContext, useState } from "react";
import * as api from "../api/index";


const StateContext = createContext();
const initialState = {
  chat: false,
  cart: false,
  useProfile: false,
  notification: false,
  chatbot: false,
};

export const ContextProvider = ({ children }) => {

  const [planing, setPlaning] = useState([]);
  const [notification, setNotification] = useState([]);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);
  const [chatbot, setChatbot] = useState(false);
  const handleClick = (clicked) => {
    setIsClicked({ ...initialState, [clicked]: !isClicked[clicked] });
  };
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState("#03C9D7");
  const [currentMode, setCurrentMode] = useState("Light");
  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem("themeMode", e.target.value);
    setThemeSettings(false);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem("colorMode", color);
    setThemeSettings(false);
  };
  const [themeSettings, setThemeSettings] = useState(false);
  const [user, setUser] = useState(null);
  const setLocalUser = async (e) => {
    try {
      const plan = await api.createPlaning({
        email: e.result.email,
        planing: [],
      });
      setPlaning(plan);
      await localStorage.setItem("profile", JSON.stringify(e));
      setUser(e);
    } catch (e) {
      console.log(e);
    }
  };
  const logout = () => {
    localStorage.clear();
    
  };

  return (
    <StateContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        isClicked,
        setIsClicked,
        handleClick,
        screenSize,
        setScreenSize,
        currentColor,
        currentMode,
        setCurrentColor,
        setCurrentMode,
        themeSettings,
        setThemeSettings,
        setMode,
        setColor,
        chatbot,
        setChatbot,
        user,
        setUser,
        setLocalUser,
        planing,
        setPlaning,
        logout
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
