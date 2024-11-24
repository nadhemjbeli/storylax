import {Outlet, useLocation} from "react-router-dom";
import Navbar from "../components/Navbar/navbar.component";
import Footer from "../components/Footer/footer.component";
import {strings} from "../../i18n/strings.ts";
import {replaceSpace} from "../../utils/string-manipulation.ts";
import ChatBotComponent from "../components/chatbot/chat-bot.component.tsx";
const MainLayout = () => {
    const pathname = useLocation().pathname;
    const aboutPath = `./${replaceSpace(strings.navbar.about)}`
    const explorePath = `./${replaceSpace(strings.navbar.explore)}`
    const blogPath = `./${replaceSpace(strings.paths.blog)}`
    const nonContainedPaths = [
        "./",
        aboutPath,
        explorePath,
        blogPath
    ]
    return (
        <>
            <Navbar />
            <main
                className={`${
                    !nonContainedPaths.includes(`.${pathname}`)
                        ? "container main-under-nav":
                        `.${pathname}` === aboutPath? "container"
                            : ""
                }`}
                  id="main">
                <Outlet />
                <ChatBotComponent/>
            </main>
            <Footer />
        </>
    );
};

export default MainLayout;
