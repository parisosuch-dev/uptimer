"use client";
import { Status } from "@/lib/uptimer";
import { Card } from "@tremor/react";

export default function ServersUpPercentage({
  statuses,
}: {
  statuses: Status[];
}) {
  // calculate percentage
  let downTimes = 0;
  statuses.forEach((status) => {
    if (!status.is_up) {
      downTimes++;
    }
  });

  let percentage = ((statuses.length - downTimes) / statuses.length) * 100;

  let color = "emerald";
  if (percentage != 100) {
    color = "rose";
  }

  return (
    <div className="flex h-full w-full space-x-2">
      <Card className="h-full w-full flex flex-col justify-center text-center">
        <div className="flex items-center justify-center h-full">
          <p className="text-3xl font-mono font-medium text-slate-700">
            {new Date(statuses[0].time).toLocaleTimeString()}
          </p>
        </div>
        <div className="w-full">
          <p className="text-tremor-content">last checked</p>
        </div>
      </Card>
      <Card className="h-full w-full flex flex-col justify-center text-center">
        <div className="flex items-center justify-center h-full">
          <p className="text-3xl font-medium font-mono text-slate-700">
            {downTimes}
          </p>
        </div>
        <div className="w-full">
          <p className="text-tremor-content">services down</p>
        </div>
      </Card>
      <Card className="w-full flex flex-col items-center justify-center h-full text-center">
        <div className="flex items-center justify-center h-full">
          <p className="text-3xl font-medium font-mono text-slate-700">
            {percentage.toFixed(2)}%
          </p>
        </div>
        <div className="w-full">
          <p className="text-tremor-content">services up</p>
        </div>
      </Card>
    </div>
  );
}
