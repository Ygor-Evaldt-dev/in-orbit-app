import { PendingGoalsResponse } from "./types/pending-goals-response";

export async function getPendingGoals(): Promise<PendingGoalsResponse> {
	const response = await fetch("http://localhost:3333/pending-goals");
	const data = await response.json();
	return data;
}