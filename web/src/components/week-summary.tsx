import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-br";

import { CheckCircle2, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { DialogTrigger } from "./ui/dialog";
import { InOrbitIcon } from "./in-orbit-icon";
import { Progress, ProgressIndicator } from "./ui/progress-bar";
import { Separator } from "./ui/separator";
import { SummaryResponse } from "../http/types/summary-response";
import { PendingGoals } from "./pending-goals";
import { queryClient } from "../http/query-client";
import { deleteGoalCompleted } from "../http/delete-goal-completed";

dayjs.locale(ptBR);

type WeekSummaryProps = {
	data: SummaryResponse
}

export function WeekSummary({
	data
}: WeekSummaryProps) {
	const fristDayOfWeek = dayjs().startOf("week").format("D MMM");
	const lastDayOfWeek = dayjs().endOf("week").format("D MMM");

	const completedPercentage = Math.round(data.completed * 100 / data.total);
	const completedGoals = Object.entries(data.goalsPerDay ?? {});

	const hasCompletedGoalInThisWeek = completedGoals.length > 0;

	async function handleDeleteGoalCompleted(id: string) {
		await deleteGoalCompleted(id);

		queryClient.invalidateQueries({ queryKey: ["summary"] });
		queryClient.invalidateQueries({ queryKey: ["pending-goals"] });
	}

	return (
		<main className="
			flex flex-col gap-6 
			py-10 px-5 mx-auto 
			max-w-[600px]
		">
			<header className="flex items-center justify-between">
				<div className="flex gap-3 items-center">
					<InOrbitIcon />
					<h1 className="text-lg font-semibold capitalize">
						{fristDayOfWeek} a {lastDayOfWeek}
					</h1>
				</div>
				<DialogTrigger asChild>
					<Button type="button" size="sm">
						<Plus size={16} />
						Cadastrar meta
					</Button>
				</DialogTrigger>
			</header>
			<div className="flex flex-col gap-3">
				<Progress max={data.total} value={data.completed}>
					<ProgressIndicator style={{ width: `${completedPercentage}%` }}></ProgressIndicator>
				</Progress>
				<div className="
					flex items-center justify-between
					text-xs text-zinc-400
				">
					<p>
						Você completou <span className="text-zinc-100">{data.completed}</span> de <span className="text-zinc-100">{data.total}</span> metas essa semana
					</p>
					<span className="">{`${completedPercentage}%`}</span>
				</div>

				<Separator />

				<PendingGoals />

				<section className="flex flex-col gap-4">
					<h2 className="text-xl font-medium text-zinc-100">
						Sua semana
					</h2>
					{
						hasCompletedGoalInThisWeek ? completedGoals.map(([day, goals]) => {
							const weekDay = dayjs(day).format("dddd");
							const weekDayAndMonth = dayjs(day).format("D[ de ]MMMM");

							return (
								<div key={day} className="flex flex-col gap-4 text-zinc-400">
									<h3 className="font-medium text-zinc-100">
										<span className="capitalize">{weekDay}</span>
										<span className="text-xs text-zinc-400">{` (${weekDayAndMonth})`}</span>
									</h3>

									<ul className="flex flex-col gap-3">
										{goals.map(({ id, title, completedAt }) => {
											const time = dayjs(completedAt).format("HH:mm");
											return (
												<li key={id} className="flex items-end gap-2">
													<CheckCircle2 size={16} className="text-pink-500" />
													<span className="text-sm text-zinc-400">
														Você completou <span className="text-zinc-100">“{title}”</span> às <span className="text-zinc-100">{time}h</span>
													</span>
													<button
														onClick={() => handleDeleteGoalCompleted(id)}
														className="
															text-xs text-zinc-400 underline
															hover:text-pink-500 transition duration-300
															focus:text-pink-500
														"
														type="button"
													>
														Desfazer
													</button>
												</li>
											);
										}).sort()}
									</ul>
								</div>
							);
						}) : (
							<p className="
								leading-relaxed
								text-zinc-400
							"
							>Você ainda não completou nenhuma meta essa semana.</p>
						)

					}

				</section>
			</div>
		</main>
	);
}