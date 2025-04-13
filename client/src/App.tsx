import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./component/Layout";
import MainPage from "./component/pages/MainPage/MainPage";
import LoginPage from "./component/pages/LoginPage";
import SignInPage from "./component/pages/SignInPage";
import { axiosInstance, setAccessToken } from "./component/shared/lib/axiosInstance";
import BasicExample from "./component/utils/Spinner";
import AuthRoute from "./component/utils/AuthRoute";
import OneTeaCard from "./component/ui/OneTeaCard/OneTeaCard";
import ProtectedRoute from "./component/utils/ProtectedRoute";
import LkPage from "./component/ui/LkPage/LkPage";
import EditTeaForm from "./component/ui/AddTeaCard/EditTeaForm";
import CartPage from "./component/pages/CartPage/CartPage";
import RecommendPage from "./component/pages/RecommendPage/RecommendPage";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserState {
  status: "logging" | "logged" | "guest";
  data: {
    id?: number;
    name?: string;
    email?: string;
  } | null;
}

interface TokenRefreshResponse {
  accessToken: string;
  user: User;
}

function App() {
  const [user, setUser] = useState<UserState>({ status: "logging", data: null });
  const [isLoading, setIsLoading] = useState(true); // Добавляем состояние загрузки
  const [teas, setTeas] = useState([]);
  const handleLogout = () => {
    setIsLoading(true);
    axiosInstance
      .get("/auth/logout")
      .then(() => {
        setUser({ status: "guest", data: null });
        setAccessToken("");
      })
      .finally(() => setIsLoading(false));
  };

  const refreshToken = () => {
    setIsLoading(true);
    axiosInstance
      .get<TokenRefreshResponse>("/tokens/refresh")
      .then((response) => {
        const { data } = response;
        if (data?.user) {
          setTimeout(() => {
            setUser({ status: "logged", data: data.user });
          }, 1000);
          setAccessToken(data.accessToken);
        }
      })
      .catch(() => {
        setUser({ status: "guest", data: null });
        setAccessToken("");
      })
      .finally(() => setIsLoading(false)); // Выключаем спиннер после завершения
  };

  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <BasicExample isLoading={isLoading}>
      <Routes>
      <Route element={<Layout user={user} handleLogout={handleLogout} />}>
      <Route path="/" element={<MainPage user={user} />} />
          <Route
            path="/signup"
            element={
              <AuthRoute user={user} redirectTo="/">
                <LoginPage setUser={setUser} />
              </AuthRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <AuthRoute user={user} redirectTo="/">
                <SignInPage setUser={setUser} />
              </AuthRoute>
            }
          />
           <Route 
  path='/:id' 
  element={
    <ProtectedRoute 
    user={user}
      redirectTo="/signin" 
    >
      <OneTeaCard  user={user}/>
    </ProtectedRoute>
  } 
/> 
<Route 
      path="/lk" 
      element={
        <ProtectedRoute user={user} redirectTo="/signin">
          <LkPage user={user} setTeas={setTeas}/>
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/cart" 
      element={
        <ProtectedRoute user={user} redirectTo="/signin">
          <CartPage user={user} />
        </ProtectedRoute>
      } 
    />
     <Route 
      path="/recommend" 
      element={
        <ProtectedRoute user={user} redirectTo="/signin">
          <RecommendPage user={user} />
        </ProtectedRoute>
      } 
    />
    <Route 
  path="/edit-tea/:id"
  element={
    <ProtectedRoute user={user} redirectTo="/signin">
      <EditTeaForm user={user} setTeas={setTeas} />
    </ProtectedRoute>
  }
/>
        </Route>
        
    
      </Routes>
    </BasicExample>
  );
}

export default App;




























