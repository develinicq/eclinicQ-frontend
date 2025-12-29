import React, { useState } from "react";
import { createPortal } from "react-dom";
import { dangerIcon } from "../../public/index.js";
import { Checkbox } from "@/components/ui/checkbox";

const TerminateQueueModal = ({
  show,
  onClose,
  onConfirm,
  sessions = [
    { id: "all", label: "All Sessions" },
    { id: "morning", label: "Morning (10:00 Am - 12:00 PM)" },
    { id: "afternoon", label: "Afternoon (2:00 PM - 4:00 PM)" },
    { id: "evening", label: "Evening (6:00 PM - 8:00 PM)" },
    { id: "night", label: "Night (8:00 PM - 10:00 PM)" },
  ],
  isSubmitting = false,
}) => {
  const [selectedSessions, setSelectedSessions] = useState([]);
  const [reason, setReason] = useState("");

  if (!show) return null;

  const handleSessionToggle = (sessionId) => {
    if (sessionId === "all") {
      if (selectedSessions.includes("all")) {
        setSelectedSessions([]);
      } else {
        setSelectedSessions(["all"]);
      }
    } else {
      const newSessions = selectedSessions.filter((id) => id !== "all");
      if (newSessions.includes(sessionId)) {
        setSelectedSessions(newSessions.filter((id) => id !== sessionId));
      } else {
        setSelectedSessions([...newSessions, sessionId]);
      }
    }
  };

  const handleConfirm = () => {
    onConfirm({ sessions: selectedSessions, reason });
  };

  const isDisabled = selectedSessions.length === 0 || isSubmitting;

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div
        className="relative bg-monochrom-white rounded-lg flex flex-col"
        style={{
          width: "400px",
          maxHeight: "90vh",
          gap: "16px",
          padding: "16px",
          border: "1px solid #FCA5A5",
        }}
      >
        {/* Icon */}
        <div className="flex items-center justify-center">
          <div
            className="bg-error-50 rounded-full flex items-center justify-center"
            style={{
              width: "48px",
              height: "48px",
              border: "0.5px solid #DC2626",
            }}
          >
            <img src={dangerIcon} alt="Danger" className="w-6 h-6" />
          </div>
        </div>

        {/* Title */}
        <h3
          className="text-center text-secondary-grey400"
          style={{
            fontFamily: "Inter",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "100%",
            verticalAlign: "middle",
          }}
        >
          Are you sure you want to terminate queue?
        </h3>

        {/* Description */}
        <p
          className="text-center text-secondary-grey300"
          style={{
            fontFamily: "Inter",
            fontWeight: 400,
            fontSize: "13px",
            lineHeight: "100%",
            verticalAlign: "middle",
          }}
        >
          Terminating Queue will cancel the booked appointments. Please Select
          Session and write reason below:
        </p>

        {/* Session List */}
        <div className="flex flex-col gap-2">
          {sessions.map((session) => {
            const isSelected = selectedSessions.includes(session.id);
            return (
              <div
                key={session.id}
                onClick={() => handleSessionToggle(session.id)}
                className={`flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? "bg-blue-primary50"
                    : "bg-secondary-grey50 hover:bg-blue-primary50"
                }`}
                style={{
                  width: "100%",
                  height: "25px",
                  minWidth: "22px",
                  paddingTop: "4px",
                  paddingRight: "6px",
                  paddingBottom: "4px",
                  paddingLeft: "6px",
                  gap: "4px",
                  borderRadius: "4px",
                  border: isSelected
                    ? "0.5px solid #2372EC"
                    : "0.5px solid transparent",
                }}
              >
                {/* Checkbox */}
                <Checkbox
                  id={`session-${session.id}`}
                  checked={isSelected}
                  onCheckedChange={() => handleSessionToggle(session.id)}
                  className="flex-shrink-0 shadow-none border-[#D6D6D6] data-[state=checked]:border-blue-primary250"
                />

                {/* Session Text */}
                <span
                  className={
                    isSelected
                      ? "text-blue-primary250"
                      : "text-secondary-grey400"
                  }
                  style={{
                    fontFamily: "Inter",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "120%",
                    verticalAlign: "middle",
                  }}
                >
                  {session.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Textarea */}
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Not Available"
          className="resize-none text-secondary-grey400 w-full"
          style={{
            height: "66px",
            minHeight: "60px",
            maxHeight: "120px",
            padding: "8px",
            border: "0.5px solid #8E8E8E",
            borderRadius: "4px",
            fontFamily: "Inter",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "120%",
            outline: "none",
          }}
        />

        {/* Action Buttons */}
        <div className="flex items-center gap-2 w-full">
          <button
            className="bg-monochrom-white text-secondary-grey400 hover:bg-secondary-grey50 flex-1"
            style={{
              height: "32px",
              minWidth: "32px",
              gap: "8px",
              borderRadius: "4px",
              padding: "8px",
              border: "0.5px solid #8E8E8E",
              fontFamily: "Inter",
              fontWeight: 500,
              fontSize: "14px",
              lineHeight: "120%",
              verticalAlign: "middle",
            }}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            disabled={isDisabled}
            className={
              isDisabled
                ? "bg-secondary-grey50 cursor-not-allowed flex-1"
                : "bg-error-50 hover:bg-error-400 flex-1"
            }
            style={{
              height: "32px",
              minWidth: "32px",
              gap: "8px",
              borderRadius: "4px",
              padding: "8px",
              border: isDisabled
                ? "0.5px solid transparent"
                : "0.5px solid #FCA5A5",
              fontFamily: "Inter",
              fontWeight: 500,
              fontSize: "14px",
              lineHeight: "120%",
              verticalAlign: "middle",
              color: isDisabled ? "#D6D6D6" : "#DC2626",
            }}
            onClick={handleConfirm}
            onMouseEnter={(e) => {
              if (!isDisabled) {
                e.target.style.color = "#FFFFFF";
              }
            }}
            onMouseLeave={(e) => {
              if (!isDisabled) {
                e.target.style.color = "#DC2626";
              }
            }}
          >
            {isSubmitting ? "Terminating..." : "Yes, Terminate"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default TerminateQueueModal;
