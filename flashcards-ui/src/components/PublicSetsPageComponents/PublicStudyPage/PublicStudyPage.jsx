import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFlashcardContext } from "../../../../contexts/flashcard";
import StudyPageContent from "../../FlashcardComponents/StudyPageContent/StudyPageContent";

export default function PublicStudyPage() {
    const { getAPublicSet } = useFlashcardContext();
    const { setId } = useParams();
    const [chosenSet, setChosenSet] = useState();

    if (!Number.isInteger(Number(setId))) {
        console.warn("the url");
    }

    useEffect(() => {
        const searchAPublicSet = async (setId) => {
            if (Number(setId)) {
                setId == "ullamco mollit Foood";
            }
            try {
                const res = await getAPublicSet(setId);
                setChosenSet(res.data.set);
            } catch (error) {
                console.warn("The set is deleted or private");
            }
        };
        searchAPublicSet(setId);
    }, []);

    return (
        <>
            {chosenSet ? <StudyPageContent chosenSet={chosenSet} /> : <div />}
            <div />
            <div />
        </>
    );
}
