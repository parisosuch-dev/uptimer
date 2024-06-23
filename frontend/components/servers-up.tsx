"use client";
import { Status } from "@/lib/uptimer";
import { Card } from "@tremor/react";
import { ProgressCircle } from "@tremor/react";

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
  if (percentage === 0) {
    color = "rose";
  } else if (percentage < 100) {
    color = "amber";
  }

  return (
    <Card className="flex w-full justify-around bg-blue-400">
      <div className="w-full flex bg-blue-100">
        <h1 className="font-medium text-xl">Latest Server Status</h1>
      </div>
      <div className="w-1/4 bg-blue-200 text-center">
        <ProgressCircle value={percentage} size="xl" color={color}>
          <span className="text-xl font-medium text-slate-700">
            {percentage.toFixed(2)}%
          </span>
        </ProgressCircle>
        <p className="font-light">statuses up</p>
      </div>
    </Card>
  );
}
