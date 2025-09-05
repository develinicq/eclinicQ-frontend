import React from "react";
import { Info } from "lucide-react";
import { useRegistration } from "../../context/RegistrationContext";
import { 
  Input,
  Radio,
  Upload,
  FormContainer,
  FormSection,
  FormFieldRow
} from "../../components/FormItems";

const Hos_4 = () => {
  const { formData, updateFormData } = useRegistration();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    updateFormData({
      [name]: type === 'radio' ? value : value
    });
  };

  return (
    <FormContainer>
      <FormSection
        title="Documents Verification"
        subtitle="Provide your Document Numbers and Upload Supporting Document for verification"
      >
        <div className="space-y-6 max-w-4xl mx-auto">
          {/* Warning Banner */}
          <div className="bg-orange-50 border border-orange-200 text-orange-700 p-4 rounded-lg flex items-start gap-2">
            <Info className="w-5 h-5 mt-0.5" />
            <p className="text-sm">
              <span className="font-semibold">Automated Verification ID</span>
              <br />
              We'll instantly verify the following IDs through their respective APIs. At least one verified ID is required to proceed.
            </p>
          </div>

          {/* GSTIN & ABHA Row */}
          <FormFieldRow>
            {/* GSTIN */}
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    label="GSTIN"
                    name="gstin"
                    placeholder="Enter 15-digit GSTIN"
                    value={formData.gstin || ''}
                    onChange={handleInputChange}
                    compulsory={true}
                    required={true}
                  />
                </div>
                <div className="flex items-end">
                  <button className="px-4 py-1 bg-gray-100 border rounded-lg text-sm font-medium hover:bg-gray-200">
                    Verify
                  </button>
                </div>
              </div>
              <div className="mt-3 border rounded-lg p-3 text-sm text-gray-600 bg-gray-50">
                <p className="font-medium mb-1">Fetched Details from GSTIN</p>
                <p>Legal Business Name :</p>
                <p>Registered Address :</p>
                <p>Status :</p>
              </div>
              <Upload />
            </div>

            {/* ABHA */}
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    label="ABHA Facility ID"
                    name="abhaId"
                    placeholder="Enter Abha ID"
                    value={formData.abhaId || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex items-end">
                  <button className="px-4 py-1 bg-gray-100 border rounded-lg text-sm font-medium hover:bg-gray-200 ">
                    Verify
                  </button>
                </div>
              </div>
              <div className="mt-3 border rounded-lg p-3 text-sm text-gray-600 bg-gray-50">
                <p className="font-medium mb-1">Fetched Details from ABHA</p>
                <p>Legal Business Name :</p>
                <p>Registered Address :</p>
                <p>Status :</p>
              </div>
              <Upload label="Upload File" />
            </div>
          </FormFieldRow>

          {/* CIN Question */}
          <div className="space-y-3">
            <Radio
              label="Do you have CIN (Corporate Hospital Registration Number)?"
              name="hasCin"
              value={formData.hasCin}
              onChange={handleInputChange}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" }
              ]}
            />
            {formData.hasCin === 'yes' && (
              <div>
                <Input
                  label="CIN Number"
                  name="cinNumber"
                  placeholder="Enter CIN Number"
                  value={formData.cinNumber || ''}
                  onChange={handleInputChange}
                />
              </div>
            )}
          </div>

          <div className="border" />

          {/* Other Documents */}
          <div className="space-y-4">
            {[
              {
                name: "stateHealthReg",
                label: "State Health Registration Number",
                required: true,
                placeholder: "Enter State Registration Number",
              },
              {
                name: "panCard",
                label: "PAN Card of Hospital",
                required: true,
                placeholder: "Enter PAN Number",
              },
              {
                name: "rohiniId",
                label: "Rohini ID",
                placeholder: "Enter 13-digit Rohini ID",
              },
              {
                name: "nabhAccreditation",
                label: "NABH Accreditation",
                placeholder: "Enter NABH Accreditation ID",
              },
            ].map((field, i) => (
              <FormFieldRow key={i}>
                <div className="space-y-3">
                  <Input
                    label={field.label}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ''}
                    onChange={handleInputChange}
                    compulsory={field.required}
                    required={field.required}
                  />
                  <p className="text-xs text-gray-500">
                    Upload Supporting Document of Size 4MB in .pdf format
                  </p>
                </div>
                <div className="flex items-start ">
                  <Upload label="Upload File" className="w-full" />
                </div>
              </FormFieldRow>
            ))}
          </div>
        </div>
      </FormSection>
    </FormContainer>
  );
};

export default Hos_4;
