import React from 'react'

const ReviewBanner = ({
  className = '',
  icon = null,
  title = 'Ready to Activate',
  message = "Your hospital account is ready to be activated. Some verifications are still in progress but won't delay your access.",
  tone = 'success'
}) => {
  const tones = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-700',
      title: 'text-green-800'
    },
    warn: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-700',
      title: 'text-yellow-800'
    }
  }
  const t = tones[tone] || tones.success

  return (
    <div className={`${t.bg} border ${t.border} rounded-lg p-4 flex items-start ${className}`}>
      {icon && <div className="mr-3 mt-0.5 flex-shrink-0">{icon}</div>}
      <div>
        <p className={`${t.title} font-medium text-sm`}>{title}</p>
        <p className={`${t.text} text-sm mt-1`}>{message}</p>
      </div>
    </div>
  )
}

export default ReviewBanner
