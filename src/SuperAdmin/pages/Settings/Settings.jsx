import React, { useState, useRef, useEffect } from 'react'
import InputWithMeta from '../../../components/GeneralDrawer/InputWithMeta'
import PasswordRequirements from '../../../components/FormItems/PasswordRequirements'
import PopupSmall from '../../../components/PopupSmall'
import DetailPopup from '../../../components/DetailPopup'
import { Phone, RefreshCw } from 'lucide-react'
import useSuperAdminAuthStore from '../../../store/useSuperAdminAuthStore'
const phone = '/phone2.png'
const mail = '/mail.png'

const Settings = () => {
  const { user } = useSuperAdminAuthStore();
  const [mobile, setMobile] = useState(user?.phone ? `+91${user.phone}` : '+919175367487')
  const [email, setEmail] = useState(user?.emailId || 'ketanpatni02@gmail.com')

  // Update effect if user data arrives after mount
  useEffect(() => {
    if (user?.phone) setMobile(`+91${user.phone}`);
    if (user?.emailId) setEmail(user.emailId);
  }, [user]);
  const [currentPwd, setCurrentPwd] = useState('')
  const [newPwd, setNewPwd] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const [showMobilePopup, setShowMobilePopup] = useState(false)
  const [showVerifyPopup, setShowVerifyPopup] = useState(false)
  const [showAddMobilePopup, setShowAddMobilePopup] = useState(false)
  const [showNewMobileVerifyPopup, setShowNewMobileVerifyPopup] = useState(false)
  const [newMobileNumber, setNewMobileNumber] = useState('')

  // OTP State
  const [otp, setOtp] = useState(new Array(6).fill(""))
  const [newOtp, setNewOtp] = useState(new Array(6).fill("")) // For new mobile verification
  const [isVerifying, setIsVerifying] = useState(false)
  const otpInputRefs = useRef([])
  const otpNewInputRefs = useRef([])

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handleNewOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setNewOtp([...newOtp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1].focus();
    }
  };

  const handleNewKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !newOtp[index] && index > 0) {
      otpNewInputRefs.current[index - 1].focus();
    }
  };

  const verifyOtp = () => {
    setIsVerifying(true);
    // Simulate API call
    setTimeout(() => {
      setIsVerifying(false);
      setShowVerifyPopup(false);
      setOtp(new Array(6).fill("")); // Reset
      setShowAddMobilePopup(true);
    }, 2000);
  };

  const handleAddMobileVerify = () => {
    // Switch to next popup without verifying animation (as requested "not be verifying after thsi")
    setShowAddMobilePopup(false);
    setShowNewMobileVerifyPopup(true);
    setNewOtp(new Array(6).fill("")); // Reset new otp
  }

  const handleFinalVerify = () => {
    setIsVerifying(true);
    // Simulate API call to verify new mobile OTP
    setTimeout(() => {
      setIsVerifying(false);
      setShowNewMobileVerifyPopup(false);
      setMobile(`+91${newMobileNumber}`);
      setNewMobileNumber('');
      alert("New mobile number added and verified!");
    }, 2000);
  }

  const isOtpFilled = otp.every(val => val !== "");
  const isNewOtpFilled = newOtp.every(val => val !== "");

  // Email Flow Logic
  const [showEmailPopup, setShowEmailPopup] = useState(false)
  const [showEmailAuthPopup, setShowEmailAuthPopup] = useState(false)
  const [showAddEmailPopup, setShowAddEmailPopup] = useState(false)
  const [showNewEmailVerifyPopup, setShowNewEmailVerifyPopup] = useState(false)
  const [showPasswordAuthPopup, setShowPasswordAuthPopup] = useState(false)
  const [newEmailAddress, setNewEmailAddress] = useState('')

  const [otpAuthMobile, setOtpAuthMobile] = useState(new Array(6).fill(""))
  const [otpAuthEmail, setOtpAuthEmail] = useState(new Array(6).fill(""))
  const [otpVerifyNewEmail, setOtpVerifyNewEmail] = useState(new Array(6).fill(""))


  // Refs
  const otpAuthMobileRefs = useRef([])
  const otpAuthEmailRefs = useRef([])
  const otpVerifyNewEmailRefs = useRef([])

  // Handlers
  const createOtpHandler = (setFunc, curOtp, refs) => (element, index) => {
    if (isNaN(element.value)) return false;
    setFunc([...curOtp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const createKeyDownHandler = (curOtp, refs) => (e, index) => {
    if (e.key === 'Backspace' && !curOtp[index] && index > 0) {
      refs.current[index - 1].focus();
    }
  };

  const verifyEmailAuth = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setShowEmailAuthPopup(false);
      setOtpAuthMobile(new Array(6).fill(""));
      setOtpAuthEmail(new Array(6).fill(""));
      setShowAddEmailPopup(true);
    }, 2000);
  }

  const handleAddEmailVerify = () => {
    setShowAddEmailPopup(false);
    setShowNewEmailVerifyPopup(true);
    setOtpVerifyNewEmail(new Array(6).fill(""));
  }

  const handleFinalEmailVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setShowNewEmailVerifyPopup(false);
      setEmail(newEmailAddress);
      setNewEmailAddress('');
      alert("Email ID updated successfully!");
    }, 2000);
  }

  const handlePasswordVerifyClick = () => {
    // Validation bypassed for testing as requested
    /*
    if (!currentPwd || !newPwd || !confirmPwd) {
      alert("Please fill all password fields");
      return;
    }
    if (newPwd !== confirmPwd) {
      alert("New password and confirm password do not match");
      return;
    }
    */
    setOtpAuthMobile(new Array(6).fill(""));
    setOtpAuthEmail(new Array(6).fill(""));
    setShowPasswordAuthPopup(true);
  }

  const handlePasswordAuthVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setShowPasswordAuthPopup(false);
      setCurrentPwd('');
      setNewPwd('');
      setConfirmPwd('');
      setOtpAuthMobile(new Array(6).fill(""));
      setOtpAuthEmail(new Array(6).fill(""));
      alert("Password updated successfully!");
    }, 2000);
  }

  const isAuthMobileFilled = otpAuthMobile.every(v => v !== "");
  const isAuthEmailFilled = otpAuthEmail.every(v => v !== "");
  const isEmailAuthValid = isAuthMobileFilled && isAuthEmailFilled;
  const isNewEmailFilled = otpVerifyNewEmail.every(v => v !== "");

  return (
    <div className="p-4 bg-secondary-grey50">
      <div className="max-w-[382px] flex flex-col gap-3.5">
        {/* Mobile number */}
        <div className='flex flex-col gap-1'>
          <label className={`text-sm text-secondary-grey150 flex items-center gap-1`}>
            Mobile Number
            <div className="bg-red-500 w-1 h-1 rounded-full"></div>
          </label>
          <div className="flex bg-secondary-grey50 items-center gap-2 border border-secondary-grey150/60 rounded-sm pr-1">
            <input
              value={mobile}
              disabled
              onChange={(e) => setMobile(e.target.value)}
              className="flex-1 h-8 px-2 text-sm outline-none text-secondary-grey300 bg-secondary-grey50"
            />
            <button
              type="button"
              onClick={() => setShowMobilePopup(true)}
              className="h-6 px-[6px] rounded-sm border border-blue-primary150 bg-blue-primary100 hover:bg-blue-primary250 hover:border-blue-primary250 hover:text-white text-blue-primary250 text-[12px] font-medium transition-colors"
            >
              Change
            </button>
          </div>
        </div>

        {/* Mobile Change Confirmation Popup */}
        <PopupSmall
          isOpen={showMobilePopup}
          icon={phone}
          text="Are you sure you want to change super admin mobile number?"
          buttons={[
            {
              label: "Cancel",
              variant: "grey",
              onClick: () => setShowMobilePopup(false)
            },
            {
              label: "Yes",
              variant: "blue",
              onClick: () => {
                setShowMobilePopup(false);
                setShowVerifyPopup(true);
              }
            }
          ]}
        />

        {/* OTP Verification Popup */}
        <DetailPopup
          isOpen={showVerifyPopup}
          heading="Let’s authenticate Your Account"
          subHeading={
            <>
              For your security, please verify your existing account information. <br />
              OTP sent to <span className="font-semibold text-gray-800">{mobile}</span>
            </>
          }
          onCancel={() => setShowVerifyPopup(false)}
          onVerify={verifyOtp}
          isVerifying={isVerifying}
          isVerifyDisabled={!isOtpFilled}
        >
          <div className="flex flex-col items-center gap-4">
            <label className="text-sm font-medium text-gray-700">
              Enter Mobile Verification Code
            </label>
            <div className="flex gap-3 justify-center">
              {otp.map((data, index) => (
                <input
                  className="w-10 h-10 border border-secondary-grey150 rounded-md text-center text-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                  type="text"
                  name="otp"
                  maxLength="1"
                  key={index}
                  value={data}
                  ref={el => otpInputRefs.current[index] = el}
                  onChange={e => handleOtpChange(e.target, index)}
                  onKeyDown={e => handleKeyDown(e, index)}
                  onFocus={e => e.target.select()}
                />
              ))}
            </div>
            <div className="text-sm text-gray-500">
              Haven’t Received Your Code yet? <button className="text-blue-600 font-medium hover:underline">Resend</button>
            </div>
          </div>
        </DetailPopup>

        {/* Add Mobile Number Popup */}
        <DetailPopup
          isOpen={showAddMobilePopup}
          heading="Add Mobile Number"
          subHeading="Enter a new mobile number, and we will send an OTP for verification."
          onCancel={() => setShowAddMobilePopup(false)}
          onVerify={handleAddMobileVerify}
          isVerifying={isVerifying}
          isVerifyDisabled={!newMobileNumber}
          verifyBtnText="Confirm & Verify"
        >
          <div className="flex items-center border border-secondary-grey150 rounded-md h-12 w-full max-w-[400px] mx-auto overflow-hidden">
            <div className="flex items-center gap-1 px-3 border-r border-secondary-grey150 h-full text-secondary-grey400 font-medium bg-secondary-grey50/50">
              +91 <span className="text-secondary-grey200 text-xs">▼</span>
            </div>
            <input
              type="text"
              placeholder="Mobile Number"
              className="flex-1 px-3 outline-none text-gray-700 h-full bg-white"
              value={newMobileNumber}
              onChange={(e) => setNewMobileNumber(e.target.value)}
            />
          </div>
        </DetailPopup>

        {/* Verify New Account Popup */}
        <DetailPopup
          isOpen={showNewMobileVerifyPopup}
          heading="Verify New Account"
          subHeading={
            <>
              Please Verify your new  account information. <br />
              OTP sent to <span className="font-semibold text-gray-800">+91 {newMobileNumber}</span>
            </>
          }
          onCancel={() => setShowNewMobileVerifyPopup(false)}
          onVerify={handleFinalVerify}
          isVerifying={isVerifying}
          isVerifyDisabled={!isNewOtpFilled}
        >
          <div className="flex flex-col items-center gap-4">
            <label className="text-sm font-medium text-gray-700">
              Enter Mobile Verification Code
            </label>
            <div className="flex gap-3 justify-center">
              {newOtp.map((data, index) => (
                <input
                  className="w-10 h-10 border border-secondary-grey150 rounded-md text-center text-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                  type="text"
                  name="newOtp"
                  maxLength="1"
                  key={index}
                  value={data}
                  ref={el => otpNewInputRefs.current[index] = el}
                  onChange={e => handleNewOtpChange(e.target, index)}
                  onKeyDown={e => handleNewKeyDown(e, index)}
                  onFocus={e => e.target.select()}
                />
              ))}
            </div>
            <div className="text-sm text-gray-500">
              Haven’t Received Your Code yet? <button className="text-blue-600 font-medium hover:underline">Resend</button>
            </div>
          </div>
        </DetailPopup>

        {/* Email Change Flow Popups */}
        <PopupSmall
          isOpen={showEmailPopup}
          icon={mail}
          text="Are you sure you want to change super admin Email ID?"
          buttons={[
            { label: "Cancel", variant: "grey", onClick: () => setShowEmailPopup(false) },
            { label: "Yes", variant: "blue", onClick: () => { setShowEmailPopup(false); setShowEmailAuthPopup(true); } }
          ]}
        />

        <DetailPopup
          isOpen={showEmailAuthPopup}
          heading="Let’s authenticate Your Account"
          subHeading={
            <>
              For your security, please verify your existing account information. <br />
              Enter 6-digit OTP sent on your mobile number (*******487) and email (*******@*****)
            </>
          }
          onCancel={() => setShowEmailAuthPopup(false)}
          onVerify={verifyEmailAuth}
          isVerifying={isVerifying}
          isVerifyDisabled={!isEmailAuthValid}
        >
          <div className="flex flex-col items-center gap-6">
            {/* Mobile OTP */}
            <div className="flex flex-col items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Enter Mobile Verification Code</label>
              <div className="flex gap-3 justify-center">
                {otpAuthMobile.map((data, index) => (
                  <input
                    className="w-10 h-10 border border-secondary-grey150 rounded-md text-center text-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                    type="text" maxLength="1" key={index} value={data}
                    ref={el => otpAuthMobileRefs.current[index] = el}
                    onChange={e => createOtpHandler(setOtpAuthMobile, otpAuthMobile, otpAuthMobileRefs)(e.target, index)}
                    onKeyDown={e => createKeyDownHandler(otpAuthMobile, otpAuthMobileRefs)(e, index)}
                    onFocus={e => e.target.select()}
                  />
                ))}
              </div>
            </div>
            {/* Email OTP */}
            <div className="flex flex-col items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Enter Email Verification Code</label>
              <div className="flex gap-3 justify-center">
                {otpAuthEmail.map((data, index) => (
                  <input
                    className="w-10 h-10 border border-secondary-grey150 rounded-md text-center text-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                    type="text" maxLength="1" key={index} value={data}
                    ref={el => otpAuthEmailRefs.current[index] = el}
                    onChange={e => createOtpHandler(setOtpAuthEmail, otpAuthEmail, otpAuthEmailRefs)(e.target, index)}
                    onKeyDown={e => createKeyDownHandler(otpAuthEmail, otpAuthEmailRefs)(e, index)}
                    onFocus={e => e.target.select()}
                  />
                ))}
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Haven’t Received Your Code yet? <button className="text-blue-600 font-medium hover:underline">Resend</button>
            </div>
          </div>
        </DetailPopup>

        <DetailPopup
          isOpen={showAddEmailPopup}
          heading="Add New Email"
          subHeading="Enter a new email, and we will send an OTP for verification."
          onCancel={() => setShowAddEmailPopup(false)}
          onVerify={handleAddEmailVerify}
          isVerifying={isVerifying}
          isVerifyDisabled={!newEmailAddress}
          verifyBtnText="Confirm & Verify"
        >
          <div className="flex items-center border border-secondary-grey150 rounded-md h-12 w-full max-w-[400px] mx-auto overflow-hidden px-3 bg-white">
            <input
              type="email"
              placeholder="Enter Email"
              className="flex-1 outline-none text-gray-700 h-full"
              value={newEmailAddress}
              onChange={(e) => setNewEmailAddress(e.target.value)}
            />
          </div>
        </DetailPopup>

        <DetailPopup
          isOpen={showNewEmailVerifyPopup}
          heading="Verify New Account"
          subHeading={
            <>
              Please Verify your new account information. <br />
              OTP sent to <span className="font-semibold text-gray-800">{newEmailAddress}</span>
            </>
          }
          onCancel={() => setShowNewEmailVerifyPopup(false)}
          onVerify={handleFinalEmailVerify}
          isVerifying={isVerifying}
          isVerifyDisabled={!isNewEmailFilled}
        >
          <div className="flex flex-col items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Enter Email Verification Code</label>
            <div className="flex gap-3 justify-center">
              {otpVerifyNewEmail.map((data, index) => (
                <input
                  className="w-10 h-10 border border-secondary-grey150 rounded-md text-center text-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                  type="text" maxLength="1" key={index} value={data}
                  ref={el => otpVerifyNewEmailRefs.current[index] = el}
                  onChange={e => createOtpHandler(setOtpVerifyNewEmail, otpVerifyNewEmail, otpVerifyNewEmailRefs)(e.target, index)}
                  onKeyDown={e => createKeyDownHandler(otpVerifyNewEmail, otpVerifyNewEmailRefs)(e, index)}
                  onFocus={e => e.target.select()}
                />
              ))}
            </div>
            <div className="text-sm text-gray-500">
              Haven’t Received Your Code yet? <button className="text-blue-600 font-medium hover:underline">Resend</button>
            </div>
          </div>
        </DetailPopup>

        {/* Email ID */}
        <div className='flex flex-col gap-1'>
          <label className={`text-sm text-secondary-grey150 flex items-center gap-1`}>
            Email ID
            <div className="bg-red-500 w-1 h-1 rounded-full"></div>
          </label>
          <div className="flex bg-secondary-grey50 items-center gap-2 border border-secondary-grey150/60 rounded-sm pr-1">
            <input
              type="email"
              value={email}
              disabled
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-8 px-2 text-sm outline-none bg-secondary-grey50 text-secondary-grey300"
            />
            <button
              type="button"
              onClick={() => setShowEmailPopup(true)}
              className="h-6 px-[6px] rounded-sm border border-blue-primary150 bg-blue-primary100 hover:bg-blue-primary250 hover:border-blue-primary250 hover:text-white text-blue-primary250 text-[12px] font-medium transition-colors"
            >
              Change
            </button>
          </div>
        </div>

        {/* Passwords */}
        <InputWithMeta
          label="Enter Current Password"
          requiredDot
          type="password"
          placeholder="Enter Password"
          value={currentPwd}
          onChange={setCurrentPwd}
        />

        <InputWithMeta
          label="New Password"
          requiredDot
          type="password"
          placeholder="Enter Password"
          value={newPwd}
          onChange={setNewPwd}
        />

        <InputWithMeta
          label="Confirm Password"
          requiredDot
          type="password"
          placeholder="Enter Password"
          value={confirmPwd}
          onChange={setConfirmPwd}
        />

        {/* Actions */}
        <div className="flex items-center">
          <button
            onClick={handlePasswordVerifyClick}
            className={`h-8 px-4 rounded-sm text-sm font-medium bg-blue-primary250 text-white hover:bg-blue-600 transition-colors shadow-sm`}
          >
            Send OTP and Verify
          </button>
        </div>

        {/* Password Change Auth Popup */}
        <DetailPopup
          isOpen={showPasswordAuthPopup}
          heading="Let’s authenticate Your Account"
          subHeading={
            <>
              For your security, please verify your existing account information. <br />
              Enter 6-digit OTP sent on your mobile number (*******487) and email (*******@*****)
            </>
          }
          onCancel={() => setShowPasswordAuthPopup(false)}
          onVerify={handlePasswordAuthVerify}
          isVerifying={isVerifying}
          isVerifyDisabled={!isEmailAuthValid}
        >
          <div className="flex flex-col items-center gap-6">
            {/* Mobile OTP */}
            <div className="flex flex-col items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Enter Mobile Verification Code</label>
              <div className="flex gap-3 justify-center">
                {otpAuthMobile.map((data, index) => (
                  <input
                    className="w-10 h-10 border border-secondary-grey150 rounded-md text-center text-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                    type="text" maxLength="1" key={index} value={data}
                    ref={el => otpAuthMobileRefs.current[index] = el}
                    onChange={e => createOtpHandler(setOtpAuthMobile, otpAuthMobile, otpAuthMobileRefs)(e.target, index)}
                    onKeyDown={e => createKeyDownHandler(otpAuthMobile, otpAuthMobileRefs)(e, index)}
                    onFocus={e => e.target.select()}
                  />
                ))}
              </div>
            </div>
            {/* Email OTP */}
            <div className="flex flex-col items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Enter Email Verification Code</label>
              <div className="flex gap-3 justify-center">
                {otpAuthEmail.map((data, index) => (
                  <input
                    className="w-10 h-10 border border-secondary-grey150 rounded-md text-center text-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                    type="text" maxLength="1" key={index} value={data}
                    ref={el => otpAuthEmailRefs.current[index] = el}
                    onChange={e => createOtpHandler(setOtpAuthEmail, otpAuthEmail, otpAuthEmailRefs)(e.target, index)}
                    onKeyDown={e => createKeyDownHandler(otpAuthEmail, otpAuthEmailRefs)(e, index)}
                    onFocus={e => e.target.select()}
                  />
                ))}
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Haven’t Received Your Code yet? <button className="text-blue-600 font-medium hover:underline">Resend</button>
            </div>
          </div>
        </DetailPopup>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="text-sm text-blue-primary250 hover:bg-blue-primary50  w-fit inline-flex items-center"
        >
          Forgot Password <span className="ml-[10px] text-[20px]">›</span>
        </a>

        {/* Requirements */}
        <div className="">
          <PasswordRequirements password={newPwd} />
        </div>
      </div>
    </div>
  )
}

export default Settings
