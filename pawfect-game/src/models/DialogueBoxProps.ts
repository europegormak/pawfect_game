import { ChoiceOption } from './ChoiceOption';

export interface DialogueBoxProps {
    speaker: string;
    text: string;
    onNext: () => void;
    hasChoices: boolean;
    choices?: ChoiceOption[];
    question?: string;
    onSelect: (correct: boolean) => void;
}