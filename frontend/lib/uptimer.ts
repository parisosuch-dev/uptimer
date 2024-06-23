import axios from "axios";

export interface Service {
  name: string;
  description: string;
  hostname: string;
  time_created: string;
}

export interface Status {
  service: string;
  response_time: number;
  is_up: boolean;
  time: string;
}

// get services
export const getServices = async () => {
  let endpoint = process.env.NEXT_PUBLIC_UPTIMER_ADDRESS + "/api/service/";

  console.log(`Hitting this endpoint: ${endpoint}`);

  let res = await axios.get<Service[]>(endpoint);

  return res.data;
};

interface StatusQueryParams {
  service?: string;
  start?: string;
  end?: string;
  order?: "asc" | "desc";
  limit?: number;
}

// get statuses
export const getStatuses = async (options?: StatusQueryParams) => {
  let endpoint = process.env.NEXT_PUBLIC_UPTIMER_ADDRESS + "/api/status/";

  if (options) {
    let filteredParams = Object.entries(options).reduce((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key as keyof StatusQueryParams] = value;
      }
      return acc;
    }, {} as Partial<StatusQueryParams>);
    var res = await axios.get<Status[]>(endpoint, { params: filteredParams });
  } else {
    var res = await axios.get<Status[]>(endpoint);
  }

  return res.data;
};

// get latest statuses from API
export const getLatestStatuses = async () => {
  let endpoint = process.env.NEXT_PUBLIC_UPTIMER_ADDRESS + "/api/status/";

  var res = await axios.post<Status[]>(endpoint);

  return res.data;
};

// delete a service
export const deleteService = async (service: string) => {
  let endpoint =
    process.env.NEXT_PUBLIC_UPTIMER_ADDRESS + "/api/service/" + service + "/";

  var res = await axios.delete(endpoint);

  return res;
};
