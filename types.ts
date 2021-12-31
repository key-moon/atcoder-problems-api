export type Contest = {
    id: string,
    start_epoch_second: number,
    duration_second: number,
    title: string,
    rate_change: string
};

export type Problem = {
    id: string,
    contest_id: string,
    title: string
};

export type MergedProblem =  {
    id: string,
    contest_id: string,
    title: string,
    shortest_submission_id: number | null,
    shortest_contest_id: string | null,
    shortest_user_id: string | null,
    fastest_submission_id: number | null,
    fastest_contest_id: string | null,
    fastest_user_id: string | null,
    first_submission_id: number | null,
    first_contest_id: string | null,
    first_user_id: string | null,
    source_code_length: number | null,
    execution_time: number | null,
    point: number | null,
    solver_count: number
};

export type ProblemModel = {
    slope: number,
    intercept: number,
    variance: number,
    difficulty: number,
    discrimination: number,
    irt_loglikelihood: number,
    irt_users: number,
    is_experimental: boolean
};

export type UserRankEntry = {
    count: number,
    rank: number
};

export type UserLangRankEntry = {
    language: string,
    count: number,
    rank: number
};

export type RankingEntry = {
    count: number,
    user_id: string
};

export type SumRankingEntry = {
    user_id: string,
    point_sum: number
};

export type LangRankingEntry = {
    user_id: string,
    count: number,
    language: string
};
