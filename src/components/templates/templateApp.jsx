import { Outlet } from "react-router-dom";
import MainHeader from "../organism/mainHeader";

const TemplateApp = () => {
  return (
    <div className="m-0 p-0 h-screen">
      <MainHeader />

      <div className="w-full m-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default TemplateApp;