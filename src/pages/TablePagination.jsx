import { ChevronDown } from "lucide-react";
import { arrowLeft, arrowRight } from "../../public/index.js";

export default function TablePagination() {
  return (
    <div className="flex items-center justify-center border rounded-b-lg bg-white py-1 mt-4">
      <div className="flex items-center gap-1 rounded-md border border-gray-200 bg-white px-2 py-1 text-sm text-gray-600">
        {/* Left Arrow */}
        <button className="flex h-7 w-7 items-center justify-center rounded hover:bg-gray-100">
          <img src={arrowLeft} alt="Previous" className="w-3 h-3" />
        </button>

        {/* Page numbers */}
        <button className="h-7 min-w-[28px] rounded border border-gray-300 bg-white px-2 text-gray-900">
          1
        </button>
        <button className="h-7 min-w-[28px] rounded px-2 hover:bg-gray-100">
          2
        </button>
        <button className="h-7 min-w-[28px] rounded px-2 hover:bg-gray-100">
          3
        </button>

        <span className="px-1">…</span>

        <button className="h-7 min-w-[28px] rounded px-2 hover:bg-gray-100">
          10
        </button>

        {/* Right Arrow */}
        <button className="flex h-7 w-7 items-center justify-center rounded hover:bg-gray-100">
          <img src={arrowRight} alt="Next" className="w-3 h-3" />
        </button>

        {/* Divider */}
        <span className="mx-1 h-5 w-px bg-gray-200" />

        {/* Page size selector */}
        <button className="flex items-center gap-1 rounded border border-gray-300 bg-white px-2 py-1 text-sm">
          10 / Page
          <ChevronDown size={14} />
        </button>

        {/* Go to page */}
        <button className="rounded border border-gray-300 bg-white px-3 py-1 text-sm text-gray-500">
          Go to Page
        </button>
      </div>
    </div>
  );
}
