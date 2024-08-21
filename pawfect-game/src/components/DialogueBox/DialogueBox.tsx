import { DialogueBoxProps } from '../../models/DialogueBoxProps';
import './DialogueBox.css';

function DialogueBox(props: DialogueBoxProps) {
    return (
        <div className="dialogue-box">
            <p><strong>{props.speaker}:</strong> {props.text}</p>
            {props.hasChoices && props.question && (
                <>
                    <p className="question">{props.question}</p>
                    <ul className="choices">
                        {props.choices?.map((choice) => (
                            <li key={choice.value}>
                                <button onClick={() => props.onSelect(choice.value, choice.correct)}>
                                    {choice.text}
                                </button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
            {!props.hasChoices && (
                <button className="next-button" onClick={props.onNext}>Next</button>
            )}
        </div>
    );
}

export default DialogueBox;