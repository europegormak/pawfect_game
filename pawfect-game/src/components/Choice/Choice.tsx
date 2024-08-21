import { ChoiceProps } from '../../models/ChoiceProps';
import './Choice.css';

function Choice(props: ChoiceProps) {
    {/* <div className="choices">
            {props.options.map((option, index) => (<button key={index} onClick={() => props.onSelect(option.value)}>{option.text}</button>))}
        </div> */}
    return (
        <div className="choice-container">
            {props.question && <p className="choice-question">{props.question}</p>}
            <div className="choice-options">
            {props.options.map((option, index) => (<button key={index} onClick={() => props.onSelect(option.value, option.correct)} className="choice-button" >{option.text}</button>))}
            </div>
        </div>
    );
}

export default Choice;