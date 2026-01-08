import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const SessionTimer = () => {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(s => s + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (totalSeconds) => {
        const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
        const s = (totalSeconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    return (
        <div className="flex items-center gap-1 bg-success-100 text-success-300 px-[6px] py-[2px] rounded-md text-sm">
            <Clock className="w-3.5 h-3.5" />
            {formatTime(seconds)}
        </div>
    );
};

export default SessionTimer;
