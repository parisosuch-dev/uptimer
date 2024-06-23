import { getLatestStatuses, getServices, Service, Status } from "@/lib/uptimer";
import UptimeTracker from "@/components/uptime-tracker";
import ServersUpPercentage from "@/components/servers-up";

export default async function Home() {
  const services: Service[] = await getServices();

  const latestStatuses: Status[] = await getLatestStatuses();

  return (
    <main className="flex flex-1 flex-row items-center space-y-12 p-12">
      <div className="w-1/2">
        <ServersUpPercentage statuses={latestStatuses} />
      </div>
      <div className="w-1/2 p-4 space-y-4">
        {services.map((service) => (
          <UptimeTracker key={service.name} service={service} limit={48} />
        ))}
      </div>
    </main>
  );
}
