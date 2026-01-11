
-- Stores each business details
CREATE TABLE IF NOT EXISTS master."business"
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    business_name text ,
    country text ,
    industry jsonb, -- Real_estate | Healthcare | Education | Finance | Retail | Law_firm
    created_at TIMESTAMPTZ Default now(),
    updated_at TIMESTAMPTZ Default now(),
    CONSTRAINT business_pkey PRIMARY KEY (id)
)

ALTER TABLE master."business"
ADD COLUMN default_calendar_user_id int; --“All appointments go to this user for now.”