import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const DashboardHome = () => {
    const [admin, setAdmin] = useState();
    const { user } = useAuth();
    useEffect(() => {
        fetch(`https://rocky-dawn-74128.herokuapp.com/users/${user.email}`)
            .then((res) => res.json())
            .then((data) => setAdmin(data.admin));
    }, [user.email]);
    console.log(user);
    return (
        <div className="container dashboard-home">
            <img src={user.photoURL} alt="" style={{ width: "150px" }} />
            <h1>welcome {user.displayName}</h1>
            {!admin ? (
                <h3>Please login with Admin Email for access Dashboard !</h3>
            ) : (
                <Link to="/dashboard">Go to dashboard</Link>
            )}
        </div>
    );
};

export default DashboardHome;
