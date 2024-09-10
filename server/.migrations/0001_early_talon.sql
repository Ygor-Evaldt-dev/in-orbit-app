CREATE TABLE IF NOT EXISTS "meta_concluida" (
	"id" text PRIMARY KEY NOT NULL,
	"id_meta" text NOT NULL,
	"data_criacao" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "objetivo" RENAME TO "meta";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "meta_concluida" ADD CONSTRAINT "meta_concluida_id_meta_meta_id_fk" FOREIGN KEY ("id_meta") REFERENCES "public"."meta"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
