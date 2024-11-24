import {strings} from "../i18n/strings.ts";
import {replaceSpace} from "../utils/string-manipulation.ts";

interface FooterColumn {
    id: number;
    title: string;
    links: Links[];
}
interface Links{
    text: string;
    href: string;
}

const footerData: FooterColumn[] = [
    {
        id: 1,
        title: strings.footer.title.about,
        links: [
            { text: strings.footer.content.whyStorylax, href: `/${replaceSpace(strings.navbar.about)}` },
            { text: strings.footer.content.explore, href: `/${replaceSpace(strings.navbar.explore)}` },
            { text: strings.footer.content.privacyPolicy, href: '#' },
        ],
    },
    {
        id: 2,
        title: strings.footer.title.company,
        links: [
            { text: strings.footer.content.faq, href: '#' },
            { text: strings.footer.content.blog, href: `/${replaceSpace(strings.paths.blog)}` },
        ],
    },
    {
        id: 3,
        title: strings.footer.title.support,
        links: [
            { text: strings.footer.content.supportCenter, href: `/${replaceSpace(strings.navbar.contact)}` },
            { text: strings.footer.content.feedback, href: `/${replaceSpace(strings.navbar.contact)}` },
        ],
    },
];

export {
    footerData
}