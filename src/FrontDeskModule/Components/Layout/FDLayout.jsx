import { Outlet } from "react-router-dom";
import FDSidebar from "../FDSidebar";
import FDNavbar from "../FDNavbar";

export default function FDLayout() {
  return (
    <div className="flex h-screen">
      <div className="fixed left-0 top-0 h-full z-20">
        <FDSidebar className="w-64" />
      </div>
      <div className="flex flex-col flex-1 ml-[210px]">
        <div className="fixed top-0 right-0 left-[210px] z-30 bg-white">
          <FDNavbar className="w-full" />
        </div>
        <div className="flex-1 pt-12 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
