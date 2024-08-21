import { SceneProps } from '../../models/SceneProps';
import Character from '../Character/Character';
import './Scene.css';

function Scene(props: SceneProps) {
    return (
        <div className="scene" style={{ backgroundImage: `url(${props.background})` }}>
            {props.characters.map((character, index) => (<Character key={index} {...character} />))}
            {props.children}
        </div>
    );
}

export default Scene;