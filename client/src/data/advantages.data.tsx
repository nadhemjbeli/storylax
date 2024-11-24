import {strings} from "../i18n/strings.ts";
import blue from "../assets/svg/home/advantages/cadre-bleu.svg"
import pink from "../assets/svg/home/advantages/cadre-rose.svg"

const advantagesData = [
    {
        id:1,
        back:pink,
        advantages:[
            {
                id:1,
                value: strings.advantagesHome.easyBooking,
            },
            {
                id:2,
                value: strings.advantagesHome.processEasy,
            }

        ],
    },
    {
        id:2,
        back:blue,
        advantages: [
            {
                id: 1,
                value: strings.advantagesHome.customizedTravelPackages,
            },
            {
                id: 2,
                value: strings.advantagesHome.localEvents,
            },
            {
                id: 3,
                value: strings.advantagesHome.exclusiveExperiences,
            },
            {
                id: 4,
                value: strings.advantagesHome.privateAndCustomizedTour,
            },
        ],
    },
    {
        id:3,
        back: pink,
        advantages: [
            {
                id: 1,
                value: strings.advantagesHome.guidedToursAndExcursions,
            },
            {
                id: 2,
                value: strings.advantagesHome.optimizeYourRoute,
            },
            {
                id: 3,
                value: strings.advantagesHome.getPersonalizedTips,
            },
            {
                id: 4,
                value: strings.advantagesHome.bestTourGuide,
            },
        ],
    }
]
export {
    advantagesData
}