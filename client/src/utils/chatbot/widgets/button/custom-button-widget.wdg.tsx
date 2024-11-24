import React from 'react';
import CustomButton from "./custom-button.wdg.tsx";
interface CustomButtonProps{
    actions: any;  // Callback function to handle button click event.
}
const CustomButtonWidget:React.FC<CustomButtonProps> = (props) => {
    const { actions } = props; // Get actions from props

    return (
        <div>
            <CustomButton onClick={actions.handleButtonClick} />
        </div>
    );
};

export default CustomButtonWidget;