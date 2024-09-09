import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/images/login.jpg";
import useAuth from "../../hooks/useAuth";

const Register = () => {
    const [error, setError] = useState("");
    const { createAccountWithEmailPassword, auth, setUser, updateProfile, logOut } = useAuth();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;
        const name = data.name;
        if (password.length < 6) {
            setError("Password should be at least 6 characters long");
            return;
        }
        createAccountWithEmailPassword(auth, email, password)
            .then((result) => {
                // Create user in database
                //
                const setUserName = () => {
                    updateProfile(auth.currentUser, {
                        displayName: name,
                        photoURL: `https://avatars.dicebear.com/api/miniavs/${name}.svg?b=%231082ff&r=50&size=200&scale=80`,
                    }).then((result) => {});
                };
                setUserName();
                const saveUser = (displayName, email) => {
                    const user = { displayName, email };
                    fetch("https://rocky-dawn-74128.herokuapp.com/users", {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                        },
                        body: JSON.stringify(user),
                    })
                        .then((res) => res.json())
                        .then((result) => {
                            console.log(result);
                        });
                };
                saveUser(name, email);
                // Create user in database finish

                setError("");
                setUser("");
                logOut();
                alert("Account created successfuly");
                navigate("/login");
                reset();
            })
            .catch((error) => {
                setError(error.message);
            });
    };
    return (
        <div className="register">
            <div className="container">
                <div className="form-container">
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h1 className="form-title">Register</h1>
                            <input type="text" placeholder="Full Name" {...register("name", { required: true })} />
                            <input
                                type="email"
                                placeholder="Email Address"
                                {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                            />
                            <input type="password" placeholder="Password" {...register("password", {})} />
                            <p style={{ paddingBottom: "15px", color: "red" }}>{error}</p>
                            <input type="submit" value="Register" />
                        </form>
                        <p>
                            Already have an account? <Link to="/login">login</Link>
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

export default Register;
