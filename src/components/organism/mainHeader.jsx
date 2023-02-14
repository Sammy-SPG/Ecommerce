import Logo from "../molecule/logo";
import MainListMenu from "../molecule/mainListMenu";

const MainHeader = () => {
    return (
        <div className="fixed w-full bg-gradient">
            <header className="w-full max-w-screen-lg m-auto flex items-center justify-between py-1">
                <Logo />
                <MainListMenu />
            </header>
        </div>
    )
}

export default MainHeader;