import * as React from "react";
import { useEffect } from "react";
// import "./LoginPage.css";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../contexts/auth";
// import
export default function LoginPage() {
    const { isLoading, isLoggedIn } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && isLoggedIn) {
            navigate("/");
        }
    }, [isLoading, isLoggedIn]);

    return (
        <div className="login-page">
            <LoginForm />
        </div>
    );
}
