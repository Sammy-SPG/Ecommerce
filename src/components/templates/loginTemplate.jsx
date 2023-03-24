const LoginTemplate = ({ children }) => {
    return (
        <div className="w-4/5 max-w-screen-xl mx-auto flex rounded-lg shadow-lg shadow-indigo-500/50">
            {children}
            <div className="w-1/2  bg-gradient-to-r from-indigo-600 to-purple-600 py-16 px-8 rounded-r-lg">
                <div className="w-full h-full flex flex-col items-center justify-center">
                    <p className="font-sans text-lg font-medium text-white">Mas que un e-commerce...</p>
                    <p className="font-sans text-2xl font-semibold text-white text-center">Somos una tienda en linea</p>
                </div>
            </div>
        </div>
    )
}

export default LoginTemplate