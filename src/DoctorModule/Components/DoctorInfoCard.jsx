import { IdCard, Mail, Phone } from 'lucide-react';
import React from 'react';

const DoctorInfoCard = () => (
  <div className="flex items-center gap-3 p-4 border border-blue-200 rounded-lg bg-blue-50">
    <div className='flex gap-4 w-[382px]'>
      <img
        src="https://randomuser.me/api/portraits/men/32.jpg"
        alt="Doctor Avatar"
      className="w-[132px] h-[132px] rounded-full object-cover border-[0.5px] border-blue-200"
    />
    <div className='flex flex-col gap-1'>
      <div className="font-semibold text-gray-800 text-base">Dr. Milind Chauhan</div>
      <div className="text-sm text-gray-600">General Physician</div>
      <div className="text-sm text-gray-600">MBBS, MD - General Medicine</div>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Mail className="text-blue-500 h-5 w-5" />
        <span>Milindchauhan@gmail.com</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Phone className="text-blue-500 h-5 w-5" />
        <span>+91 91753 67487</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <IdCard className="text-blue-500 h-5 w-5" />
        <span>DO00123</span>
      </div>
    </div>
    </div>

  </div>
);

export default DoctorInfoCard;
