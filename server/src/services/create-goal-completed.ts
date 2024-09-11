import { and, count, eq, gte, lte, sql } from "drizzle-orm";
import { lastDayOfWeek, startDayOfWeek } from "../adapters/dayjs-adapter";
import { db } from "../db";
import { goal, goalCompleted } from "../db/schema";
import { CreateGoalCompletedDto } from "./dtos/create.goal.completed-dto";

export async function createGoalCompleted({
	goalId
}: CreateGoalCompletedDto) {
	const goalsCompletedCount = db.$with("contagem_metas_concluidas").as(
		db
			.select({
				goalId: goalCompleted.goalId,
				completedCount: count(goalCompleted.id).as("completedCount")
			})
			.from(goalCompleted)
			.where(
				and(
					gte(goalCompleted.createdAt, startDayOfWeek().toDate()), //greater than equal
					lte(goalCompleted.createdAt, lastDayOfWeek().toDate()), //lower than equal
					eq(goalCompleted.goalId, goalId) // equals
				)
			)
			.groupBy(goalCompleted.goalId)
	);

	const [{ completedCount, desireWeeklyFrequency }] = await db
		.with(goalsCompletedCount)
		.select({
			desireWeeklyFrequency: goal.desireWeeklyFrequency,
			completedCount: sql/*sql*/`
				COALESCE(${goalsCompletedCount.completedCount}, 0)
			`.mapWith(Number)
		})
		.from(goal)
		.leftJoin(goalsCompletedCount, eq(goalsCompletedCount.goalId, goalId))
		.where(eq(goal.id, goalId))
		.limit(1);

	if (completedCount >= desireWeeklyFrequency)
		throw new Error("Goal alredy completed this week!");

	const [newGoalCompleted] = await db
		.insert(goalCompleted)
		.values({ goalId })
		.returning();

	return { newGoalCompleted };
}