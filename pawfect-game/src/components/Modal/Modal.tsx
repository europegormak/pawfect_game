import { ModalProps } from '../../models/ModalProps';
import './Modal.css';

function Modal(props: ModalProps) {
    if (!props.isOpen) {
        return null;
    }
    
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p>{props.message}</p>
                <button onClick={props.onClose}>Close</button>
            </div>
        </div>
    );
}

export default Modal;