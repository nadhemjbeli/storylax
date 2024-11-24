import React from 'react';
import Modal from '../../../../../../components/modal/modal.component.tsx';
import './confirmation-modal.style.scss';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    blogTitle: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, blogTitle }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="confirmation-modal">
                <h3>Are you sure you want to delete "{blogTitle}"?</h3>
                <div className="confirmation-modal-buttons">
                    <button className="primary-button confirm-button" onClick={onConfirm}>Yes</button>
                    <button className="cancel-button primary-button " onClick={onClose}>No</button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmationModal;
