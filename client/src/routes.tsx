import Home from "./ui/features/home/screens/home.component.tsx";

interface Route {
  path: string;
  element: React.ReactElement<any, any>; // Replace with your component type if known
}

const routes: Route[] = [{ path: "/", element: <Home /> }];

export default routes;
