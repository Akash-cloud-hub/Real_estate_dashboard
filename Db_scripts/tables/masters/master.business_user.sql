
--Link table: a user can belong to multiple businesses (multi-tenant).
CREATE TABLE IF NOT EXISTS tran."business_user"
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    business_id int,
    user_id int,
    role jsonb, -- admin | owner | member | agent | viewer | developer
    invited_by text,
    joined_at TIMESTAMPTZ Default now(),
    CONSTRAINT business_user_pkey PRIMARY KEY (id),
    CONSTRAINT fk_business FOREIGN KEY (business_id) REFERENCES master."business"(id),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES master."user" (id)
)


