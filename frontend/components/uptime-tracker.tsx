import { Status } from "@/lib/uptimer";
import { Card, Tracker, type Color } from "@tremor/react";

export default function UptimeTracker(statuses: Status[]) {
  let service: string = "";
  let downTimes = 0;

  let data = statuses.map((status) => {
    service = status.service;
    if (!status.is_up) {
      downTimes++;
    }
    return {
      color: status.is_up ? "emerald" : "rose",
      tooltip: status.response_time ? String(status.response_time) : "0",
    };
  });
  let uptime = ((statuses.length - downTimes) / statuses.length) * 100;

  return (
    <Card className="mx-auto max-w-md">
      <p className="text-tremor-default flex items-center justify-between">
        <span className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
          {service}
        </span>
        <span className="text-tremor-content dark:text-dark-tremor-content">
          uptime {uptime}%
        </span>
      </p>
      {statuses ? (
        <Tracker data={data} className="mt-2" />
      ) : (
        <p>There are no statuses for this service.</p>
      )}
    </Card>
  );
}
