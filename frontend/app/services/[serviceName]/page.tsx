import { getService, Service } from "@/lib/uptimer";
import { Card } from "@tremor/react";
import { Tab, TabGroup, TabList } from "@tremor/react";

export default async function ServicesPage({
  params,
}: {
  params: { serviceName: string };
}) {
  const service: Service = await getService(params.serviceName);

  return (
    <div className="flex flex-1 flex-col items-center p-8 w-full">
      <div className="w-1/2 flex flex-row items-center justify-end">
        <div className="w-1/2">
          <div className="flex flex-row items-center space-x-2">
            <h1 className="text-lg font-medium">{service.name}</h1>
            <p className="text-xs bg-gray-100 px-1 rounded-lg font-mono">
              {service.hostname}
            </p>
          </div>
          <p className="text-sm text-gray-500">{service.description}</p>
        </div>
        <div className="w-1/2 flex justify-end">
          <TabGroup className="w-1/2">
            <TabList variant="solid">
              <Tab>month</Tab>
              <Tab>week</Tab>
              <Tab>day</Tab>
            </TabList>
          </TabGroup>
        </div>
      </div>
    </div>
  );
}
