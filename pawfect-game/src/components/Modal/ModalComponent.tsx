import React from 'react';
import { ModalProps } from '../../models/ModalProps';
import './ModalComponent.css'

const ModalComponent: React.FC<ModalProps> = ({ isOpen, message, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={onClose} className="modal-close-button">Close</button>
                {message}
            </div>
        </div>
    );
};

export default ModalComponent;