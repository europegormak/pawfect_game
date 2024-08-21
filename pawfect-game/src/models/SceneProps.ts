import { CharacterProps } from './CharacterProps';
import { Dialogue } from './Dialogue';

export interface SceneProps {
    background: string;
    characters: CharacterProps[];
    dialogue: Dialogue[];
    children?: React.ReactNode;
}