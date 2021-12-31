import { fetchJson } from "./util";
import { ATCODER_PROBLEMS_URL } from "./const";
import { Contest, Problem, MergedProblem, ProblemModel } from "./types"

function getApiUrl(name: string): string {
    return `${ATCODER_PROBLEMS_URL}/resources/${name}.json`;
}

// Information API
const CONTESTS_INFORMATION_URL = getApiUrl("contests");
export const getContests = () => fetchJson<Contest[]>(CONTESTS_INFORMATION_URL);
const PROBLEMS_INFORMATION_URL = getApiUrl("problems");
export const getProblems = () => fetchJson<Problem[]>(PROBLEMS_INFORMATION_URL);
const DETAILED_PROBLEMS_INFORMATION_URL = getApiUrl("merged-problems");
export const getDetailedProblems = () => fetchJson<MergedProblem[]>(DETAILED_PROBLEMS_INFORMATION_URL);
const CONTESTS_AND_PROBLEMS_URL = getApiUrl("contest-problem");
export const getContestsAndProblems = () => fetchJson<{contest_id: string, problem_id: string}[]>(CONTESTS_AND_PROBLEMS_URL);

// Resources
const ESTIMATED_DIFFICULTIES_URL = getApiUrl("problem-models");
export const getEstimatedDifficulties = () => fetchJson<{ [key: string]: ProblemModel }>(ESTIMATED_DIFFICULTIES_URL);
