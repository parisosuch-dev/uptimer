"use client";

import { useEffect, useState } from "react";
import { getServices, getStatuses, Service, Status } from "@/lib/uptimer";
import UptimeTracker from "@/components/uptime-tracker";

export default function Home() {
  const [services, setServices] = useState<Service[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);

  useEffect(() => {
    getServices()
      .then((res) => {
        setServices(res);
      })
      .catch((err) => {
        console.error(err);
      });
    getStatuses({ limit: 100 })
      .then((res) => {
        setStatuses(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center space-y-12 p-12">
      <h1 className="text-5xl font-bold tracking-wider">uptimer</h1>
      <div className="w-1/2 space-y-2">
        {services.map((service) => (
          <UptimeTracker
            statuses={statuses.filter(
              (status) => status.service === service.name
            )}
          />
        ))}
      </div>
      <div className="w-1/2"></div>
    </main>
  );
}
