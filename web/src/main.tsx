import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./http/query-client";
import { App } from "./App.tsx";

import "./index.css";

createRoot(document.getElementById("root")!).render(
	<QueryClientProvider client={queryClient}>
		<StrictMode>
			<App />
		</StrictMode>,
	</QueryClientProvider>
);
