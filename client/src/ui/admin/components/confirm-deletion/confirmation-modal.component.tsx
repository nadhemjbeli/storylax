import React, { useState } from 'react';
import Modal from '../../../components/modal/modal.component.tsx';
import './confirmation-modal.style.scss';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    element: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, title, element }) => {
    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const isConfirmDisabled = inputValue !== element;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="confirmation-modal">
                <h3>Are you sure you want to delete "{title}"?</h3>
                <p>Please type <strong>"{element}"</strong> to confirm:</p>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    className="confirmation-input"
                />
                <div className="confirmation-modal-buttons">
                    <button
                        className="primary-button confirm-button"
                        onClick={onConfirm}
                        disabled={isConfirmDisabled}
                    >
                        Yes
                    </button>
                    <button className="cancel-button primary-button" onClick={onClose}>No</button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmationModal;
