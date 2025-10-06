import { Search, Filter } from "lucide-react";
import Badge from "../Badge";

const fmt = (n) => {
  if (typeof n !== 'number') return String(n ?? 0);
  if (n >= 1000) return `${Math.round(n/100)/10}K`;
  return String(n);
};

export default function Header({
  counts = { all: 0, active: 0, inactive: 0 },
  selected = 'all',
  onChange = () => {},
  addLabel = 'Add New Doctor',
  // Optional custom tabs: [{ key: 'active', label: 'Active' }, ...]
  tabs,
  // When false, hides counts next to labels
  showCounts = true,
}) {
  const defaultTabs = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'inactive', label: 'Inactive' },
  ];
  const activeTabs = Array.isArray(tabs) && tabs.length ? tabs : defaultTabs;

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white">
      {/* Tabs */}
      <div className="flex items-center gap-1 text-sm" role="tablist" aria-label="Doctor filters">
        {activeTabs.map((t) => {
          const isSel = selected === t.key;
          const label = showCounts
            ? `${t.label} (${fmt(counts?.[t.key])})`
            : t.label;
          return (
            <button
              key={t.key}
              role="tab"
              aria-selected={isSel}
              className={
                `h-8 inline-flex items-center px-3 rounded-md border font-medium transition-colors ` +
                (isSel
                  ? 'border-blue-400 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-200')
              }
              onClick={isSel ? undefined : () => onChange(t.key)}
            >
              {label}
            </button>
          );
        })}
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
        {/* Blue ghost-style button */}
        <Badge type="ghost" color="blue" size="l" className="!rounded-md" onClick={() => {}}>
          {addLabel}
        </Badge>
      </div>
    </div>
  );
}
