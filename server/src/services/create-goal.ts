import { db } from "../db";
import { goal } from "../db/schema";
import { CreateGoalDto } from "./dtos";

export async function createGoal({
	title,
	desireWeeklyFrequency
}: CreateGoalDto) {
	const [newGoal] = await db
		.insert(goal)
		.values({ title, desireWeeklyFrequency })
		.returning();

	return { newGoal };
}