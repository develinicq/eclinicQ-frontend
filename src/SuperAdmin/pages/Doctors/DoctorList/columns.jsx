import React from 'react';
import TableHeader from '../../../../components/TableHeader';
import AvatarCircle from '../../../../components/AvatarCircle';
import Badge from '../../../../components/Badge';
import { MoreVertical, Eye, Star, CalendarClock, Briefcase, Link, UserX, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const eye = '/black_eye.png';
const more = '/more_black.png'
const star = '/star.png'
const tick = '/tick.png'

import { createPortal } from 'react-dom';

const toDash = (v) => (v === null || v === undefined || v === '' ? '-' : v);
const stateCodeFromLocation = (loc) => {
    if (!loc) return '-';
    const parts = String(loc).split(',');
    const rawState = parts.length > 1 ? parts[parts.length - 1].trim() : String(loc).trim();
    const state = rawState.toLowerCase();
    // Minimal mapping for common Indian states/UTs
    const map = {
        maharashtra: 'MH',
        karnataka: 'KA',
        delhi: 'DL',
        'nct of delhi': 'DL',
        tamilnadu: 'TN',
        'tamil nadu': 'TN',
        kerala: 'KL',
        gujarat: 'GJ',
        rajasthan: 'RJ',
        'uttar pradesh': 'UP',
        'madhya pradesh': 'MP',
        'west bengal': 'WB',
        telangana: 'TS',
        andhra: 'AP',
        'andhra pradesh': 'AP',
        punjab: 'PB',
        haryana: 'HR',
        bihar: 'BR',
        odisha: 'OD',
        'orissa': 'OD',
        assam: 'AS',
        goa: 'GA',
        chhattisgarh: 'CG',
        uttarakhand: 'UK',
        'jammu and kashmir': 'JK',
        'jammu & kashmir': 'JK',
        ladakh: 'LA',
        'andaman and nicobar islands': 'AN',
        chandigarh: 'CH',
        'dadra and nagar haveli and daman and diu': 'DN',
        daman: 'DN',
        diu: 'DN',
        lakshadweep: 'LD',
        manipur: 'MN',
        meghalaya: 'ML',
        mizoram: 'MZ',
        nagaland: 'NL',
        sikkim: 'SK',
        tripura: 'TR',
        'arunachal pradesh': 'AR',
        'puducherry': 'PY',
        'pondicherry': 'PY',
        'jharkhand': 'JH',
        'himachal pradesh': 'HP',
        'andhra pradesh ': 'AP',
    };
    if (map[state]) return map[state];
    const letters = rawState.replace(/[^A-Za-z]/g, '');
    if (!letters) return '-';
    return letters.slice(0, 2).toUpperCase();
};

const formatLocationShort = (loc) => {
    if (!loc) return '-';
    const parts = String(loc).split(',');
    if (parts.length === 1) {
        // Single part, treat as city (don't abbreviate)
        const single = parts[0].trim();
        return single || '-';
    }
    const city = parts[0].trim();
    const state = parts[parts.length - 1].trim();
    const code = stateCodeFromLocation(state);
    if (!city) return code;
    if (!code || code === '-') return toDash(city);
    return `${city}, ${code}`;
};

const ActionCell = ({ row }) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = React.useState(false);
    const [position, setPosition] = React.useState({ top: 0, left: 0 });
    const menuRef = React.useRef(null);
    const buttonRef = React.useRef(null);

    const openDoctor = (e) => {
        e.stopPropagation();
        navigate(`/doctor/${encodeURIComponent(row.userId || row.id)}`, { state: { doctor: row } });
    };

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        const handleScroll = () => {
            if (isOpen) setIsOpen(false);
        };

        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('scroll', handleScroll, true);
        window.addEventListener('resize', handleScroll);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll, true);
            window.removeEventListener('resize', handleScroll);
        };
    }, [isOpen]);

    const toggleMenu = (e) => {
        e.stopPropagation();
        if (!isOpen) {
            const rect = buttonRef.current.getBoundingClientRect();
            setPosition({
                top: rect.bottom + 4,
                left: rect.right - 224 // 224px is w-56
            });
        }
        setIsOpen(!isOpen);
    };

    const handleAction = (action, e) => {
        e.stopPropagation();
        console.log(`Action: ${action}`, row);
        setIsOpen(false);
        // Add specific handlers here if needed
    };

    return (
        <div className="flex items-center justify-center gap-2 relative">
            <button
                className="p-1 rounded hover:bg-gray-100"
                aria-label="View"
                onClick={openDoctor}
            >
                <img src={eye} alt="" className='h-3.5' />
            </button>

            <div className='h-4 border-l border-secondary-grey100/50 ml-1.5 mr-1'></div>

            <button
                ref={buttonRef}
                className={`p-1 rounded hover:bg-gray-100 ${isOpen ? 'bg-gray-100' : ''}`}
                aria-label="More"
                onClick={toggleMenu}
            >
                <img src={more} alt="" className='w-4' />
            </button>

            {isOpen && createPortal(
                <div
                    ref={menuRef}
                    style={{
                        position: 'fixed',
                        top: position.top,
                        left: position.left,
                        zIndex: 99999,
                        width: '14rem' // w-56
                    }}
                    className="bg-white rounded-lg shadow-lg border border-gray-100 py-1.5 animate-in fade-in zoom-in-95 duration-100"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={(e) => handleAction('Update Availability Timing', e)}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                        <CalendarClock className="w-4 h-4 text-gray-500" />
                        Update Availability Timing
                    </button>
                    <button
                        onClick={(e) => handleAction('Set Out of Office', e)}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                        <Briefcase className="w-4 h-4 text-gray-500" />
                        Set Out of Office
                    </button>
                    <button
                        onClick={(e) => handleAction('Send Magic Link', e)}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                        <Link className="w-4 h-4 text-gray-500" />
                        Send Magic Link
                    </button>
                    <button
                        onClick={(e) => handleAction('Mark as Inactive', e)}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                        <UserX className="w-4 h-4 text-gray-500" />
                        Mark as Inactive
                    </button>
                    <div className="h-px bg-gray-100 my-1"></div>
                    <button
                        onClick={(e) => handleAction('Delete Profile', e)}
                        className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                        <Trash2 className="w-4 h-4" />
                        Delete Profile
                    </button>
                </div>,
                document.body
            )}
        </div>
    );
};

