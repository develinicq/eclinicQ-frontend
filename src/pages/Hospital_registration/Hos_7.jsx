import React, { useEffect } from "react";

const Hos_7 = () => {
  useEffect(() => {
    // Prevent scrolling on body and html
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    // Cleanup function to restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen overflow-hidden bg-white p-4">
      {/* Main Success Message */}
      <h1 className="text-xl font-bold text-gray-800 text-center mb-3">
        Manipal Hospital Profile Activated Successfully
      </h1>

      {/* Information Box */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-3 max-w-md w-full">
        <h2 className="text-sm font-bold text-gray-800 mb-2">
          What's Happens Next?
        </h2>
        
        <div className="space-y-1">
          <div className="flex gap-2">
            <span className="text-gray-600 font-medium text-xs">1.</span>
            <p className="text-gray-700 text-xs">
              You'll get immediate access to your dashboard based on auto-verified IDs.
            </p>
          </div>
          
          <div className="flex gap-2">
            <span className="text-gray-600 font-medium text-xs">2.</span>
            <p className="text-gray-700 text-xs">
              Our team will review your uploaded documents within 24-48 hours.
            </p>
          </div>
          
          <div className="flex gap-2">
            <span className="text-gray-600 font-medium text-xs">3.</span>
            <p className="text-gray-700 text-xs">
              Your staff will receive email invitations to join the platform.
            </p>
          </div>
          
          <div className="flex gap-2">
            <span className="text-gray-600 font-medium text-xs">4.</span>
            <p className="text-gray-700 text-xs">
              If requested, our team will assist with data migration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hos_7;
