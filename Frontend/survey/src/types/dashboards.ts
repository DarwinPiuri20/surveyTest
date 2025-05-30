export interface SellerKPI {
    name: string;
    average: number;
}

export interface InterviewsPerMonth {
    month: string;
    amount: number;
}

export interface PerformanceStage {
    stage: string;
    average: number;
}

export interface DashboardData {
    topSellers: SellerKPI[];
    interviewsPerMonth: InterviewsPerMonth[];
    performancePerStage: PerformanceStage[];
}
