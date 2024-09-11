import { z } from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { createGoalCompleted } from "../../services/create-goal-completed";

export const createGoalCompletedRoute: FastifyPluginAsyncZod = async function (server) {
	server.post("/goals-completed", {
		schema: {
			body: z.object({
				goalId: z.string()
			})
		}
	}, async (request) => {
		const { body } = request;
		await createGoalCompleted(body);
	});
};