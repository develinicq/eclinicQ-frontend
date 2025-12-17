import React, { useState } from "react";
import Tab from "../components/Tab";
import Button from "../components/Button";
import GeneralDrawer from "../components/GeneralDrawer";
import SampleTable from "./SampleTable";

const TabDemo = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
    <div className="p-6 ">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Tab Component Demo</h1>
        <Button onClick={() => setOpen(true)}>Open Drawer</Button>
      </div>

      {/* Drawer Instance */}
      <GeneralDrawer
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Add New Patient"
      >
        {/* Example content to demonstrate padding, gap and scroll */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <label className="space-y-1 block">
              <span className="text-xs text-gray-500">First Name</span>
              <input className="w-full rounded-md border p-2" placeholder="Enter First Name" />
            </label>
            <label className="space-y-1 block">
              <span className="text-xs text-gray-500">Last Name</span>
              <input className="w-full rounded-md border p-2" placeholder="Enter Last Name" />
            </label>
            <label className="space-y-1 block col-span-2">
              <span className="text-xs text-gray-500">Email ID</span>
              <input className="w-full rounded-md border p-2" placeholder="Enter Email" />
            </label>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Save</Button>
          </div>
        </div>
      </GeneralDrawer>

      {/* Tabs variant: show all 3 states, both sizes */}
      <section>
        <h2 className="mb-3 text-lg font-medium">Tabs variant (28px)</h2>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-20 text-sm text-gray-500">size: md</span>
            <Tab variant="tabs" size="md" status="default">Default</Tab>
            <Tab variant="tabs" size="md" status="hover">Hover</Tab>
            <Tab variant="tabs" size="md" status="active">Active</Tab>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-20 text-sm text-gray-500">size: sm</span>
            <Tab variant="tabs" size="sm" status="default">Default</Tab>
            <Tab variant="tabs" size="sm" status="hover">Hover</Tab>
            <Tab variant="tabs" size="sm" status="active">Active</Tab>
          </div>
        </div>
      </section>

      {/* Underline variant: show all 3 states, both sizes */}
      <section>
        <h2 className="mb-3 text-lg font-medium">Underline variant (40px)</h2>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-20 text-sm text-gray-500">size: md</span>
            <Tab variant="underline" size="md" status="default">Default</Tab>
            <Tab variant="underline" size="md" status="hover">Hover</Tab>
            <Tab variant="underline" size="md" status="active">Active</Tab>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-20 text-sm text-gray-500">size: sm</span>
            <Tab variant="underline" size="sm" status="default">Default</Tab>
            <Tab variant="underline" size="sm" status="hover">Hover</Tab>
            <Tab variant="underline" size="sm" status="active">Active</Tab>
          </div>
        </div>
      </section>
    </div>

    <SampleTable/>
    </>
  );
};

export default TabDemo;
