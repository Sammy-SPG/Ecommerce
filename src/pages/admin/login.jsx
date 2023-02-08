import React from 'react'
import FormControl from '../../components/molecule/formControl'
import Logo from '../../components/molecule/logo'
import { Submit } from '../../components/molecule/submit'
import LoginTemplate from '../../components/templates/loginTemplate'
import { API_URL } from '../../constants/env'
import { setToken } from '../../helpers/auth'

export const LoginAdmin = () => {

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = JSON.stringify({
            accountId: e.target.accountId.value,
            email: e.target.email.value
        });

        try {
            const query = await fetch(`${API_URL}v1/accounts/login/admin`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: data
            });
            const res = await query.json();
            setToken(res.token);
            location.href = "/admin/";
        } catch (error) {
            console.log(error);
        }


    }

    return (
        <LoginTemplate>
            <form className='w-1/2 px-5 py-5' onSubmit={(e) => handleSubmit(e)}>
                <div className="py-3"><Logo /></div>
                <h2 className="text-lg font-medium text-center py-1">Inicio de sesion administrador</h2>
                <div>
                    <FormControl label="Email" nameInput="email" placeholder="Email" typeInput="text" />
                    <FormControl label="Account" nameInput="accountId" placeholder="Account Id" typeInput="text" />
                    <Submit title="iniciar sesion" />
                </div>
            </form>
        </LoginTemplate>
    )
}
