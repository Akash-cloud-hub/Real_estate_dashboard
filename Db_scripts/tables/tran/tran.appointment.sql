CREATE TABLE IF NOT EXISTS tran."appointment"
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY 
        ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),

    business_id int NOT NULL,
    calendar_user_id int NOT NULL,  -- user whose calendar it was added to
    calendar_event_id text,         -- Google event ID returned by API

    -- customer details
    customer_name text,
    customer_phone text,
    customer_email text,

    appointment_time TIMESTAMPTZ NOT NULL,
    service text,                   -- e.g., "Buyer Inquiry", "Seller Valuation"
    notes text,

    created_at TIMESTAMPTZ DEFAULT now(),

    CONSTRAINT appointment_pkey PRIMARY KEY (id),

    CONSTRAINT fk_appointment_business 
        FOREIGN KEY (business_id) REFERENCES master."business"(id),

    CONSTRAINT fk_appointment_calendar_user 
        FOREIGN KEY (calendar_user_id) REFERENCES master."user"(id)
);
