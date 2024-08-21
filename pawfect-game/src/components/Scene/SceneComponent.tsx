import { SceneProps } from '../../models/SceneProps';
import CharacterComponent from '../Character/CharacterComponent';
import './SceneComponent.css';

function SceneComponent(props: SceneProps) {
    return (
        <div className="scene" style={{ backgroundImage: `url(${props.background})` }}>
            {props.characters.map((character, index) => (<CharacterComponent key={index} {...character} />))}
            {props.children}
        </div>
    );
}

export default SceneComponent;