import React, { useState } from 'react';
import SceneComponent from './components/Scene/SceneComponent';
import DialogueBoxComponent from './components/DialogueBox/DialogueBoxComponent';
import ModalComponent from './components/Modal/ModalComponent';
import StoryBoxComponent from './components/Story/StoryBoxComponent';
import { SceneProps } from './models/SceneProps';

import scenesData from './dialogs.json';
import { DialogueType } from './models/DialogueType';
import { Dialogue } from './models/Dialogue';

import Logo from './assets/logo.png'; 

function App() {
    const [scene, setScene] = useState<number>(0);
    const [currentDialogue, setCurrentDialogue] = useState<number>(0);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalMessage, setModalMessage] = useState<JSX.Element | null>(null);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [isSuccessful, setSetSuccessful] = useState<boolean>(false);
    
    function convertDialogueType(dialogue: Dialogue): Dialogue {
        return {
            ...dialogue,
            type: dialogue.type === 'dialogue' ? DialogueType.DIALOGUE : DialogueType.STORY,
        };
    }

    // Map the JSON data to SceneProps[]
    const scenes: SceneProps[] = scenesData.scenes.map((scene: any) => ({
        ...scene,
        dialogue: scene.dialogue.map(convertDialogueType), // Convert dialogue types here
    }));

    function handleNext() {
        const nextDialogue = currentDialogue + 1;
        
        if (nextDialogue < currentScene.dialogue.length) {
            setCurrentDialogue(nextDialogue);
        } else {
            if (scene === scenes.length - 1) {
                setModalMessage(
                    <div>
                        <br></br>
                        <img src={Logo} alt="Game Logo" style={{ width: '100px', marginBottom: '20px' }} />
                        <h2>Congratulations!</h2>
                        <p>You have successfully completed the game.</p>
                        <p>
                            Check out how our insurance can help you in situation like this, visit our website: <a href="https://mans.if.lv/lv/pets/?gad_source=1&gclid=Cj0KCQjww5u2BhDeARIsALBuLnN_uux5p1kGEmDS_nl6wnbQ82NuW5NmrMXlabGkX2BVtZNcOJHLTYoaAvovEALw_wcB" target="_blank" rel="noopener noreferrer">If Pet insurance</a>
                            <br></br>
                            Promo code for our pet insurance: HAPPYPAWS
                        </p>
                    </div>
                );
                setModalOpen(true);
                setGameOver(true);
                setSetSuccessful(true);
            } else {
                setScene(scene + 1);
                setCurrentDialogue(0);
            }
        }
    }
    
    function handleChoice(correct: boolean) {
        if (correct) {
            handleNext();
        } else {
            setModalMessage(<p>Incorrect choice! The game is over.</p>);
            setModalOpen(true);
            setGameOver(true);
        }
    }
    
    function closeModal() {
        setModalOpen(false);
        
        if (gameOver) {
            setScene(0); // Reset to the first scene
            setCurrentDialogue(0);
            setGameOver(false);
        }
    }
    
    const currentScene = scenes[scene];
    const currentDialogueData = currentScene.dialogue[currentDialogue];
    const hasChoices = Boolean(currentDialogueData.choices);
    
    return (
        <div>
            <SceneComponent {...currentScene} currentDialogueType={currentDialogueData.type}>
                {!gameOver && currentDialogueData.type === DialogueType.DIALOGUE && (
                    <DialogueBoxComponent
                        speaker={currentDialogueData.speaker}
                        text={currentDialogueData.text}
                        onNext={handleNext}
                        hasChoices={hasChoices}
                        choices={currentDialogueData.choices}
                        question={currentDialogueData.question}
                        onSelect={handleChoice}
                    />
                )}
                {!gameOver && currentDialogueData.type === DialogueType.STORY && (
                    <StoryBoxComponent
                        text={currentDialogueData.text}
                        onNext={handleNext}
                        hasChoices={hasChoices}
                        choices={currentDialogueData.choices}
                        question={currentDialogueData.question}
                        onSelect={handleChoice}
                    />
                )}
            </SceneComponent>
            <ModalComponent 
                isSuccessful={isSuccessful} 
                isOpen={modalOpen} 
                message={modalMessage!} 
                onClose={closeModal} 
            />
        </div>
    );
}

export default App;
