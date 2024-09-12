import { Dialog } from "./components/ui/dialog";
import { SideFormCreateGoal } from "./components/side-form-create-goal";
import { EmptyGoals } from "./components/empty-goals";
import { WeekSummary } from "./components/week-summary";
import { useQuery } from "@tanstack/react-query";
import { getSummary } from "./http/get-summary";

export function App() {
	const { data } = useQuery({
		queryKey: ["summary"],
		queryFn: getSummary,
		staleTime: 1000 * 60 //60 seconds
	});
	const summary = data;

	return (
		<Dialog>
			{
				summary?.total && summary.total > 0 ? (
					<WeekSummary data={summary} />
				) : (
					<EmptyGoals />
				)
			}
			<SideFormCreateGoal />
		</Dialog>
	);
}

