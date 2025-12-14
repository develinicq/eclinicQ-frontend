import React, { useState } from 'react'

const Settings = () => {
  const [mobile, setMobile] = useState('+919175367487')
  const [email, setEmail] = useState('ketanpatni02@gmail.com')
  const [currentPwd, setCurrentPwd] = useState('')
  const [newPwd, setNewPwd] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')

  const canVerify = newPwd && confirmPwd && newPwd === confirmPwd

  return (
    <div className="p-4">
      <div className="text-sm font-medium text-gray-900 mb-3">Settings</div>
      <div className="max-w-xl">
        {/* Mobile number */}
        <label className="block mb-3">
          <span className="text-[12px] text-gray-700">Mobile Number</span>
          <div className="mt-1 flex items-center gap-2">
            <input value={mobile} onChange={(e)=>setMobile(e.target.value)} className="flex-1 h-8 rounded border border-gray-300 px-3 text-sm outline-none" />
            <button type="button" className="h-8 px-3 rounded border border-gray-300 text-[12px] text-gray-700">Change</button>
          </div>
        </label>

        {/* Email ID */}
        <label className="block mb-3">
          <span className="text-[12px] text-gray-700">Email ID</span>
          <div className="mt-1 flex items-center gap-2">
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="flex-1 h-8 rounded border border-gray-300 px-3 text-sm outline-none" />
            <button type="button" className="h-8 px-3 rounded border border-gray-300 text-[12px] text-gray-700">Change</button>
          </div>
        </label>

        {/* Passwords */}
        <label className="block mb-3">
          <span className="text-[12px] text-gray-700">Enter Current Password</span>
          <input type="password" value={currentPwd} onChange={(e)=>setCurrentPwd(e.target.value)} placeholder="Enter Password" className="mt-1 h-8 w-full rounded border border-gray-300 px-3 text-sm outline-none" />
        </label>

        <label className="block mb-3">
          <span className="text-[12px] text-gray-700">New Password</span>
          <input type="password" value={newPwd} onChange={(e)=>setNewPwd(e.target.value)} placeholder="Enter Password" className="mt-1 h-8 w-full rounded border border-gray-300 px-3 text-sm outline-none" />
        </label>

        <label className="block mb-3">
          <span className="text-[12px] text-gray-700">Confirm Password <span className="text-red-500">*</span></span>
          <input type="password" value={confirmPwd} onChange={(e)=>setConfirmPwd(e.target.value)} placeholder="Enter Password" className="mt-1 h-8 w-full rounded border border-gray-300 px-3 text-sm outline-none" />
        </label>

        {/* Actions */}
        <div className="flex items-center gap-3 mb-2">
          <button disabled={!canVerify} className={`h-8 px-3 rounded text-sm ${canVerify ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}>Send OTP and Verify</button>
          <a href="#" onClick={(e)=>e.preventDefault()} className="text-[12px] text-blue-600">Forgot Password</a>
        </div>

        {/* Requirements */}
        <div className="mt-3">
          <div className="text-[12px] text-gray-700 font-medium mb-1">Password Requirements</div>
          <ul className="text-[12px] text-gray-600 space-y-1">
            <li>○ At least 8 -15 characters long</li>
            <li>○ Contains uppercase letter (A-Z)</li>
            <li>○ Contains lowercase letter (a-z)</li>
            <li>○ Contains number (0-9)</li>
            <li>○ Contains special character (!@#$%^&*)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Settings
