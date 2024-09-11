import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getWeekSummary } from "../../services/get-week-summary";

export const getWeekSummaryRoute: FastifyPluginAsyncZod = async function (server) {
	server.get("/summary", async () => {
		const { summary } = await getWeekSummary();
		return summary;
	});
};