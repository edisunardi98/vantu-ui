"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogTrigger, Modal } from "@/components/ui/modal";
import { Textarea } from "@/components/ui/textarea";

export default function Example() {
  return (
    <DialogTrigger>
      <Button variant="primary">Create list</Button>
      <Modal
        title="Create list"
        description="Group prospects you want to work together."
        footerNote="128 prospects selected"
        footer={(close) => (
          <>
            <Button size="sm" onPress={close}>Cancel</Button>
            <Button size="sm" variant="primary" onPress={close}>Create list</Button>
          </>
        )}
      >
        <div className="flex flex-col gap-4">
          <Input label="Name" placeholder="Series B — VP Sales" autoFocus />
          <Textarea label="Description" placeholder="What is this list for?" rows={3} />
        </div>
      </Modal>
    </DialogTrigger>
  );
}
