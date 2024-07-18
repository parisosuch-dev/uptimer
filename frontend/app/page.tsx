import { getLatestStatuses, getServices, Service, Status } from "@/lib/uptimer";
import UptimeTracker from "@/components/uptime-tracker";
import ServersUpPercentage from "@/components/servers-up";

export default async function Home() {
  const services: Service[] = await getServices();

  const latestStatuses: Status[] = await getLatestStatuses();

  return (
    <main className="flex flex-1 flex-col items-center space-y-2 w-full min-h-0 p-12">
      <div className="w-1/2">
        <ServersUpPercentage statuses={latestStatuses} />
      </div>
      <div className="w-1/2 h-5/6 space-y-2 overflow-y-scroll no-scrollbar">
        {services.map((service) => (
          <UptimeTracker key={service.name} service={service} limit={48} />
        ))}
      </div>
    </main >
  );
}
