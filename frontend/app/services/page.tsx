import { getServices, Service } from "@/lib/uptimer";
import ServiceCard from "@/components/service-card";

export default async function ServicesPage() {
    const services: Service[] = await getServices();

    return (
        <div className="flex min-h-screen flex-col items-center space-y-12 p-12">
            <div className="w-1/4 p-4 space-y-4">
                {services.map((service) => (
                    <ServiceCard key={service.name} service={service} />
                ))}
            </div>
        </div>
    )
}