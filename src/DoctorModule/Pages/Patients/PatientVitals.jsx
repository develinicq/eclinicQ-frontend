import React, { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import {
  Eye,
  MoreVertical,
  ChevronDown,
  List,
  BarChart2,
  ArrowUp,
  ArrowDown,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import Badge from "../../../components/Badge";

const vitals = [
  {
    name: "Blood Pressure",
    unit: "mmHg",
    normal: "90/60 - 120/80",
    status: "Worse",
    trend: [
      { value: "130/85 ↑", date: "30/1/25" },
      { value: "145/90 ↑", date: "3/3/25" },
      { value: "118/76", date: "5/11/24" },
    ],
  },
  {
    name: "Oxygen Saturation",
    unit: "%",
    normal: "95.7 - 100",
    status: "Improved",
    trend: [
      { value: "98", date: "1/8/25" },
      { value: "95", date: "4/5/25" },
      { value: "97", date: "6/25/24" },
    ],
  },
  {
    name: "Pulse Rate",
    unit: "bpm",
    normal: "60 - 100",
    status: "Stabled",
    trend: [
      { value: "72", date: "1/10/25" },
      { value: "80", date: "4/25/25" },
      { value: "65", date: "6/15/24" },
    ],
  },
  {
    name: "Respiratory Rate",
    unit: "breaths/min",
    normal: "12-18",
    status: "Improved",
    trend: [
      { value: "16 ↓", date: "2/15/25" },
      { value: "18", date: "5/25/25" },
      { value: "15", date: "3/30/24" },
    ],
  },
  {
    name: "Body Temperature",
    unit: "°F",
    normal: "97.7 - 99.1",
    status: "Stabled",
    trend: [
      { value: "98.6", date: "1/20/25" },
      { value: "99.1", date: "4/1/25" },
      { value: "98.4", date: "5/18/24" },
    ],
  },
  {
    name: "Blood Glucose Level",
    unit: "mg/dL",
    normal: "70 - 100",
    status: "Worse",
    trend: [
      { value: "110 ↑", date: "1/5/25" },
      { value: "140 ↑", date: "3/22/25" },
      { value: "95", date: "5/12/24" },
    ],
  },
];

const biometrics = [
  {
    name: "Weight",
    unit: "Kgs",
    trend: [
      { value: "70 ↑", date: "1/22/25" },
      { value: "75 ↑", date: "4/15/25" },
      { value: "68", date: "6/10/24" },
      { value: "80 ↑", date: "9/15/24" },
      { value: "72", date: "11/20/24" },
    ],
  },
  {
    name: "Height",
    unit: "feets",
    trend: [
      { value: `5'4"`, date: "1/22/25" },
      { value: `5'6"`, date: "4/15/25" },
      { value: `5'3"`, date: "6/10/24" },
      { value: `5'8"`, date: "9/15/24" },
      { value: `5'5"`, date: "11/20/24" },
    ],
  },
  {
    name: "BMI",
    unit: "kg/m²",
    trend: [
      { value: "22.5 ↑", date: "2/10/25" },
      { value: "24.0 ↑", date: "5/15/25" },
      { value: "21.0", date: "3/25/24" },
      { value: "23.5 ↑", date: "8/5/24" },
      { value: "22.0", date: "10/10/24" },
    ],
  },
  {
    name: "Waist Circumference",
    unit: "inches",
    trend: [
      { value: "32", date: "1/22/25" },
      { value: "34 ↑", date: "4/15/25" },
      { value: "31", date: "6/10/24" },
      { value: "36 ↑", date: "9/15/24" },
      { value: "33", date: "11/20/24" },
    ],
  },
];

function SectionHeader({ title, actionLabel, hideActions = false }) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm font-semibold text-gray-800">{title}</div>
      {!hideActions && (
        <div className="flex items-center gap-2 text-sm">
          <button className="text-blue-600 hover:underline flex items-center gap-1">
            + {actionLabel}
          </button>
          <button
            className="p-1.5 rounded hover:bg-gray-100"
            aria-label="Columns"
          >
            <ChevronDown className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      )}
    </div>
  );
}

