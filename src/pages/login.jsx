import { API_URL } from "../constants/env";
import { setToken } from "../helpers/auth";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import Logo from "../components/molecule/logo";
import LoginTemplate from "../components/templates/loginTemplate";
import FormControl from "../components/molecule/formControl";
import postQuery from "../helpers/petisionPost";

const Login = () => {

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        evtLogin(data);
    }

    const evtLogin = async (data) => {
        try {
            const res = await postQuery(`${API_URL}public/login`, data);
            if (!res.data.token) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error de autenticación',
                    text: res.messages[0].message,
                    footer: 'Registrar'
                });

                throw new Error(res.messages[0].code);
            }
            setToken(res.data.token);
            location.href = "/";
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <LoginTemplate>
            <form onSubmit={handleSubmit} className="w-1/2 px-5 py-5">
                <div className="py-3"><Logo /></div>
                <h2 className="text-lg font-medium text-center py-1">Inicio de sesion</h2>
                <div className="flex flex-col items-center justify-center">
                    <FormControl label="Email" typeInput="email" nameInput="email" placeholder="Introduce correo"/>
                    <FormControl label="Contraseña" typeInput="password" nameInput="password" placeholder="introduce contraseña"/>
                    <button type="submit" className="form-btn my-2">Ingresar</button>
                    <Link to="/logout" className="text-slate-600 font-sans py-3">¿Deseas registrarte?</Link>
                </div>
            </form>
        </LoginTemplate>
    );
}

export default Login;