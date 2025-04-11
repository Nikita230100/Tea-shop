import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./component/Layout";
import MainPage from "./component/pages/MainPage";
import LoginPage from "./component/pages/LoginPage";
import SignInPage from "./component/pages/SignInPage";
import  { axiosInstance, setAccessToken } from "./component/shared/lib/axiosInstance";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserState {
  status: "logging" | "logger" | "guest";
  data: User | null;
}

interface TokenRefreshResponse {
  accessToken: string;
  user: User;
}

function App() {
  const [user, setUser] = useState<UserState>({ status: "logging", data: null });

  const handleLogout = () => {
    axiosInstance
      .get("/auth/logout")
      .then(() => {
        setUser({ status: "guest", data: null });
        setAccessToken("");
      });
  };

  const refreshToken = () => {
    axiosInstance
      .get<TokenRefreshResponse>("/tokens/refresh")
      .then((response) => {
        const { data } = response;
        if (data?.user) {
          setTimeout(() => {
            setUser({ status: "logger", data: data.user });
          }, 1000);
          setAccessToken(data.accessToken);
        }
      })
      .catch(() => {
        setUser({ status: "guest", data: null });
        setAccessToken("");
      });
  };

  // Вызываем refreshToken при монтировании компонента
  useEffect(() => {
    refreshToken();
  }, []); // Пустой массив зависимостей означает, что эффект выполнится только при монтировании

  return (
    <Routes>
      <Route element={<Layout handleLogout={handleLogout} />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<LoginPage setUser={setUser} />} />
        <Route path="/signin" element={<SignInPage setUser={setUser} />} />
      </Route>
    </Routes>
  );
}

export default App;