import { CreateGoalBody } from "./types/create-goal-body";

export async function createGoal(data: CreateGoalBody) {
	await fetch("http://localhost:3333/goals", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ ...data })
	});
}