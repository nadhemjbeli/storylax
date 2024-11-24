import React, { useState } from 'react';
import "./sign-up.style.scss"
import LeftPart from "../components/leftPart/left-part.component.tsx";
import SignUpForm from "../components/signUpForm/sign-up-form.component.tsx";
import { ReactComponent as FAQIcon } from "../../../../assets/svg/faq.icon.svg";
import Modal from "../../../components/modal/modal.component.tsx";
import Faq from "../../../components/faq/faq.component.tsx";

const SignUp: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const handleModalClose = () => {
        setShowModal(false);
    };

    return (
        <div className="sign-up">
            <div className="sign-up-container">
                <LeftPart />
                <SignUpForm />
            </div>
            <div className="faq-container" onClick={() => {
                setShowModal(true)
            }}>
                <FAQIcon className="icon" />
                <span className="faq">FAQ</span>
            </div>
            <Modal isOpen={showModal} onClose={handleModalClose}>
                <h2>Frequently Asked Questions</h2>
                <Faq />
            </Modal>
        </div>
    );
};

export default SignUp;