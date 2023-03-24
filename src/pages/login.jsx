import { API_URL } from "../constants/env";
import { setToken } from "../helpers/auth";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import Logo from "../components/molecule/logo";
import LoginTemplate from "../components/templates/loginTemplate";
import FormControl from "../components/molecule/formControl";
import { Submit } from "../components/molecule/submit";

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
            let headersList = {
                "Content-Type": "application/json"
            }
            let bodyContent = JSON.stringify(data);
            const query = await fetch(`${API_URL}v1/accounts/login`, {
                method: 'POST',
                body: bodyContent,
                headers: headersList
            });
            const res = await query.json();
            if (!res.token) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error de autenticación',
                    text: res.message,
                    footer: 'Registrar'
                });

                throw new Error(res.message);
            }

            setToken(res.token);
            location.href = "/";
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="bg-slate-200">
            <div className="max-w-6xl mx-auto h-screen flex items-center justify-center">
                <LoginTemplate>
                    <form onSubmit={handleSubmit} className="w-1/2 px-5 py-5 bg-white rounded-l-lg shadow-lg">
                        <div className="py-3"><Logo /></div>
                        <h2 className="text-lg font-medium text-center py-1">Inicio de sesión</h2>
                        <div className="flex flex-col items-center justify-center">
                            <FormControl label="Email" typeInput="email" nameInput="email" placeholder="Introduce tu correo electrónico" />
                            <FormControl label="Contraseña" typeInput="password" nameInput="password" placeholder="Introduce tu contraseña" />
                            <Submit title="iniciar sesion" />
                            <div className="mt-4 text-center">
                                ¿No tienes una cuenta?{' '}
                                <Link to="/registro" className="text-primary hover:text-primary-light transition-colors duration-300 ease-in-out">
                                    Regístrate aquí
                                </Link>
                            </div>
                        </div>
                    </form>
                </LoginTemplate>
            </div>
        </div>
    );
}

export default Login;