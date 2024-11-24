import React, {useState} from 'react';
import { ReactComponent as ShevronDown } from "../../../../../../../assets/svg/shevron-down-icon.svg";
import { ReactComponent as ShevronUp } from "../../../../../../../assets/svg/shevron-up-icon.svg";
import {faqData} from "../../../../../../../data/contact-us/contact-faq.data.ts";
import './faq.style.scss'

const Faq : React.FC = () => {
    // const [dropdown, setDropdown] = useState(false)
    const [openQuestionId, setOpenQuestionId] = useState<number | null>(null);

    const toggleQuestion = (id: number) => {
        setOpenQuestionId(openQuestionId === id ? null : id);
    };
    return (
        <div className="faq-content flex">
            <div className="faq-left">
                <h2 className="faq-subtitle">FAQ</h2>
                <h1 className="faq-title">Do you have any questions for us?</h1>
                <p className="description">If you have any questions, we are here to answer them all!</p>
                <form action="" className="send-mail-form">
                    <input type="email" placeholder={`Enter your email`} className="mail"/>
                    <button className="btn-send">Submit</button>
                </form>
            </div>
            <div className="faq-right dropdown-questions">
                {faqData.map(faq => (
                    <div className={`dropdown-question ${openQuestionId === faq.id ? 'open' : ''}`} key={faq.id}>
                        <div className="question-content" onClick={() => toggleQuestion(faq.id)}>
                            <div className="question">{faq.question}</div>
                            <div className="icon-container">{openQuestionId === faq.id ?
                                <ShevronUp className="icon" />
                                :
                                <ShevronDown className="icon" />
                            }
                            </div>
                        </div>
                        <div className="question-hr"></div>
                        <div className="answer">{faq.answer}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Faq;