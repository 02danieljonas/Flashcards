import React from "react";
import { useParams } from "react-router-dom";
import { useFlashcardContext } from "../../../../../contexts/flashcard";
import "./ModalSettings.css";

export default function ModalSettings({}) {
    const {
        showSettingsModal,
        setShowSettingsModal,
        setDefaultFlashcardState,
        defaultFlashcardState
    } = useFlashcardContext();
    return (
        <div
            className={`settings-modal container ${
                showSettingsModal ? "" : "hidden"
            }`}
        >
            <div
                className="overlay"
                onClick={() => {
                    setShowSettingsModal(!showSettingsModal);
                }}
            ></div>
            <div className="settings-box">
                Time: <br /> System:
                <form>
                    <label htmlFor="flipping-mode">
                        Choose a flipping mode:
                    </label>
                    <select
                        className="flipping-mode"
                        name="flipping-mode"

                        onChange={(e) => {
                            e.preventDefault
                            //setDefaultFlashcardState
                            if (e.target.value == "normal") {
                                setDefaultFlashcardState(true);
                            } else if (e.target.value == "inverse") {
                                setDefaultFlashcardState(false);
                            } else if (e.target.value == "random") {
                                setDefaultFlashcardState(null);
                            }
                        }}
                    >
                        <option value="normal">Normal</option>
                        <option value="inverse">Inverse</option>
                        <option value="random">Random</option>
                    </select>
                    {/* <input type="submit" onSubmit={e=>{
                        e.preventDefault
                    }}/> */}
                    <button className="submit-button-setting">submit</button>
                </form>
            </div>
        </div>
    );
}