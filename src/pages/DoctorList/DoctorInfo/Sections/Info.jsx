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

const Info = () => {
  return (
    <div className="flex flex-col pt-3 px-3 pb-6 gap-6">
      {/* About Doctor */}
      <div className="border flex flex-col p-3 gap-2 border-[#B8B8B8] rounded-lg">
        <div className="flex gap-1 items-center">
          <span className="text-[#424242] text-sm font-semibold">
            About Doctor
          </span>
        </div>
        <span className="font-normal text-[#626060] text-xs">
          Dr. Milind Chauhan practices Gynaecologist and Obstetrician in
          Andheri East, Mumbai and has 13 years of experience in this field. He
          has completed his DNB - Obstetric and Gynecology and MBBS. Dr. Milind
          Chauhan has gained the confidence of patients and is a popular
          Gynaecologist and Obstetrician expert in Mumbai who performs treatment
          and procedures for various health issues related to Gynaecologist and
          Obstetrician.
        </span>
      </div>

      {/* Sections in 2-column layout */}
      <div className="flex flex-wrap gap-6">
        {/* Basic Info */}
        <InfoSection title="Basic Info">
          <InfoRow label="Name:" value="Rahul Sharma" />
          <InfoRow label="Date Of Birth:" value="02 Feb 1986" />
          <InfoRow label="Age:" value="29 Years" />
          <InfoRow label="Gender:" value="Male" />
          <InfoRow label="Date Joined Platform:" value="12/08/2018" />
          <InfoRow label="Profile Created:" value="12/08/2018" />
        </InfoSection>

        {/* Contact Details */}
        <InfoSection title="Contact Details">
          <InfoRow label="Primary Phone:" value="+91 98765 43210" />
          <InfoRow label="Email Address:" value="rahul.sharma@gmail.com" />
          <InfoRow label="Primary Language:" value="Hindi" />
          <InfoRow label="Secondary Language:" value="English/Marathi" />
        </InfoSection>

        {/* Professional Information */}
        <InfoSection title="Professional Information">
          <InfoRow label="MRN Number:" value="29AACCC2943F1ZS" />
          <InfoRow label="Registration Council:" value="Maharashtra State Council" />
          <InfoRow label="Registration Year:" value="2008" />
          <InfoRow label="Specialization:" value="General Medicine (Exp: 10 years)" />
        </InfoSection>

        {/* Educational Information */}
        <InfoSection title="Educational Information">
          <InfoRow
            label="Graduation Degree:"
            value="MBBS (Completed - 2008) Government Medical College, Nagpur"
          />
          <InfoRow
            label="Post Graduation Degree:"
            value="MD in General Medicine (Completed - 2011) Government Medical College, Nagpur"
          />
        </InfoSection>

        {/* Certificates & Documents */}
        <InfoSection title="Certificates & Documents">
          <InfoRow label="MRN Number:" value="MRN Proof.pdf" link="#" />
          <InfoRow label="GST Number:" value="GST Proof.pdf" link="#" />
          <InfoRow
            label="Graduation Degree:"
            value="Graduation Proof.pdf"
            link="#"
          />
          <InfoRow
            label="Post Graduation Degree:"
            value="Post Graduation Proof.pdf"
            link="#"
          />
          <InfoRow label="Identity:" value="Pan Card Proof.pdf" link="#" />
          <InfoRow
            label="Clinic Establishment:"
            value="Clinic Establishment Proof.pdf"
            link="#"
          />
        </InfoSection>

        {/* Address Details */}
        <InfoSection title="Address Details">
          <InfoRow label="Permanent Address:" value="Jawahar Nagar Gokul Colony" />
          <InfoRow label="City:" value="Akola" />
          <InfoRow label="State:" value="Maharashtra" />
          <InfoRow label="Zip Code:" value="444001" />
        </InfoSection>
      </div>
    </div>
  );
};

export default Info;
