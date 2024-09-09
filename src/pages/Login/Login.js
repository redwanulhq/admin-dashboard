import React, { useState } from "react";
import "./Login.css";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import img from "../../assets/images/login.jpg";
import useAuth from "../../hooks/useAuth";

const Login = () => {
    const [error, setError] = useState("");
    const { setUser, loginWithEmailPassword, setIsLoading, auth } = useAuth();
    const location = useLocation();
    let navigate = useNavigate();
    const redirectURI = location.state?.from || "/";
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        // e.preventDefault();
        setIsLoading(true);
        const email = data.email;
        const password = data.password;
        loginWithEmailPassword(auth, email, password)
            .then((result) => {
                const user = result.user;
                setUser(user);
                navigate(redirectURI);
                setError("");
                console.log(user);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => setIsLoading(false));
    };
    console.log(errors);
    return (
        <div className="login">
            <div className="container">
                <div className="form-container">
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h1 className="form-title">Login</h1>
                            <input
                                type="email"
                                placeholder="email"
                                {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                            />
                            <input type="password" placeholder="password" {...register("password", {})} />
                            <p style={{ paddingBottom: "15px", color: "red" }}>{error}</p>
                            <input type="submit" value="Login" />
                        </form>
                        <p>
                            Don’t have an account yet? <Link to="/register">register</Link>
                        </p>
                    </div>
                </div>
                <div className="login-img">
                    <img src={img} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Login;
