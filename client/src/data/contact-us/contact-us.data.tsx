// contact.data.ts
import { ReactComponent as BlogIcon } from "../../assets/svg/blog.svg";
import { ReactComponent as SupportIcon } from "../../assets/svg/support-icon.svg";

export interface HeroContactLeftItem {
    id: number;
    Icon: any;
    title: string;
    description: string;
}

const heroContactLeftItems: HeroContactLeftItem[] = [
    {
        id: 1,
        Icon: <SupportIcon className="icon" />,
        title: "Support",
        description: "Need help? Find the answers to frequently asked questions here."
    },
    {
        id: 2,
        Icon: <BlogIcon className="icon" />,
        title: "Blog",
        description: "Keep up with the latest news and trends in the global work landscape."
    }
];

export {heroContactLeftItems}
