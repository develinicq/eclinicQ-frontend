import React from 'react'
import GeneralDrawer from "../../../../components/GeneralDrawer/GeneralDrawer"
import { AlertCircle, CheckCircle2, ArrowUp, CreditCard } from 'lucide-react'
import { useNavigate } from 'react-router-dom'


const PlanIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="48" height="48" rx="6" fill="#0D47A1" />
    <circle cx="6.545" cy="6" r="1.09" fill="white" />
    <circle cx="40.363" cy="13.09" r="1.09" fill="white" />
    <circle cx="32.182" cy="6.545" r="0.545" fill="white" />
    <circle cx="12" cy="12.545" r="0.545" fill="white" />
    <circle cx="3.818" cy="26.182" r="0.545" fill="white" />
    <circle cx="40.909" cy="26.182" r="0.545" fill="white" />
    <circle cx="44.727" cy="6" r="0.545" fill="white" />
    <circle cx="9.273" cy="21.818" r="1.09" fill="white" />
    <circle cx="40.909" cy="32.727" r="1.09" fill="white" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24.095 44.313V10.364C22.572 10.594 21.2 12.264 20.082 16.344V35.748C19.839 36.673 23.365 44.679 24.095 44.313Z"
      fill="url(#paint0)"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.139 29.919C5.158 30.185 5.249 30.384 5.542 30.397L20.082 28.768V21.565L4.98 28.054L5.139 29.919Z"
      fill="url(#paint1)"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24.083 44.313V10.364C25.606 10.594 26.978 12.264 28.096 16.344V35.748C28.339 36.673 24.813 44.679 24.083 44.313Z"
      fill="url(#paint2)"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M43.04 29.919C43.021 30.185 42.93 30.384 42.638 30.397L28.097 28.768V21.565L43.199 28.054L43.04 29.919Z"
      fill="url(#paint3)"
    />
    <defs>
      <linearGradient id="paint0" x1="20.026" y1="76.917" x2="23.993" y2="76.917">
        <stop stopColor="#75D9A3" />
        <stop offset="0.805" stopColor="#00B1BC" />
      </linearGradient>
      <linearGradient id="paint1" x1="4.813" y1="38.874" x2="19.7" y2="38.874">
        <stop stopColor="#75D9A3" />
        <stop offset="1" stopColor="#00B1BC" />
      </linearGradient>
      <linearGradient id="paint2" x1="24.038" y1="76.917" x2="28.006" y2="76.917">
        <stop stopColor="#00B1BC" />
        <stop offset="1" stopColor="#75D9A3" />
      </linearGradient>
      <linearGradient id="paint3" x1="27.929" y1="38.874" x2="42.816" y2="38.874">
        <stop stopColor="#00B1BC" />
        <stop offset="1" stopColor="#75D9A3" />
      </linearGradient>
    </defs>
  </svg>
)

const StatusBadge = ({ status }) => {
  if (status === 'pending') {
    return (
      <div className="flex items-center gap-1.5 bg-red-100 text-red-600 p-1 rounded-lg"
      >
        <AlertCircle className="w-4 h-4" />
        <span className="text-sm font-medium">Pending</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1.5 bg-green-100 text-green-600 p-1 rounded-lg">
      <CheckCircle2 className="w-4 h-4" />
      <span className="text-sm font-medium">Paid</span>
    </div>
  )
}

const Detail = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-600">{label}</p>
    <p className="text-sm font-medium text-gray-500">{value}</p>
  </div>
)

const SectionHeader = ({ title, subtitle }) => (
  <div className="px-4 py-3 border-b border-invoice-divider">
    <h4 className="text-sm font-semibold text-invoice-text">{title}</h4>
    <p className="text-xs text-invoice-text-muted">{subtitle}</p>
  </div>
)

const TotalsRow = ({ label, value }) => (
  <div className="px-4 py-2 flex justify-between items-center">
    <span className="text-sm text-gray-500">{label}</span>
    <span className="text-sm font-medium text-invoice-text">
      ₹{value.toLocaleString('en-IN')}
    </span>
  </div>
)


