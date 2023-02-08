import Logo from "../molecule/logo";
import MainListMenuAdmin from "../molecule/mainListMenuAdmin";

const MainHeaderAdmin = () => {
    return (
        <div className="fixed w-full bg-gradient">
            <header className="w-full m-auto flex items-center justify-between max-w-screen-md py-1">
                <Logo />
                <MainListMenuAdmin />
            </header>
        </div>
    )
}

export default MainHeaderAdmin;