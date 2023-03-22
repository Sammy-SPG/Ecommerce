import { useContext } from 'react'
import { UserContex } from '../context/userContext';

const Perfil = () => {

    const { state } = useContext(UserContex);

    return (
        <div className="bg-gray-200 pt-32 font-sans h-screen w-full flex flex-row justify-center items-center">
            <div className="card w-96 mx-auto bg-white  shadow-xl hover:shadow">
                <img className="w-32 mx-auto rounded-full -mt-20 border-8 border-white" src="https://img.icons8.com/cotton/64/null/gender-neutral-user--v1.png" alt="" />
                <div className="text-center mt-2 text-3xl font-medium">{state.user.name.split(' ').slice(0, 2).join(' ')}</div>
                <div className="text-center font-normal text-lg">eCommerce</div>
                <div className="px-6 text-center mt-2 font-light text-sm">
                    <p>
                        agrega una descripción de ti
                    </p>
                </div>
                <hr className="mt-6" />
                <div className="flex p-4 flex-col">
                    <div className='my-2'>
                        <p className='text-start'>Datos de cuenta</p>
                        <div className="font-semibold m-1">
                            Usuario: <span className='font-normal tracking-wide'>{state.user.name.split(' ').slice(0, 2).join(' ')}</span>
                        </div>
                        <div className="font-semibold m-1">
                            Email: <span className='font-normal tracking-wide'>{state.user.email}</span>
                        </div>
                    </div>
                    <div className='my-2'>
                        <p className='text-start'>Datos de Personales</p>
                        <div className="font-semibold m-1">
                            Nombre completo: <span className='font-normal tracking-wide'>{state.user.name}</span>
                        </div>
                        <div className="font-semibold m-1">
                            Telefono: <span className='font-normal tracking-wide lining-nums'>{state.user.phone}</span>
                        </div>
                        <div className="font-semibold m-1">
                            Direccion de envio: <span className='font-normal tracking-wide'>{state.user.address.city + ' ' + state.user.address.line1 + ', ' + state.user.address.state}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Perfil