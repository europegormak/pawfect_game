import React, { useState } from 'react';
import Scene from './components/Scene/Scene';
import DialogueBox from './components/DialogueBox/DialogueBox';
import Choice from './components/Choice/Choice';
import Modal from './components/Modal/Modal';
import { SceneProps } from './models/SceneProps';

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

  const scenes: SceneProps[] = [
    {
      background: ForestEdge,
      characters: [
        { name: 'Donkey', sprite: DonkeyImage, position: { left: '10%' } },
        { name: 'Shrek', sprite: ShrekImage, position: { right: '10%' } },
      ],
      dialogue: [
        {
          speaker: 'Donkey',
          text: 'Shrek, look at this! The forest is even more beautiful than I imagined!',
        },
        {
          speaker: 'Shrek',
          text: 'It sure is... but don’t you think we should be careful? We don’t know what’s in there.',
        },
        {
          speaker: 'Donkey',
          text: 'Come on, where’s your sense of adventure? We’ll be fine! Let’s explore a little.',
        },
        {
          speaker: 'Shrek',
          text: 'Alright, but let’s not stray too far from the path, okay?',
          question: 'Should they stray from the path?',
          choices: [
            { text: 'Stay on the path', value: 'stay_on_path', correct: true },
            { text: 'Explore further', value: 'explore_further', correct: false },
          ],
        },
        {
          speaker: 'Donkey',
          text: 'Deal! Let’s go.',
        },
      ],
    },
    {
      background: MysteriousClearing,
      characters: [
        { name: 'Donkey', sprite: DonkeyImage, position: { left: '10%' } },
        { name: 'Shrek', sprite: ShrekImage, position: { right: '10%' } },
      ],
      dialogue: [
        {
          speaker: 'Donkey',
          text: 'Wow... Shrek, do you see that? What do you think this stone is?',
        },
        {
          speaker: 'Shrek',
          text: 'I have no idea, but it looks ancient. We should be careful.',
          question: 'What should they do?',
          choices: [
            { text: 'Examine the stone', value: 'examine_stone', correct: false },
            { text: 'Leave the clearing', value: 'leave_clearing', correct: true },
          ],
        },
      ],
    },
  ];

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
      setModalMessage('You made the right choice! Moving on...');
      setModalOpen(true);
      setTimeout(() => {
        setModalOpen(false);
        handleNext();
      }, 2000); // Wait 2 seconds before moving to the next scene
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
          <>
            <DialogueBox
              speaker={currentDialogueData.speaker}
              text={currentDialogueData.text}
              onNext={handleNext}
              hasChoices={hasChoices}
            />
            {hasChoices && (
              <Choice
                options={currentDialogueData.choices || []}
                onSelect={(value, correct) => handleChoice(value, correct)}
                question={currentDialogueData.question}
              />
            )}
          </>
        )}
      </Scene>
      <Modal isOpen={modalOpen} message={modalMessage} onClose={closeModal} />
    </div>
  );
}

export default App;