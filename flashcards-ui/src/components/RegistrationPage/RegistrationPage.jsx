import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../contexts/auth";
import RegistrationForm from "./RegistrationForm";
import { useEffect } from "react";

export default function RegistrationPage() {
    const { isLoading, isLoggedIn } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && isLoggedIn) {
            navigate("/");
        }
    }, [isLoading, isLoggedIn]);

    return (
        <div className="registration-page">
            <RegistrationForm />
        </div>
    );
}
