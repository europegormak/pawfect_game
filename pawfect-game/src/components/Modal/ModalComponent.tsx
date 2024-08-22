import React from 'react';
import { ModalProps } from '../../models/ModalProps';
import './ModalComponent.css'

const ModalComponent: React.FC<ModalProps> = ({ isSuccessful, isOpen, message, onClose }) => {
    if (!isOpen) return null;

    if (isSuccessful){
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={onClose} className="modal-close-button">Close</button>
                <div className={`modal-body ${isSuccessful ? 'success' : 'failure'}`}>
                    {message}
                </div>
            </div>
        </div>
    );
    } else {
        return (
            <div className="modal-overlay">
                <div className="modal-content">
                    <button onClick={onClose} className="modal-close-button">Close</button>
                    <div className={`modal-body ${isSuccessful ? 'success' : 'failure'}`}>
                        {message}
                    </div>
                </div>
            </div>
        );
    }
};

export default ModalComponent;