import { z } from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { createGoal } from "../../services/create-goal";

export const createGoalsRoute: FastifyPluginAsyncZod = async function (server) {
	server.post("/goals", {
		schema: {
			body: z.object({
				title: z.string(),
				desireWeeklyFrequency: z.number().int().min(1).max(7)
			})
		}
	}, async (request, reply) => {
		const { body } = request;
		const { newGoal } = await createGoal(body);

		reply
			.code(201)
			.send(newGoal);
	});
};