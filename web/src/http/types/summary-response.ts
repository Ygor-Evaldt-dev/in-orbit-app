export type SummaryResponse = {
	completed: number;
	total: number;
	goalsPerDay: Record<string, {
		id: string;
		title: string;
		completedAt: string
	}[]>;
}