import {getDashboardData} from "../api/dashboard.ts";

export const loadDashboard = async () => {
    return await getDashboardData();
};