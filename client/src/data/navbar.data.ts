// src/data/navbar.data.ts
import { strings } from "../i18n/strings"
import { replaceSpace } from "../utils/string-manipulation"



const items=[
    {
        id : 1,
        text: strings.navbar.about,
        link: `./${replaceSpace(strings.navbar.about)}`,
    },
    {
        id: 2,
        text: strings.navbar.explore,
        link:`./${replaceSpace(strings.navbar.explore)}`,
    },
    {
        id: 3,
        text: strings.navbar.exclusive,
        link: `./${replaceSpace(strings.navbar.exclusive)}`,
    },
    {
        id: 4,
        text: strings.navbar.contact,
        link: `./${replaceSpace(strings.navbar.contact)}`,
    },
]

const dropdownItems = [
    {
        id: '0',
        text: strings.paths.blog,
        link: `./${replaceSpace(strings.paths.blog)}`,
    },
    {
        id: '1',
        text: strings.navbar.signin,
        link: `./${replaceSpace(strings.navbar.signin)}`,
    },
    {
        id: '2',
        text: strings.navbar.signup,
        link: `./${replaceSpace(strings.navbar.signup)}`,
    },
]

const dropdownTravelerAuthItems = [
    {
        id: strings.paths.blog,
        text: strings.paths.blog,
        link: `./${replaceSpace(strings.paths.blog)}`,
    },
    {
        id: strings.navbar.traveler.myTravelerProfile,
        text: strings.navbar.traveler.myTravelerProfile,
        link: ``,
    },
    {
        id: strings.navbar.traveler.reservations,
        text: strings.navbar.traveler.reservations,
        link: `./${replaceSpace(strings.navbar.traveler.reservations)}`,
    },
    {
        id: '4',
        text: strings.navbar.logout,
        link: ``,
    },
]

const dropdownHostAuthItems = [
    {
        id: '0',
        text: strings.paths.blog,
        link: `./${replaceSpace(strings.paths.blog)}`,
    },
    {
        id: '1',
        text: strings.navbar.signup,
        link: `./${replaceSpace(strings.navbar.signup)}`,
    },
    {
        id: '2',
        text: strings.navbar.traveler.reservations,
        link: `./${replaceSpace(strings.navbar.traveler.reservations)}`,
    },
    {
        id: '4',
        text: strings.navbar.logout,
        link: ``,
    },
]
export {
    items,
    dropdownItems,
    dropdownTravelerAuthItems,
    dropdownHostAuthItems
}