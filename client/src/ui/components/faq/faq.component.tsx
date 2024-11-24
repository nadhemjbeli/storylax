import React, {useState} from 'react';
import { ReactComponent as ShevronDown } from "../../../assets/svg/shevron-down-icon.svg";
import { ReactComponent as ShevronUp } from "../../../assets/svg/shevron-up-icon.svg";
import {faqData} from "../../../data/contact-us/contact-faq.data.ts";
import './faq.style.scss'

const Faq : React.FC = () => {
    // const [dropdown, setDropdown] = useState(false)
    const [openQuestionId, setOpenQuestionId] = useState<number | null>(null);

    const toggleQuestion = (id: number) => {
        setOpenQuestionId(openQuestionId === id ? null : id);
    };
    return (

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
    );
};

export default Faq;