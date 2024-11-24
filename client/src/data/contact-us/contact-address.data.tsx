import { ReactComponent as Address } from "../../assets/svg/address-icon.svg";
import { ReactComponent as Email } from "../../assets/svg/envelope-icon.svg";
import { ReactComponent as Time } from "../../assets/svg/clock-icon.svg";
import {strings} from "../../i18n/strings.ts";
const addressData = [
    {
        id:1,
        title: strings.contactUs.addressSection.address,
        Icon:<Address className="icon address-icon" />,
        content: '123 Main St, Anytown, USA'
    },
    {
        id:2,
        title: strings.contactUs.addressSection.email,
        Icon:<Email className="icon" />,
        content: 'contact@example.com'
    },
    {
        id:3,
        title: strings.contactUs.addressSection.officeTimes,
        Icon:<Time className="icon" />,
        content: 'Mon - Fri: 9 AM - 5 PM'
    }
];

export {addressData}