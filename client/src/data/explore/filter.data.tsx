
// import { ReactComponent as CloseIcon } from "../../../../../assets/svg/eye.svg";
import { ReactComponent as ActivitiesIcon } from "../../assets/svg/explore/activities.icon.svg";
import { ReactComponent as LocationIcon } from "../../assets/svg/explore/location.icon.svg";
import { ReactComponent as FoodIcon } from "../../assets/svg/explore/food.icon.svg";
import { ReactComponent as InfoIcon } from "../../assets/svg/explore/info.icon.svg";
import { ReactComponent as OpenBookIcon } from "../../assets/svg/explore/open-book.icon.svg";
import { ReactComponent as EyeIcon } from "../../assets/svg/eye.svg";
import {JSX} from "react";

export interface MenuItem {
    id:number;
    name: string;
    icon:JSX.Element
    settings: JSX.Element | null;
}

export const menuItems: MenuItem[] = [
    {
        id:1,
        name: 'General information',
        icon:<InfoIcon className={`menu-icon`}/>,
        settings: (
            <div className="settings">
                <label className="weather-label" htmlFor="weatherlocation">
                    Weather for
                </label>
                <input className="input weather-input" type="text" name="weatherlocation" placeholder="location" />
                <button className="btn weather-button">Show</button>
            </div>
        ),
    },
    {
        id:2,
        name: 'what to see',
        icon:<EyeIcon className={`menu-icon`}/>,
        settings: (
            <div className="settings">
                <label className="weather-label" htmlFor="weatherlocation">
                    Weather for
                </label>
                <input className="input weather-input" type="text" name="weatherlocation" placeholder="location" />
                <button className="primary-button-outline">Show</button>
            </div>
        ),
    },
    {
        id:3,
        name: 'activities',
        icon:<ActivitiesIcon className={`menu-icon`}/>,
        settings: (
            <div className="settings">
                <input className="input gallery-range" type="range" min="0" max="100" onChange={(e) => {
                    const value = e.target.value;
                    document.getElementById('range-value')!.innerText = value;
                }} />
                <output className="gallery-output" id="range-value">50</output>
                <button className="primary-button-outline">Save Changes</button>
            </div>
        ),
    },
    {
        id:4,
        name: 'where to stay',
        icon:<LocationIcon className={`menu-icon`}/>,
        settings: (
            <div className="settings">
                <label className="history-label" htmlFor="history">Sort by</label>
                <input className="input history-input" list="history" name="history" />
                <datalist className="datalist" id="history">
                    <option value="Name" />
                    <option value="Date" />
                    <option value="Priority" />
                    <option value="Author" />
                    <option value="Category" />
                </datalist>
                <button className="primary-button-outline">Save Changes</button>
            </div>
        ),
    },
    {
        id:5,
        name: 'Gastronomies & \nwhere to eat',
        icon:<FoodIcon className={`menu-icon`}/>,
        settings: <button className="primary-button-outline">Show likes</button>,
    },
    {
        id:6,
        name: 'tips & heading',
        icon:<OpenBookIcon className={`menu-icon`}/>,
        settings: <button className="primary-button-outline">Show comments</button>,
    },
];
