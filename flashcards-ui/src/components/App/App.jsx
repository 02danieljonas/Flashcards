import Navbar from "../Navbar/Navbar";
import Landing from "../Landing/Landing";
import MySetsPage from "../MySetsPageComponents/MySetsPages.jsx";
import CreateSetPage from "../CreateSetPageComponents/CreateSetPage/CreateSetPage.jsx";
import * as React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../LoginPage/LoginPage";
import PublicSetsPages from "../PublicSetsPageComponents/PublicSetsPages.jsx";
import RegistrationPage from "../RegistrationPage/RegistrationPage";
import NotFound from "../NotFound/NotFound";
import apiClient from "../../../services/apiClient";
import { AuthContextProvider, useAuthContext } from "../../../contexts/auth";
import { FlashcardContextProvider } from "../../../contexts/flashcard.jsx";
import { useEffect } from "react";

export default function AppContainer() {
    return (
        <AuthContextProvider>
            <FlashcardContextProvider>
                <App />
            </FlashcardContextProvider>
        </AuthContextProvider>
    );
}

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegistrationPage />} />
                    <Route path="/create" element={<CreateSetPage />} />
                    <Route path="/mysets/*" element={<MySetsPage />} />
                    <Route path="/publicsets/*" element={<PublicSetsPages />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
