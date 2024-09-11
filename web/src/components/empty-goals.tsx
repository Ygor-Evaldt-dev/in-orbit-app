import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { DialogTrigger } from "./ui/dialog";

import logoInOrbit from "../assets/logo-in-orbit.svg";
import letsStartIllustration from "../assets/lets-start-illustration.svg";

export function EmptyGoals() {
	return (
		<main className="
				h-screen 
				flex flex-col gap-8
				items-center justify-center
			">
			<img src={logoInOrbit} alt="" />
			<img src={letsStartIllustration} alt="" />
			<p className="
					leading-relaxed
					text-center text-zinc-300
					max-w-80
				">
				Você ainda não cadastrou nenhuma meta, que tal cadastrar um agora mesmo?
			</p>
			<DialogTrigger asChild>
				<Button type="button">
					<Plus size={16} />
					Cadastrar meta
				</Button>
			</DialogTrigger>
		</main>
	);
}