import {
    createBrowserRouter, Outlet,
    RouterProvider,
} from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Post from "./pages/Post.jsx";
import Home from "./pages/Home.jsx";
import Write from "./pages/Write.jsx";
import './style.scss'

const Layout = () => {
    return (
        <>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </>
    )

}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/posts/:id",
                element: <Post/>
            },
            {
                path: "/write",
                element: <Write/>
            },
        ]
    },
    {
        path: "/register",
        element: <Register/>
    },
    {
        path: "/login",
        element: <Login/>,
    },
    {
        path: "/",
        element: <div>This is Home</div>,
    },
]);

function App() {
    return <div className="app">
        <div className="container">
            <RouterProvider router={router}/>
        </div>
    </div>;
}

export default App;
