import { StoryBoxProps } from '../../models/StoryBoxProps';
import './StoryBoxComponent.css';

function StoryBoxComponent(props: StoryBoxProps) {
    return (
        <div className="story-box">
            <p>{props.text}</p>
            {props.hasChoices && props.question && (
                <>
                    <p className="question">{props.question}</p>
                    <ul className="choices">
                        {props.choices?.map((choice) => (
                            <li key={choice.value}>
                                <button onClick={() => props.onSelect(choice.correct)}>
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

export default StoryBoxComponent;