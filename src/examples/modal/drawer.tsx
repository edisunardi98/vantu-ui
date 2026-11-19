"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogTrigger, Modal } from "@/components/ui/modal";
import { Select, SelectItem } from "@/components/ui/select";

export default function Example() {
  return (
    <DialogTrigger>
      <Button>Open filters</Button>
      <Modal
        variant="drawer"
        title="Filters"
        description="3 active · 128 results"
        footerNote={<button className="font-medium text-fg">Reset all</button>}
        footer={(close) => (
          <>
            <Button size="sm" onPress={close}>Cancel</Button>
            <Button size="sm" variant="primary" onPress={close}>Show 128 results</Button>
          </>
        )}
      >
        <div className="flex flex-col gap-5">
          <Select label="Seniority" defaultSelectedKey="vp">
            <SelectItem id="vp">VP</SelectItem>
            <SelectItem id="director">Director</SelectItem>
            <SelectItem id="head">Head of</SelectItem>
          </Select>
          <Checkbox defaultSelected>Verified emails only</Checkbox>
          <Checkbox defaultSelected>Raised funding in the last 6 months</Checkbox>
        </div>
      </Modal>
    </DialogTrigger>
  );
}
