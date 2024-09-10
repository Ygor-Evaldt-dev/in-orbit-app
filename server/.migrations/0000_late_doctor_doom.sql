CREATE TABLE IF NOT EXISTS "objetivo" (
	"id" text PRIMARY KEY NOT NULL,
	"titulo" text NOT NULL,
	"frequencia_semanal_desejada" integer NOT NULL,
	"data_criacao" timestamp with time zone DEFAULT now() NOT NULL
);
