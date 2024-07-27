"use client"

import { useState, useEffect } from "react";
import { Service, Status, getStatuses } from "@/lib/uptimer";
import { Card } from "@tremor/react";

export default function ServiceStats({ service, period }: { service: Service, period: string }) {
  const [statuses, setStatuses] = useState<Status[] | []>([]);
  const [downTimes, setDownTimes] = useState(0);
  const [averageResponseTime, setAverageResponeTime] = useState(0.0);
  const [longestResponseTime, setLongestResponseTime] = useState(0);

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
    let sum = 0.0;
    let longest = statuses[0].response_time
    statuses.forEach((status) => {
      if (!status.is_up) {
        setDownTimes(downTimes + 1);
      }
      if (status.response_time > longest) {
        longest = status.response_time;
      }
      sum = sum + status.response_time;
    });
    setAverageResponeTime(sum / statuses.length);
    setLongestResponseTime(longest);
  }

  useEffect(() => {
    // calculate start date and get statuses
    const start = calculateStartDate(period);
    getStatuses({ service: service.name, start: start }).then((res) => handleStatusesData(res));
  }, [period])

  return (
    <div className="w-1/2 pt-8">
      <div className="flex h-1/2 w-full space-x-2">
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
      <div className="flex h-1/2 w-full space-x-2 pt-4">
        <Card className="h-full w-full flex flex-col justify-center text-center">
          <div className="flex items-center justify-center h-full">
            <p className="text-2xl font-mono font-medium text-slate-700">
              {new String(averageResponseTime.toFixed(2)) + ' ms'}
            </p>
          </div>
          <div className="w-full">
            <p className="text-tremor-content">average response time</p>
          </div>
        </Card>
        <Card className="h-full w-full flex flex-col justify-center text-center">
          <div className="flex items-center justify-center h-full">
            <p className="text-2xl font-medium font-mono text-slate-700">
              {new String((((statuses.length - downTimes) / statuses.length) * 100).toFixed(2)) + " %"}
            </p>
          </div>
          <div className="w-full">
            <p className="text-tremor-content">percentage up</p>
          </div>
        </Card>
        <Card className="h-full w-full flex flex-col justify-center text-center">
          <div className="flex items-center justify-center h-full">
            <p className="text-2xl font-medium font-mono text-slate-700">
              {new String(longestResponseTime) + " ms"}
            </p>
          </div>
          <div className="w-full">
            <p className="text-tremor-content">longest response time</p>
          </div>
        </Card>
      </div>
    </div>);
}