export const doctorColumns = [
    {
        key: 'name',
        header: <TableHeader label="Doctors" />,
        width: 280,
        sticky: 'left',
        headerClassName: 'pl-[52px]',
        render: (row) => {
            const statusStr = String(row.status || '').toUpperCase();
            const isActive = statusStr === 'ACTIVE';
            return (
                <div className="flex items-center gap-2">
                    <div className='relative'>
                        <AvatarCircle name={row.name} size="s" color={isActive ? "orange" : "grey"} />
                        {isActive && <img src={tick} alt="" className='w-4 absolute -top-1 -right-1' />}
                    </div>
                    <div className='flex flex-col  text-sm'>
                        <p className="font-medium text-secondary-grey400 leading-5">{toDash(row.name)}</p>
                        <p className=" text-secondary-grey400">
                            {row.gender ? `${String(row.gender).charAt(0).toUpperCase()} | ` : ''}
                            {toDash(row.exp)}
                        </p>
                    </div>
                </div>
            )
        },
    },
    {
        key: 'id',
        header: <TableHeader label="Doc ID" />,
        width: 140,
        render: (row) => <span className="text-secondary-grey300">{toDash(row.id)}</span>
    },
    {
        key: 'rating',
        header: <TableHeader label="Rating" />,
        width: 90,
        render: (row) => {
            const val = row.rating;
            const display = (val === null || val === undefined) ? '-' : Number(val).toFixed(1);
            return (
                <Badge
                    size="xs"
                    color="warning"
                    leadingIcon={<img src={star} alt="" className='w-2.5' />}
                >
                    {display}
                </Badge>
            );
        },
    },
    {
        key: 'startDate',
        header: <TableHeader label="Start Date" />,
        width: 140,
        render: (row) => <span className=" text-secondary-grey300">{toDash(row.startDate)}</span>
    },
    {
        key: 'plan',
        header: <TableHeader label="Plan" />,
        width: 100,
        render: (row) => (
            <Badge size="xs" color="blue">
                {toDash(row.plan)}
            </Badge>
        ),
    },
    {
        key: 'planStatus',
        header: <TableHeader label="Plan Status" />,
        width: 140,
        render: (row) => {
            const ps = toDash(row.planStatus);
            const isSuspended = ps === 'Suspended';
            return (
                <Badge size="xs" color={isSuspended ? 'gray' : ps === '-' ? 'gray' : 'success'}>
                    {ps}
                </Badge>
            );
        }
    },
    {
        key: 'contact',
        header: <TableHeader label="Contact Number" />,
        width: 160,
        render: (row) => <span className="text-secondary-grey300">{toDash(row.contact)}</span>
    },
    {
        key: 'email',
        header: <TableHeader label="Email" />,
        width: 190,
        cellClass: "whitespace-normal break-words text-secondary-grey400",
        render: (row) => <span className="text-secondary-grey300">{toDash(row.email)}</span>
    },
    {
        key: 'location',
        header: <TableHeader label="Location" />,
        width: 160,
        render: (row) =>
            <div className='h-[22px] px-[6px] flex bg-secondary-grey50 rounded-sm w-fit'>
                <span className="text-secondary-grey400">{formatLocationShort(row.location)}</span>
            </div>

    },
    {
        key: 'specialization',
        header: <TableHeader label="Specializations" />,
        width: 200,
        render: (row) => (
            <div className="flex items-center gap-2 flex-wrap">
                {row.specialization?.includes('/') ? (
                    <Badge size="s" type="ghost" color="gray" className="!h-6 !text-[12px] !px-2 whitespace-nowrap">
                        {row.specialization}
                    </Badge>
                ) : (
                    <span className="text-secondary-grey300">{toDash(row.specialization)}</span>
                )}
                {row.specializationMore ? (
                    <Badge size="s" type="ghost" color="gray" className="!h-5 !text-[11px] !px-1.5">
                        +{row.specializationMore}
                    </Badge>
                ) : null}
            </div>
        ),
    },
    {
        key: 'designation',
        header: <TableHeader label="Designation" />,
        width: 200,
        cellClass: "whitespace-normal break-words text-secondary-grey400",
        render: (row) => <span className="text-secondary-grey300">{toDash(row.designation)}</span>
    },
    {
        key: 'actions',
        header: <TableHeader label="Actions" showIcon={false} />,
        width: 110,
        sticky: 'right',
        align: 'center',
        render: (row) => <ActionCell row={row} />,
    },
];

