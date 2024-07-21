"use client";

import { useState, useEffect } from "react";
import { getService, getStatuses, Service, Status } from "@/lib/uptimer";
import { Select, SelectItem } from "@tremor/react";
import ServiceStats from "@/components/service-stats";

export default function ServicesPage({
  params,
}: {
  params: { serviceName: string };
}) {
  const [service, setService] = useState<Service | null>(null);
  const [statuses, setStatuses] = useState<Status[] | []>([]);
  const [period, setPeriod] = useState("w");

  getService(params.serviceName).then((res) => {
    setService(res);
  });

  const calculateStartDate = (period: string) => {
    const today = new Date();
    const start = new Date();

    let days = 7;
    if (period === "m") {
      days = 30;
    }
    if (period === "d") {
      days = 1;
    }

    start.setDate(today.getDate() - days);

    return start.toISOString().split("T")[0];
  };

  useEffect(() => {
    if (service) {
      const start = calculateStartDate(period);
      getStatuses({ service: service?.name, start: start }).then((res) =>
        setStatuses(res)
      );
    }
  }, [service, period]);

  if (service) {
    return (
      <div className="flex flex-1 flex-col items-center p-8 w-full">
        <div className="w-1/2 flex flex-row items-center justify-end">
          <div className="w-3/4">
            <div className="flex flex-row items-center space-x-2">
              <h1 className="text-lg font-medium">{service.name}</h1>
              <p className="text-xs bg-gray-100 px-1 rounded-lg font-mono">
                {service.hostname}
              </p>
            </div>
            <p className="text-sm text-gray-500">{service.description}</p>
          </div>
          <div className="w-1/4 flex justify-end">
            <Select defaultValue="w" name="period" onValueChange={setPeriod}>
              <SelectItem value="m">Month</SelectItem>
              <SelectItem value="w">Week</SelectItem>
              <SelectItem value="d">Day</SelectItem>
            </Select>
          </div>
        </div>
        <ServiceStats statuses={statuses} />
      </div>
    );
  }
  return (
    <div className="flex flex-1 flex-col items-center p-8 w-full">
      <h1 className="text-4xl text-gray-500 animate-pulse">Loading...</h1>
    </div>
  );
}
