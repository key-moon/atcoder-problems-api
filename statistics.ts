import { V3_API_URL } from "./const";
import { LangRankingEntry, RankingEntry, SumRankingEntry, UserLangRankEntry, UserRankEntry } from "./types";
import { fetchJson } from "./util";

function getStatisticsFunctions<RankingEntryT>(name: string) {
    const ranking = (from: number, to: number) => fetchJson<RankingEntryT[]>(`${V3_API_URL}/${name}_ranking?from=${from}&to=${to}`);
    const userRank = (user: string) => fetchJson<UserRankEntry>(`${V3_API_URL}/user/${name}_rank?user=${user}`);
    return { ranking, userRank };
}

export const {
    ranking: getAcceptedCountRanking,
    userRank: getUserAcceptedCountRank
} = getStatisticsFunctions<RankingEntry>("ac");

export const {
    ranking: getRatedPointSumRanking,
    userRank: getUserRatedPointSumRank
} = getStatisticsFunctions<SumRankingEntry>("rated_point_sum");

export const {
    ranking: getLongestStreakRanking,
    userRank: getUserLongestStreakRank
} = getStatisticsFunctions<RankingEntry>("streak");

export const getLanguageAcceptedCountRanking = (from: number, to: number, language: string) => fetchJson<LangRankingEntry[]>(`${V3_API_URL}/language_ranking?from=${from}&to=${to}&language=${language}`);
export const getUserLanguageAcceptedCountRank = (user: string) => fetchJson<UserLangRankEntry[]>(`${V3_API_URL}/user/language_rank?user=${user}`);

export const getLanguageList = () => fetchJson<string[]>(`${V3_API_URL}/language_list`);
