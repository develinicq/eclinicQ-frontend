import React, { useMemo } from "react";
import { MoreVertical, Calendar, Heart } from "lucide-react";

// Default column definition array to generalize headers and cell rendering
const defaultColumns = [
	{
		key: "patient",
		header: "Patient",
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
	{ key: "patientId", header: "Patient ID" },
	{ key: "phone", header: "Contact" },
	{ key: "email", header: "Email" },
	{ key: "bloodGroup", header: "Blood Group" },
	{ key: "height", header: "Height" },
	{ key: "weight", header: "Weight" },
	{ key: "bp", header: "BP" },
	{ key: "sugar", header: "Sugar" },
	{
		key: "location",
		header: "Location",
		render: (row) => (
			<span className="rounded bg-gray-100 px-2 py-1 text-xs">
				{row.location}
			</span>
		),
	},
	{ key: "lastVisit", header: "Last Visit" },
	{ key: "reason", header: "Reason", cellClass: "max-w-[260px] truncate" },
	{
		key: "actions",
		header: "Actions",
		sticky: "right",
		align: "center",
		render: () => (
			<div className="flex justify-center gap-3 text-gray-500">
				<Calendar className="h-4 w-4 cursor-pointer" />
				<Heart className="h-4 w-4 cursor-pointer" />
				<MoreVertical className="h-4 w-4 cursor-pointer" />
			</div>
		),
	},
];

// Demo default data
const defaultData = Array.from({ length: 20 }).map((_, i) => ({
	name: `Patient ${i + 1}`,
	gender: i % 2 === 0 ? "M" : "F",
	dob: "03/14/1990",
	age: 33,
	patientId: `P${650000 + i}`,
	phone: "+91 9876543210",
	email: `patient${i + 1}@example.com`,
	location: "Akola, MH",
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
    pageSize = 10,
    total = 200,
    onPageChange,
    stickyLeftWidth = 280,
    stickyRightWidth = 120,
}) {
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
		<div className="relative h-[90vh] rounded-xl border-[0.5px] border-secondary-grey100 bg-white overflow-hidden">
			{/* Scroll Area */}
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
								const base = "px-4 py-3 text-left relative bg-white whitespace-nowrap";
								const stickyLeft = col.sticky === "left" ? " sticky left-0 z-50" : "";
								const stickyRight = col.sticky === "right" ? " sticky right-0 z-50 text-center" : "";
								const align = col.align === "center" ? " text-center" : "";
								// width: constrain sticky columns; allow optional widths for non-sticky
								const widthStyle =
									col.sticky === "left"
										? { minWidth: STICKY_LEFT_WIDTH, width: STICKY_LEFT_WIDTH }
										: col.sticky === "right"
										? { minWidth: STICKY_RIGHT_WIDTH, width: STICKY_RIGHT_WIDTH }
										: col.width
										? { minWidth: col.width }
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
										{col.header}
										{/* Overlay dividers (above bg) with slight offset to align across header/body */}
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
									const base = "px-4 py-3 bg-white relative whitespace-nowrap";
									const stickyLeft = col.sticky === "left" ? " sticky left-0 z-30" : ""; // below header (z-50)
									const stickyRight = col.sticky === "right" ? " sticky right-0 z-30" : "";
									const align = col.align === "center" ? " text-center" : "";
									const cellClass = col.cellClass ? ` ${col.cellClass}` : "";
									const content = col.render ? col.render(row) : row[col.key];
									const widthStyle =
										col.sticky === "left"
											? { minWidth: STICKY_LEFT_WIDTH, width: STICKY_LEFT_WIDTH }
											: col.sticky === "right"
											? { minWidth: STICKY_RIGHT_WIDTH, width: STICKY_RIGHT_WIDTH }
											: col.width
											? { minWidth: col.width }
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
										</td>
									);
								})}
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Pagination placed after table content (not sticky) */}
			<div className="flex items-center justify-between border-t bg-white px-4 py-2 text-sm">
				<span>
					{start}–{end} of {total}
				</span>
				<div className="flex items-center gap-2">
					<button
						className="rounded border px-2 py-1 disabled:opacity-50"
						disabled={!canPrev}
						onClick={() => goto(page - 1)}
					>
						‹
					</button>
					<button className="rounded border bg-gray-100 px-2 py-1" onClick={() => goto(page)}>
						{page}
					</button>
					{page + 1 <= totalPages && (
						<button className="rounded border px-2 py-1" onClick={() => goto(page + 1)}>
							{page + 1}
						</button>
					)}
					{page + 2 <= totalPages && (
						<button className="rounded border px-2 py-1" onClick={() => goto(page + 2)}>
							{page + 2}
						</button>
					)}
					<button
						className="rounded border px-2 py-1 disabled:opacity-50"
						disabled={!canNext}
						onClick={() => goto(page + 1)}
					>
						›
					</button>
				</div>
			</div>
		</div>
	);
}
