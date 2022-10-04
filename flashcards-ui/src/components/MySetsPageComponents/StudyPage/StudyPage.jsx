import React, { useEffect } from "react";
import { useFlashcardContext } from "../../../../contexts/flashcard";
import { useNavigate, useParams } from "react-router-dom";
import StudyPageContent from "../../FlashcardComponents/StudyPageContent/StudyPageContent.jsx";
import { useAuthContext } from "../../../../contexts/auth";

export default function StudyPage() {
    const {
        showSettingsModal,
        setShowSettingsModal,
        defaultFlashcardState,
        setDefaultFlashcardState,
    } = useFlashcardContext();

    const { isLoading, isLoggedIn } = useAuthContext();

    const { setId } = useParams();
    const navigate = useNavigate();

    const { mySets } = useFlashcardContext();
    const chosenSet = mySets.find((e) => e.id == setId);

    useEffect(() => {
        if ((isLoading, isLoggedIn)) {
            if (!chosenSet || chosenSet == undefined) {
                console.error("sending you to the shadow realm");
                navigate("/notfound");
            }
        }
    }, []);

    return (
        <>
            {/* <Alert
                status="error"
                w={"50vw"}
                pos="fixed"
                top="0"
                right={"0"}
                zIndex="9"
                display={"none"}
            >
                <AlertIcon />
                <AlertTitle>Your browser is outdated!</AlertTitle>
                <AlertDescription>
                    Your Chakra experience may be degraded.
                </AlertDescription>
            </Alert> */}
            {chosenSet ? <StudyPageContent chosenSet={chosenSet} /> : <div />}
        </>
    );
}