export const draftColumns = [
    {
        key: 'name',
        header: <TableHeader label="Doctors" />,
        width: 320,
        sticky: 'left',
        headerClassName: 'pl-[52px]',
        render: (row) => {
            const statusStr = String(row.status || '').toUpperCase();
            const isActive = statusStr === 'ACTIVE';
            return (
                <div className="flex items-center gap-2">
                    <div className='relative'>
                        <AvatarCircle name={row.name} size="s" color={isActive ? "orange" : "grey"} />
                        {isActive && <img src={tick} alt="" className='w-4 absolute -top-1 -right-1' />}
                    </div>
                    <div className='flex flex-col  text-sm'>
                        <p className="font-medium text-secondary-grey400 leading-5">{toDash(row.name)}</p>
                        <p className=" text-secondary-grey400">
                            {row.gender ? `${String(row.gender).charAt(0).toUpperCase()} | ` : ''}
                            {toDash(row.exp)}
                        </p>
                    </div>
                </div>
            )
        },
    },
    {
        key: 'draftDate',
        header: <TableHeader label="Draft Date" />,
        width: 140,
        render: (row) => <span className=" text-secondary-grey300">{toDash(row.draftDate)}</span>
    },
    {
        key: 'contact',
        header: <TableHeader label="Contact Number" />,
        width: 160,
        render: (row) => <span className="text-secondary-grey300">{toDash(row.contact)}</span>
    },
    {
        key: 'email',
        header: <TableHeader label="Email" />,
        width: 220,
        cellClass: "whitespace-normal break-words text-secondary-grey400",
        render: (row) => <span className="text-secondary-grey300">{toDash(row.email)}</span>
    },
    {
        key: 'location',
        header: <TableHeader label="Location" />,
        width: 160,
        render: (row) =>
            <div className='h-[22px] px-[6px] flex bg-secondary-grey50 rounded-sm w-fit'>
                <span className="text-secondary-grey400">{formatLocationShort(row.location)}</span>
            </div>

    },
    {
        key: 'specialization',
        header: <TableHeader label="Specializations" />,
        width: 200,
        render: (row) => (
            <div className="flex items-center gap-2 flex-wrap">
                {row.specialization?.includes('/') ? (
                    <Badge size="s" type="ghost" color="gray" className="!h-6 !text-[12px] !px-2 whitespace-nowrap">
                        {row.specialization}
                    </Badge>
                ) : (
                    <span className="text-secondary-grey300">{toDash(row.specialization)}</span>
                )}
                {row.specializationMore ? (
                    <Badge size="s" type="ghost" color="gray" className="!h-5 !text-[11px] !px-1.5">
                        +{row.specializationMore}
                    </Badge>
                ) : null}
            </div>
        ),
    },
    {
        key: 'designation',
        header: <TableHeader label="Designation" />,
        width: 240,
        cellClass: "whitespace-normal break-words text-secondary-grey400",
        render: (row) => <span className="text-secondary-grey300">{toDash(row.designation)}</span>
    },
    {
        key: 'actions',
        header: <TableHeader label="Actions" showIcon={false} />,
        width: 110,
        sticky: 'right',
        align: 'center',
        render: (row) => <ActionCell row={row} />,
    },
];
