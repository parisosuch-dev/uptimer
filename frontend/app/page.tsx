import { getServices, Service } from "@/lib/uptimer";
import UptimeTracker from "@/components/uptime-tracker";

export default async function Home() {
  const services: Service[] = await getServices();

  return (
    <main className="flex min-h-screen flex-col items-center space-y-12 p-12">
      <div className="w-1/2 p-4 space-y-4">
        {services.map((service) => (
          <UptimeTracker key={service.name} service={service} limit={48} />
        ))}
      </div>
    </main>
  );
}
