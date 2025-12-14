import React from 'react'

const notifications = [
  {
    type: 'new',
    icon: 'green',
    text: 'All tokens for today’s session scheduled at 10:00AM - 12:00PM have been completed.',
    time: '3 min ago',
  },
  {
    type: 'new',
    icon: 'green',
    text: 'Queue started. First patient is ready for consultation.',
    time: '3 min ago',
  },
  {
    type: 'new',
    icon: 'red',
    text: 'You have not started the consultation yet. For the session scheduled at 10:00AM. Please ensure availability.',
    time: '3 min ago',
  },
  {
    type: 'new',
    icon: 'blue',
    text: 'It’s time for your session! You can now start seeing patients.',
    time: '3 min ago',
  },
  {
    type: 'new',
    icon: 'blue',
    text: 'Your OPD Session is Scheduled to Begin at 10:00 AM. Please ensure availability.',
    time: '3 min ago',
  },
];
const olderNotifications = [
  {
    type: 'old',
    icon: 'gray',
    text: 'Your consultation with Dr. Milind Chauhan is Completed',
    time: '3 min ago',
  },
  {
    type: 'old',
    icon: 'gray',
    text: 'Your consultation with Dr. Milind Chauhan is Completed',
    time: '3 min ago',
  },
];

export default function NotificationDrawer({ show, onClose }) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-300 ${show ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      {/* Drawer */}
      <div
        className={`fixed z-50 transition-transform duration-500`}
        style={{
          top: 32,
          right: 32,
          width: 476,
          height: 964,
          background: 'white',
          borderRadius: 12,
          boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          zIndex: 50,
          transform: show ? 'translateX(0)' : 'translateX(520px)',
          transition: 'transform 0.5s',
        }}
      >
        <div className="px-7 py-5 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[18px] font-semibold">Notifications</h2>
            <div className="flex items-center gap-4">
              {/* Three-dot icon */}
              <button className="text-gray-400 hover:text-gray-600" style={{padding:0,background:'none',border:'none'}} aria-label="Options">
                <svg width="22" height="22" viewBox="0 0 20 20" fill="none"><circle cx="4" cy="10" r="1.5" fill="#A0AEC0"/><circle cx="10" cy="10" r="1.5" fill="#A0AEC0"/><circle cx="16" cy="10" r="1.5" fill="#A0AEC0"/></svg>
              </button>
              <button className="text-xs text-blue-600 font-medium">Mark all as Read</button>
              <button className="text-gray-500 hover:text-gray-700" onClick={onClose} aria-label="Close" style={{padding:0,background:'none',border:'none'}}>
                <span style={{fontSize:24,marginLeft:'2px'}}>&times;</span>
              </button>
            </div>
          </div>
          {/* Tabs */}
          <div className="flex gap-6 mb-5">
            <button className="text-sm font-medium text-blue-600 border-b-2 border-blue-600 pb-1">All</button>
            <button className="text-sm font-medium text-gray-400 pb-1">Unread</button>
          </div>
          {/* New Notifications */}
          <div className="mb-2">
            <div className="text-xs text-gray-500 mb-2">New</div>
            <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
              {notifications.map((n, idx) => (
                <div key={idx} className="flex items-center gap-4 py-3 border-b border-gray-100">
                  <span className={`w-7 h-7 flex items-center justify-center rounded-full ${n.icon==='green'?'bg-green-100 text-green-600':n.icon==='red'?'bg-red-100 text-red-600':'bg-blue-100 text-blue-600'}`}>
                    {n.icon==='green'?<span>&#x2714;</span>:n.icon==='red'?<span>&#x25CF;</span>:<span>&#x25CF;</span>}
                  </span>
                  <div className="flex-1">
                    <div className="text-[15px] text-gray-800 leading-snug">{n.text}</div>
                    <div className="text-xs text-gray-400 mt-1">{n.time}</div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                </div>
              ))}
            </div>
          </div>
          {/* Older Notifications */}
          <div className="mt-2">
            <div className="text-xs text-gray-500 mb-2">Older</div>
            <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
              {olderNotifications.map((n, idx) => (
                <div key={idx} className="flex items-center gap-4 py-3 border-b border-gray-100">
                  <span className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 text-gray-400">
                    <span>&#x2714;</span>
                  </span>
                  <div className="flex-1">
                    <div className="text-[15px] text-gray-800 leading-snug">{n.text}</div>
                    <div className="text-xs text-gray-400 mt-1">{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
