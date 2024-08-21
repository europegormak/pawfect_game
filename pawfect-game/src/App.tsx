import { useState } from 'react';
import SceneComponent from './components/Scene/SceneComponent';
import DialogueBoxComponent from './components/DialogueBox/DialogueBoxComponent';
import ModalComponent from './components/Modal/ModalComponent';
import StoryBoxComponent from './components/Story/StoryBoxComponent';
import { SceneProps } from './models/SceneProps';

import scenesData from './dialogs.json';
import { DialogueType } from './models/DialogueType';
import { Dialogue } from './models/Dialogue';

function App() {
    const [scene, setScene] = useState<number>(0);
    const [currentDialogue, setCurrentDialogue] = useState<number>(0);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalMessage, setModalMessage] = useState<string>('');
    const [gameOver, setGameOver] = useState<boolean>(false);
    
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
        
        if (nextDialogue < scenes[scene].dialogue.length) {
            setCurrentDialogue(nextDialogue);
        } else {
            if (scene === scenes.length - 1) {
                setModalMessage('Congratulations! You have completed the game.');
                setModalOpen(true);
                // TODO This should be replaced with a separate state for game completion
                setGameOver(true);
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
            setModalMessage('Incorrect choice! The game is over.');
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
            <SceneComponent {...currentScene}>
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
                    <StoryBoxComponent text={currentDialogueData.text} onNext={handleNext}/>
                )}
            </SceneComponent>
            <ModalComponent isOpen={modalOpen} message={modalMessage} onClose={closeModal} />
        </div>
    );
}

export default App;
