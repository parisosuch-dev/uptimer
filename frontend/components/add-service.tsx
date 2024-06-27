"use client";

import { addService } from "@/lib/uptimer";
import {
  Button,
  Dialog,
  DialogPanel,
  Textarea,
  TextInput,
} from "@tremor/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddServiceButton() {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [serviceName, setServiceName] = useState("");
  const [hostName, setHostName] = useState("");
  const [description, setDescription] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleSubmit = async () => {
    let res = await addService(serviceName, hostName, description);

    if (res.status != 200) {
      setErrorMessage(res.data.message);
    }

    router.refresh();
  };

  return (
    <div>
      <Button color="slate" onClick={() => setDialogIsOpen(true)}>
        Add Service
      </Button>
      <Dialog
        open={dialogIsOpen}
        onClose={() => setDialogIsOpen(false)}
        static={true}
        className="z-[100]"
      >
        <DialogPanel className="max-w-lg">
          <h1 className="text-xl font-bold text-center">
            Add A Service To Watch
          </h1>
          <div className="flex flex-col space-y-4 pt-2">
            <div>
              <label className="font-medium">Service Name</label>
              <TextInput
                type="text"
                placeholder="Google"
                onChange={(e) => setServiceName(e.target.value)}
              />
            </div>
            <div>
              <label className="font-medium">Host</label>
              <TextInput
                type="text"
                placeholder="google.com"
                onChange={(e) => setHostName(e.target.value)}
              />
            </div>
            <div>
              <label className="font-medium">Description</label>
              <Textarea
                placeholder="They're always watching..."
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            {errorMessage ? <p>{errorMessage}</p> : null}
            <div className="flex justify-end space-x-4">
              <Button color="gray" onClick={handleSubmit}>
                Submit
              </Button>
              <Button
                variant="secondary"
                color="gray"
                onClick={() => setDialogIsOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  );
}
