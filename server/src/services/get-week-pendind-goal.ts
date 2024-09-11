import { lte, count, gte, and, eq, sql } from "drizzle-orm";
import { startDayOfWeek, lastDayOfWeek } from "../adapters/dayjs-adapter";
import { db } from "../db";
import { goal, goalCompleted } from "../db/schema";

export async function getWeekPendingGoal() {
	const goalsCreatedUpToWeek = db.$with("metas_criadas_ate_a_semana").as(
		db
			.select({
				id: goal.id,
				title: goal.title,
				desireWeeklyFrequency: goal.desireWeeklyFrequency,
				createdAt: goal.createdAt
			})
			.from(goal)
			.where(
				lte(goal.createdAt, lastDayOfWeek().toDate()) //lower than equal
			)
	);

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
					lte(goalCompleted.createdAt, lastDayOfWeek().toDate()) //lower than equal
				)
			)
			.groupBy(goalCompleted.goalId)
	);

	const pendingGoals = await db
		.with(goalsCreatedUpToWeek, goalsCompletedCount)
		.select({
			id: goalsCreatedUpToWeek.id,
			title: goalsCreatedUpToWeek.title,
			desireWeeklyFrequency: goalsCreatedUpToWeek.desireWeeklyFrequency,
			completedCount: sql/*sql*/`
				COALESCE(${goalsCompletedCount.completedCount}, 0)
			`.mapWith(Number)
		})
		.from(goalsCreatedUpToWeek)
		.leftJoin(
			goalsCompletedCount,
			eq(goalsCompletedCount.goalId, goalsCreatedUpToWeek.id)
		);

	return { pendingGoals };
}