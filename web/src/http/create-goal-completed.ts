export async function createCompletedGoal(goalId: string) {
	await fetch("http://localhost:3333/goals-completed", {
		method: "POST",
		headers: {
			"Content-Type": "Application/json"
		},
		body: JSON.stringify({
			goalId
		})
	});
}