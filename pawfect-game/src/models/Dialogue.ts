import { ChoiceOption } from "./ChoiceOption";
import { DialogueType } from "./DialogueType";

export interface Dialogue {
    speaker: string;
    text: string;
    type: DialogueType;
    question?: string;
    choices?: ChoiceOption[];
}