import Swal from 'sweetalert2';

const ErrorMessage = (leyenda, message) => {
    return Swal.fire({
        icon: 'error',
        title: leyenda,
        text: message,
    });
}


export default ErrorMessage;