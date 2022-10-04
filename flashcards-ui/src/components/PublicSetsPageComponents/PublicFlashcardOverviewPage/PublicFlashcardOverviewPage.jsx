import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFlashcardContext } from "../../../../contexts/flashcard";
import FlashcardOverviewPageContent from "../../FlashcardComponents/FlashcardOverviewPageContent/FlashcardOverviewPageContent";

export default function PublicFlashcardOverviewPage() {
    const { getAPublicSet } = useFlashcardContext();
    const { setId } = useParams();
    const [chosenSet, setChosenSet] = useState();

    useEffect(() => {
        const searchAPublicSet = async (setId) => {
            if (setId) {
                try {
                    const res = await getAPublicSet(setId);
                    setChosenSet(res.data.set);
                } catch (error) {
                    console.warn("The set is deleted or private");
                }
            }
        };
        searchAPublicSet(setId);
    }, []);

    return (
        <>
            {chosenSet ? (
                <FlashcardOverviewPageContent
                    chosenSet={chosenSet}
                    buttonText={""}
                    startStudyingNavigation="publicsets/studymode"
                    onButtonClick={() => {
                        console.error("send the user to the create page");
                        //"This should only be here for logged in users"
                    }}
                />
            ) : (
                <div />
            )}
        </>
    );
}
