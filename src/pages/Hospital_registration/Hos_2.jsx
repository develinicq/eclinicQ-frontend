import React, { useState } from 'react';
import { 
  Input,
  Dropdown,
  Upload,
  Radio,
  FormContainer,
  FormSection,
  FormFieldRow
} from '../../components/FormItems';
import useDoctorRegistrationStore from '../../store/useDoctorRegistrationStore';

const Hos_2 = () => {
  // Use Doctor Registration Store to keep data for submission at Hos_6
  const drStore = useDoctorRegistrationStore();
  const { setField } = drStore;
  // Minimal local state to control PG conditional fields
  const [hasPG, setHasPG] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
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
        // Clear PG fields if toggled to 'no'
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
        setField('specialization', value);
        break;
      case 'experience':
        setField('experienceYears', value);
        break;
      default:
        break;
    }
  };

  const commonFieldProps = {
    compulsory: true,
    required: true
  };

  return (
    <FormContainer>
      <FormSection
        title="Register as Doctor"
        subtitle="Complete the following information to register as a doctor in the system"
      >
        <div className="space-y-6">
          {/* Medical Registration */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Medical Registration
            </h2>
            <FormFieldRow>
              <Input
                label="Medical Council Registration Number"
                name="councilNumber"
                value={drStore.medicalCouncilRegNo || ''}
                onChange={handleInputChange}
                {...commonFieldProps}
              />
              <Dropdown
                label="Registration Council"
                name="councilName"
                value={drStore.medicalCouncilName || ''}
                onChange={handleInputChange}
                options={[
                  { value: "Maharashtra Medical Council", label: "Maharashtra Medical Council" },
                  { value: "Delhi Medical Council", label: "Delhi Medical Council" }
                ]}
                placeholder="Select Council"
                {...commonFieldProps}
              />
            </FormFieldRow>
            <FormFieldRow>
              <div>
                <Input
                  label="Registration Year"
                  name="regYear"
                  value={drStore.medicalCouncilRegYear || ''}
                  onChange={handleInputChange}
                  {...commonFieldProps}
                />
                <p className="text-xs text-gray-400 mt-1">Visible to Patient</p>
              </div>
              <Upload
                label="Upload MRN Proof"
                compulsory={true}
              />
            </FormFieldRow>
          </div>

          {/* Education Details */}
          <div className="space-y-4 mb-3">
            <h2 className="text-lg font-semibold text-gray-900">
              Education Details
            </h2>
            <FormFieldRow>
              <Input
                label="Graduation Degree"
                name="graduation"
                value={drStore.medicalDegreeType || ''}
                onChange={handleInputChange}
                {...commonFieldProps}
              />
              <Input
                label="Graduation College"
                name="graduationCollege"
                value={drStore.medicalDegreeUniversityName || ''}
                onChange={handleInputChange}
                {...commonFieldProps}
              />
            </FormFieldRow>
            <FormFieldRow>
              <Input
                label="Graduation Year"
                name="graduationYear"
                value={drStore.medicalDegreeYearOfCompletion || ''}
                onChange={handleInputChange}
                {...commonFieldProps}
              />
              <Upload label="Upload Degree Proof" compulsory={true} />
            </FormFieldRow>
          </div>

          {/* Post Graduation */}
          <div className="space-y-4">
            <Radio
              label="Do you have Post Graduation Degree?"
              name="hasPG"
              value={hasPG}
              onChange={handleInputChange}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" }
              ]}
            />
            {hasPG === "yes" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <Dropdown
                    label="Post Graduate Degree"
                    name="pgDegree"
                    value={drStore.pgMedicalDegreeType || ''}
                    onChange={handleInputChange}
                    options={[
                      { value: "MD", label: "MD" },
                      { value: "MS", label: "MS" },
                      { value: "DM", label: "DM" },
                      { value: "MCh", label: "MCh" },
                      { value: "DNB", label: "DNB" }
                    ]}
                    placeholder="Select Degree"
                    {...commonFieldProps}
                  />
                  <Input
                    label="Year of Completion"
                    name="pgYear"
                    value={drStore.pgMedicalDegreeYearOfCompletion || ''}
                    onChange={handleInputChange}
                    {...commonFieldProps}
                  />
                </div>
                <div className="space-y-4">
                  <Input
                    label="College/ University"
                    name="pgCollege"
                    value={drStore.pgMedicalDegreeUniversityName || ''}
                    onChange={handleInputChange}
                    placeholder="Search or Enter College"
                    {...commonFieldProps}
                  />
                  <Upload 
                    label="Upload Degree Proof" 
                    compulsory={false}
                  />
                </div>
              </div>
            )}
          </div>

          <div className='border mb'></div>

          {/* Practice Details */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Practice Details
            </h2>
            <FormFieldRow>
              <Input
                label="Specialization"
                name="specialization"
                value={typeof drStore.specialization === 'object' ? (drStore.specialization?.name || drStore.specialization?.value || '') : (drStore.specialization || '')}
                onChange={handleInputChange}
                {...commonFieldProps}
              />
              <Input
                label="Years of Experience"
                name="experience"
                value={drStore.experienceYears || ''}
                onChange={handleInputChange}
                {...commonFieldProps}
              />
            </FormFieldRow>
          </div>
        </div>
      </FormSection>
    </FormContainer>
  );
};

export default Hos_2;
