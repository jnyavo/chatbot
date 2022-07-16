import React, { useEffect } from "react";
import { Outlet } from "react-router";
import { FiSettings, FiMessageSquare } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useAlert } from "react-alert";

import "react-chatbot-kit/build/main.css";
import "./App.css";
import ChatContainer from "./components/chatContainer";

import { useStateContext } from "./contexts/ContextProvider";

import { Navbar, Footer, Sidebar, ThemeSettings } from "./components";

const DashboardLayout = () => {
  const {
    activeMenu,
    themeSettings,
    setThemeSettings,
    currentMode,
    chatbot,
    setChatbot,
    socket,
    user
  } = useStateContext();
  const alert = useAlert();

  useEffect(() => {

    socket.auth = {token:user.token}
    socket.on("connect", () => {
      alert.show("Connected to Igea", {
        type: "success",
      });
    });

    socket.on("connect_error", (error) => {
      alert.show(`Connection Error: ${error}`, { type: "error" });
    });

    socket.on("disconnect", () => {
      alert.info("Disconnected");
    });

    socket.connect();
  }, []);

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <div className="flex relative dark:bg-main-dark-bg">
        {/* Floating button */}
        <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
          <div className="flex flex-row-reverse">
            <div>
              <TooltipComponent content="Settings" position="Top">
                <button
                  type="button"
                  className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
                  style={{ borderRadius: "50%" }}
                  onClick={() => setThemeSettings(true)}
                >
                  <FiSettings />
                </button>
              </TooltipComponent>
              <TooltipComponent content="Igea" position="Top">
                <button
                  type="button"
                  className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
                  style={{ borderRadius: "50%" }}
                  onClick={() => setChatbot((prev) => !prev)}
                >
                  <FiMessageSquare />
                </button>
              </TooltipComponent>
            </div>

            {chatbot && <ChatContainer />}
          </div>
        </div>

        {/* Sidebar */}
        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}

        <div
          className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${
            activeMenu ? "md:ml-72" : "flex-2"
          }`}
        >
          {/* Navbar */}
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
            <Navbar />
            {/* <ChatContainer /> */}
          </div>

          <div>
            {themeSettings && <ThemeSettings />}

            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
