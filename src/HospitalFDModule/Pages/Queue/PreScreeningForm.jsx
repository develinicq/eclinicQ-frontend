// src/hospitalfdmodule/queue/PreScreeningForm.jsx

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, AlertTriangle, Heart, Smile, Syringe, Users, MessageCircle, Calendar } from 'lucide-react';
import GeneralDrawer from '../../../components/GeneralDrawer/GeneralDrawer.jsx';
import Button from '../../../components/Button.jsx';
import AvatarCircle from '../../../components/AvatarCircle.jsx';
import InputWithMeta from '../../../components/GeneralDrawer/InputWithMeta.jsx';

export default function PreScreeningForm({ open, token, patientData, onClose }) {
  const [vitalsOpen, setVitalsOpen] = useState(true);
  const [biometricsOpen, setBiometricsOpen] = useState(false);
  const [medicalOpen, setMedicalOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('problems');
  const [showAddForm, setShowAddForm] = useState(false);
  
  const [formData, setFormData] = useState({
    bpSys: '',
    bpDia: '',
    o2: '',
    pulse: '',
    resp: '',
    temp: '',
    glucose: '',
    heightFt: '',
    heightIn: '',
    weight: '',
    waist: '',
    bmi: '',
    problems: [],
    allergies: [],
    conditions: [],
    immunizations: [],
    family: [],
    social: []
  });

  const [currentItem, setCurrentItem] = useState({
    name: '',
    since: '',
    severity: '',
    status: 'Active',
    note: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAdd = () => {
    if (currentItem.name) {
      setFormData(prev => ({
        ...prev,
        [activeTab]: [...(prev[activeTab] || []), { ...currentItem, id: Date.now() }]
      }));
      setCurrentItem({ name: '', since: '', severity: '', status: 'Active', note: '' });
      setShowAddForm(false);
    }
  };

  const handleSave = () => {
    console.log('Saving pre-screening data:', formData);
    onClose();
  };

  const getGenderSymbol = (gender) => {
    if (gender === 'M' || gender === 'Male') return '♂';
    if (gender === 'F' || gender === 'Female') return '♀';
    return '⚥';
  };

  const getMRN = (token) => {
    return `P${String(token).padStart(6, '0')}`;
  };

  const VitalInput = ({ label, value, unit, field, placeholder = "Value" }) => (
    <InputWithMeta
      label={label}
      value={value}
      onChange={(val) => handleInputChange(field, val)}
      placeholder={placeholder}
      inputRightMeta={unit}
    />
  );

  const tabs = [
    { id: 'problems', icon: AlertTriangle, label: 'Problems' },
    { id: 'conditions', icon: Heart, label: 'Conditions' },
    { id: 'allergies', icon: Smile, label: 'Allergies' },
    { id: 'immunizations', icon: Syringe, label: 'Immunizations' },
    { id: 'family', icon: Users, label: 'Family History' },
    { id: 'social', icon: MessageCircle, label: 'Social' }
  ];

  return (
    <GeneralDrawer
      isOpen={open}
      onClose={onClose}
      title="Add Pre-Screening"
      width={800}
      primaryActionLabel="Enter Note"
      onPrimaryAction={handleSave}
      showPrimaryAction={true}
    >
      {/* Patient Details Card */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 mb-4">
        <div className="px-4 py-3">
          <p className="text-xs text-gray-500 mb-2">Patient Details</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Using AvatarCircle component */}
              <AvatarCircle 
                name={patientData?.patientName || 'P'}
                size="md"
                color="blue"
              />
              
              <div>
                <h3 className="font-semibold text-gray-800">{patientData?.patientName || 'Patient Name'}</h3>
                <div className="flex items-center gap-3 text-xs text-gray-600 mt-0.5">
                  <span>{patientData?.dob || 'DD/MM/YYYY'} ({patientData?.age || 'N/A'})</span>
                  <span className="flex items-center gap-1">
                    <span className={patientData?.gender === 'M' || patientData?.gender === 'Male' ? 'text-blue-500' : 'text-pink-500'}>
                      {getGenderSymbol(patientData?.gender)}
                    </span>
                    {patientData?.gender === 'M' ? 'Male' : patientData?.gender === 'F' ? 'Female' : 'Other'}
                  </span>
                  <span className="flex items-center gap-1">
                    <span>🩸</span> {patientData?.bloodGroup || 'N/A'}
                  </span>
                  <span>MRN: {getMRN(token)}</span>
                </div>
              </div>
            </div>
            
            {token && (
              <div className="text-right">
                <p className="text-xs text-gray-500">Token Number</p>
                <p className="text-2xl font-semibold text-blue-600">{String(token).padStart(2, '0')}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Vitals Section */}
      <div className="mb-4 ">
        <button
          onClick={() => setVitalsOpen(!vitalsOpen)}
          className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50"
        >
          <span className="font-medium text-gray-800">Vitals</span>
          {vitalsOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
        
        {vitalsOpen && (
          <div className="px-4 pb-4 space-y-4 border-t pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Blood Pressure</label>
                <div className="flex gap-2">
                  <InputWithMeta
                    placeholder="Value"
                    value={formData.bpSys}
                    onChange={(val) => handleInputChange('bpSys', val)}
                    inputRightMeta="Sys"
                  />
                  <InputWithMeta
                    placeholder="Value"
                    value={formData.bpDia}
                    onChange={(val) => handleInputChange('bpDia', val)}
                    inputRightMeta="Dia"
                  />
                </div>
              </div>
              <VitalInput 
                label="Oxygen Saturation" 
                value={formData.o2} 
                unit="%" 
                field="o2"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <VitalInput 
                label="Pulse Rate" 
                value={formData.pulse} 
                unit="bpm" 
                field="pulse"
              />
              <VitalInput 
                label="Respiratory Rate" 
                value={formData.resp} 
                unit="rpm" 
                field="resp"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <VitalInput 
                label="Body Temperature" 
                value={formData.temp} 
                unit="F" 
                field="temp"
              />
              <VitalInput 
                label="Blood Glucose Level" 
                value={formData.glucose} 
                unit="mg/dl" 
                field="glucose"
              />
            </div>
          </div>
        )}
      </div>

      {/* Biometrics Section */}
      <div className="mb-4">
        <button 
          onClick={() => setBiometricsOpen(!biometricsOpen)}
          className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50"
        >
          <span className="font-medium text-gray-800">Biometrics</span>
          {biometricsOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
        {biometricsOpen && (
          <div className="px-4 pb-4 space-y-4 border-t pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
                <div className="flex gap-2">
                  <InputWithMeta
                    placeholder="Value"
                    value={formData.heightFt}
                    onChange={(val) => handleInputChange('heightFt', val)}
                    inputRightMeta="ft"
                  />
                  <InputWithMeta
                    placeholder="Value"
                    value={formData.heightIn}
                    onChange={(val) => handleInputChange('heightIn', val)}
                    inputRightMeta="in"
                  />
                </div>
              </div>
              <VitalInput 
                label="Weight" 
                value={formData.weight} 
                unit="kg" 
                field="weight"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <VitalInput 
                label="Waist Circumference" 
                value={formData.waist} 
                unit="cm" 
                field="waist"
              />
              <InputWithMeta
                label="BMI"
                placeholder="Value"
                value={formData.bmi}
                onChange={(val) => handleInputChange('bmi', val)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Medical History Section */}
      <div className="mb-4">
        <button 
          onClick={() => setMedicalOpen(!medicalOpen)}
          className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50"
        >
          <span className="font-medium text-gray-800">Medical History</span>
          {medicalOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
        
        {medicalOpen && (
          <div className="border-t">
            <div className="flex border-b overflow-x-auto">
              {tabs.map(({ id, icon: Icon, label }) => (
                <button 
                  key={id} 
                  onClick={() => { setActiveTab(id); setShowAddForm(false); }}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 ${
                    activeTab === id ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </div>

            <div className="px-4 py-4">
              {!showAddForm ? (
                <div>
                  {!formData[activeTab] || formData[activeTab].length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-sm text-gray-500 mb-4">No {activeTab} added yet</p>
                      <button 
                        onClick={() => setShowAddForm(true)}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        + Add {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                      </button>
                    </div>
                  ) : (
                    <div>
                      {formData[activeTab].map((item) => (
                        <div key={item.id} className="border rounded-lg p-3 mb-2">
                          <p className="font-medium text-gray-800">{item.name}</p>
                          <p className="text-sm text-gray-600">Since: {item.since}</p>
                        </div>
                      ))}
                      <button 
                        onClick={() => setShowAddForm(true)}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium mt-2"
                      >
                        + Add {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <InputWithMeta
                    label={activeTab === 'problems' ? 'Problem' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1, -1)}
                    requiredDot={true}
                    placeholder={`Search or Enter ${activeTab}`}
                    value={currentItem.name}
                    onChange={(val) => setCurrentItem(p => ({ ...p, name: val }))}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Since <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <input 
                          type="date" 
                          value={currentItem.since}
                          onChange={(e) => setCurrentItem(p => ({ ...p, since: e.target.value }))}
                          className="w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        />
                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Severity <span className="text-red-500">*</span></label>
                      <select 
                        value={currentItem.severity}
                        onChange={(e) => setCurrentItem(p => ({ ...p, severity: e.target.value }))}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        <option value="">Select Severity</option>
                        <option value="Mild">Mild</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Severe">Severe</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Status <span className="text-red-500">*</span></label>
                    <div className="flex gap-6">
                      {['Active', 'Inactive', 'Resolved', 'Enter In Error'].map((status) => (
                        <label key={status} className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="radio" 
                            name="status" 
                            value={status}
                            checked={currentItem.status === status}
                            onChange={(e) => setCurrentItem(p => ({ ...p, status: e.target.value }))}
                            className="w-4 h-4 text-blue-600" 
                          />
                          <span className="text-sm text-gray-700">{status}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Note</label>
                    <textarea 
                      placeholder="Enter Note" 
                      value={currentItem.note}
                      onChange={(e) => setCurrentItem(p => ({ ...p, note: e.target.value }))}
                      rows={4} 
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" 
                    />
                  </div>

                  <div className="flex gap-2 justify-end">
                    <Button variant="secondary" onClick={handleAdd}>
                      Save
                    </Button>
                    <Button variant="secondary" onClick={() => setShowAddForm(false)}>
                      Discard
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </GeneralDrawer>
  );
}