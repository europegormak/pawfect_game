import { CharacterProps } from '../../models/CharacterProps';
import './CharacterComponent.css';

function CharacterComponent(props: CharacterProps) {
    return (
        <img className="character" src={props.sprite} alt={props.name} style={{ position: 'absolute', ...props.position }} />
    );
}

export default CharacterComponent;