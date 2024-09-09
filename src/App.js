import { Route, Routes } from "react-router-dom";
import "./App.css";
import AdminRoute from "./pages/AdminRoute/AdminRoute";
import Dashboard from "./pages/Dashboard/Dashboard/Dashboard";
import DashboardHome from "./pages/Dashboard/DashboardHome";
import MakeAdmin from "./pages/Dashboard/MakeAdmin/MakeAdmin";
import Login from "./pages/Login/Login";
import PrivateRoute from "./pages/PrivateRoute/PrivateRoute";
import Register from "./pages/Register/Register";
import Header from "./pages/Shared/Header";

function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <DashboardHome />
                        </PrivateRoute>
                    }
                ></Route>
                <Route
                    path="/dashboard"
                    element={
                        <AdminRoute>
                            <Dashboard />
                        </AdminRoute>
                    }
                ></Route>
                <Route
                    path="/make-admin"
                    element={
                        <AdminRoute>
                            <MakeAdmin />
                        </AdminRoute>
                    }
                ></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
            </Routes>
        </div>
    );
}

export default App;
