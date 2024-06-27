"use client";
import { Status } from "@/lib/uptimer";
import { Card } from "@tremor/react";
import { ProgressCircle } from "@tremor/react";
import Link from "next/link";

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
    <Card className="flex w-full justify-around">
      <div className="w-full flex flex-col overflow-y-auto">
        <h1 className="font-medium text-xl">Latest Server Status</h1>
        <p className="text-light text-sm text-tremor-content">
          last checked @ {new Date(statuses[0].time).toLocaleTimeString()}
        </p>
        <div className="flex flex-col space-y-1 pt-2 w-1/2">
          {statuses.map((status) => (
            <Link
              key={status.service}
              className={`bg-${
                status.is_up
                  ? "emerald-100 hover:bg-emerald-200 duration-300 transform ease-in-out"
                  : "rose-100 hover:bg-rose-200"
              } rounded-lg px-2`}
              href={`/services/${status.service}`}
            >
              {status.service}
            </Link>
          ))}
        </div>
      </div>
      <div className="w-1/4 text-center">
        <ProgressCircle value={percentage} size="xl" color={color}>
          <span className="text-xl font-medium text-slate-700">
            {percentage.toFixed(2)}%
          </span>
        </ProgressCircle>
        <p className="font-light text-tremor-content">statuses up</p>
      </div>
    </Card>
  );
}
