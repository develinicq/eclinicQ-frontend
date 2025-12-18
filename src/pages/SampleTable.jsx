import React, { useMemo } from "react";
import TableHeader from "../components/TableHeader";
import { MoreVertical, Calendar, Heart } from "lucide-react";
import { action_calendar, action_dot, action_heart } from "../../public";
import TablePagination from "./TablePagination";

// Default column definition array to generalize headers and cell rendering
const defaultColumns = [
	{
		key: "patient",
	header: <TableHeader label="Patient" />, // icon shown by default
	icon: true,
		width: 280, // used to help min table width
		sticky: "left",
		render: (row) => (
			<div className="flex items-center gap-3">
				<div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
					{row.name[0]}
				</div>
				<div>
					<div className="font-medium">{row.name}</div>
					<div className="text-xs text-gray-500">
						{row.gender} | {row.dob} ({row.age}Y)
					</div>
				</div>
			</div>
		),
	},
	{ key: "patientId", header: <TableHeader label="Patient ID" /> , icon: true},
	{ key: "phone", header: <TableHeader label="Contact" />, icon: true },
	{ key: "email", header: <TableHeader label="Email" />, icon: true },
	{ key: "bloodGroup", header: <TableHeader label="Blood Group" />, icon: true },
	{ key: "height", header: <TableHeader label="Height" />, icon: true },
	{ key: "weight", header: <TableHeader label="Weight" />, icon: true },
	{ key: "bp", header: <TableHeader label="BP" />, icon: true },
	{ key: "sugar", header: <TableHeader label="Sugar" />, icon: true },
	{
		key: "location",
		header: <TableHeader label="Location" />, icon: true,
		render: (row) => (
			<span className="rounded bg-gray-100 px-2 py-1 text-xs">
				{row.location}
			</span>
		),
	},
	{ key: "lastVisit", header: <TableHeader label="Last Visit" />, icon: true },
	{ key: "reason", header: <TableHeader label="Reason" />, cellClass: "max-w-[260px] truncate", icon: true },
	{
		key: "actions",
		header: <TableHeader label="Actions" showIcon={false} />, // no icon for actions
		icon: false,
		sticky: "right",
		align: "center",
		render: () => (
			<div className="flex justify-center gap-3 text-gray-500">
				<img src={action_calendar} alt="" />
				<Heart className="h-4 w-4 cursor-pointer" />
				<MoreVertical className="h-4 w-4 cursor-pointer" />
			</div>
		),
	},
];

// Demo default data
const defaultData = Array.from({ length: 30 }).map((_, i) => ({
	name: `Patient ${i + 1}`,
	gender: i % 2 === 0 ? "M" : "F",
	dob: "03/14/1990",
	age: 33,
	patientId: `P${650000 + i}`,
	phone: `+91 987654321${i % 10}`,
	email: `patient${i + 1}@example.com`,
	location: ["Akola, MH", "Delhi, DL", "Mumbai, MH", "Chennai, TN", "Kolkata, WB"][i % 5],
	lastVisit: "02/02/2025 | 12:30 PM",
	reason: "Routine check-up for overall health",
	bloodGroup: "O+",
	height: "172 cm",
	weight: "68 kg",
	bp: "120/80",
	sugar: "98 mg/dL",
}));

/**
 * SampleTable Component (Reusable)
 * props:
 * - columns: array of column configs (default provided)
 * - data: array of row objects (default provided)
 * - page: current page (1-based)
 * - pageSize: rows per page
 * - total: total rows for pagination display
 * - onPageChange: (nextPage) => void handler
 * - stickyLeftWidth, stickyRightWidth: px widths for sticky columns
 */
