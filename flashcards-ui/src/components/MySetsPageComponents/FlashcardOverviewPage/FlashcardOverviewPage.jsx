import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFlashcardContext } from "../../../../contexts/flashcard.jsx";
import { useAuthContext } from "../../../../contexts/auth.jsx";
import FlashcardOverviewPageContent from "../../FlashcardComponents/FlashcardOverviewPageContent/FlashcardOverviewPageContent.jsx";

export default function FlashcardOverviewPage() {
    const navigate = useNavigate();
    const { mySets } = useFlashcardContext();
    const { setId } = useParams();
    const chosenSet = mySets.find((e) => e.id == setId);
    const { isLoading, isLoggedIn } = useAuthContext();

    //if the params setId doesn't exist in mySets send the user to the shadow realm
    useEffect(() => {
        if ((isLoading, isLoggedIn)) {
            if (!chosenSet || chosenSet == undefined) {
                console.error("sending you to the shadow realm");
                navigate("/notfound");
            }
        }
    }, []);

    //The return statement is written like this, because an undefined chosenSet would cause an error and stop the useEffect from running
    return (
        <>
            {chosenSet ? (
                <FlashcardOverviewPageContent
                    chosenSet={chosenSet}
                    buttonText=""
                    startStudyingNavigation="mysets/studymode"
                    onButtonClick={() => {
                        console.warn("set up update");
                    }}
                />
            ) : (
                <div />
            )}
        </>
    );
}
