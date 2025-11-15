CREATE TABLE IF NOT EXISTS tran."calendar_account"
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY 
        ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),

    user_id int NOT NULL,                      -- which user this belongs to
    google_calendar_id text NOT NULL,          -- actual calendar ID
    access_token text NOT NULL,                -- encrypted in production
    refresh_token text NOT NULL,
    token_expiry TIMESTAMPTZ,
    timezone text DEFAULT 'UTC',               -- stored as TZ string e.g. "Australia/Sydney"

    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),

    CONSTRAINT calendar_account_pkey PRIMARY KEY (id),
    CONSTRAINT fk_calendar_user FOREIGN KEY (user_id) REFERENCES master."user"(id)
);

-- Owner logs into your dashboard

-- Clicks “Connect Google Calendar”

-- OAuth → you store tokens in tran.calendar_account

-- Your backend now knows: