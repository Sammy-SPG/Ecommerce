import Logo from "../molecule/logo";
import MainListMenu from "../molecule/mainListMenu";

const MainHeader = () => {
    return (
        <div className="fixed w-full bg-gradient">
            <header className="w-full m-auto flex items-center justify-between max-w-screen-md py-1">
                <Logo />
                <MainListMenu />
            </header>
        </div>
    )
}

export default MainHeader;