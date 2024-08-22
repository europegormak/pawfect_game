import { DialogueType } from '../../models/DialogueType';
import { SceneProps } from '../../models/SceneProps';
import CharacterComponent from '../Character/CharacterComponent';
import './SceneComponent.css';

function SceneComponent(props: SceneProps & { currentDialogueType: DialogueType }) {
    const currentDialogueType = props.currentDialogueType;

    return (
        <div className="scene" style={{ backgroundImage: `url(${props.background})` }}>
            {currentDialogueType === DialogueType.DIALOGUE && props.characters.map((character, index) => (
                <CharacterComponent key={index} {...character} />
            ))}
            {props.children}
        </div>
    );
}

export default SceneComponent;