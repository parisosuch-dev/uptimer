import { getService, Service } from "@/lib/uptimer";

export default async function ServicesPage({ params }: { params: { serviceName: string } }) {
    const service: Service = await getService(params.serviceName);

    return (
        <div className="flex flex-1 flex-col items-center p-8">
            {service.name}
        </div>
    );
}
