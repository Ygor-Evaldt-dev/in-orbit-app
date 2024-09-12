import { X } from "lucide-react";
import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogTitle
} from "./ui/dialog";
import {
	RadioGroup,
	RadioGroupIndicator,
	RadioGroupItem
} from "./ui/radio-group";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { queryClient } from "../http/query-client";
import { createGoal } from "../http/create-goal";

const createGoalFormSchema = z.object({
	title: z.string().min(1, "Informe a atividade que deseja realizar"),
	desireWeeklyFrequency: z.coerce.number().min(1).max(7)
});

export function SideFormCreateGoal() {
	type CreateGoalForm = z.infer<typeof createGoalFormSchema>

	const { register, control, handleSubmit, formState, reset } = useForm<CreateGoalForm>({
		resolver: zodResolver(createGoalFormSchema)
	});

	async function handleCreateGoal(data: CreateGoalForm) {
		await createGoal(data);

		queryClient.invalidateQueries({ queryKey: ["summary"] });
		queryClient.invalidateQueries({ queryKey: ["pending-goals"] });

		reset();
	}

	return (
		<DialogContent>
			<div className="flex flex-col gap-6 h-full">
				<header className="flex flex-col gap-3">
					<div className="flex items-center justify-between">
						<DialogTitle>Cadastrar meta</DialogTitle>
						<DialogClose>
							<X size={20} className="text-zinc-600" />
						</DialogClose>
					</div>
					<DialogDescription>
						Adicione atividades que te fazem bem e que você quer continuar praticando toda semana.
					</DialogDescription>
				</header>
				<form onSubmit={handleSubmit(handleCreateGoal)} className="flex-1 flex flex-col justify-between">
					<div className="flex flex-col gap-6">
						<div className="flex flex-col gap-2">
							<Label htmlFor="title">Qual a atividade?</Label>
							<Input
								id="title"
								autoFocus
								placeholder="Praticar exercícios, meditar, etc..."
								{...register("title")}
							/>
							{formState.errors.title && (
								<p className="text-xs text-pink-500">{formState.errors.title.message}</p>
							)}
						</div>
						<div className="flex flex-col gap-2">
							<Label htmlFor="frequency">Quantas vezes na semana?</Label>
							<Controller
								control={control}
								name="desireWeeklyFrequency"
								defaultValue={3}
								render={({ field }) => {
									return (
										<RadioGroup
											onValueChange={field.onChange}
											value={String(field.value)}
										>
											<RadioGroupItem value="1">
												<RadioGroupIndicator />
												<span
													className="text-zinc-300 text-sm font-medium leading-none"
												>
													1x na semana
												</span>
												<span className="text-lg leading-none">🥱</span>
											</RadioGroupItem>
											<RadioGroupItem value="2">
												<RadioGroupIndicator />
												<span
													className="text-zinc-300 text-sm font-medium leading-none"
												>
													2x na semana
												</span>
												<span className="text-lg leading-none">🙂</span>
											</RadioGroupItem>
											<RadioGroupItem value="3">
												<RadioGroupIndicator />
												<span
													className="text-zinc-300 text-sm font-medium leading-none"
												>
													3x na semana
												</span>
												<span className="text-lg leading-none">😎</span>
											</RadioGroupItem>
											<RadioGroupItem value="4">
												<RadioGroupIndicator />
												<span
													className="text-zinc-300 text-sm font-medium leading-none"
												>
													4x na semana
												</span>
												<span className="text-lg leading-none">😜</span>
											</RadioGroupItem>
											<RadioGroupItem value="5">
												<RadioGroupIndicator />
												<span
													className="text-zinc-300 text-sm font-medium leading-none"
												>
													5x na semana
												</span>
												<span className="text-lg leading-none">🤨</span>
											</RadioGroupItem>
											<RadioGroupItem value="6">
												<RadioGroupIndicator />
												<span
													className="text-zinc-300 text-sm font-medium leading-none"
												>
													6x na semana
												</span>
												<span className="text-lg leading-none">🤯</span>
											</RadioGroupItem>
											<RadioGroupItem value="7">
												<RadioGroupIndicator />
												<span
													className="text-zinc-300 text-sm font-medium leading-none"
												>
													Todos os dias da semana
												</span>
												<span className="text-lg leading-none">🔥</span>
											</RadioGroupItem>
										</RadioGroup>
									);
								}}
							/>

						</div>
					</div>
					<div className="flex items-center gap-3">
						<DialogClose asChild>
							<Button type="button" className="flex-1" variant="secondary">Fechar</Button>
						</DialogClose>
						<Button type="submit" className="flex-1">Salvar</Button>
					</div>
				</form>
			</div>
		</DialogContent>
	);
}