export async function deleteGoalCompleted(id: string) {
	await fetch(`http://localhost:3333/goals-completed/${id}`, {
		method: "DELETE"
	});
}