import { Outlet } from "react-router-dom";
import MainHeader from "../organism/mainHeader";

const TemplateApp = () => {
  return (
    <div>
      <MainHeader />
      <Outlet />
    </div>
  )
}

export default TemplateApp;