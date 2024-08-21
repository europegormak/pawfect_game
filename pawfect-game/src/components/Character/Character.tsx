import { CharacterProps } from '../../models/CharacterProps';
import './Character.css';

function Character(props: CharacterProps) {
    return (
        <img className="character" src={props.sprite} alt={props.name} style={{ position: 'absolute', ...props.position }} />
    );
}

export default Character;