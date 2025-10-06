import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Cards = ({ hospital }) => {
  const navigate = useNavigate();
  const openHospital = () => navigate(`/hospital/${encodeURIComponent(hospital.id)}`, { state: { hospital } });
  const isActive = (hospital?.status || '').toLowerCase() === 'active';
  const initial = (hospital?.name?.[0] || 'H').toUpperCase();
  return (
    <>
      <div className="min-w-[300px] h-[390px] flex flex-col p-3 border-[0.5px] gap-4 border-[#D6D6D6] rounded-lg">
        <div className="flex flex-col gap-2 h-[318px] cursor-pointer" onClick={openHospital}>

          <div className="relative h-[140px] rounded-lg">
            {/* The main hospital image */}
            <img
              src={hospital.image || "/hospital-sample.png"}
              alt="Hospital"
              className="rounded-tl-md rounded-tr-md rounded-br-md rounded-bl-[56px] w-full h-full object-cover"
            />

            {/* Status tag */}
            <div
              className={`absolute h-7 top-2 right-2 text-sm font-medium px-1.5 py-0.5 rounded-md ${
                isActive ? 'bg-[#F2FFF3] text-[#3EAF3F]' : 'bg-[#FFF8F2] text-[#F59E0B]'
              }`}
            >
              {isActive ? 'Active' : 'Inactive'}
            </div>

            {/* Your existing circle with 'M' and tick */}
      <div className="flex items-center justify-center absolute bg-[#F8FAFF] -bottom-0 rounded-full h-16 w-16 border-[0.5px] border-[#96BFFF] ">
        <span className="font-normal text-3xl text-[#2372EC]">{initial}</span>
                <img src="/tick.png" alt="Verified" className="absolute -top-1 right-0 h-5 w-5" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-semibold text-base text-[#424242]">{hospital.name}</span>

    <div className="flex gap-1 items-center">
      <img src="/location.png" alt="Location" className="h-5 w-5 object-contain" loading="lazy"/>
      <span className="text-[#424242] font-normal text-sm">{hospital.id}</span>
    </div>

    <div className="flex gap-1 items-center">
      <img src="/location.png" alt="Location" className="h-5 w-5 object-contain" loading="lazy"/>
      <span className="text-[#424242] font-normal text-sm">{hospital.address}</span>
    </div>

    <div className="flex gap-1 items-center">
      <img src="/mail.png" alt="Email" className="h-5 w-5 object-contain" loading="lazy"/>
      <span className="text-[#424242] font-normal text-sm">{hospital.email}</span>
    </div>

    <div className="flex gap-1 items-center">
      <img src="/phone.png" alt="Phone" className="h-5 w-5 object-contain" loading="lazy"/>
      <span className="text-[#424242] font-normal text-sm">{hospital.phone}</span>
    </div>

            <span className="font-normal text-[#424242] text-sm">{hospital.type} | {hospital.doctors} | {hospital.beds}</span>

      <div className="flex gap-2 items-center">
        <span className="font-normal text-[#424242] text-sm">Est in</span>
        <div className="w-[6px] h-[6px] bg-[#8E8E8E] rounded-full"></div>
        <span className="font-normal text-[#424242] text-sm">{hospital.estYear || hospital.validity || '-'}</span>
      </div>

          </div>

        </div>

    <button type="button" onClick={openHospital} className="bg-[#2372EC] h-8 p-2 rounded flex justify-center items-center gap-2">
      <span className="text-white text-sm font-medium">View Hospital</span>
      <ArrowRight className="text-white h-4 w-4"/>
    </button>

      </div>
    </>
  );
};

export default Cards;
