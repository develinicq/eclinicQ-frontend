import React from "react";
import { Sun, Moon } from "lucide-react"; // icons

const FeeRow = () => (
  <div className="flex justify-between items-center border-b border-[#E5E5E5] py-3 px-2">
    <div className="flex-1 border-r border-[#E5E5E5] pr-4">
      <span className="font-normal text-sm text-[#626060]">
        In-Clinic Consultation Fees:
      </span>
      <span className="ml-2 font-medium text-sm text-[#424242]">₹500</span>
    </div>
    <div className="flex-1 pl-4">
      <span className="font-normal text-sm text-[#626060]">Follow-up Fee:</span>
      <span className="ml-2 font-medium text-sm text-[#424242]">₹300</span>
    </div>
  </div>
);

const Session = ({ icon, title, tokens, time }) => (
  <div className="flex flex-col items-start gap-1 border rounded-md px-3 py-2 shadow-sm bg-white min-w-[160px]">
    <div className="flex items-center gap-2 text-sm font-medium text-[#424242]">
      {icon}
      {title}
    </div>
    <span className="text-xs text-[#626060]">Tokens: {tokens}</span>
    <span className="text-xs text-[#424242]">({time})</span>
  </div>
);

const DaySchedule = ({ day, sessions, available }) => (
<>
  <div className="grid grid-cols-[140px_1fr_120px] items-start border-b py-4 px-2 gap-16">
    {/* Day Name */}
    <div className="font-medium text-[#424242]">{day}</div>

    {/* Sessions */}
    <div className="flex justify-start">
      <div className="flex gap-6 flex-wrap ">
        {sessions.length > 0 ? (
          sessions.map((s, idx) => <Session key={idx} {...s} />)
        ) : (
          <span className="text-sm text-[#A0A0A0]">No Appointment Accepting</span>
        )}
      </div>
    </div>

    {/* Availability */}
    <div className="text-sm font-medium text-right">
      {available ? (
        <span className="text-green-600">Available</span>
      ) : (
        <span className="text-[#A0A0A0]">Not-Available</span>
      )}
    </div>
  </div>
  </>
);

const Consultation = () => {
  return (
    <div className="flex flex-col pt-1 px-3 pb-6 gap-6">
      {/* Fees */}
      <FeeRow />

      {/* Weekly Schedule */}
      <div>
        <h3 className="text-[#424242] font-medium text-sm mb-2">
          Weekly Consultation Schedule
        </h3>
        <div className="border-t border-[#D6D6D6] flex flex-col">
          <DaySchedule day="Sunday" sessions={[]} available={false} />
          <DaySchedule
            day="Monday"
            available={true}
            sessions={[
              { icon: <Sun size={16} />, title: "Session 1", tokens: 50, time: "10:00am-12:00pm" },
              { icon: <Sun size={16} />, title: "Session 2", tokens: 50, time: "2:00pm-4:00pm" },
              { icon: <Sun size={16} />, title: "Session 3", tokens: 50, time: "6:00pm-8:00pm" },
              { icon: <Moon size={16} />, title: "Session 4", tokens: 50, time: "8:30pm-10:30pm" },
            ]}
          />
          <DaySchedule
            day="Tuesday"
            available={true}
            sessions={[
              { icon: <Sun size={16} />, title: "Full Day Session", tokens: 150, time: "10:00am-6:00pm" },
            ]}
          />
          <DaySchedule
            day="Wednesday"
            available={true}
            sessions={[
              { icon: <Sun size={16} />, title: "Session 1", tokens: 50, time: "10:00am-12:00pm" },
              { icon: <Sun size={16} />, title: "Session 2", tokens: 50, time: "2:00pm-4:00pm" },
              { icon: <Sun size={16} />, title: "Session 3", tokens: 50, time: "6:00pm-8:00pm" },
              { icon: <Moon size={16} />, title: "Session 4", tokens: 50, time: "8:30pm-10:30pm" },
            ]}
          />
          <DaySchedule
            day="Thursday"
            available={true}
            sessions={[
              { icon: <Sun size={16} />, title: "Session 1", tokens: 50, time: "10:00am-12:00pm" },
              { icon: <Sun size={16} />, title: "Session 2", tokens: 50, time: "2:00pm-4:00pm" },
              { icon: <Sun size={16} />, title: "Session 3", tokens: 50, time: "6:00pm-8:00pm" },
              { icon: <Moon size={16} />, title: "Session 4", tokens: 50, time: "8:30pm-10:30pm" },
            ]}
          />
          <DaySchedule
            day="Friday"
            available={true}
            sessions={[
              { icon: <Sun size={16} />, title: "Session 1", tokens: 50, time: "10:00am-12:00pm" },
              { icon: <Sun size={16} />, title: "Session 2", tokens: 50, time: "2:00pm-4:00pm" },
              { icon: <Sun size={16} />, title: "Session 3", tokens: 50, time: "6:00pm-8:00pm" },
              { icon: <Moon size={16} />, title: "Session 4", tokens: 50, time: "8:30pm-10:30pm" },
            ]}
          />
          <DaySchedule day="Saturday" sessions={[]} available={false} />
        </div>
      </div>
    </div>
  );
};

export default Consultation;
