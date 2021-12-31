export async function fetchJson<T>(url: string): Promise<T> {
    const res = await fetch(url);
    if (res.ok) return res.json();
    console.error("response is not ok", res);
    throw new Error(`requests to ${url} failed`);
}
