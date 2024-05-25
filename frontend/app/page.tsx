"use client";

import { useEffect, useState } from "react";
import { getServices, Service } from "@/lib/uptimer";

export default function Home() {
  const [services, setServices] = useState<Service[] | null>();

  getServices()
    .then((res) => {
      setServices(res);
    })
    .catch((err) => {
      console.error(err);
    });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <h1 className="text-5xl font-bold tracking-wider">uptimer</h1>
    </main>
  );
}
