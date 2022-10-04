import React from "react";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "./NavLinks.css";

export default function NavLinks({ isLoggedIn }) {
    const navigate = useNavigate();
    return (
        <>
            <Button
                variant="ghost"
                size="lg"
                fontSize={{ base: "2xl" }}

                onClick={() => {
                    isLoggedIn ? navigate("/mysets") : navigate("/login");
                }}
            >
                {isLoggedIn ? "My Sets" : "Login"}
            </Button>
            <Button
                variant="ghost"
                size="lg"
                fontSize={{ base: "2xl" }}
                onClick={() => {
                    isLoggedIn ? navigate("/create") : navigate("/register");
                }}
            >
                {isLoggedIn ? "Create" : "Register"}
            </Button>
        </>
    );
}
