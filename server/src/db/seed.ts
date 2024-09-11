import { client, db } from ".";
import { goal, goalCompleted } from "./schema";
import { startDayOfWeek } from "../adapters/dayjs-adapter";

async function seed() {
	await db.delete(goalCompleted);
	await db.delete(goal);

	const goals = await db.insert(goal).values([
		{ title: "Acordar cedo", desireWeeklyFrequency: 5 },
		{ title: "Fazer exercício físico", desireWeeklyFrequency: 3 },
		{ title: "Andar de bicicleta", desireWeeklyFrequency: 2 },
		{ title: "Estudar no mínimo 1h", desireWeeklyFrequency: 6 },
	]).returning();

	await db.insert(goalCompleted).values([
		{ goalId: goals[0].id, createdAt: startDayOfWeek().toDate() },
		{ goalId: goals[1].id, createdAt: startDayOfWeek().add(1, "day").toDate() },
		{ goalId: goals[1].id, createdAt: startDayOfWeek().add(2, "day").toDate() }
	]);
}

seed().finally(() => client.end());