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
      <div className="flex items-center gap-1.5 bg-error-50 text-error-400 p-1 rounded-lg"
      >
         <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M3.1875 10.7049L2.78074 10.9957H2.78074L3.1875 10.7049ZM2.97115 10.4023L3.37791 10.1115H3.37791L2.97115 10.4023ZM9.02885 10.4023L9.43561 10.693H9.43561L9.02885 10.4023ZM8.8125 10.7049L9.21926 10.9957V10.9957L8.8125 10.7049ZM9.72115 10.4023L10.1279 10.1115L10.1279 10.1115L9.72115 10.4023ZM2.27885 10.4023L2.68561 10.693V10.693L2.27885 10.4023ZM9.13073 1.00599L9.08503 1.5039H9.08503L9.13073 1.00599ZM10.4943 2.43661L10.9926 2.39506V2.39506L10.4943 2.43661ZM2.86927 1.00599L2.82356 0.508082V0.508082L2.86927 1.00599ZM1.50571 2.43661L1.00744 2.39506V2.39506L1.50571 2.43661ZM3.75 7.25C3.47386 7.25 3.25 7.47386 3.25 7.75C3.25 8.02614 3.47386 8.25 3.75 8.25V7.75V7.25ZM8.25 8.25C8.52614 8.25 8.75 8.02614 8.75 7.75C8.75 7.47386 8.52614 7.25 8.25 7.25V7.75V8.25ZM7.35356 4.35357C7.54882 4.15831 7.54882 3.84172 7.35356 3.64646C7.1583 3.4512 6.84172 3.4512 6.64646 3.64646L7.00001 4.00002L7.35356 4.35357ZM4.64646 5.64645C4.4512 5.84172 4.4512 6.1583 4.64646 6.35356C4.84173 6.54882 5.15831 6.54882 5.35357 6.35356L5.00002 6.00001L4.64646 5.64645ZM5.35356 3.64645C5.1583 3.45119 4.84172 3.45119 4.64646 3.64645C4.45119 3.84172 4.45119 4.1583 4.64646 4.35356L5.00001 4.00001L5.35356 3.64645ZM6.64645 6.35355C6.84171 6.54882 7.15829 6.54882 7.35355 6.35355C7.54882 6.15829 7.54882 5.84171 7.35355 5.64645L7 6L6.64645 6.35355ZM3.16667 1V1.5H8.83333V1V0.5H3.16667V1ZM10.5 2.74863H10V10.1299H10.5H11V2.74863H10.5ZM1.5 10.1299H2V2.74863H1.5H1V10.1299H1.5ZM3.1875 10.7049L3.59426 10.4141L3.37791 10.1115L2.97115 10.4023L2.56439 10.693L2.78074 10.9957L3.1875 10.7049ZM9.02885 10.4023L8.62209 10.1115L8.40574 10.4141L8.8125 10.7049L9.21926 10.9957L9.43561 10.693L9.02885 10.4023ZM9.72115 10.4023L10.1279 10.1115C9.75541 9.59041 8.99459 9.59041 8.62209 10.1115L9.02885 10.4023L9.43561 10.693C9.42632 10.706 9.40321 10.7207 9.375 10.7207C9.34679 10.7207 9.32368 10.706 9.3144 10.693L9.72115 10.4023ZM7.6875 10.7049L8.09426 10.4141C7.61359 9.74173 6.63641 9.74173 6.15574 10.4141L6.5625 10.7049L6.96926 10.9957C7.01406 10.933 7.07208 10.9098 7.125 10.9098C7.17792 10.9098 7.23594 10.933 7.28074 10.9957L7.6875 10.7049ZM5.4375 10.7049L5.84426 10.4141C5.36359 9.74173 4.38641 9.74173 3.90574 10.4141L4.3125 10.7049L4.71926 10.9957C4.76406 10.933 4.82208 10.9098 4.875 10.9098C4.92792 10.9098 4.98594 10.933 5.03074 10.9957L5.4375 10.7049ZM2.97115 10.4023L3.37791 10.1115C3.00541 9.59041 2.24459 9.59041 1.87209 10.1115L2.27885 10.4023L2.68561 10.693C2.67632 10.706 2.65321 10.7207 2.625 10.7207C2.59679 10.7207 2.57368 10.706 2.56439 10.693L2.97115 10.4023ZM3.1875 10.7049L2.78074 10.9957C3.26141 11.6681 4.23859 11.6681 4.71926 10.9957L4.3125 10.7049L3.90574 10.4141C3.86094 10.4768 3.80292 10.5 3.75 10.5C3.69708 10.5 3.63906 10.4768 3.59426 10.4141L3.1875 10.7049ZM7.6875 10.7049L7.28074 10.9957C7.76141 11.6681 8.73859 11.6681 9.21926 10.9957L8.8125 10.7049L8.40574 10.4141C8.36094 10.4768 8.30292 10.5 8.25 10.5C8.19708 10.5 8.13906 10.4768 8.09426 10.4141L7.6875 10.7049ZM5.4375 10.7049L5.03074 10.9957C5.51141 11.6681 6.48859 11.6681 6.96926 10.9957L6.5625 10.7049L6.15574 10.4141C6.11094 10.4768 6.05292 10.5 6 10.5C5.94708 10.5 5.88906 10.4768 5.84426 10.4141L5.4375 10.7049ZM1.5 10.1299H1C1 10.5717 1.27746 10.909 1.6308 11.0325C1.98736 11.1572 2.42169 11.0622 2.68561 10.693L2.27885 10.4023L1.87209 10.1115C1.87161 10.1122 1.87462 10.1079 1.88247 10.1023C1.89026 10.0967 1.9 10.0918 1.91085 10.0886C1.93236 10.0823 1.94992 10.0847 1.96092 10.0886C1.9719 10.0924 1.98227 10.0996 1.99032 10.1106C2.00015 10.124 2 10.1342 2 10.1299H1.5ZM10.5 10.1299H10C10 10.1342 9.99985 10.124 10.0097 10.1106C10.0177 10.0996 10.0281 10.0924 10.0391 10.0886C10.0501 10.0847 10.0676 10.0823 10.0892 10.0886C10.1 10.0918 10.1097 10.0967 10.1175 10.1023C10.1254 10.1079 10.1284 10.1122 10.1279 10.1115L9.72115 10.4023L9.31439 10.693C9.57831 11.0622 10.0126 11.1572 10.3692 11.0325C10.7225 10.909 11 10.5717 11 10.1299H10.5ZM8.83333 1V1.5C8.99919 1.5 9.04834 1.50053 9.08503 1.5039L9.13073 1.00599L9.17644 0.508082C9.08264 0.499472 8.97702 0.5 8.83333 0.5V1ZM10.5 2.74863H11C11 2.59633 11.0004 2.48948 10.9926 2.39506L10.4943 2.43661L9.99602 2.47816C9.99956 2.52064 10 2.57617 10 2.74863H10.5ZM9.13073 1.00599L9.08503 1.5039C9.55163 1.54673 9.95129 1.9417 9.99602 2.47816L10.4943 2.43661L10.9926 2.39506C10.9104 1.40985 10.1602 0.598381 9.17644 0.508082L9.13073 1.00599ZM3.16667 1V0.5C3.02298 0.5 2.91736 0.499472 2.82356 0.508082L2.86927 1.00599L2.91497 1.5039C2.95166 1.50053 3.00081 1.5 3.16667 1.5V1ZM1.5 2.74863H2C2 2.57617 2.00044 2.52064 2.00398 2.47816L1.50571 2.43661L1.00744 2.39506C0.999564 2.48948 1 2.59633 1 2.74863H1.5ZM2.86927 1.00599L2.82356 0.508082C1.83982 0.598381 1.08959 1.40985 1.00744 2.39506L1.50571 2.43661L2.00398 2.47816C2.04871 1.9417 2.44837 1.54673 2.91497 1.5039L2.86927 1.00599ZM3.75 7.75V8.25H8.25V7.75V7.25H3.75V7.75ZM7.00001 4.00002L6.64646 3.64646L5.64646 4.64646L6.00001 5.00001L6.35357 5.35357L7.35356 4.35357L7.00001 4.00002ZM6.00001 5.00001L5.64646 4.64646L4.64646 5.64645L5.00002 6.00001L5.35357 6.35356L6.35357 5.35357L6.00001 5.00001ZM5.00001 4.00001L4.64646 4.35356L5.64646 5.35357L6.00001 5.00001L6.35357 4.64646L5.35356 3.64645L5.00001 4.00001ZM6.00001 5.00001L5.64646 5.35357L6.64645 6.35355L7 6L7.35355 5.64645L6.35357 4.64646L6.00001 5.00001Z" fill="#F04248"/> </svg>
        <span className="text-sm font-medium">Pending</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1.5 bg-success-100 text-success-400 p-1 rounded-lg">
       <svg
    className="w-4 h-4 mr-1"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 12l2 2 4-4"
      stroke="currentColor"
    />
  </svg>
      <span className="text-sm font-medium">Paid</span>
    </div>
  )
}

