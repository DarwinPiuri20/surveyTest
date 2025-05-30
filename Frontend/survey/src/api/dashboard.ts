import axios from "axios";
import type{DashboardData} from "../types/dashboards.ts";

export const getDashboardData = async ():Promise<DashboardData> => {
    const res = await axios.get<DashboardData>('/api/dashboard');
    return res.data;
}