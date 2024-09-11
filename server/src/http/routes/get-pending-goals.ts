import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getWeekPendingGoal } from "../../services/get-week-pendind-goal";

export const getPendingGoalsRoute: FastifyPluginAsyncZod = async function (server) {
	server.get("/pending-goals", async () => {
		const { pendingGoals } = await getWeekPendingGoal();
		return pendingGoals;
	});
};