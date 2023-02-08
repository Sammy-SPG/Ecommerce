import Swal from 'sweetalert2';

const Success = (leyenda, redirect) => {
    if (redirect) return Swal.fire({
        icon: 'success',
        title: leyenda,
        showConfirmButton: false,
        timer: 1500
    }).then(() => {
        location.href = redirect;
    });

    else return Swal.fire({
        icon: 'success',
        title: 'Producto creado exitosamente',
        showConfirmButton: false,
        timer: 1500
    });
}

export default Success;