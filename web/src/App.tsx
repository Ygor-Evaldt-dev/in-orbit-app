
import { Dialog } from "./components/ui/dialog";
import { SideFormCreateGoal } from "./components/side-form-create-goal";
import { EmptyGoals } from "./components/empty-goals";
import { WeekSummary } from "./components/week-summary";

export function App() {
	const hasGoal = true;

	return (
		<Dialog>
			{
				hasGoal ? (
					<WeekSummary />
				) : (
					<EmptyGoals />
				)
			}
			<SideFormCreateGoal />
		</Dialog>
	);
}

