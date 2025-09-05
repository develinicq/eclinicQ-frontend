import { Search, Filter, Plus } from "lucide-react";

export default function Header() {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2 bg-white">
      {/* Tabs */}
      <div className="flex space-x-4">
        <button className="px-3 py-1 text-sm font-medium border-b-2 border-blue-500 text-blue-600">
          All
        </button>
        <button className="px-3 py-1 text-sm font-medium text-gray-500 hover:text-gray-700">
          Active
        </button>
        <button className="px-3 py-1 text-sm font-medium text-gray-500 hover:text-gray-700">
          Inactive
        </button>
      </div>

      {/* Search + Filter + Add Button */}
      <div className="flex items-center space-x-2">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-8 pr-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <button className="p-2 border rounded-md hover:bg-gray-100">
          <Filter className="h-4 w-4 text-gray-600" />
        </button>
        <button className="flex items-center bg-blue-500 text-white px-3 py-1.5 rounded-md hover:bg-blue-600 text-sm">
          <Plus className="h-4 w-4 mr-1" /> Add New Doctor
        </button>
      </div>
    </div>
  );
}
