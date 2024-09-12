import { eq } from "drizzle-orm";
import { db } from "../db";
import { goalCompleted } from "../db/schema";

export async function deleteGoalCompleted(id: string) {
	await db
		.delete(goalCompleted)
		.where(eq(goalCompleted.id, id));
}