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
import ShoppingHistory from "../pages/shoppingHistory";
import Cart from "../pages/Cart";
import ProductShears from "../pages/ProductShears";
import Perfil from "../pages/perfil";
import Favorites from "../pages/favorites";
import Customers from "../pages/admin/customers/customers";
import Charges from "../pages/admin/customers/charges";

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
                path: "/cart", element: <Cart />
            },
            {
                path: "/shoppingHistory", element: <ShoppingHistory />
            },
            {
                path: "/product/:id", element: <Product />
            },
            {
                path: '/product/success', element: <ProductSuccess />
            },
            {
                path: "/products/shears/:name/:rating", element: <ProductShears />
            },
            {
                path: '/profile/', element: <Perfil />
            },
            {
                path: '/favorites/', element: <Favorites />
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
            },
            {
                path: '/admin/customers', element: <Customers />
            },
            {
                path: '/admin/charges', element: <Charges />
            }
        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/logout",
        element: <Logout />
    },
    {
        path: "/login/admin",
        element: <LoginAdmin />
    }
]);


export default router;