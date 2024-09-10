import fastify from "fastify";
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { createGoal } from "../services/create-goal";
import { getWeekPendingGoal } from "../services/get-week-pendind-goal";
import { createGoalCompleted } from "../services/create-goal-completed";

const server = fastify().withTypeProvider<ZodTypeProvider>();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.get("/pending-goals", async () => {
	const { pendingGoals } = await getWeekPendingGoal();
	return pendingGoals;
});

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

server.listen({
	port: 3333
}).then(() => {
	console.log("HTTP Server runnning!");
});