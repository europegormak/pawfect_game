import { ChoiceOption } from "./ChoiceOption";

export interface StoryBoxProps {
    text: string;
    onNext: () => void;
    hasChoices: boolean;
    choices?: ChoiceOption[];
    question?: string;
    onSelect: (correct: boolean) => void;
}