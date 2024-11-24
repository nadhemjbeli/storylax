import React from 'react';
import {ReactComponent as CloseIcon} from "../../../../../../assets/svg/explore/close.icon.svg";
import "./place-card.style.scss";
import {api_url} from "../../../../../../utils/domain/back.ts";

interface MonumentCardProps {
    title: string;
    description?: string;
    type: string | null;
    transportation: string;
    image: string|undefined;
    cardIcon:string | null;
    color: string | null;
    position: [number, number];
    onClose: () => void;
    onChangeModal:  (value: boolean) => void;
}

const MonumentCard: React.FC<MonumentCardProps> = ({ title, image, type, transportation, position, color,cardIcon, onClose, onChangeModal }) => {

    const handleIsOpen = () => {
        console.log("on change")
        onChangeModal(true);
    };
    return (
        <div className="place-card" style={{ left: position[0], top: position[1] }}>
            <button className="close-btn" onClick={onClose}><CloseIcon className="close-icon"/></button>
            <h2 className="place-title">{title}</h2>
            <div className="place-icon-container"
                 style={color && {backgroundColor:color}}>
                <img src={`${api_url}/${cardIcon}`} className="place-card-icon" alt=""/>
                <span className="icon-title">{type}</span>
            </div>
            <span className="place-transportation"><strong>Transportation:</strong> {transportation}</span>
            <br/>
            <button className="primary-button" onClick={handleIsOpen}>More info</button>
        </div>
    );
};

export default MonumentCard;
