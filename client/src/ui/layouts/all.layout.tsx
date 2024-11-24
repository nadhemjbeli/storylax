import {Outlet} from "react-router-dom";
const AllLayout = () => {
    return (
        <>
            <main
                  id="main">
                <Outlet />
            </main>
        </>
    );
};

export default AllLayout;
