import { Outlet } from "react-router-dom";
import MainHeaderAdmin from "../organism/mainHeaderAdmin";

const TemplateAppAdmin = () => {
  return (
    <div className="m-0 p-0 h-screen">
      <MainHeaderAdmin />

      <div className="pt-16 w-full m-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default TemplateAppAdmin;