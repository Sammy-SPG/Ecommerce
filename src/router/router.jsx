import { createBrowserRouter } from "react-router-dom";
import Error404 from "../pages/error404";
import TemplateApp from "../components/templates/templateApp";
import Home from "../pages/Home";
import Products from "../pages/products";
import Login from "../pages/login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <TemplateApp />,
        errorElement: <Error404 />,
        children: [
            {
                index: true, element: <Home />
            },
            {
                path: "/products", element: <Products />
            }
        ]
    },
    {
        path: "/login",
        element: <Login />
    }
]);


export default router;