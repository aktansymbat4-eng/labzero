CREATE TABLE "journal_entries" (
	"id" serial PRIMARY KEY,
	"client_id" text NOT NULL,
	"subject" text NOT NULL,
	"subject_title" text NOT NULL,
	"question" text NOT NULL,
	"hypothesis_text" text NOT NULL,
	"result_text" text NOT NULL,
	"matched" boolean NOT NULL,
	"lang" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