const InvoiceDrawer = ({ isOpen, onClose, invoiceData }) => {
  const defaultData = {
    planName: 'Upchar-Q Plus',
    planType: 'Plan Subscription',
    status: 'pending',
    dueDate: '02/12/2025',
    invoiceDate: '03/12/2025',
    invoiceNumber: 'INV-2025-02',
    paymentMethod: 'Card Payment 2041',
    billingCycle: 'Half-Yearly',
    seats: '2 Doctors | 2 Staffs',
    periodStart: 'May 24, 2025',
    periodEnd: 'May 24, 2026',
    lineItems: [
      { label: 'Plus (Base)', amount: 2299 },
      { label: 'Base x 6 months', amount: 13794 },
      { label: '6-Month Bonus (1 Month Free)', amount: -2299, isDiscount: true },
    ],
    subtotal: 11495,
    taxes: 2069,
    total: 13564,
    savings: 2713,
  }

  const data = invoiceData || defaultData

  const formatCurrency = (amount) => {
    const prefix = amount < 0 ? '-' : ''
    return `${prefix}₹${Math.abs(amount).toLocaleString('en-IN')}`
  }
  const navigate=useNavigate()

  return (
   <GeneralDrawer
  isOpen={isOpen}
  onClose={onClose}
  title="Invoice"
  width={476}
  showPrimaryAction={false}
  zIndex={5000}
  className=""
>

      {/* Content */}
      <div className="flex flex-col gap-3">
        {/* Plan Card */}
        <div className="border border-[#0E4395] rounded-lg p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-3">
              <PlanIcon />
              <div>
                <p className="text-xs text-invoice-text-muted">{data.planType}</p>
                <h3 className="text-lg font-semibold text-primary">
                  {data.planName}
                </h3>
              </div>
            </div>
            <StatusBadge status={data.status} />
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            <Detail label="Due Date" value={data.dueDate} />
            <Detail label="Invoice Date" value={data.invoiceDate} />
            <Detail label="Invoice Number" value={data.invoiceNumber} />
            <Detail label="Payment Method" value={data.paymentMethod} />
            <Detail label="Billing Cycle" value={data.billingCycle} />
            <Detail label="Seats" value={data.seats} />
          </div>
        </div>

        {/* Breakdown */}
        <div className="border border-invoice-divider rounded-lg overflow-hidden">
          <SectionHeader
            title="Half Yearly Seats"
            subtitle={`for ${data.periodStart} - ${data.periodEnd}`}
          />

          <div className="px-4 py-3 space-y-1">
            {data.lineItems.map((item, idx) => (
              <div key={idx} className="flex justify-between">
                <span className="text-sm text-gray-500">{item.label}</span>
                <span
                  className={`text-sm font-medium ${
                    item.isDiscount
                      ? 'text-invoice-discount'
                      : 'text-invoice-text'
                  }`}
                >
                  {item.isDiscount
                    ? formatCurrency(item.amount)
                    : `₹${item.amount.toLocaleString('en-IN')}/mo`}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t mx-4" />

          <TotalsRow label="Subtotal (6 months)" value={data.subtotal} />
          <TotalsRow label="Taxes" value={data.taxes} />

          <div className="bg-[#F2F7FF] rounded-md px-4 py-2 mb-2 flex justify-between">
            <span className="font-medium">Total Amount</span>
            <span className="text-xl font-bold text-[#2372EC]">
              ₹{data.total.toLocaleString('en-IN')}
            </span>
          </div>

          {data.savings && (
            <div className="bg-[#F2FFF3]  text-[#3BA73C] px-4 py-2.5 text-center text-sm">
               You save ₹{data.savings.toLocaleString('en-IN')}
            </div>
          )}
        </div>

        
        <div className="flex gap-3 w-full pt-1 p-2">
              
            <button onClick={()=>navigate("/billing/upgrade-plan")} className="border px-2 bg-[#F2F7FF] text-md w-[49%] py-2 rounded flex items-center justify-center gap-2 text-[#2372ec]">
              <ArrowUp size={16} />
              Upgrade Plan
            </button>
          
          <button onClick={() =>
  navigate("/billing/payment", {
    state: {
      selectedPlan: defaultData.planName.split(" ")[1].toLowerCase(), 
    },
  })
} className="flex-1 px-2 text-md w-[50%] py-2 rounded flex items-center justify-center gap-2 bg-[#2372EC] text-white">
            <CreditCard className="w-4 h-4" />
            Make Payment
          </button>
        </div>
      </div>
    </GeneralDrawer>
  )
}

export default InvoiceDrawer