const VitalsTable = () => {
  const vitals = [
    {
      name: "Blood Pressure",
      unit: "mmHg",
      values: [
        { reading: "130/85", date: "30/1/25", trend: "up" },
        { reading: "145/90", date: "3/3/25", trend: "up" },
        { reading: "118/76", date: "5/11/24", trend: null },
      ],
      status: "worse",
      normalRange: "190/60 - 120/80",
    },
    {
      name: "Oxygen Saturation",
      unit: "%",
      values: [
        { reading: "98", date: "1/8/25", trend: null },
        { reading: "95", date: "4/5/25", trend: null },
        { reading: "97", date: "6/25/24", trend: null },
      ],
      status: "stable",
      normalRange: "95.7 - 100",
    },
    {
      name: "Pulse Rate",
      unit: "bpm",
      values: [
        { reading: "72", date: "1/10/25", trend: null },
        { reading: "80", date: "4/25/25", trend: null },
        { reading: "65", date: "6/15/24", trend: null },
      ],
      status: "stable",
      normalRange: "60 - 100",
    },
    {
      name: "Respiratory Rate",
      unit: "breaths/min",
      values: [
        { reading: "16", date: "2/15/25", trend: "down" },
        { reading: "18", date: "5/25/25", trend: "down" },
        { reading: "15", date: "3/30/24", trend: null },
      ],
      status: "improved",
      normalRange: "12-18",
    },
    {
      name: "Body Temperature",
      unit: "°F",
      values: [
        { reading: "98.6", date: "1/20/25", trend: null },
        { reading: "99.1", date: "4/1/25", trend: null },
        { reading: "98.4", date: "5/18/24", trend: null },
      ],
      status: "stable",
      normalRange: "97.7 - 99.1",
    },
    {
      name: "Blood Glucose Level",
      unit: "mg/dL",
      values: [
        { reading: "110", date: "1/5/25", trend: "up" },
        { reading: "140", date: "3/22/25", trend: "up" },
        { reading: "95", date: "5/12/24", trend: null },
      ],
      status: "worse",
      normalRange: "70 - 100",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "worse":
        return "text-red-500";
      case "improved":
        return "text-green-500";
      case "stable":
        return "text-gray-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "worse":
        return <img src="/Course Down.svg" className="w-4 h-4 inline ml-1" />;
      case "improved":
        return <img src="/Course Up.svg" className="w-4 h-4 inline ml-1" />;
      default:
        return <img src="/Pending.svg" className="w-4 h-4 inline ml-1" />;
    }
  };

  return (
    <div className="w-full overflow-x-auto border-t-[0.5px] border-t-[#D6D6D6]">
      <table className="w-full border-collapse">
        <thead>
          <tr className="h-8 min-h-8 max-h-8 border-b-[0.5px] border-b-[#D6D6D6]">
            <th className="text-left text-sm w-[180px] max-w-[180px] h-8 px-1 font-inter font-medium leading-[120%] tracking-normal align-middle text-[#424242]">
              Name <span className="text-gray-400">⋄</span>
            </th>
            <th className="text-left text-sm max-w-[300px] h-8 px-1 font-inter font-medium leading-[120%] tracking-normal align-middle text-[#424242]">
              Last 3 Recorded Values <span className="text-gray-400">⋄</span>
            </th>
            <th className="text-left text-sm w-[180px] max-w-[180px] h-8 px-1 font-inter font-medium leading-[120%] tracking-normal align-middle text-[#424242]">
              Status
            </th>
            <th className="text-left text-sm w-[180px] max-w-[180px] h-8 px-1 font-inter font-medium leading-[120%] tracking-normal align-middle text-[#424242]">
              Normal Range
            </th>
          </tr>
        </thead>
        <tbody>
          {vitals.map((vital, idx) => (
            <tr key={idx} className="h-[54px] min-h-[54px] max-h-[54px] border-t-[0.5px] border-t-[#D6D6D6]">
              <td className="w-[180px] max-w-[180px] h-[54px] py-2 px-1">
                <div className="font-inter font-medium text-sm leading-[120%] tracking-normal align-middle text-[#424242]">{vital.name}</div>
                <div className="font-inter font-normal text-xs leading-[120%] tracking-normal align-middle text-[#8E8E8E]">{vital.unit}</div>
              </td>
              <td className="w-[300px] max-w-[300px] h-[54px] py-2 px-1">
                <div className="flex gap-8">
                  {vital.values.map((value, vidx) => (
                    <div key={vidx} className="flex flex-col w-[60px]">
                      <div className="flex items-center gap-1">
                        <span
                          className={`${
                            vidx < 2 && vital.status === "worse"
                              ? "inline-flex items-center h-4 rounded text-red-600 text-xs font-medium"
                              : vidx < 2 && vital.status === "improved"
                              ? "inline-flex items-center h-4 rounded text-green-600 text-xs font-medium"
                              : "inline-flex items-center h-4 rounded text-gray-800 text-xs font-medium"  
                          }`}
                        >
                          {value.reading}
                        </span>
                        {value.trend === "up" && (
                          <ArrowUp className="w-3 h-3 text-red-600" />
                        )}
                        {value.trend === "down" && (
                          <ArrowDown className="w-3 h-3 text-green-600" />
                        )}
                      </div>
                      <div className="font-inter font-normal text-xs leading-[120%] tracking-normal align-middle text-[#8E8E8E] mt-1">
                        {value.date}
                      </div>
                    </div>
                  ))}
                </div>
              </td>
              <td className="w-[180px] max-w-[180px] h-[54px] py-2 px-1">
                <div
                  className={`w-fit p-1 rounded font-inter font-normal text-sm leading-[120%] tracking-normal text-center align-middle ${getStatusColor(
                    vital.status
                  )} ${vital.status === "worse" ? "bg-[#FFF8F8]" : vital.status === "improved" ? "bg-[#F2FFF3]" : "bg-[#F9F9F9]"} flex items-center`}
                >
                  {vital.status.charAt(0).toUpperCase() + vital.status.slice(1)}
                  {getStatusIcon(vital.status)}
                </div>
              </td>
              <td className="w-[180px] max-w-[180px] h-[54px] py-2 px-1">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1 min-w-[18px] w-[100px] h-[18px] px-1 py-[2px] rounded text-xs font-normal text-gray-600 bg-[#F9F9F9]">{vital.normalRange}</div>
                  <img src="/Eye.svg" className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

function BiometricsTable() {
  return (
    <div className="mt-2 border-t-[1px] border-gray-200">
      <table className="min-w-full table-fixed text-sm text-left text-gray-700">
        <colgroup>
          <col className="w-[220px]" />
          <col className="w-[580px]" />
          <col className="w-[64px]" />
        </colgroup>
        <thead className="text-[12px] uppercase font-medium text-gray-500 border-b">
          <tr className="h-8">
            <th>Name</th>
            <th className="">Last 5 Recorded Values</th>
            <th className="pr-2 text-right"> </th>
          </tr>
        </thead>
        <tbody>
          {biometrics.map((b, i) => (
            <tr key={i} className="border-b border-gray-200">
              <td className="py-2">
                <div className="flex flex-col justify-center">
                  <span className="font-medium text-gray-800">{b.name}</span>
                  <span className="text-xs text-gray-500">{b.unit}</span>
                </div>
              </td>
              <td className="py-2">
                <div className="grid grid-cols-5 gap-6">
                  {b.trend.map((t, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span
                        className={`text-sm ${
                          /↑/.test(t.value)
                            ? "text-red-600"
                            : /↓/.test(t.value)
                            ? "text-green-600"
                            : "text-gray-800"
                        }`}
                      >
                        {t.value}
                      </span>
                      <span className="text-[11px] text-gray-500">
                        {t.date}
                      </span>
                    </div>
                  ))}
                </div>
              </td>
              <td className="py-2 pr-2">
                <div className="flex items-center justify-end gap-2 text-gray-600">
                  <button
                    className=""
                    aria-label="View"
                  >
                    <img src="/Eye.svg" width={20} height={20} className="h-[20px] w-[20px]" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PatientVitals({
  embedded = false,
  onAdd,
}) {
  const { id } = useParams();
  const [selected, setSelected] = useState(vitals[0].name);
  const [viewMode, setViewMode] = useState("chart"); // 'chart' or 'table'
  if (embedded) {
    return (
      <>
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <div className="text-sm font-semibold text-gray-800">
                  Vitals
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex gap-[2px]">
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-2 rounded ${
                    viewMode === "table"
                      ? "text-gray-800"
                      : "text-gray-500"
                  }`}
                  aria-label="list view"
                >
                  <List className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("chart")}
                  className={`p-2 rounded ${
                    viewMode === "chart"
                      ? "text-gray-800"
                      : "text-gray-500"
                  }`}
                  aria-label="chart view"
                >
                  <BarChart2 className="h-4 w-4" />
                </button>
              </div>

              {/* vertical line */}
              <div className="w-[1.5px] h-[16px] bg-gray-300 " />

              <button
                onClick={onAdd}
                className="inline-flex items-center gap-1
                  h-4 px-2
                  rounded
                  text-[#2372EC]
                  text-[14px]
                  opacity-100
                  focus:outline-none font-inter font-normal text-sm leading-[1.2] tracking-normal align-middle"
              >
                + Add Vitals
              </button>
            </div>
          </div>

          {/* vitals content: stacked views with max-height + opacity transitions to avoid overlap */}
          <div className="mt-3">
            <div
              className={`overflow-hidden transition-all duration-300 ${
                viewMode === "chart"
                  ? "max-h-[1200px] opacity-100"
                  : "max-h-0 opacity-0 pointer-events-none"
              }`}
            >
              <div className="flex gap-4">
                <div className="w-[220px] border border-gray-100 rounded bg-white">
                  <div className="text-xs text-gray-500 px-3 py-2">Vitals</div>
                  <div className="divide-y">
                    {vitals.map((v, i) => (
                      <button
                        key={i}
                        onClick={() => setSelected(v.name)}
                        className={`w-full text-left px-3 py-3 flex items-center gap-3 ${
                          selected === v.name
                            ? "bg-blue-50 text-blue-600"
                            : ""
                        }`}
                      >
                        <div className="flex-1">
                          <div className="font-medium text-sm">{v.name}</div>
                          <div className="text-[12px] text-gray-500">
                            {v.unit}
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">
                          {v.trend[0]?.value}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex-1 bg-white border border-gray-100 rounded p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-semibold text-gray-800">
                        {selected}{" "}
                        <span className="text-xs text-gray-500">
                          {vitals.find((v) => v.name === selected)?.unit}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {vitals.find((v) => v.name === selected)?.normal}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      1 Month{" "}
                      <button className="ml-2 p-1 rounded hover:bg-gray-100">
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-orange-300 inline-block" />{" "}
                      Systolic
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-300 inline-block" />{" "}
                      Diastolic
                    </div>
                    <div className="px-2 py-1 text-xs text-gray-500 rounded ml-2">
                      Normal Range:{" "}
                      {vitals.find((v) => v.name === selected)?.normal}
                    </div>
                  </div>

                  <div className="mt-4 h-[220px]">
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 800 220"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                          <stop
                            offset="0%"
                            stopColor="#fef3c7"
                            stopOpacity="0.9"
                          />
                          <stop
                            offset="100%"
                            stopColor="#ffffff"
                            stopOpacity="0"
                          />
                        </linearGradient>
                      </defs>
                      <rect
                        x="0"
                        y="0"
                        width="800"
                        height="220"
                        fill="transparent"
                      />
                      <path
                        d="M20 140 C80 130,140 120,200 130 C260 140,320 125,380 135 C440 145,500 138,560 150 C620 162,680 150,760 130"
                        fill="url(#g1)"
                        stroke="#f6ad55"
                        strokeWidth="2"
                        opacity="0.9"
                      />
                      <path
                        d="M20 90 C80 95,140 85,200 95 C260 98,320 90,380 100 C440 102,500 95,560 110 C620 118,680 110,760 95"
                        fill="none"
                        stroke="#93c5fd"
                        strokeWidth="2"
                        opacity="0.95"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                viewMode === "table"
                  ? "max-h-[1200px] opacity-100"
                  : "max-h-0 opacity-0 pointer-events-none"
              }`}
            >
              <div className="bg-white p-0">
                <VitalsTable/>
              </div>
            </div>
          </div>
        </div>

        <div className="py-3">
          <SectionHeader title="Biometrics" actionLabel="Add Biometrics" />
          <BiometricsTable />
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white px-4 py-3 rounded-md border border-gray-200">
        <div className="flex items-center gap-6 text-sm h-10">
          <NavLink
            to={`/doc/patients/${encodeURIComponent(id || "")}`}
            className={({ isActive }) =>
              `h-10 ${
                isActive
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`
            }
          >
            Overview
          </NavLink>
          <NavLink
            to={`/doc/patients/${encodeURIComponent(id || "")}/vitals`}
            className={({ isActive }) =>
              `h-10 ${
                isActive
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`
            }
          >
            Vitals & Biometrics
          </NavLink>
          <span className="text-gray-400">Appointment</span>
          <span className="text-gray-400">Medical History</span>
          <span className="text-gray-400">Documents</span>
          <span className="text-gray-400">Demographics</span>
        </div>
        <div className="flex flex-col gap-[4px]">
          <SectionHeader title="Vitals" actionLabel="Add Vitals" />
          <VitalsTable />
        </div>
        <div className="flex flex-col gap-[4px]">
          <SectionHeader title="Biometrics" actionLabel="Add Biometrics" />
          <BiometricsTable />
        </div>
      </div>
    </div>
  );
}
