import { DialogueBoxProps } from '../../models/DialogueBoxProps';
import './DialogueBox.css';

function DialogueBox(props: DialogueBoxProps) {
    return (
        <div className="dialogue-box">
            <p><strong>{props.speaker}</strong>: {props.text}</p>
            {!props.hasChoices && (<button onClick={props.onNext}>Next</button>)}
        </div>
    );
}

export default DialogueBox;