import { CharacterProps } from '../../models/CharacterProps';
import './CharacterComponent.css';

function CharacterComponent(props: CharacterProps) {
    return (
        <img className="character" src={props.sprite} alt={props.name} style={{ transform: props.transform ,position: 'absolute', ...props.position }} />
    );
}

export default CharacterComponent;