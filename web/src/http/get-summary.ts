import { SummaryResponse } from "./types/summary-response";

export async function getSummary(): Promise<SummaryResponse> {
	const response = await fetch("http://localhost:3333/summary");
	const data = await response.json();
	return data;
}