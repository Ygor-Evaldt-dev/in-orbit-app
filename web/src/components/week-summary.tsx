import { CheckCircle2, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { DialogTrigger } from "./ui/dialog";
import { InOrbitIcon } from "./in-orbit-icon";
import { Progress, ProgressIndicator } from "./ui/progress-bar";
import { Separator } from "./ui/separator";
import { OutlineButton } from "./ui/outline-button";

export function WeekSummary() {
	return (
		<main className="
			flex flex-col gap-6 
			py-10 px-5 mx-auto 
			max-w-[600px]
		">
			<header className="flex items-center justify-between">
				<div className="flex gap-3 items-center">
					<InOrbitIcon />
					<h1 className="text-lg font-semibold">
						05 a 12 de Agosto
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
				<Progress max={15} value={8}>
					<ProgressIndicator style={{ width: "50%" }}></ProgressIndicator>
				</Progress>
				<div className="
					flex items-center justify-between
					text-xs text-zinc-400
				">
					<p>
						Você completou <span className="text-zinc-100">{8}</span> de <span className="text-zinc-100">{15}</span> metas essa semana
					</p>
					<span className="">58%</span>
				</div>
				<Separator />
				<div className="flex flex-wrap gap-2 size">
					<OutlineButton>
						<Plus size={16} className="text-zinc-600"></Plus>
						Meditar
					</OutlineButton>
					<OutlineButton>
						<Plus size={16} className="text-zinc-600"></Plus>
						Fazer excercício
					</OutlineButton>
					<OutlineButton>
						<Plus size={16} className="text-zinc-600"></Plus>
						Estudar
					</OutlineButton>
				</div>
				<section className="flex flex-col gap-4">
					<h2 className="text-xl font-medium text-zinc-100">
						Sua semana
					</h2>
					<div className="flex flex-col gap-4 text-zinc-400">
						<h3 className="font-medium text-zinc-100">
							Dia <span className="text-xs text-zinc-400">{"(10 de agosto)"}</span>
						</h3>
						<ul className="flex flex-col gap-3">
							<li className="flex items-end gap-2">
								<CheckCircle2 size={16} className="text-pink-500" />
								<span className="text-sm text-zinc-400">
									Você completou <span className="text-zinc-100">“Acordar cedo”</span> às <span className="text-zinc-100">08:13h.</span>
								</span>
								<button
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
						</ul>
					</div>
				</section>
			</div>
		</main>
	);
}