const Detail = ({ label, value }) => (
  <div>
    <p className="text-xs text-secondary-grey300">{label}</p>
    <p className="text-sm font-medium text-secondary-grey200">{value}</p>
  </div>
)

const SectionHeader = ({ title, subtitle }) => (
  <div className="px-4 py-3 border-b border-border">
    <h4 className="text-sm font-semibold text-foreground">{title}</h4>
    <p className="text-xs text-muted-foreground">{subtitle}</p>
  </div>
)

const TotalsRow = ({ label, value }) => (
  <div className="px-4 py-2 flex justify-between items-center">
    <span className="text-sm text-secondary-grey200">{label}</span>
    <span className="text-sm font-medium text-foreground">
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
        <div className="border border-blue-primary400 rounded-lg p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-3">
              <PlanIcon />
              <div>
                <p className="text-xs text-muted-foreground">{data.planType}</p>
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
        <div className="border border-border rounded-lg overflow-hidden">
          <SectionHeader
            title="Half Yearly Seats"
            subtitle={`for ${data.periodStart} - ${data.periodEnd}`}
          />

          <div className="px-4 py-3 space-y-1">
            {data.lineItems.map((item, idx) => (
              <div key={idx} className="flex justify-between">
                <span className="text-sm text-secondary-grey200">{item.label}</span>
                <span
                  className={`text-sm font-medium ${
                    item.isDiscount
                      ? 'text-success-300'
                      : 'text-foreground'
                  }`}
                >
                  {item.isDiscount
                    ? formatCurrency(item.amount)
                    : `₹${item.amount.toLocaleString('en-IN')}/mo`}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-border mx-4" />

          <TotalsRow label="Subtotal (6 months)" value={data.subtotal} />
          <TotalsRow label="Taxes" value={data.taxes} />

          <div className="bg-blue-primary100 rounded-md px-4 py-2 mb-2 flex justify-between">
            <span className="font-medium">Total Amount</span>
            <span className="text-xl font-bold text-blue-primary250">
              ₹{data.total.toLocaleString('en-IN')}
            </span>
          </div>

          {data.savings && (
            <div className="bg-success-100  text-success-300 px-4 py-2.5 text-center text-sm">
               You save ₹{data.savings.toLocaleString('en-IN')}
            </div>
          )}
        </div>

        
        <div className="flex gap-3 w-full pt-1 p-2">
              
            <button onClick={()=>navigate("/billing/upgrade-plan")} className="border px-2 bg-blue-primary100 text-md w-[49%] py-2 rounded flex items-center justify-center gap-2 text-blue-primary250">
               <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 13.3334L8 2.66669M8 2.66669L12 6.66669M8 2.66669L4 6.66669" stroke="#2372EC" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
              Upgrade Plan
            </button>
          
          <button onClick={() =>
  navigate("/billing/payment", {
    state: {
      selectedPlan: defaultData.planName.split(" ")[1].toLowerCase(), 
    },
  })
} className="flex-1 px-2 text-md w-[50%] py-2 rounded flex items-center justify-center gap-2 bg-blue-primary250 text-monochrom-white">
            <CreditCard className="w-4 h-4" />
            Make Payment
          </button>
        </div>
      </div>
    </GeneralDrawer>
  )
}

export default InvoiceDrawer
