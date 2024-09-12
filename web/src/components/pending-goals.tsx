import { Plus } from "lucide-react";
import { OutlineButton } from "./ui/outline-button";
import { getPendingGoals } from "../http/get-pending-goals";
import { useQuery } from "@tanstack/react-query";
import { createCompletedGoal } from "../http/create-goal-completed";
import { queryClient } from "../http/query-client";

export function PendingGoals() {
	const { data } = useQuery({
		queryKey: ["pending-goals"],
		queryFn: getPendingGoals,
		staleTime: 1000 * 60 //60 seconds
	});

	async function handleCompleteGoal(goalId: string) {
		await createCompletedGoal(goalId);
		queryClient.invalidateQueries({ queryKey: ["summary"] });
		queryClient.invalidateQueries({ queryKey: ["pending-goals"] });
	}



	return (
		<div className="flex flex-wrap gap-2 size">
			{data?.map(({ id, title, completedCount, desireWeeklyFrequency }) => {
				const isCompletedGoal = completedCount >= desireWeeklyFrequency;

				return (
					<OutlineButton
						key={id}
						disabled={isCompletedGoal}
						onClick={() => handleCompleteGoal(id)}
					>
						<Plus size={16} className="text-zinc-600"></Plus>
						{title}
					</OutlineButton>
				);
			})}

		</div>
	);
}