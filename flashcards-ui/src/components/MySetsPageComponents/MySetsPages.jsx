import React, { useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import MySetsOverview from "./MySetsOverview/MySetsOverview.jsx";
import UpdateMySetPage from "./UpdateMySetPage/UpdateMySetPage.jsx";
import FlashcardOverviewPage from "./FlashcardOverviewPage/FlashcardOverviewPage.jsx";
import StudyPage from "./StudyPage/StudyPage.jsx";
import NotFound from "../NotFound/NotFound";
import { useAuthContext } from "../../../contexts/auth";
import {
    Checkbox,
    Container,
    HStack,
    Text,
    Box,
    Button,
    Divider,
    StackDivider,
} from "@chakra-ui/react";

export default function MySetsPage() {
    const { isLoading, isLoggedIn } = useAuthContext();
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (!isLoading) {
    //         return;
    //     } else {
    //         if (!isLoggedIn) {
    //             navigate("/");
    //         }
    //     }
    // }, [isLoggedIn]);

    return (
        <Box className="mysets-page" pb={100}>
            <Routes>
                <Route path="/" element={<MySetsOverview />} />
                <Route path="/:setId" element={<FlashcardOverviewPage />} />
                <Route path="/update/:setId" element={<UpdateMySetPage />} />
                <Route path="/studymode/:setId" element={<StudyPage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Box>
    );
}
