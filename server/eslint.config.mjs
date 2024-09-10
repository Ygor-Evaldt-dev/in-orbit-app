import globals from "globals";
import tseslint from "typescript-eslint";

export default [
	{
		files: ["**/*.{js,mjs,cjs,ts}"],
		languageOptions: { globals: globals.browser },
		rules: {
			semi: ["error", "always"],
			quotes: ["error", "double"],
			indent: ["error", "tab"]
		}
	},
	...tseslint.configs.recommended
];