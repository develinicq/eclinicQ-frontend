import React from "react";

const InfoRow = ({ label, value, link }) => (
  <div className="border-b border-[#F0F0F0] flex gap-2 py-2">
    <span className="font-normal min-w-[180px] text-sm text-[#626060]">
      {label}
    </span>
    {link ? (
      <a
        href={link}
        className="font-medium text-sm text-blue-600 underline"
        target="_blank"
        rel="noreferrer"
      >
        {value}
      </a>
    ) : (
      <span className="font-medium text-sm text-[#424242]">{value}</span>
    )}
  </div>
);

const InfoSection = ({ title, children }) => (
  <div className="flex flex-col gap-1 w-full md:w-[48%]">
    <span className="text-[#424242] font-medium text-sm">{title}</span>
    <div className="border-t border-[#D6D6D6] flex flex-col">{children}</div>
  </div>
);

const Clinical = () => {
  return (
    <div className="flex flex-col pt-1 px-3 pb-6 gap-6">
      <div className="flex flex-wrap gap-6">
        {/* Info */}
        <InfoSection title="Info">
          <InfoRow label="Name:" value="Sunrise Family Clinic" />
          <InfoRow label="Establishment Year:" value="12/09/2019" />
        </InfoSection>

        {/* Contact Details */}
        <InfoSection title="Clinic Contact">
          <InfoRow
            label="Clinic Contact Email:"
            value="contact@sunrisefamilyclinic.com"
            link="mailto:contact@sunrisefamilyclinic.com"
          />
          <InfoRow label="Clinic Contact Number:" value="9876543210" />
        </InfoSection>

        {/* Clinic Address */}
        <InfoSection title="Clinic Address">
          <InfoRow label="Address:" value="Manipal Health Enterprise Pvt Ltd. The Annexe, #98/2, Rustam Bagh, Off HAL" />
          <InfoRow label="City:" value="Akola" />
          <InfoRow label="State:" value="Maharashtra" />
          <InfoRow label="Zip Code:" value="444001" />
        </InfoSection>

        {/* Map Location */}
        <InfoSection title="Map Location">
          <div className="w-full h-[150px] border border-[#D6D6D6] rounded-md overflow-hidden">
            <iframe
              src="https://maps.google.com/maps?q=Akola,Maharashtra&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full"
              title="Clinic Location"
            ></iframe>
          </div>
        </InfoSection>

        {/* Clinic Photos */}
        <InfoSection title="Clinic Photos">
          <div className="flex gap-3 mt-2 flex-wrap">
            <img src="/clinic1.jpg" alt="Clinic" className="w-[120px] h-[120px] rounded-lg border" />
            <img src="/clinic2.jpg" alt="Clinic" className="w-[120px] h-[120px] rounded-lg border" />
            <img src="/clinic3.jpg" alt="Clinic" className="w-[120px] h-[120px] rounded-lg border" />
            <img src="/clinic4.jpg" alt="Clinic" className="w-[120px] h-[120px] rounded-lg border" />
          </div>
        </InfoSection>
      </div>
    </div>
  );
};

export default Clinical;
