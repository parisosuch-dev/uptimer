"use client"

import { useState, useEffect } from "react";
import { Service, Status, getStatuses } from "@/lib/uptimer";
import { Card } from "@tremor/react";

export default function ServiceStats({ service, period }: { service: Service, period: string }) {
  const [statuses, setStatuses] = useState<Status[] | []>([]);
  const [downTimes, setDownTimes] = useState(0);

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

  const handleStatusesData = (statuses: Status[]) => {
    setStatuses(statuses);
    setDownTimes(0); // reset down times
    statuses.forEach((status) => {
      if (!status.is_up) {
        setDownTimes(downTimes + 1);
      }
    });
  }

  useEffect(() => {
    // calculate start date and get statuses
    const start = calculateStartDate(period);
    getStatuses({ service: service.name, start: start }).then((res) => handleStatusesData(res));
  }, [period])

  return (
    <div className="w-1/2 pt-8">
      <div className="flex h-full w-full space-x-2">
        <Card className="h-full w-full flex flex-col justify-center text-center">
          <div className="flex items-center justify-center h-full">
            <p className="text-2xl font-mono font-medium text-slate-700">
              {statuses.length > 0 ? new Date(statuses[0].time).toLocaleTimeString() : "Loading..."}
            </p>
          </div>
          <div className="w-full">
            <p className="text-tremor-content">last checked</p>
          </div>
        </Card>
        <Card className="h-full w-full flex flex-col justify-center text-center">
          <div className="flex items-center justify-center h-full">
            <p className="text-2xl font-medium font-mono text-slate-700">
              {downTimes}
            </p>
          </div>
          <div className="w-full">
            <p className="text-tremor-content">down times</p>
          </div>
        </Card>
        <Card className="h-full w-full flex flex-col justify-center text-center">
          <div className="flex items-center justify-center h-full">
            <p className="text-2xl font-medium font-mono text-slate-700">
              {statuses.length > 0 ? new String(statuses.at(0)?.response_time) + " ms" : "Loading"}
            </p>
          </div>
          <div className="w-full">
            <p className="text-tremor-content">last response time</p>
          </div>
        </Card>
      </div>
    </div>);
}
