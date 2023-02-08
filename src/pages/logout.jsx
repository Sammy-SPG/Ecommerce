import Swal from 'sweetalert2'
import FormControl from "../components/molecule/formControl";
import Logo from "../components/molecule/logo";
import LoginTemplate from "../components/templates/loginTemplate";
import { API_URL } from "../constants/env";

const Logout = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: e.target.email.value,
            password: e.target.password.value,
            details:{
                fullname: e.target.name.value,
                postalCode: e.target.postal.value,
                state: e.target.state.value,
                address: e.target.address.value
            }
        }
        console.log(data);
        evtLogin(data);
    }

    const evtLogin = async (data) => {
        try {
            const query = await fetch(`${API_URL}public/users`, {
                method: 'POST',
                body: JSON.stringify(data)
            });
            const res = await query.json();
            if(!res.data.id){
                Swal.fire({
                    icon: 'error',
                    title: 'Error al crear el usuario',
                    text: res.messages[0].message,
                    footer: 'Registrar'
                });
                throw new Error(res.message);
            }
            location.href = "/login";
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <LoginTemplate>
            <form onSubmit={handleSubmit} className="w-1/2 px-5 py-5">
                <div className="py-3"><Logo /></div>
                <h2 className="text-lg font-medium text-center py-1">Crear una cuenta</h2>
                <div className="flex flex-col items-center justify-center">
                    <FormControl label="Email" typeInput="email" nameInput="email" placeholder="Introduce un email" />
                    <FormControl label="Contraseña" typeInput="password" nameInput="password" placeholder="introduce contraseña" />
                    <FormControl label="Nombre" typeInput="text" nameInput="name" placeholder="name" />
                    <div className="flex w-4/5">
                        <FormControl label="Codigo postal" typeInput="text" nameInput="postal" placeholder="Codigo Postal"/>
                        <FormControl label="Estado" typeInput="text" nameInput="state" placeholder="Estado"/>
                        <FormControl label="Direccion" typeInput="text" nameInput="address" placeholder="Direcciion"/>
                    </div>
                    <button type="submit" className="form-btn my-2">Crear Cuenta</button>
                </div>
            </form>
        </LoginTemplate>
    )
}

export default Logout;