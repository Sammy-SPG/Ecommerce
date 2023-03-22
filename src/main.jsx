import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import router from './router/router';
import "./css/index.css";
import { CartProvider } from './context/cartContext';
import { UserProvider } from './context/userContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider><CartProvider><RouterProvider router={router} /></CartProvider></UserProvider>
);