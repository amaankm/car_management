// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Car from "./pages/Car";
import AddNewCar from "./pages/AddNewCar";
import Signup from "./pages/Signup";
import { useQuery } from "@tanstack/react-query";
import NavBar from "./components/NavBar";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.error) return null;

        if (!res.ok) throw new Error(data.error || "Something went wrong");

        console.log(data);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      {authUser && <NavBar />}
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/cars/:id"
          element={authUser ? <Car /> : <Navigate to="/" />}
        />
        <Route
          path="/cars/new"
          element={authUser ? <AddNewCar /> : <Navigate to="/" />}
        />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
