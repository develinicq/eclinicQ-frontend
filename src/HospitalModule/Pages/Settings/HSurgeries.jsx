import React, { useState } from 'react'
import { ChevronsUpDown } from 'lucide-react'
import { pencil } from '../../../../public/index.js'
import { Checkbox } from '../../../components/ui/checkbox'
import AddSurgeryDrawer from './Drawers/AddSurgeryDrawer'

export default function HSurgeries() {
  // Local UI-only state for surgeries list
  const [surgeries, setSurgeries] = useState([
    { id: 1, name: 'Appendectomy', description: 'Surgical removal of the appendix, usually performed to treat appendicitis.' },
    { id: 2, name: 'Hernia Repair Surgery', description: 'Correction of hernias in the abdomen or groin using open or laparoscopic techniques.' },
    { id: 3, name: 'Cholecystectomy', description: 'Surgical removal of the gallbladder, commonly performed to treat gallstones.' },
    { id: 4, name: 'Knee Arthroscopy', description: 'Minimally invasive surgery on the knee joint using an arthroscope to diagnose or treat issues.' },
    { id: 5, name: 'Coronary Bypass Surgery', description: 'Surgical procedure to restore normal blood flow to an obstructed coronary artery.' },
    { id: 6, name: 'Cataract Surgery', description: 'Procedure to remove the cloudy lens of the eye and replace it with an artificial one.' },
    { id: 7, name: 'Hip Replacement Surgery', description: 'Surgical procedure to replace a damaged hip joint with a prosthetic implant.' },
    { id: 8, name: 'Rhinoplasty', description: 'Surgical procedure to reshape the nose for aesthetic or functional improvement.' },
  ])
  const [selected, setSelected] = useState(() => new Set())
  const [isAddDrawerOpen, setAddDrawerOpen] = useState(false)

  const allSelected = surgeries.length > 0 && selected.size === surgeries.length

  const toggleAll = () => {
    setSelected((sel) => (sel.size === surgeries.length ? new Set() : new Set(surgeries.map((s) => s.id))))
  }

  const toggleOne = (id) => setSelected((sel) => { const n = new Set(sel); n.has(id) ? n.delete(id) : n.add(id); return n })

  const onDelete = (id) => setSurgeries((list) => list.filter((x) => x.id !== id))

  const handleAddSurgery = (newSurgery) => {
    setSurgeries([...surgeries, { id: Date.now(), ...newSurgery }])
  }

  return (
    <div className="">
      {/* Header bar with action link to avoid overlap */}
      <div className="flex items-center justify-end px-4 mb-2">
        <button type="button" onClick={() => setAddDrawerOpen(true)} className="text-blue-primary250 text-sm hover:underline">+ New Surgery</button>
      </div>
      <div className="overflow-x-auto border border-secondary-grey100 rounded-lg">
        <table className="min-w-full table-fixed text-sm text-left ">
          <colgroup>
            <col className="w-[44px]" />
            <col className="w-[320px]" />
            <col />
            <col className="w-[120px]" />
          </colgroup>
          <thead className="bg-white  border-b">
            <tr className="h-[30px] text-sm text-secondary-grey400">
              <th className="pl-3 pr-2 py-0 align-center">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={toggleAll}
                  aria-label="Select all"
                />
              </th>
              <th className="pr-4 py-0  align-middle font-medium">
                <span className="inline-flex items-center gap-1 cursor-pointer select-none group">
                  Surgery Name
                  <ChevronsUpDown className="h-3.5 w-3.5 text-gray-400 group-hover:text-gray-600" />
                </span>
              </th>
              <th className="px-4 py-0  align-middle font-medium">
                <span className="inline-flex items-center gap-1 cursor-pointer select-none group">
                  Surgery Description
                  <ChevronsUpDown className="h-3.5 w-3.5 text-gray-400 group-hover:text-gray-600" />
                </span>
              </th>
              <th className="px-4 py-0  align-middle text-right font-medium pr-5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {surgeries.map((s) => (
              <tr key={s.id} className="h-[54px] border-b border-gray-200 hover:bg-gray-50 bg-white text-sm">
                <td className="pl-3 pr-2 py-2 align-center">
                  <Checkbox
                    checked={selected.has(s.id)}
                    onCheckedChange={() => toggleOne(s.id)}
                    aria-label={`Select ${s.name}`}
                  />
                </td>
                <td className="pr-4  font-medium text-secondary-grey400  align-center ">{s.name}</td>
                <td className="px-4   text-secondary-grey300 align-center ">{s.description}</td>
                <td className="px-2  align-center pr-5">
                  <div className="flex items-center justify-end gap-3">
                    <button className="p-1 rounded hover:bg-gray-100 transition-colors" aria-label="Edit" title="Edit">
                      <img src={pencil} alt="Edit" className="w-7" />
                    </button>
                    <div className="h-5 w-[1px] bg-gray-200" aria-hidden="true" />
                    <button className="p-1 rounded hover:bg-red-50 transition-colors" aria-label="Delete" title="Delete" onClick={() => onDelete(s.id)}>
                      <img src="/Doctor_module/settings/dustbin.png" alt="Delete" className="w-4 h-4 object-contain opacity-80 hover:opacity-100" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {surgeries.length === 0 && (
              <tr>
                <td colSpan={4} className="py-8 text-center text-sm text-gray-500">No surgeries added yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AddSurgeryDrawer
        open={isAddDrawerOpen}
        onClose={() => setAddDrawerOpen(false)}
        onSave={handleAddSurgery}
      />
    </div>
  )
}
