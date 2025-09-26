import Header from "../../components/DoctorList/Header";
import HospitalGrid from "../../components/HospitalList/HospitalGrid";
import { hospitalData } from "./hospitalData";

function HospitalList() {

  return(
  <div className="flex flex-col h-full">
    <div className="sticky mt-2 top-0 z-10 bg-white ">
      <Header className=""/>
    </div>
    <div className="flex-1 overflow-y-auto p-3">
      <HospitalGrid hospitals={hospitalData} />
    </div>
  </div>
  )
}

export default HospitalList;
