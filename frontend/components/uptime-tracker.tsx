import { Service, Status, getStatuses } from "@/lib/uptimer";
import Link from "next/link";
import { Card, Tracker } from "@tremor/react";

export default async function UptimeTracker({
  service,
  limit,
}: {
  service: Service;
  limit: number;
}) {
  // get the statuses for that service
  const statuses = await getStatuses({
    service: service.name,
    limit: limit,
  }).then((res) => {
    return res.reverse();
  });

  let downTimes = 0;

  let data = statuses.map((status) => {
    if (!status.is_up) {
      downTimes++;
    }
    return {
      color:
        status.is_up && status.response_time < 200
          ? "emerald"
          : status.is_up && status.response_time >= 200
          ? "amber"
          : "rose",
      tooltip: status.response_time
        ? String(status.response_time) + " ms"
        : "down",
    };
  });
  let uptime = (
    ((statuses.length - downTimes) / statuses.length) *
    100
  ).toFixed(2);

  return (
    <Card className="mx-auto max-w-full">
      <p className="text-tremor-default flex items-center justify-between">
        <Link
          className="font-medium hover:underline"
          href={`/services/${service.name}`}
        >
          {service.name}
        </Link>
        <span className="text-tremor-content font-mono">uptime {uptime}%</span>
      </p>
      {statuses ? (
        <Tracker data={data} className="mt-2" />
      ) : (
        <p>There are no statuses for this service.</p>
      )}
    </Card>
  );
}