export default function SampleTable({
    columns = defaultColumns,
    data = defaultData,
    page = 1,
    pageSize = 30, // Updated to show 30 rows per page
    total = 200,
    onPageChange,
    stickyLeftWidth = 280,
    stickyRightWidth = 120,
}) {
	// For backward compatibility, if a consumer passes `header` as plain string
	// and also sets `icon: false`, we respect it by wrapping on the fly.
	const renderHeaderContent = (col) => {
		const headerContent = col.header;
		// If caller already used <TableHeader />, just render it.
		if (headerContent && headerContent.type === TableHeader) return headerContent;
		// If it's primitive and they want icon (default true), wrap with TableHeader
		const wantsIcon = col.icon !== false; // default true
		if (typeof headerContent === "string" || typeof headerContent === "number") {
			return <TableHeader label={headerContent} showIcon={wantsIcon} />;
		}
		return headerContent;
	};
    // compute a reasonable min width from column hints
    const minWidth = useMemo(
        () => columns.reduce((acc, c) => acc + (c.width || 160), 0),
        [columns]
    );
    // configurable sticky column widths
    const STICKY_LEFT_WIDTH = stickyLeftWidth; // px
    const STICKY_RIGHT_WIDTH = stickyRightWidth; // px
    const lastColKey = columns[columns.length - 1]?.key;

    // simple derived pagination display
    const start = (page - 1) * pageSize + 1;
    const end = Math.min(page * pageSize, total);
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const canPrev = page > 1;
    const canNext = page < totalPages;
    const goto = (p) => {
        if (!onPageChange) return;
        const next = Math.min(Math.max(1, p), totalPages);
        if (next !== page) onPageChange(next);
    };

	return (
		<div className="relative h-[calc(100vh-140px)] z-10 rounded-xl border-[0.5px] border-secondary-grey100 bg-white">
			{/* Scroll Area: leave space for sticky footer */}
			<div className="h-full overflow-auto pb-16">
				<table
					className={`w-full border-collapse text-sm table-auto`}
					style={{ minWidth }}
				>
					{/* Header */}
					<thead className="sticky top-0 z-40 border-b border-secondary-grey100">
						<tr>
							{columns.map((col) => {
								// Base header cell style; prevent wrapping for cleaner column alignment
								const base = "px-3 py-1 text-left text-sm font-medium relative bg-white whitespace-nowrap";
								const stickyLeft = col.sticky === "left" ? " sticky left-0 z-50" : "";
								const stickyRight = col.sticky === "right" ? " sticky right-0 z-50" : "";
								const align = col.align === "center" ? " " : "";
								// width: constrain sticky columns; allow optional widths for non-sticky
								const widthStyle =
									col.sticky === "left"
										? { minWidth: STICKY_LEFT_WIDTH, width: STICKY_LEFT_WIDTH }
										: col.sticky === "right"
										? { minWidth: STICKY_RIGHT_WIDTH, width: STICKY_RIGHT_WIDTH }
										: col.width
										? { minWidth: col.width, width: col.width }
										: undefined;
								const showRightDivider =
									col.sticky === "left" || (!col.sticky && col.key !== lastColKey);
								const showLeftDivider = col.sticky === "right";
								return (
									<th
										key={col.key}
										className={`${base}${stickyLeft}${stickyRight}${align}`}
										style={widthStyle}
									>
										{renderHeaderContent(col)}
										
										{showRightDivider && (
											<span
												className="pointer-events-none absolute right-0 w-px bg-secondary-grey100"
												style={{ top: "-1px", height: "calc(100% + 1px)" }}
											></span>
										)}
										{showLeftDivider && (
											<span
												className="pointer-events-none absolute left-0 w-px bg-secondary-grey100"
												style={{ top: "-1px", height: "calc(100% + 1px)" }}
											></span>
										)}
										{/* Edge shadows for sticky columns */}
										{col.sticky === "left" && (
											<span
												className="pointer-events-none absolute right-0 top-0 h-full w-2"
												style={{ boxShadow: "inset -6px 0 6px -6px rgba(0,0,0,0.08)" }}
											></span>
										)}
										{col.sticky === "right" && (
											<span
												className="pointer-events-none absolute left-0 top-0 h-full w-2"
												style={{ boxShadow: "inset 6px 0 6px -6px rgba(0,0,0,0.08)" }}
											></span>
										)}
									</th>
								);
							})}
						</tr>
					</thead>

					{/* Body */}
					<tbody>
						{data.map((row, i) => (
							<tr key={i} className="border-t hover:bg-gray-50">
								{columns.map((col) => {
									// Prevent wrapping; keep sticky widths only on sticky columns
									const base = "px-3 h-[54px] bg-white text-sm text-secondary-grey300 font-base relative whitespace-nowrap text-left"; 
									const stickyLeft = col.sticky === "left" ? " sticky left-0 z-30" : ""; // below header (z-50)
									const stickyRight = col.sticky === "right" ? " sticky right-0 z-30" : "";
									const align = col.align === "center" ? " " : "";
									const cellClass = col.cellClass ? ` ${col.cellClass}` : "";
									const content = col.render ? col.render(row) : row[col.key];
									const widthStyle =
										col.sticky === "left"
											? { minWidth: STICKY_LEFT_WIDTH, width: STICKY_LEFT_WIDTH }
											: col.sticky === "right"
											? { minWidth: STICKY_RIGHT_WIDTH, width: STICKY_RIGHT_WIDTH }
											: col.width
											? { minWidth: col.width, width: col.width }
											: undefined;
									const showRightDivider = col.sticky === "left";
									const showLeftDivider = col.sticky === "right";
									const nonStickyBorder = !col.sticky && col.key !== lastColKey ? " border-r" : "";
									return (
										<td
											key={col.key}
											className={`${base}${nonStickyBorder}${stickyLeft}${stickyRight}${align}${cellClass}`}
											style={widthStyle}
										>
											{content}
											{/* Overlay divider to ensure separator renders above bg for sticky columns; extend by 1px to meet header line */}
											{showRightDivider && (
												<span
													className="pointer-events-none absolute right-0 w-px bg-secondary-grey100"
													style={{ top: 0, height: "calc(100% + 1px)" }}
												></span>
											)}
											{showLeftDivider && (
												<span
													className="pointer-events-none absolute left-0 w-px bg-secondary-grey100"
													style={{ top: 0, height: "calc(100% + 1px)" }}
												></span>
											)}
											{/* Edge shadows for sticky columns */}
											{col.sticky === "left" && (
												<span
													className="pointer-events-none absolute right-0 top-0 h-full w-2"
													style={{ boxShadow: "inset -6px 0 6px -6px rgba(0,0,0,0.08)" }}
												></span>
											)}
											{col.sticky === "right" && (
												<span
													className="pointer-events-none absolute left-0 top-0 h-full w-2"
													style={{ boxShadow: "inset 6px 0 6px -6px rgba(0,0,0,0.08)" }}
												></span>
											)}
										</td>
									);
								})}
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Sticky pagination footer */}
			<div className="sticky bottom-0 left-0 right-0 z-50 bg-white ">
				<TablePagination
					page={page}
					pageSize={pageSize}
					total={total}
					start={start}
					end={end}
					canPrev={page > 1}
					canNext={page < totalPages}
					goto={goto}
				/>
			</div>
		</div>

		
	);
}
