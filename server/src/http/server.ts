import fastify from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider
} from "fastify-type-provider-zod";
import {
	getPendingGoalsRoute,
	createGoalsRoute,
	createGoalCompletedRoute,
	getWeekSummaryRoute
} from "./routes";
import fastifyCors from "@fastify/cors";
import { deleteGoalCompletedRoute } from "./routes/delete-goal-completed";

const server = fastify().withTypeProvider<ZodTypeProvider>();

server.register(fastifyCors, {
	origin: "*"
});

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(getPendingGoalsRoute);
server.register(getWeekSummaryRoute);
server.register(createGoalsRoute);
server.register(createGoalCompletedRoute);
server.register(deleteGoalCompletedRoute);

server.listen({
	port: 3333
}).then(() => {
	console.log("HTTP Server runnning!");
});