import React, { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import {
  Eye,
  ChevronDown,
  List,
  BarChart2,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// const bloodPressureData = [
//   { date: "01 Jan", systolic: 120, diastolic: 55 },
//   { date: "02 Jan", systolic: 115, diastolic: 45 },
//   { date: "03 Jan", systolic: 130, diastolic: 60 },
//   { date: "04 Jan", systolic: 115, diastolic: 55 },
//   { date: "05 Jan", systolic: 125, diastolic: 50 },
//   { date: "06 Jan", systolic: 130, diastolic: 60 },
//   { date: "07 Jan", systolic: 120, diastolic: 45 },
//   { date: "08 Jan", systolic: 130, diastolic: 60 },
//   { date: "09 Jan", systolic: 115, diastolic: 50 },
//   { date: "10 Jan", systystolic: 120, diastolic: 55 },
//   { date: "11 Jan", systolic: 115, diastolic: 55 },
//   { date: "12 Jan", systolic: 120, diastolic: 55 },
// ];

const CustomDot = ({ cx, cy, stroke }) => {
  if (cx == null || cy == null) return null;

  return (
    <g>
      
      <circle cx={cx} cy={cy} r={9} fill={stroke} opacity={0.25} />

      
      <circle
        cx={cx}
        cy={cy}
        r={5}
        fill={stroke}
        stroke="#fff"
        strokeWidth={2}
      />
    </g>
  );
};

function VitalsChart({ vital }) {
  if (!vital) return null;

  const isDouble = vital.chartType === "double";

  return (
    <div className="w-full h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={vital.chartData}
          margin={{ top: 10, right: 0, left: 0, bottom: 20 }}
        >
          {/* Gradients */}
          <defs>
            <linearGradient id="systolicGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFAE4C" stopOpacity={0.7} />
              <stop offset="100%" stopColor="#FFAE4C" stopOpacity={0.1} />
            </linearGradient>

            <linearGradient id="diastolicGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#537FF1" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#537FF1" stopOpacity={0.1} />
            </linearGradient>

            <linearGradient id="singleGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#537FF1" stopOpacity={0.7} />
              <stop offset="100%" stopColor="#537FF1" stopOpacity={0.1} />
            </linearGradient>
          </defs>

          {/* Grid */}
          <CartesianGrid strokeDasharray="2" vertical={true} stroke="#D3D5DD" />

          {/* X axis */}
          <XAxis
            dataKey="date"
            axisLine={{ stroke: "#AEAFBB" }} 
            tickLine={false}
              tick={{ fontSize: 11, fill: "#000" }}
            dy={10}
            label={{
              value: "Dates",
              position: "bottom",
              offset: 10,
              style: { fontSize: 12, fill: "#8E8E8E" },
            }}
          />

          {/* Y axis */}
          <YAxis
            domain={isDouble ? [0, 200] : ["dataMin - 5", "dataMax + 5"]}
            ticks={isDouble ? [0, 40, 80, 120, 160, 200] : undefined}
            axisLine={false}
            tickLine={false}
              tick={{ fontSize: 11, fill: "#000" }}
            dx={-5}
            label={{
              value: vital.unit,
              angle: -90,
              position: "insideLeft",
              offset: 15,
              style: {
                fontSize: 12,
                fill: "#8E8E8E",
                textAnchor: "middle",
              },
            }}
          />

          {/* tooltip */}
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #E5E5E5",
              borderRadius: "6px",
              fontSize: "12px",
            }}
            formatter={(value, name) => {
              if (isDouble) {
                return [
                  `${value} ${vital.unit}`,
                  name === "systolic" ? "Systolic" : "Diastolic",
                ];
              }
              return [`${value} ${vital.unit}`, vital.name];
            }}
          />

          {/* blood pressure */}
          {isDouble && (
            <>
              <Area
                type="monotone"
                dataKey="systolic"
                stroke="#FFAE4C"
                strokeWidth={2}
                fill="url(#systolicGradient)"
                dot={<CustomDot stroke="#FFAE4C" />}
                activeDot={{ r: 7 }}
              />

              <Area
                type="monotone"
                dataKey="diastolic"
                stroke="#537FF1"
                strokeWidth={2}
                fill="url(#diastolicGradient)"
                dot={<CustomDot stroke="#537FF1" />}
                activeDot={{ r: 7 }}
              />
            </>
          )}

          {/* single-value vitals */}
          {!isDouble && (
            <Area
              type="monotone"
              dataKey="value"
              stroke="#537FF1"
              strokeWidth={2}
              fill="url(#singleGradient)"
              dot={<CustomDot stroke="#537FF1" />}
              activeDot={<CustomDot stroke="#537FF1" />}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

const vitals = [
  {
    name: "Blood Pressure",
    unit: "mmHg",
    normal: "90/60 – 120/80",
    status: "Worse",
    chartType: "double",
    latest: "130/85",
    trend: [
      { label: "12h ago", value: "128/82" },
      { label: "24h ago", value: "125/80" },
      { label: "36h ago", value: "120/78" },
    ],
    chartData: [
      { date: "01 Jan", systolic: 120, diastolic: 80 },
      { date: "02 Jan", systolic: 118, diastolic: 78 },
      { date: "03 Jan", systolic: 125, diastolic: 82 },
      { date: "04 Jan", systolic: 130, diastolic: 85 },
      { date: "05 Jan", systolic: 128, diastolic: 84 },
      { date: "06 Jan", systolic: 126, diastolic: 82 },
      { date: "07 Jan", systolic: 122, diastolic: 80 },
    ],
  },

  {
    name: "Oxygen Saturation",
    unit: "%",
    normal: "95 – 100",
    status: "Improved",
    chartType: "single",
    latest: "98%",
    trend: [
      { label: "12h ago", value: "97%" },
      { label: "24h ago", value: "96%" },
      { label: "36h ago", value: "95%" },
    ],
    chartData: [
      { date: "01 Jan", value: 96 },
      { date: "02 Jan", value: 97 },
      { date: "03 Jan", value: 95 },
      { date: "04 Jan", value: 98 },
      { date: "05 Jan", value: 99 },
      { date: "06 Jan", value: 97 },
      { date: "07 Jan", value: 98 },
    ],
  },

  {
    name: "Pulse Rate",
    unit: "bpm",
    normal: "60 – 100",
    status: "Stable",
    chartType: "single",
    latest: "76 bpm",
    trend: [
      { label: "12h ago", value: "74" },
      { label: "24h ago", value: "78" },
      { label: "36h ago", value: "80" },
    ],
    chartData: [
      { date: "01 Jan", value: 72 },
      { date: "02 Jan", value: 74 },
      { date: "03 Jan", value: 78 },
      { date: "04 Jan", value: 80 },
      { date: "05 Jan", value: 76 },
      { date: "06 Jan", value: 75 },
      { date: "07 Jan", value: 74 },
    ],
  },

  {
    name: "Respiratory Rate",
    unit: "breaths/min",
    normal: "12 – 20",
    status: "Stable",
    chartType: "single",
    latest: "18",
    trend: [
      { label: "12h ago", value: "17" },
      { label: "24h ago", value: "18" },
      { label: "36h ago", value: "16" },
    ],
    chartData: [
      { date: "01 Jan", value: 16 },
      { date: "02 Jan", value: 17 },
      { date: "03 Jan", value: 18 },
      { date: "04 Jan", value: 19 },
      { date: "05 Jan", value: 18 },
      { date: "06 Jan", value: 17 },
      { date: "07 Jan", value: 16 },
    ],
  },

  {
    name: "Body Temperature",
    unit: "°F",
    normal: "97 – 99",
    status: "Improved",
    chartType: "single",
    latest: "98.6°F",
    trend: [
      { label: "12h ago", value: "99.1" },
      { label: "24h ago", value: "99.5" },
      { label: "36h ago", value: "100.1" },
    ],
    chartData: [
      { date: "01 Jan", value: 99.5 },
      { date: "02 Jan", value: 99.2 },
      { date: "03 Jan", value: 98.9 },
      { date: "04 Jan", value: 98.7 },
      { date: "05 Jan", value: 98.6 },
      { date: "06 Jan", value: 98.4 },
      { date: "07 Jan", value: 98.6 },
    ],
  },

  {
    name: "Blood Glucose",
    unit: "mg/dL",
    normal: "70 – 140",
    status: "Worse",
    chartType: "single",
    latest: "162",
    trend: [
      { label: "12h ago", value: "155" },
      { label: "24h ago", value: "148" },
      { label: "36h ago", value: "140" },
    ],
    chartData: [
      { date: "01 Jan", value: 135 },
      { date: "02 Jan", value: 140 },
      { date: "03 Jan", value: 145 },
      { date: "04 Jan", value: 150 },
      { date: "05 Jan", value: 158 },
      { date: "06 Jan", value: 160 },
      { date: "07 Jan", value: 162 },
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
  const tableVitals = [
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
          {tableVitals.map((vital, idx) => (
            <tr
              key={idx}
              className="h-[54px] min-h-[54px] max-h-[54px] border-t-[0.5px] border-t-[#D6D6D6]"
            >
              <td className="w-[180px] max-w-[180px] h-[54px] py-2 px-1">
                <div className="font-inter font-medium text-sm leading-[120%] tracking-normal align-middle text-[#424242]">
                  {vital.name}
                </div>
                <div className="font-inter font-normal text-xs leading-[120%] tracking-normal align-middle text-[#8E8E8E]">
                  {vital.unit}
                </div>
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
                  )} ${
                    vital.status === "worse"
                      ? "bg-[#FFF8F8]"
                      : vital.status === "improved"
                      ? "bg-[#F2FFF3]"
                      : "bg-[#F9F9F9]"
                  } flex items-center`}
                >
                  {vital.status.charAt(0).toUpperCase() + vital.status.slice(1)}
                  {getStatusIcon(vital.status)}
                </div>
              </td>
              <td className="w-[180px] max-w-[180px] h-[54px] py-2 px-1">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1 min-w-[18px] w-[100px] h-[18px] px-1 py-[2px] rounded text-xs font-normal text-gray-600 bg-[#F9F9F9]">
                    {vital.normalRange}
                  </div>
                  <img
                    src="/Eye.svg"
                    className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600"
                  />
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
                  <button className="" aria-label="View">
                    <img
                      src="/Eye.svg"
                      width={20}
                      height={20}
                      className="h-[20px] w-[20px]"
                    />
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

export default function PatientVitals({ embedded = false, onAdd }) {
  const { id } = useParams();
  const [selected, setSelected] = useState(vitals[0].name);
  const [viewMode, setViewMode] = useState("chart"); 
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
                  className={`p-1 rounded ${
                    viewMode === "table"
                      ? "text-[#2372EC] bg-blue-50 border-[1.5px] border-[#96BFFF]"
                      : "text-gray-500"
                  }`}
                  aria-label="list view"
                >
                  <List className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("chart")}
                  className={`p-1 rounded ${
                    viewMode === "chart"
                      ? "text-[#2372EC] bg-blue-50 border-[1.5px] border-[#96BFFF]"
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

          
          <div className="mt-3">
            <div
              className={`overflow-hidden transition-all duration-300 ${
                viewMode === "chart"
                  ? "max-h-[1200px] opacity-100"
                  : "max-h-0 opacity-0 pointer-events-none"
              }`}
            >
              <div className="flex">
                <div className="w-[250px] rounded bg-white">
                  <div className="">
                    {vitals.map((v, i) => (
                      <button
                        key={i}
                        onClick={() => setSelected(v.name)}
                        className={`w-full text-left px-3 py-3 flex items-center gap-3 ${
                          selected === v.name
                            ? "bg-[#F8FAFF] text-blue-600  border-l-[3px] border-[#96bfff]"
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
                {/* graphs part */}
                <div className="flex flex-col w-full bg-[#F8FAFF] rounded p-4">
                  <div className="flex items-center justify-between">
                    {(() => {
                      const selectedVital = vitals.find(
                        (v) => v.name === selected
                      );
                      if (!selectedVital) return null;

                      return (
                        <div className="flex items-center gap-4 text-xs text-gray-600">
                          {selectedVital.chartType === "double" ? (
                            <>
                              <div className="flex items-center gap-2">
                                <div className="relative w-4 h-4">
                                  <div className="absolute inset-0 rounded-full bg-orange-200" />

                                  <div className="absolute left-0 top-1/2 w-full h-[2px] -translate-y-1/2 bg-[#FFAE4C]" />

                                  <div className="absolute inset-0 m-[4px] rounded-full bg-white" />

                                  <div className="absolute inset-0 m-[5.5px] rounded-full bg-[#FFAE4C]" />
                                </div>
                                Systolic
                              </div>

                              <div className="flex items-center gap-2">
                                <div className="relative w-4 h-4">
                                  <div className="absolute inset-0 rounded-full bg-blue-200" />

                                  <div className="absolute left-0 top-1/2 w-full h-[2px] -translate-y-1/2 bg-[#537FF1]" />

                                  <div className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />

                                  <div className="absolute top-1/2 left-1/2 w-[5px] h-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#537FF1]" />
                                </div>
                                Diastolic
                              </div>
                            </>
                          ) : (
                            <div className="flex items-center gap-2">
                              <div className="relative w-4 h-4">
                                <div className="absolute inset-0 rounded-full bg-blue-200" />

                                <div className="absolute left-0 top-1/2 w-full h-[2px] -translate-y-1/2 bg-[#537FF1]" />

                                <div className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />

                                <div className="absolute top-1/2 left-1/2 w-[5px] h-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#537FF1]" />
                              </div>

                              {selectedVital.name}
                            </div>
                          )}

                          
                          <div className="ml-2 p-1 rounded-lg border border-gray-300 bg-gray-50 text-gray-600">
                            Normal Range: {selectedVital.normal}
                          </div>
                        </div>
                      );
                    })()}

                    <div className="flex items-center gap-2">
                      <div className="flex bg-white items-center border border-gray-300 rounded-md px-1.5 py-1 text-xs text-gray-700 cursor-pointer hover:bg-gray-50">
                        <span className="border-r pr-1">1 Month</span>
                        <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
                      </div>

                      <button className="hover:bg-gray-50">
                        <Eye className="h-5 w-5 text-gray-500" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <VitalsChart
                      vital={vitals.find((v) => v.name === selected)}
                    />
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
                <VitalsTable />
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
