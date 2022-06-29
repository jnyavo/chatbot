import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import Dashboard  from './dashbord';
import  Auth  from './components/Auth/Auth';

const App = () => {
  return (
    <>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_API}>
        <BrowserRouter>
            <CssBaseline />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </>
  );
};
export default App;
