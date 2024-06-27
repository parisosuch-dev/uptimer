"use client";

import { useState } from "react";
import { Card } from "@tremor/react";
import { editService, Service } from "@/lib/uptimer";
import { GoTrash, GoPencil } from "react-icons/go";
import {
  Button, Dialog, DialogPanel, Textarea,
  TextInput,
} from "@tremor/react";
import { deleteService } from "@/lib/uptimer";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import Link from "next/link";

export default function ServiceCard({ service }: { service: Service }) {
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);

  const [hostname, setHostName] = useState('');
  const [description, setDescription] = useState('');

  const router = useRouter();

  const [deleteError, setDeleteError] = useState("");
  const [editError, setEditError] = useState("");

  // TODO: this is redundant and can be placed in the arrow function
  const onDeleteService = () => {
    deleteService(service.name)
      .then((res) => {
        router.refresh();
        setDeleteIsOpen(false);
      })
      .catch((err: AxiosError) => {
        if (err.response?.status == 404) {
          setDeleteError("Service does not exist.");
        } else {
          console.error(err);
        }
      });
  };

  // TODO: this is redundant and can be placed in the arrow function
  const onEditService = () => {
    let data = {
      hostname: service.hostname,
      description: service.description
    }
    if (hostname) {
      data.hostname = hostname
    }
    if (description) {
      data.description = description
    }
    editService(service.name, data).then((res) => {
      router.refresh();
      setEditIsOpen(false);
    }).catch((err) => {
      if (err.response) {
        setEditError(err.response?.data.message);
      } else {
        setEditError(err);
      }
    });
  }

  return (
    <Card className="max-w-full">
      <div className="flex justify-between items-center">
        <div className="w-2/3 flex flex-row items-center space-x-2">
          <Link
            className="text-lg font-medium hover:underline"
            href={`/services/${service.name}`}
          >
            {service.name}
          </Link>
          <p className="text-xs bg-gray-100 px-1 rounded-lg">
            {service.hostname}
          </p>
        </div>
        <div className="flex flex-row space-x-2 w-1/3 justify-end">
          <button
            className="bg-gray-100 hover:bg-gray-200 transition ease-in-out delay-250 rounded-lg p-1"
            onClick={() => setEditIsOpen(true)}
          >
            <GoPencil />
          </button>
          <button
            className="bg-gray-100 hover:bg-gray-200 transition ease-in-out delay-250 rounded-lg p-1"
            onClick={() => setDeleteIsOpen(true)}
          >
            <GoTrash />
          </button>
          {/* dialog for edit */}
          <Dialog
            open={editIsOpen}
            onClose={() => setEditIsOpen(false)}
            static={true}
            className="z-[100]"
          >
            <DialogPanel className="max-w-lg space-y-4">
              <h1 className="text-xl font-bold text-center">
                Edit &apos;{service.name}&apos;
              </h1>
              <div className="flex flex-col space-y-4 pt-2 text-left">
                <div>
                  <label className="font-medium">Host</label>
                  <TextInput
                    type="text"
                    placeholder={service.hostname}
                    onChange={(e) => setHostName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="font-medium">Description</label>
                  <Textarea
                    placeholder={service.description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                {editError ? <p className="text-rose-500 font-medium text-center">{editError}</p> : null}
                <div className="flex justify-end space-x-4">
                  <Button color="gray" onClick={onEditService}>
                    Submit
                  </Button>
                  <Button
                    variant="secondary"
                    color="gray"
                    onClick={() => {
                      setEditIsOpen(false);
                      setEditError("");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogPanel>
          </Dialog>
          {/* dialog for delete */}
          <Dialog
            open={deleteIsOpen}
            onClose={() => setDeleteIsOpen(false)}
            static={true}
            className="z-[100]"
          >
            <DialogPanel className="max-w-lg space-y-4 text-center">
              <h1 className="text-xl font-bold text-center">
                Are you sure you want to delete &apos;{service.name}&apos;?
              </h1>
              <p>This will remove all data about this service.</p>
              {deleteError ? (
                <p className="text-rose-600">
                  There was an error deleting service: {deleteError}
                </p>
              ) : null}
              <div className="flex justify-center space-x-8">
                <Button
                  variant="light"
                  color="rose"
                  onClick={() => {
                    onDeleteService();
                  }}
                >
                  Yes
                </Button>
                <Button
                  variant="secondary"
                  color="gray"
                  onClick={() => setDeleteIsOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </DialogPanel>
          </Dialog>
        </div>
      </div>
      <p className="text-sm text-gray-500">{service.description}</p>
    </Card>
  );
}
