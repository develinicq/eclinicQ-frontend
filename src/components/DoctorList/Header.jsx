import { Search, Filter } from "lucide-react";
import Badge from "../Badge";

export default function Header() {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white">
      {/* Tabs with counts */}
      <div className="flex items-center gap-4 text-sm">
        {/* Active tab styled as blue ghost badge */}
        <Badge type="ghost" color="blue" size="l" className="!rounded-md">All (2K)</Badge>
        {/* Inactive tabs as plain links */}
        <button className="text-gray-600 hover:text-gray-900">Active (1.8K)</button>
        <button className="text-gray-600 hover:text-gray-900">Inactive (200)</button>
      </div>

      {/* Search + Filter icons and Add button */}
      <div className="flex items-center gap-2">
        <button className="p-1.5 rounded hover:bg-gray-100 text-gray-600" aria-label="Search">
          <Search className="h-5 w-5" />
        </button>
        <button className="p-1.5 rounded hover:bg-gray-100 text-gray-600" aria-label="Filter">
          <Filter className="h-5 w-5" />
        </button>
        <span className="mx-2 h-5 w-px bg-gray-200" aria-hidden="true" />
        {/* Blue ghost-style button as per screenshot */}
        <Badge type="ghost" color="blue" size="l" className="!rounded-md" onClick={() => {}}>
          Add New Doctor
        </Badge>
      </div>
    </div>
  );
}
