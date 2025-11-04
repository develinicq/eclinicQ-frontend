import React, { useRef, useState } from 'react'
import Button from '../../../components/Button'

const Tab = ({ label, active, onClick }) => (
  <label className={'inline-flex items-center gap-2 text-xs cursor-pointer ' + (active ? 'text-[#2F66F6]' : 'text-[#6B7280]')} onClick={onClick}>
    <input type="radio" checked={active} readOnly className="accent-[#2F66F6]" /> {label}
  </label>
)

export default function HFDFSignIn(){
  const [mode, setMode] = useState('password')
  const [remember, setRemember] = useState(true)
  const [whatsapp, setWhatsapp] = useState(false)
  const [identifier, setIdentifier] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState(Array(6).fill(''))
  const otpRefs = useRef([...Array(6)].map(() => React.createRef()))

  const allOtpFilled = otp.every(Boolean)
  const resetOtp = () => { setOtp(Array(6).fill('')); otpRefs.current[0]?.current?.focus() }
  const handleOtpChange = (idx) => (e) => {
    const v = e.target.value.replace(/\D/g, '').slice(0,1)
    setOtp((prev) => { const next = [...prev]; next[idx] = v; return next })
    if (v && otpRefs.current[idx+1]) otpRefs.current[idx+1].current?.focus()
  }
  const handleOtpKeyDown = (idx) => (e) => {
    if (e.key === 'Backspace') {
      e.preventDefault()
      setOtp((prev) => {
        const next = [...prev]
        if (next[idx]) { next[idx] = '' }
        else if (otpRefs.current[idx-1]) { otpRefs.current[idx-1].current?.focus(); next[idx-1] = '' }
        return next
      })
    } else if (e.key === 'ArrowLeft' && otpRefs.current[idx-1]) { otpRefs.current[idx-1].current?.focus() }
      else if (e.key === 'ArrowRight' && otpRefs.current[idx+1]) { otpRefs.current[idx+1].current?.focus() }
  }
  const handleSendOtp = () => { setOtpSent(true); resetOtp() }

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left panel - fixed 600px */}
      <div className="hidden md:flex w-[600px] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-purple-500" />
        <div className="relative h-full w-full flex items-center justify-center p-8">
          <div className="text-white text-center max-w-sm select-none">
            <img src="/images/hospital.png" alt="welcome" className="w-[320px] md:w-[360px] mx-auto" />
            <h2 className="text-xl font-semibold mt-4">Welcome To Upchar-Q</h2>
            <p className="text-sm opacity-90">Your Turn, Your Time<br/>Track Appointments in Real-Time!</p>
            <div className="mt-3 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
            </div>
          </div>
          <a className="absolute left-6 bottom-6 bg-white/95 text-gray-700 text-sm rounded-full shadow px-4 py-2 flex items-center gap-2 hover:bg-white" href="#">
            <img src="/i-icon.png" alt="help" className="w-4 h-4" />
            Help & Support
            <span className="ml-2 text-gray-400">›</span>
          </a>
        </div>
      </div>
      {/* Right form */}
      <div className="relative flex-1 flex items-center justify-center px-6 pb-10 md:px-10 md:pb-10">
        <div className="absolute left-8 md:left-12 top-8 md:top-8">
          <img src="/logo.png" alt="eClinic-Q" className="h-6" />
          <div className="text-[11px] text-[#F59E0B] mt-0.5">For Doctors / Clinics</div>
        </div>
        <div className="w-full max-w-[520px] relative -top-2 md:-top-4">
          <h1 className="text-2xl font-semibold text-gray-800">Welcome Back!</h1>
          <p className="text-sm text-gray-500 mb-3">Login in to access the Desk</p>

          <div className="flex items-center gap-4 text-xs mb-3">
            <Tab label="Via Password" active={mode==='password'} onClick={()=>setMode('password')} />
            <Tab label="Via M-Pin" active={mode==='mpin'} onClick={()=>setMode('mpin')} />
            <Tab label="Via OTP" active={mode==='otp'} onClick={()=>setMode('otp')} />
          </div>

          <div className="space-y-3 mt-4">
            {mode==='password' && (
              <div>
                <div>
                  <label className="text-sm text-gray-700">Enter Mobile/Email ID <span className="text-red-500">*</span></label>
                  <input className="mt-1 h-9 w-full border border-gray-300 rounded px-2 text-sm" placeholder="Enter Mobile/Email ID" value={identifier} onChange={(e)=>setIdentifier(e.target.value)} />
                </div>
                <label className="text-sm text-gray-700">Password <span className="text-red-500">*</span></label>
                <div className="mt-1 relative">
                  <input className="h-9 w-full border border-gray-300 rounded px-2 text-sm pr-8" placeholder="Enter Password" type="password" />
                  <select className="absolute right-1 top-1/2 -translate-y-1/2 h-7 border border-gray-300 rounded text-xs px-1 bg-white">
                    <option>—</option>
                  </select>
                </div>
                <div className="text-right mt-1 text-xs text-[#2F66F6] cursor-pointer">Forgot Password?</div>
              </div>
            )}

            {mode==='mpin' && (
              <div>
                <div>
                  <label className="text-sm text-gray-700">Enter Mobile/Email ID <span className="text-red-500">*</span></label>
                  <input className="mt-1 h-9 w-full border border-gray-300 rounded px-2 text-sm" placeholder="Enter Mobile/Email ID" value={identifier} onChange={(e)=>setIdentifier(e.target.value)} />
                </div>
                <label className="text-sm text-gray-700">Enter M-Pin <span className="text-red-500">*</span></label>
                <input className="mt-1 h-9 w-full border border-gray-300 rounded px-2 text-sm" placeholder="••••" inputMode="numeric" />
              </div>
            )}

            {mode==='otp' && (
              <div>
                {!otpSent ? (
                  <div className="space-y-2">
                    <div>
                      <label className="text-sm text-gray-700">Enter Mobile/Email ID <span className="text-red-500">*</span></label>
                      <input className="mt-1 h-9 w-full border border-gray-300 rounded px-2 text-sm" placeholder="Enter Mobile/Email ID" value={identifier} onChange={(e)=>setIdentifier(e.target.value)} onKeyDown={(e)=>{ if(e.key==='Enter' && identifier){ handleSendOtp() } }} />
                    </div>
                    <button disabled={!identifier} onClick={handleSendOtp} className={`w-full h-9 rounded text-sm flex items-center justify-center border ${identifier ? 'bg-[#2F66F6] text-white border-[#2F66F6]' : 'bg-[#F3F4F6] text-[#9AA1A9] border-[#E5E7EB] cursor-not-allowed'}`}>
                      <span className="mr-1">💬</span> Send OTP
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-[13px] text-gray-600">We have sent a 6 digit OTP on <span className="font-semibold">{identifier || 'your mobile'}</span> and registered email Id, please sign up if you are a new user</div>
                    <div className="text-center">
                      <div className="text-[13px] font-medium text-gray-700">Enter Mobile Verification Code</div>
                      <div className="text-[11px] text-gray-500">It may take a minute or two to receive your code.</div>
                    </div>
                    <div className="flex items-center justify-start md:justify-center gap-4">
                      {otp.map((d,i)=> (
                        <input key={i} ref={otpRefs.current[i]} type="password" inputMode="numeric" pattern="[0-9]*" maxLength={1} value={d} onChange={handleOtpChange(i)} onKeyDown={handleOtpKeyDown(i)} className="w-[32px] h-[40px] border border-gray-300 rounded-md text-center text-lg outline-none focus:ring-2 focus:ring-blue-500" placeholder="–" />
                      ))}
                    </div>
                    <div className="text-center text-xs text-gray-500">Haven't Received Your Code yet? <button className="text-[#2F66F6]">Resend</button></div>
                    <hr className="border-gray-200 my-2" />
                    <label className="flex items-center gap-2 text-xs text-gray-700"><input type="checkbox" checked={whatsapp} onChange={(e)=>setWhatsapp(e.target.checked)} /> Allow us to send messages on your WhatsApp account</label>
                    <button disabled={!allOtpFilled} className={`w-full h-9 rounded text-sm flex items-center justify-center ${allOtpFilled ? 'bg-[#2F66F6] text-white' : 'bg-[#F3F4F6] text-[#9AA1A9]'}`}>
                      {allOtpFilled ? 'Verify OTP' : 'Verify OTP'}
                    </button>
                  </div>
                )}
              </div>
            )}

            {mode!=='otp' && (
              <label className="flex items-center gap-2 text-xs text-gray-700">
                <input type="checkbox" checked={remember} onChange={(e)=>setRemember(e.target.checked)} /> Remember Me
              </label>
            )}
            {mode!=='otp' && (
              <label className="flex items-center gap-2 text-xs text-gray-700">
                <input type="checkbox" checked={whatsapp} onChange={(e)=>setWhatsapp(e.target.checked)} /> Allow us to send messages on your WhatsApp account
              </label>
            )}
            {mode!=='otp' && (<Button className="w-full" disabled>Login</Button>)}
            <div className="text-[11px] text-gray-500 flex items-start gap-2">
              <span className="mt-[2px] inline-flex items-center justify-center w-[14px] h-[14px] border border-gray-400 rounded-full text-[9px] text-gray-600">i</span>
              <span>
                By clicking the button above, you agree to our <a className="text-[#2F66F6]" href="#">Terms of Service</a> and <a className="text-[#2F66F6]" href="#">Privacy Policy</a>.
                <br/>For any queries, feel free to <a className="text-[#2F66F6]" href="#">Call Us</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
