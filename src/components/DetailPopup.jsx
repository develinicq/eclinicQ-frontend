import React from 'react';
import UniversalLoader from './UniversalLoader';
import { infoCircle } from '../../public/index';

const DetailPopup = ({
    isOpen,
    heading,
    subHeading,
    children,
    onCancel,
    onVerify,
    isVerifying = false,
    isVerifyDisabled = false,
    verifyBtnText = "Verify",
    cancelBtnText = "Cancel"
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 ">
            <div className="w-[510px] bg-white rounded-xl shadow-lg p-8 flex flex-col items-center animate-in fade-in zoom-in duration-200">

                {/* Heading */}
                <h2 className="text-[24px] font-bold text-secondary-grey400 mb-2 text-center">
                    {heading}
                </h2>

                {/* Subheading */}
                <div className="text-center text-gray-500 text-sm mb-8 leading-relaxed">
                    {subHeading}
                </div>

                {/* Content (Inputs) */}
                <div className="w-full mb-8">
                    {children}
                </div>

                {/* Buttons */}
                <div className="flex gap-4 w-full mb-6">
                    {isVerifying ? (
                        <button
                            disabled
                            className="w-full h-11 flex items-center justify-center gap-2 bg-blue-600 text-white rounded-md text-sm font-medium transition-colors"
                        >
                            <UniversalLoader
                                size={20}
                                style={{
                                    background: 'transparent',
                                    width: 'auto',
                                    height: 'auto',
                                    minHeight: 0,
                                    minWidth: 0
                                }}
                            />
                            Verifying
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={onCancel}
                                className="flex-1 h-11 bg-white border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
                            >
                                {cancelBtnText}
                            </button>
                            <button
                                onClick={onVerify}
                                disabled={isVerifyDisabled}
                                className={`flex-1 h-11 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2
                  ${isVerifyDisabled
                                        ? 'bg-blue-600/50 cursor-not-allowed text-white'
                                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                                    }`}
                            >
                                <div className="w-4 h-4 rounded-full border border-white flex items-center justify-center">
                                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                {verifyBtnText}
                            </button>
                        </>
                    )}
                </div>

                {/* Footer Info */}
                <div className="flex items-center gap-2 text-gray-400 text-xs w-full">
                    <img src={infoCircle} alt="info" className="w-4 h-4 opacity-60" />
                    <span>It may take a minute or two to receive your code.</span>
                </div>

            </div>
        </div>
    );
};

export default DetailPopup;
