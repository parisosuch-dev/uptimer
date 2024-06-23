"use client";

import { useState } from "react";
import { Card } from "@tremor/react";
import { Service } from "@/lib/uptimer";
import { GoTrash, GoPencil } from "react-icons/go";
import { Button, Dialog, DialogPanel } from "@tremor/react";
import { deleteService } from "@/lib/uptimer";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import Link from "next/link";

export default function ServiceCard({ service }: { service: Service }) {
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const router = useRouter();

  const [deleteError, setDeleteError] = useState("");

  const onDeleteService = () => {
    deleteService(service.name)
      .then((res) => {
        console.log(res);
        router.refresh();
      })
      .catch((err: AxiosError) => {
        if (err.response?.status == 404) {
          setDeleteError("Service does not exist.");
        } else {
          console.error(err);
        }
      });
  };

  return (
    <Card className="max-w-full">
      <div className="flex justify-between items-center">
        <div className="w-2/3">
          <Link
            className="text-lg font-medium hover:underline"
            href={`/services/${service.name}`}
          >
            {service.name}
          </Link>
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
            <DialogPanel className="max-w-lg h-64">
              <Button
                variant="light"
                className="mx-auto flex items-center"
                onClick={() => setEditIsOpen(false)}
              >
                Close
              </Button>
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
              <p>
                Are you sure you want to delete{" "}
                <span className="font-medium">{service.name}</span>?
              </p>
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
