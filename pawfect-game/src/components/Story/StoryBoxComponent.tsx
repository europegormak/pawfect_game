import { StoryBoxProps } from '../../models/StoryBoxProps';
import './StoryBoxComponent.css';

function StoryBoxComponent(props: StoryBoxProps) {
    return (
        <div className="story-box">
            <p>{props.text}</p>
            <button className="next-button" onClick={props.onNext}>Next</button>
        </div>
    );
}

export default StoryBoxComponent;