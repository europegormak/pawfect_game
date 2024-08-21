import { ChoiceOption } from "./ChoiceOption";

export interface ChoiceProps {
    options: ChoiceOption[];
    onSelect: (value: string, correct: boolean) => void;
    question?: string;
}