import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import {
  FormFieldRow,
  RegistrationHeader
} from '../../../../components/FormItems';
import InputWithMeta from '../../../../components/GeneralDrawer/InputWithMeta';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ChevronDown } from 'lucide-react';
import useHospitalDoctorDetailsStore from '../../../../store/useHospitalDoctorDetailsStore';
import useDoctorRegistrationStore from '../../../../store/useDoctorRegistrationStore';
import CustomUpload from '../Doctor_registration/CustomUpload';
import axios from '../../../../lib/axios';
import useToastStore from '../../../../store/useToastStore';
import useHospitalRegistrationStore from '../../../../store/useHospitalRegistrationStore';

const Hos_2 = forwardRef((props, ref) => {
  // Use dedicated hospital doctor details store
  const drStore = useHospitalDoctorDetailsStore();
  const { setField } = drStore;
  // Minimal local state to control PG conditional fields
  const [hasPG, setHasPG] = useState('');
  const [loading, setLoading] = useState(false);

  // Dropdown open states
  const [councilOpen, setCouncilOpen] = useState(false);
  const [gradOpen, setGradOpen] = useState(false);
  const [gradCollegeOpen, setGradCollegeOpen] = useState(false);
  const [pgDegreeOpen, setPgDegreeOpen] = useState(false);
  const [pgCollegeOpen, setPgCollegeOpen] = useState(false);
  const [specOpen, setSpecOpen] = useState(false);
  const [addSpecOpen, setAddSpecOpen] = useState({}); // { [index]: boolean }

  // Registration store only for additional specialization rows
  const regStore = useDoctorRegistrationStore();
  const { userId: regUserId } = regStore;
  const { additionalPractices, addPractice, updatePractice, setDocument } = drStore;

  const getDoc = (no) => drStore.documents?.find(d => d.no === no);

  // Make sure the doctor userId from Step1 is mirrored here
  // Note: logic in Step1 might handle this, but safeguard here
  useEffect(() => {
    if (!drStore.userId && regUserId) {
      setField('userId', String(regUserId));
    }
  }, [regUserId, drStore.userId, setField]);

  useEffect(() => {
    // If store already has PG data, set radio to yes
    if (drStore.pgMedicalDegreeType || drStore.pgMedicalDegreeUniversityName) {
      setHasPG('yes');
    } else {
      setHasPG('no');
    }
  }, []);

  const councilOptions = [
    { value: "Maharashtra Medical Council", label: "Maharashtra Medical Council" },
    { value: "Medical Council of India", label: "Medical Council of India" },
    { value: "Andhra Pradesh Medical Council", label: "Andhra Pradesh Medical Council" },
    { value: "Arunachal Pradesh Medical Council", label: "Arunachal Pradesh Medical Council" },
    { value: "Assam Medical Council", label: "Assam Medical Council" },
    { value: "Bihar Medical Council", label: "Bihar Medical Council" },
    { value: "Chhattisgarh Medical Council", label: "Chhattisgarh Medical Council" },
    { value: "Delhi Medical Council", label: "Delhi Medical Council" },
    { value: "Goa Medical Council", label: "Goa Medical Council" },
    { value: "Gujarat Medical Council", label: "Gujarat Medical Council" },
    { value: "Haryana Medical Council", label: "Haryana Medical Council" }
  ];

  const gradDegreeOptions = [
    { value: "MBBS", label: "MBBS" },
    { value: "BDS", label: "BDS" },
    { value: "BAMS", label: "BAMS" },
    { value: "BHMS", label: "BHMS" },
    { value: "BUMS", label: "BUMS" },
    { value: "BNYS", label: "BNYS" },
    { value: "BSMS", label: "BSMS" }
  ];

  const collegeOptions = [
    { value: "AIIMS Delhi", label: "AIIMS Delhi" },
    { value: "Grant Medical College Mumbai", label: "Grant Medical College Mumbai" },
    { value: "KEM Hospital Mumbai", label: "KEM Hospital Mumbai" },
    { value: "Christian Medical College Vellore", label: "Christian Medical College Vellore" },
    { value: "Maulana Azad Medical College Delhi", label: "Maulana Azad Medical College Delhi" },
    { value: "Other", label: "Other" }
  ];

  const pgDegreeOptions = [
    { value: "MD (Internal Medicine)", label: "MD (Internal Medicine)" },
    { value: "MS (General Surgery)", label: "MS (General Surgery)" },
    { value: "MD (Pediatrics)", label: "MD (Pediatrics)" },
    { value: "MS (Orthopedics)", label: "MS (Orthopedics)" },
    { value: "MD (Radiology)", label: "MD (Radiology)" },
    { value: "MS (ENT)", label: "MS (ENT)" }
  ];

  const specializationOptions = [
    { value: "General Medicine (Internal Medicine)", label: "General Medicine (Internal Medicine)" },
    { value: "General Surgery", label: "General Surgery" },
    { value: "Pediatrics", label: "Pediatrics" },
    { value: "Orthopedics", label: "Orthopedics" },
    { value: "Obstetrics & Gynecology", label: "Obstetrics & Gynecology" },
    { value: "Dermatology", label: "Dermatology" },
  ];


  const [formErrors, setFormErrors] = useState({});

  // Validation functions
  const validateField = (name, value) => {
    switch (name) {
      case 'councilNumber':
        if (!value) return 'Required';
        if (!/^\w{4,}$/.test(value)) return 'Invalid Reg. No.';
        return '';
      case 'councilName':
        if (!value) return 'Required';
        return '';
      case 'regYear':
      case 'graduationYear':
      case 'pgYear':
        if (name === 'pgYear' && hasPG !== 'yes') return '';
        if (!value) return 'Required';
        if (!/^\d{4}$/.test(value)) return 'Year must be 4 digits';
        const year = parseInt(value);
        const currentYear = new Date().getFullYear();
        if (year > currentYear) return "Future year not allowed";
        if (year < currentYear - 100) return "Year too old (max 100 years)";
        return '';
      case 'graduation':
      case 'graduationCollege':
        if (!value) return 'Required';
        return '';
      case 'specialization':
        if (!value || (typeof value === 'object' && !value.value && !value.name)) return 'Required';
        return '';
      case 'experience':
        if (!value) return 'Required';
        // Allow 0, check for negative
        if (!/^\d+$/.test(value) || Number(value) < 0) return 'Invalid years';
        return '';
      case 'pgDegree':
      case 'pgCollege':
        if (hasPG === 'yes' && !value) return 'Required';
        return '';
      default:
        return '';
    }
  };

  // Helper to filter specialization options to avoid duplicates
  const getFilteredOptions = (currentValue) => {
    const selectedSpecs = [
      typeof drStore.specialization === 'object' ? (drStore.specialization?.value || drStore.specialization?.name) : drStore.specialization,
      ...(additionalPractices || []).map(p => typeof p.specialization === 'object' ? (p.specialization?.value || p.specialization?.name) : p.specialization)
    ].filter(Boolean);

    return specializationOptions.filter(opt => {
      // If the option is the current one, show it
      if (opt.value === currentValue) return true;
      // Otherwise, show it only if it's not already selected
      return !selectedSpecs.includes(opt.value);
    });
  };

  const handleInputChange = (name, value) => {
    switch (name) {
      case 'councilNumber':
        setField('medicalCouncilRegNo', value);
        break;
      case 'councilName':
        setField('medicalCouncilName', value);
        break;
      case 'regYear':
        setField('medicalCouncilRegYear', value);
        break;
      case 'graduation':
        setField('medicalDegreeType', value);
        break;
      case 'graduationCollege':
        setField('medicalDegreeUniversityName', value);
        break;
      case 'graduationYear':
        setField('medicalDegreeYearOfCompletion', value);
        break;
      case 'hasPG':
        setHasPG(value);
        if (value !== 'yes') {
          setField('pgMedicalDegreeType', '');
          setField('pgMedicalDegreeUniversityName', '');
          setField('pgMedicalDegreeYearOfCompletion', '');
        }
        break;
      case 'pgDegree':
        setField('pgMedicalDegreeType', value);
        break;
      case 'pgCollege':
        setField('pgMedicalDegreeUniversityName', value);
        break;
      case 'pgYear':
        setField('pgMedicalDegreeYearOfCompletion', value);
        break;
      case 'specialization':
        {
          const opt = specializationOptions.find(o => o.value === value);
          setField('specialization', { name: opt?.label || value, value });
        }
        break;
      case 'experience':
        setField('experienceYears', value);
        break;
      default:
        break;
    }

    setFormErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  // Submit API call: update admin's doctor details
  useImperativeHandle(ref, () => ({
    async submit() {
      // Basic validation (ensure required doctor fields exist)
      const required = [
        drStore.medicalCouncilName,
        drStore.medicalCouncilRegYear,
        drStore.medicalCouncilRegNo,
        drStore.medicalDegreeType,
        drStore.medicalDegreeUniversityName,
        drStore.medicalDegreeYearOfCompletion,
        drStore.specialization,
        drStore.experienceYears,
      ];
      if (required.some((v) => !v || (typeof v === 'object' && !v.name && !v.value))) {
        useToastStore.getState().addToast({
          title: 'Error',
          message: 'Please complete required doctor details before continuing.',
          type: 'error',
          duration: 3500,
        });
        return false;
      }

      setLoading(true);
      try {
        // userId for payload is adminId from Hos_1 response
        const { adminId } = useHospitalRegistrationStore.getState();
        const userId = adminId || drStore.userId;
        if (!userId) throw new Error('Missing adminId (userId). Complete Step 1 first.');

        // Build specialization array: primary + additionalPractices
        const primarySpec = drStore.specialization;
        const specialization = [];
        if (primarySpec) {
          specialization.push({
            name: typeof primarySpec === 'object' ? (primarySpec.name || primarySpec.value) : primarySpec,
            expYears: String(drStore.experienceYears || ''),
          });
        }
        if (Array.isArray(drStore.additionalPractices)) {
          drStore.additionalPractices.forEach((p) => {
            if (p?.specialization) {
              specialization.push({
                name: typeof p.specialization === 'object' ? (p.specialization.name || p.specialization.value) : p.specialization,
                expYears: String(p.experienceYears || ''),
              });
            }
          });
        }

        // Documents mapping
        const mrnProof = (drStore.documents || []).find((d) => d.no === 1)?.url;
        const gradProof = (drStore.documents || []).find((d) => d.no === 2)?.url;
        const pgProof = (drStore.documents || []).find((d) => d.no === 3)?.url;

        // Education array: Graduation + optional PG
        const education = [];
        if (drStore.medicalDegreeUniversityName || drStore.medicalDegreeType || drStore.medicalDegreeYearOfCompletion) {
          education.push({
            instituteName: drStore.medicalDegreeUniversityName,
            graduationType: 'GRADUATE',
            degree: drStore.medicalDegreeType,
            completionYear: Number(drStore.medicalDegreeYearOfCompletion),
            proofDocumentUrl: gradProof,
          });
        }
        if (drStore.pgMedicalDegreeUniversityName || drStore.pgMedicalDegreeType || drStore.pgMedicalDegreeYearOfCompletion) {
          education.push({
            instituteName: drStore.pgMedicalDegreeUniversityName,
            graduationType: 'POST_GRADUATE',
            degree: drStore.pgMedicalDegreeType,
            completionYear: Number(drStore.pgMedicalDegreeYearOfCompletion),
            proofDocumentUrl: pgProof,
          });
        }

        const payload = {
          userId,
          specialization,
          medicalCouncilName: drStore.medicalCouncilName,
          medicalCouncilRegYear: drStore.medicalCouncilRegYear,
          medicalCouncilRegNo: drStore.medicalCouncilRegNo,
          medicalCouncilProof: mrnProof,
          education,
        };

        // Clean undefined values
        Object.keys(payload).forEach((k) => payload[k] === undefined && delete payload[k]);

        const res = await axios.post('/hospitals/onboarding/update-admin-doctor-details', payload);
        const success = res?.data?.success ?? true;
        if (!success) throw new Error(res?.data?.message || 'Update failed');

        useToastStore.getState().addToast({
          title: 'Success',
          message: 'Doctor details updated successfully (Step 2).',
          type: 'success',
          duration: 3000,
        });
        setLoading(false);
        return true;
      } catch (err) {
        const msg = err?.response?.data?.message || err.message || 'Submission failed';
        useToastStore.getState().addToast({
          title: 'Error',
          message: msg,
          type: 'error',
          duration: 3500,
        });
        setLoading(false);
        return false;
      }
    }
  }));

  return (
    <div className="flex flex-col h-full bg-white rounded-md shadow-sm overflow-hidden">
      <RegistrationHeader
        title="Register as Doctor"
        subtitle="Complete the following information to register as a doctor in the system"
      />

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-[700px] mx-auto space-y-5">

          {/* Medical Registration */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-gray-900">
              Medical Registration
            </h2>
            <FormFieldRow>
              <div className="w-full">
                <InputWithMeta
                  label="Medical Council Registration Number"
                  requiredDot={true}
                  value={drStore.medicalCouncilRegNo || ''}
                  onChange={(val) => handleInputChange('councilNumber', val)}
                  placeholder="Hospital Name" /* Matches placeholder in image */
                />
                {formErrors.councilNumber && <span className="text-red-500 text-xs">{formErrors.councilNumber}</span>}
              </div>
              <div className="w-full">
                <InputWithMeta
                  label="Registration Council"
                  value={drStore.medicalCouncilName || ''}
                  requiredDot
                  placeholder="Select Medical Council"
                  RightIcon={ChevronDown}
                  readonlyWhenIcon={true}
                  onIconClick={() => setCouncilOpen(!councilOpen)}
                  dropdownOpen={councilOpen}
                  onRequestClose={() => setCouncilOpen(false)}
                  dropdownItems={councilOptions}
                  onSelectItem={(item) => {
                    handleInputChange('councilName', item.value);
                    setCouncilOpen(false);
                  }}
                  compulsory
                />
                {formErrors.councilName && <span className="text-red-500 text-xs">{formErrors.councilName}</span>}
              </div>
            </FormFieldRow>
            <FormFieldRow>
              <div className="w-full">
                <InputWithMeta
                  label="Registration Year"
                  requiredDot={true}
                  value={drStore.medicalCouncilRegYear || ''}
                  onChange={(val) => handleInputChange('regYear', val)}
                  placeholder="Enter Year"
                  meta="Visible to Patient"
                />
                {formErrors.regYear && <span className="text-red-500 text-xs">{formErrors.regYear}</span>}
              </div>
              <div className="w-full">
                <CustomUpload
                  label="Upload MRN Proof"
                  compulsory={true}
                  onUpload={(key, name) => setDocument({ no: 1, type: 'medical_license', url: key, fileName: name })}
                  meta="Support Size upto 1MB in .png, .jpg, .svg, .webp"
                  uploadedKey={getDoc(1)?.url}
                  fileName={getDoc(1)?.fileName}
                />
              </div>
            </FormFieldRow>
          </div>

          <div className='border-t border-secondary-grey200/20 my-4'></div>

          {/* Qualifications */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-gray-900">
              Qualifications
            </h2>
            <FormFieldRow>
              <div className="w-full">
                <InputWithMeta
                  label="Graduation"
                  value={drStore.medicalDegreeType || ''}
                  requiredDot
                  placeholder="Select Degree Type"
                  RightIcon={ChevronDown}
                  readonlyWhenIcon={true}
                  onIconClick={() => setGradOpen(!gradOpen)}
                  dropdownOpen={gradOpen}
                  onRequestClose={() => setGradOpen(false)}
                  dropdownItems={gradDegreeOptions}
                  onSelectItem={(item) => {
                    handleInputChange('graduation', item.value);
                    setGradOpen(false);
                  }}
                  compulsory
                />
                {formErrors.graduation && <span className="text-red-500 text-xs">{formErrors.graduation}</span>}
              </div>
              <div className="w-full">
                <InputWithMeta
                  label="College/ University"
                  value={drStore.medicalDegreeUniversityName || ''}
                  requiredDot
                  infoIcon
                  placeholder="Search Name of Institution"
                  RightIcon={ChevronDown}
                  readonlyWhenIcon={true}
                  onIconClick={() => setGradCollegeOpen(!gradCollegeOpen)}
                  dropdownOpen={gradCollegeOpen}
                  onRequestClose={() => setGradCollegeOpen(false)}
                  dropdownItems={collegeOptions}
                  onSelectItem={(item) => {
                    handleInputChange('graduationCollege', item.value);
                    setGradCollegeOpen(false);
                  }}
                  compulsory
                />
                {formErrors.graduationCollege && <span className="text-red-500 text-xs">{formErrors.graduationCollege}</span>}
              </div>
            </FormFieldRow>
            <FormFieldRow>
              <div className="w-full">
                <InputWithMeta
                  label="Year of Completion"
                  requiredDot={true}
                  value={drStore.medicalDegreeYearOfCompletion || ''}
                  onChange={(val) => handleInputChange('graduationYear', val)}
                  placeholder="Enter Year"
                />
                {formErrors.graduationYear && <span className="text-red-500 text-xs">{formErrors.graduationYear}</span>}
              </div>
              <div className="w-full">
                <CustomUpload
                  label="Upload Degree Proof"
                  compulsory={true}
                  onUpload={(key, name) => setDocument({ no: 2, type: 'degree_certificate', url: key, fileName: name })}
                  meta="Support Size upto 1MB in .png, .jpg, .svg, .webp"
                  uploadedKey={getDoc(2)?.url}
                  fileName={getDoc(2)?.fileName}
                />
              </div>
            </FormFieldRow>
          </div>

          {/* Post Graduation Question */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-secondary-grey400">Do you have Post Graduation Degree ?</span>
            <RadioGroup
              className="flex gap-4"
              value={hasPG}
              onValueChange={(val) => handleInputChange('hasPG', val)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="pg_yes" />
                <label htmlFor="pg_yes" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-secondary-grey300">Yes</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="pg_no" />
                <label htmlFor="pg_no" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-secondary-grey300">No</label>
              </div>
            </RadioGroup>
          </div>

          {hasPG === "yes" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <InputWithMeta
                  label="Post Graduate Degree"
                  value={drStore.pgMedicalDegreeType || ''}
                  requiredDot
                  placeholder="Select Degree Type"
                  RightIcon={ChevronDown}
                  readonlyWhenIcon={true}
                  onIconClick={() => setPgDegreeOpen(!pgDegreeOpen)}
                  dropdownOpen={pgDegreeOpen}
                  onRequestClose={() => setPgDegreeOpen(false)}
                  dropdownItems={pgDegreeOptions}
                  onSelectItem={(item) => {
                    handleInputChange('pgDegree', item.value);
                    setPgDegreeOpen(false);
                  }}
                />
                {formErrors.pgDegree && <span className="text-red-500 text-xs">{formErrors.pgDegree}</span>}

                <InputWithMeta
                  label="Year of Completion"
                  requiredDot={true}
                  value={drStore.pgMedicalDegreeYearOfCompletion || ''}
                  onChange={(val) => handleInputChange('pgYear', val)}
                  placeholder="Enter Year"
                />
                {formErrors.pgYear && <span className="text-red-500 text-xs">{formErrors.pgYear}</span>}

              </div>
              <div className="space-y-4">
                <InputWithMeta
                  label="College/ University"
                  value={drStore.pgMedicalDegreeUniversityName || ''}
                  requiredDot
                  infoIcon
                  placeholder="Search Name of Institution"
                  RightIcon={ChevronDown}
                  readonlyWhenIcon={true}
                  onIconClick={() => setPgCollegeOpen(!pgCollegeOpen)}
                  dropdownOpen={pgCollegeOpen}
                  onRequestClose={() => setPgCollegeOpen(false)}
                  dropdownItems={collegeOptions}
                  onSelectItem={(item) => {
                    handleInputChange('pgCollege', item.value);
                    setPgCollegeOpen(false);
                  }}
                />
                {formErrors.pgCollege && <span className="text-red-500 text-xs">{formErrors.pgCollege}</span>}

                <div className="w-full">
                  <CustomUpload
                    label="Upload Degree Proof"
                    compulsory={false}
                    onUpload={(key, name) => setDocument({ no: 3, type: 'specialization_certificate', url: key, fileName: name })}
                    meta="Support Size upto 1MB in .png, .jpg, .svg, .webp"
                    uploadedKey={getDoc(3)?.url}
                    fileName={getDoc(3)?.fileName}
                  />
                </div>

              </div>
            </div>
          )}

          <div className='border-t border-secondary-grey200/20 my-4'></div>

          {/* Practice Details */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-gray-900">
              Practice Details
            </h2>
            <FormFieldRow>
              <div className="w-full">
                <InputWithMeta
                  label="Primary Specialization"
                  value={typeof drStore.specialization === 'object' ? (drStore.specialization?.value || drStore.specialization?.name || '') : (drStore.specialization || '')}
                  requiredDot
                  placeholder="Select Degree Type"
                  RightIcon={ChevronDown}
                  readonlyWhenIcon={true}
                  onIconClick={() => setSpecOpen(!specOpen)}
                  dropdownOpen={specOpen}
                  onRequestClose={() => setSpecOpen(false)}
                  dropdownItems={getFilteredOptions(typeof drStore.specialization === 'object' ? (drStore.specialization?.value || drStore.specialization?.name || '') : (drStore.specialization || ''))}
                  onSelectItem={(item) => {
                    handleInputChange('specialization', item.value);
                    setSpecOpen(false);
                  }}
                  compulsory
                  dropUp={true}
                />
                {formErrors.specialization && <span className="text-red-500 text-xs">{formErrors.specialization}</span>}
              </div>
              <div className="w-full">
                <InputWithMeta
                  label="Year of Experience"
                  requiredDot={true}
                  value={drStore.experienceYears || ''}
                  onChange={(val) => handleInputChange('experience', val)}
                  placeholder="Enter Year"
                />
                {formErrors.experience && <span className="text-red-500 text-xs">{formErrors.experience}</span>}
              </div>
            </FormFieldRow>

            <button
              type="button"
              onClick={addPractice}
              className="text-blue-primary250 text-sm hover:underline font-medium"
            >
              + Add More Speciality
            </button>

            {/* Additional Practices */}
            {Array.isArray(additionalPractices) && additionalPractices.length > 0 && (
              <div className="space-y-4 pt-2">
                {additionalPractices.map((p, idx) => (
                  <div key={idx} className="bg-gray-50 p-3 rounded border border-gray-100 relative">
                    <div className="absolute right-2 top-2">
                      <button type="button" onClick={() => drStore.removePractice(idx)} className="text-red-400 text-xs">Remove</button>
                    </div>
                    <FormFieldRow>
                      <div className="w-full">
                        <InputWithMeta
                          label="Specialization"
                          value={typeof p.specialization === 'object' ? (p.specialization?.value || p.specialization?.name || '') : (p.specialization || '')}
                          requiredDot
                          placeholder="Select Specialization"
                          RightIcon={ChevronDown}
                          readonlyWhenIcon={true}
                          onIconClick={() => setAddSpecOpen(prev => ({ ...prev, [idx]: !prev[idx] }))}
                          dropdownOpen={addSpecOpen[idx]}
                          onRequestClose={() => setAddSpecOpen(prev => ({ ...prev, [idx]: false }))}
                          dropdownItems={getFilteredOptions(typeof p.specialization === 'object' ? (p.specialization?.value || p.specialization?.name || '') : (p.specialization || ''))}
                          onSelectItem={(item) => {
                            updatePractice(idx, { specialization: { name: item.label || item.value, value: item.value } });
                            setAddSpecOpen(prev => ({ ...prev, [idx]: false }));
                          }}
                          compulsory
                          dropUp={true}
                        />
                      </div>
                      <div className="w-full">
                        <InputWithMeta
                          label="Year of Experience"
                          requiredDot={true}
                          value={p.experienceYears || ''}
                          onChange={(val) => updatePractice(idx, { experienceYears: val })}
                          placeholder="Enter Year"
                        />
                      </div>
                    </FormFieldRow>
                  </div>
                ))}
              </div>
            )}

          </div>

          <div className="pb-8"></div>
        </div>
      </div>
    </div>
  );
});

export default Hos_2;
