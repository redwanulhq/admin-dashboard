import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Header = () => {
    const { user, logOut, admin } = useAuth();
    return (
        <header>
            <div className="container">
                <div className="logo">
                    <Link to="/">Admin Dashboard</Link>
                </div>
                <div>
                    {user.email ? (
                        <div>
                            {admin && (
                                <Link style={{ marginRight: "20px" }} to="/make-admin">
                                    Make Admin
                                </Link>
                            )}
                            <Link to="/login">
                                <button onClick={logOut} className="header-login-btn">
                                    Log out
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <Link to="/login">
                            <button className="header-login-btn">Login</button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
