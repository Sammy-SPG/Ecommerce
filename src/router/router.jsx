import { createBrowserRouter } from "react-router-dom";
import Error404 from "../pages/error404";
import TemplateApp from "../components/templates/templateApp";
import Home from "../pages/Home";
import Login from "../pages/login";
import Logout from "../pages/logout";
import { Form } from "../pages/admin/products/form";
import ProductsTable from "../pages/admin/products/table";
import { LoginAdmin } from "../pages/admin/login";
import { Update } from "../pages/admin/products/update";
import TemplateAppAdmin from "../components/templates/templateAppAdmin";
import { Product } from "../pages/product";
import ProductSuccess from "../pages/productSuccess";

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
                path: "/product/:id", element: <Product />
            },
            {
                path: '/product/success', element: <ProductSuccess />
            }
        ]
    },
    {
        path: '/admin',
        element: <TemplateAppAdmin />,
        errorElement: <Error404 />,
        children: [
            {
                index: true, element: <ProductsTable />
            },
            {
                path: '/admin/products/create', element: <Form />
            },
            {
                path: '/admin/products/update/', element: <Update />
            }
        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "logout",
        element: <Logout />
    },
    {
        path: "/login/admin",
        element: <LoginAdmin />
    }
]);


export default router;