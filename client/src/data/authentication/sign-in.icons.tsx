import { ReactComponent as Facebook } from "../../assets/svg/facebook-icon.svg";
import { ReactComponent as Google } from "../../assets/svg/google.icon.svg";
import {api_url} from "../../utils/domain/back.ts";

const signInIcons = [
    {
        id: 1,
        icon: <Facebook className="icon facebook" />,
        class: "facebook",
        link:`${api_url}/auth/facebook/login`
    },
    {
        id: 2,
        icon: <Google className="icon google" />,
        class: "google",
        link:`${api_url}/auth/google/login`
    },
];
const authTravelerIcons = [
    {
        id: 1,
        icon: <Facebook className="icon facebook" />,
        class: "facebook",
        link:`${api_url}/auth/facebook/traveler`
    },
    {
        id: 2,
        icon: <Google className="icon google" />,
        class: "google",
        link:`${api_url}/auth/google/login`
    },
];
const authHostIcons = [
    {
        id: 1,
        icon: <Facebook className="icon facebook" />,
        class: "facebook",
        link:`${api_url}/auth/facebook/host`
    },
    {
        id: 2,
        icon: <Google className="icon google" />,
        class: "google",
        link:`${api_url}/auth/google/host`
    },
];

export {
    signInIcons,
    authTravelerIcons,
    authHostIcons
};
