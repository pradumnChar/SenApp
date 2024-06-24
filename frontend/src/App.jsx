import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import Sidebar from "./components/common/Sidebar";
import NotificationPage from "./pages/notification/NotificationPage";
import LoginPage from "./pages/auth/login/LoginPage";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import RightPanel from "./components/common/RightPanel";
import ProfilePage from "./pages/profile/ProfilePage.jsx";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import Loading from "./components/common/Loading.jsx";
function App() {
  //to fetch curr auth user
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if(data.error){
          return null;  
        }
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        console.log("Auth User", data);
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    retry:false,
  });
  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loading text="success" />
      </div>
    );
  }
  return (
    <div className="flex max-w-6xl mx-auto">
      { authUser && <Sidebar />}
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/notifications"
          element={authUser ? <NotificationPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile/:username"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>
      {authUser && <RightPanel />}
      <Toaster />
    </div>
  );
}
export default App;
