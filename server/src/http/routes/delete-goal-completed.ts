import { z } from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { deleteGoalCompleted } from "../../services/delete-goal-completed";

export const deleteGoalCompletedRoute: FastifyPluginAsyncZod = async function (server) {
	server.delete("/goals-completed/:id", {
		schema: {
			params: z.object({
				id: z.string()
			})
		}
	}, async (request) => {
		const { id } = request.params;
		await deleteGoalCompleted(id);
	});
};