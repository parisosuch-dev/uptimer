import axios from "axios";
import { error } from "console";

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
  let endpoint = process.env.UPTIMER_ADDRESS + "/api/service/";

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
  let endpoint = process.env.UPTIMER_ADDRESS + "/api/status/";

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
