import { ChoiceOption } from "./ChoiceOption";

export interface Dialogue {
    speaker: string;
    text: string;
    question?: string;
    choices?: ChoiceOption[];
}