import React, { useContext } from "react";
import Success from "../../helpers/messageSuccess";
import { CartContex } from "../../context/cartContext";
import { getToken } from "../../helpers/auth";
import infoMessage from "../../helpers/messageInfo";
import Swal from "sweetalert2";

const AddToCartButton = ({ id, id_price, name, image, price, description }) => {
  const { state, dispatch } = useContext(CartContex);

  const handleAdd = (id, id_price, name, image, price, description) => {
    dispatch({
      type: 'Add',
      body: { id, id_price, name, quantity: 1, image, price, description},
    });
    Success('Se agregó al carrito');
  };

  const handleClick = () => {
    if (!getToken()) return infoMessage('Inicia sesion para poder realizar la compra');

    const productInCart = state.cart[id];

    if (!productInCart) {
      return handleAdd(id, id_price, name, image, price, description);
    }

    return Swal.fire({
      title: 'Tienes un producto similar en el carrito, Deseas agregar otro?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `No guardar`,
    }).then((result) => {
      if (result.isConfirmed) {
        handleAdd(id, id_price, name, image, price);
      } else if (result.isDenied) {
        Swal.fire('No se guardo', '', 'info');
      }
    });


  };

  return <button className="my-2 text-sm rounded-lg bg-gray-800 p-1.5 text-white duration-100 hover:bg-gray-900 sm:w-40" onClick={handleClick}>Agregar al carrito</button>;
};

export default AddToCartButton;