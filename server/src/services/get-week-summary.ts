import { and, desc, eq, gte, lte, sql } from "drizzle-orm";
import { db } from "../db";
import { goal, goalCompleted } from "../db/schema";
import { lastDayOfWeek, startDayOfWeek } from "../adapters/dayjs-adapter";
import { GoalsPerDay } from "./types/goals-per-day";

export async function getWeekSummary() {
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

	const goalsCompletedInWeek = db.$with("metas_concluidas_na_semana").as(
		db
			.select({
				id: goalCompleted.id,
				title: goal.title,
				completedAt: goalCompleted.createdAt,
				completedAtDate: sql/*sql*/`
					DATE(${goalCompleted.createdAt})
				`.as("completedAtDate")
			})
			.from(goalCompleted)
			.innerJoin(goal, eq(goal.id, goalCompleted.goalId))
			.where(
				and(
					gte(goalCompleted.createdAt, startDayOfWeek().toDate()), //greater than equal
					lte(goalCompleted.createdAt, lastDayOfWeek().toDate()) //lower than equal
				)
			)
			.orderBy(desc(goalCompleted.createdAt))
	);

	const goalsCompletedByWeekDay = db.$with("metas_concluidas_no_dia").as(
		db
			.select({
				completedAtDate: goalsCompletedInWeek.completedAtDate,
				completed: sql/*sql*/`
					JSON_AGG(
						JSON_BUILD_OBJECT(
							'id', ${goalsCompletedInWeek.id},
							'title', ${goalsCompletedInWeek.title},
							'completedAt',  ${goalsCompletedInWeek.completedAt}
						)
					)
				`.as("completed")
			})
			.from(goalsCompletedInWeek)
			.groupBy(goalsCompletedInWeek.completedAtDate)
			.orderBy(desc(goalsCompletedInWeek.completedAtDate))
	);

	const [registers] = await db
		.with(goalsCreatedUpToWeek, goalsCompletedInWeek, goalsCompletedByWeekDay)
		.select({
			completed: sql/*sql*/`
				(SELECT COUNT(*) FROM ${goalsCompletedInWeek})
			`.mapWith(Number),
			total: sql/*sql*/`
				(SELECT SUM(${goalsCreatedUpToWeek.desireWeeklyFrequency}) FROM ${goalsCreatedUpToWeek})
			`.mapWith(Number),
			goalsPerDay: sql/*sql*/<GoalsPerDay>`
				JSON_OBJECT_AGG(
					${goalsCompletedByWeekDay.completedAtDate},
					${goalsCompletedByWeekDay.completed}
				)
			`
		})
		.from(goalsCompletedByWeekDay);

	return { summary: registers };
}