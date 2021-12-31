import { V3_API_URL } from "./const";
import { fetchJson } from "./util";

const SUBMISSION_DB_NAME = "ATCODER-PROBLEMS-API";
const VERSION = 1;

type SubmissionEntry = {
    id: number,
    epoch_second: number,
    problem_id: string,
    contest_id: string,
    user_id: string,
    language: string,
    point: number,
    length: number,
    result: string,
    execution_time: number
};

async function getSubmissionsCount(user: string, from: number, to: number) {
    const { count } = await fetchJson<{ count: number }>(`${V3_API_URL}/user/submission_count?user=${user}&from_second=${from}&to_second=${to}`);
    return count;
}

const getSubmissionsFromAPI = (user: string, from: number) => fetchJson<SubmissionEntry[]>(`${V3_API_URL}/user/submissions?user=${user}&from_second=${from}`);

const INF: number = 10**10;

function openUserDb(user: string){
    return new Promise<IDBDatabase>((resolve, reject) => {
        const request = indexedDB.open(`${SUBMISSION_DB_NAME}-${user}`, VERSION);
        request.onupgradeneeded = (event) => {
            const db = request.result;
            if (event.oldVersion < 1){
                const store = db.createObjectStore("submissions", {keyPath: "id"});
                store.createIndex("by_epoch_second", "epoch_second");
                store.createIndex("by_problem_id", "problem_id");
                store.createIndex("by_contest_id", "contest_id");
            }
        };
        request.onsuccess = (ev) => resolve(request.result);
        request.onerror = reject;
    });
}

function waitUntilSuccess<T>(request: IDBRequest<T>){
    return new Promise<T>((resolve, reject) => {
        request.onsuccess = _ => resolve(request.result);
    });
}

function getLastEntry(db: IDBDatabase, storeName: string) {
    const transaction = db.transaction(storeName, "readonly");
    const submissionsStore = transaction.objectStore(storeName);      
    const request = submissionsStore.openCursor(null, "prev");
    return new Promise<SubmissionEntry | undefined>((resolve, reject) => {
        request.onsuccess = (event) => {
            const cursor = request.result;
            if (!cursor) resolve(undefined);
            else resolve(cursor.value as SubmissionEntry);
        };
        request.onerror = reject;
    });
}

function getCount(db: IDBDatabase, storeName: string) {
    const transaction = db.transaction(storeName, "readonly");
    const submissionsStore = transaction.objectStore(storeName);
    return waitUntilSuccess(submissionsStore.count());
}

function add(db: IDBDatabase, storeName: string, entry: any) {
    const transaction = db.transaction(storeName, "readwrite");
    const submissionsStore = transaction.objectStore(storeName);
    return waitUntilSuccess(submissionsStore.add(entry));
}

function getAll(db: IDBDatabase, storeName: string) {
    const transaction = db.transaction(storeName, "readonly");
    const submissionsStore = transaction.objectStore(storeName);
    return waitUntilSuccess(submissionsStore.getAll());
}

export async function getSubmissions(user: string): Promise<SubmissionEntry[]> {
    const count = await getSubmissionsCount(user, -1, INF);
    if (count === 0) return [];

    let db = await openUserDb(user);
    let lastEpoch: number = (await getLastEntry(db, "submissions"))?.epoch_second ?? -1;
    
    while ((await getCount(db, "submissions")) < count) {
        const latestSubmissions = await getSubmissionsFromAPI(user, lastEpoch + 1);
        if (latestSubmissions.length == 0) break;
        for (const submission of latestSubmissions) {
            await add(db, "submissions", submission);
            lastEpoch = submission.epoch_second;
        }
    }
    return await getAll(db, "submissions");
}
