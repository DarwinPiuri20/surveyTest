import {getHistoryAssessment} from "../api/assessment.ts";

export const getHistoryService = async (sellerId: number) => {
    return await getHistoryAssessment(sellerId);
}
