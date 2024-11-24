// src/ui/components/modal/modal.component.tsx
import React, {useEffect} from 'react';
import {ReactComponent as CloseIcon} from "../../../assets/svg/close.icon.svg";
import "./modal.styles.scss";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }

        // Cleanup function to remove the class when the component is unmounted
        return () => {
            document.body.classList.remove('modal-open');
        };
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    const handleClose = (e: React.MouseEvent) => {
        if ((e.target as Element).classList.contains('modal-overlay')) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className={`modal modal-content ${!isOpen ? 'fade-out' : ''}`}>
                <div className="top-bar">
                    <button className="close-button" onClick={onClose}>
                        <CloseIcon className="close-icon" />
                    </button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
