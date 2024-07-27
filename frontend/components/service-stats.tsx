"use client"


import { useState, useEffect } from "react";
import { Service, Status, getStatuses } from "@/lib/uptimer";

export default function ServiceStats({ service, period }: { service: Service, period: string }) {
  const [statuses, setStatuses] = useState<Status[] | []>([]);

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
    // calculate start date and get statuses
    const start = calculateStartDate(period);
    getStatuses({ service: service.name, start: start }).then((res) => setStatuses(res));
  }, [period])

  return <div>statuses: {statuses.length}</div>;
}
