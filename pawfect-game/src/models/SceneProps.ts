import { CharacterProps } from './CharacterProps';
import { Dialogue } from './Dialogue';

export interface SceneProps {
    id: number;
    background: string;
    characters: CharacterProps[];
    dialogue: Dialogue[];
    children?: React.ReactNode;
}