import { ChevronDown, Hospital, LucideVerified } from 'lucide-react';
import React from 'react';

const DoctorBanner = ({ doctor }) => {
  return (
    <div className="w-full p-4 flex items-center gap-4 bg-white">
      {/* Profile Circle */}
      <div className="relative w-[100px] h-[100px] flex items-center justify-center rounded-full bg-[#F8FAFF] border border-[#96BFFF]">
        <span className="text-[#2372EC] font-normal text-[45px]">R</span>
        <div className="absolute -right-1 -top-0">
          <img src="tick.png" alt="" className="w-[30px] h-[30px]" />
        </div>
      </div>

      {/* Doctor Info */}
      <div className="flex flex-col gap-2 flex-1">
        <div className="flex flex-wrap gap-3 items-center">
          <span className="text-[#424242] font-semibold text-[20px]">
            Dr. Milind Chauhan
          </span>
          <div className="px-[6px] py-[2px] bg-[#F2FFF3] rounded-sm">
            <span className="font-normal text-[#3EAF3F] text-sm">Active</span>
          </div>
          <div className="bg-[#F9F9F9] flex items-center px-[6px] py-[2px] gap-1 rounded-sm">
            <Hospital className="w-3 h-3" />
            <span className="text-[#424242] text-sm font-normal">
              Sunrise Family Clinic
            </span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex gap-1 items-center">
            <LucideVerified className="w-4 h-4" />
            <span className="text-sm text-[#424242]">
              MBBS, MD - General Medicine
            </span>
          </div>
          <div className="flex gap-1 items-center">
            <LucideVerified className="w-4 h-4" />
            <span className="text-sm text-[#424242]">General Physician</span>
          </div>
          <div className="flex gap-1 items-center">
            <LucideVerified className="w-4 h-4" />
            <span className="text-sm text-[#424242]">
              19 Years Experience Overall (8 years as specialist)
            </span>
          </div>
        </div>
      </div>

      {/* Info Boxes */}
      <div className="flex gap-3">
        <div className="w-[120px] h-[100px] border-dashed border border-[#D6D6D6] rounded-sm flex flex-col justify-between items-center p-2 text-center">
          <span className="text-[#626060] text-sm">No. of Patient Managed</span>
          <span className="font-semibold text-[#2372EC] text-sm">1,000</span>
        </div>
        <div className="w-[120px] h-[100px] border-dashed border border-[#D6D6D6] rounded-sm flex flex-col justify-between items-center p-2 text-center">
          <span className="text-[#626060] text-sm">No. of Appointments Booked</span>
          <span className="font-semibold text-[#2372EC] text-sm">1,000</span>
        </div>
        <div className="w-[120px] h-[100px] border-dashed border border-[#D6D6D6] rounded-sm flex flex-col justify-between items-center p-2 text-center">
          <span className="text-[#626060] text-sm">Active Package</span>
          <span className="font-semibold text-green-600 text-sm">Premium</span>
        </div>
        <div className="w-[120px] h-[100px] border-dashed border border-[#D6D6D6] rounded-sm flex flex-col justify-between items-center p-2 text-center">
          <span className="text-[#626060] text-sm">eClinic QID</span>
          <span className="font-semibold text-[#2372EC] text-sm">D0654321</span>
        </div>
      </div>
    </div>
  );
};

export default DoctorBanner;
