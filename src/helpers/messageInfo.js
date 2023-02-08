import Swal from 'sweetalert2';

const infoMessage = (leyenda) => {
    return Swal.fire({
        title: `<strong>${leyenda}</strong>`,
        icon: 'info',
        showCloseButton: true,
        focusConfirm: false,
    });
}

export default infoMessage;