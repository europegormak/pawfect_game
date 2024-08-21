import React, { useState } from 'react';
import Scene from './components/Scene/Scene';
import DialogueBox from './components/DialogueBox/DialogueBox';
import Modal from './components/Modal/Modal';
import { SceneProps } from './models/SceneProps';

import scenesData from './assets/dialogs.json';

// Importing images
import ForestEdge from './assets/images/forest-edge.jpg';
import MysteriousClearing from './assets/images/mysterious-clearing.jpg';
import ShrekImage from './assets/images/shrek.png';
import DonkeyImage from './assets/images/donkey.png';

function App() {
  const [scene, setScene] = useState<number>(0);
  const [currentDialogue, setCurrentDialogue] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [gameOver, setGameOver] = useState<boolean>(false);

  // TODO Replace hardcoded conditions wiht dynamic conditions
  // Map the JSON data to SceneProps[]
  const scenes: SceneProps[] = scenesData.scenes.map(scene => ({
    ...scene,
    background: scene.background === 'forest-edge.jpg' ? ForestEdge : MysteriousClearing,
    characters: scene.characters.map(character => ({
      ...character,
      sprite: character.sprite === 'donkey.png' ? DonkeyImage : ShrekImage,
    })),
  }));

  function handleNext() {
    const nextDialogue = currentDialogue + 1;
    if (nextDialogue < scenes[scene].dialogue.length) {
      setCurrentDialogue(nextDialogue);
    } else {
      setScene(scene + 1);
      setCurrentDialogue(0);
    }
  }

  function handleChoice(value: string, correct: boolean) {
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
      <Scene {...currentScene}>
        {!gameOver && (
          <DialogueBox
            speaker={currentDialogueData.speaker}
            text={currentDialogueData.text}
            onNext={handleNext}
            hasChoices={hasChoices}
            choices={currentDialogueData.choices}
            question={currentDialogueData.question}
            onSelect={handleChoice}
          />
        )}
      </Scene>
      <Modal isOpen={modalOpen} message={modalMessage} onClose={closeModal} />
    </div>
  );
}

export default App;
