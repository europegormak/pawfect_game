export interface DialogueBoxProps {
    speaker: string;
    text: string;
    onNext: () => void;
    hasChoices: boolean;
}