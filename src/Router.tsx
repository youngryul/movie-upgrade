import { createBrowserRouter } from "react-router-dom";
import ComingSoon from "./Pages/ComingSoon";
import Home from "./Pages/Home";
import NowPlaying from "./Pages/NowPlaying";
import Header from "./Components/Header";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout:React.FC<LayoutProps> = ({children}) => (
    <>
        <Header/>
        {children}
    </>
);

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Layout>
                <Home />
            </Layout>

        )
    },
    {
        path: "/coming-soon",
        element: (
            <ComingSoon/>
        )
    },
    {
        path:"/now-playing",
        element: (
            <NowPlaying/>
        )
    }
])

export default router;