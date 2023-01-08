const LoginTemplate = ({ children }) => {
    return (
        <div className="w-4/5 max-w-screen-xl m-auto flex rounded-lg mt-28 shadow-lg shadow-indigo-500/50">
            {children}
            <div className="w-1/2 bg-gradient-login rounded-r-md">
                <div className="w-full h-full flex flex-col items-center justify-center">
                    <p className="font-sans text-lg font-medium text-slate-100">Mas que un e-commerce...</p>
                    <p className="font-sans text-2xl font-semibold text-slate-100">Somos una tienda en linea</p>
                </div>
            </div>
        </div>
    )
}

export default LoginTemplate