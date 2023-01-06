import svg from "../../images/form/shopping_re_owap.svg";

const LoginTemplate = ({children}) => {
    return (
        <div className="w-4/5 m-auto flex px-6 py-6 rounded-lg mt-28 shadow-md shadow-indigo-500/40">
            {children}
            <div><img src={svg} className="w-full" /></div>
        </div>
    )
}

export default LoginTemplate