CREATE TABLE IF NOT EXISTS tran."invitation" (
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
    email text NOT NULL,
    business_id int NOT NULL,
    role text NOT NULL, 
    invited_by int NOT NULL, 
    token text NOT NULL UNIQUE, 
    expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '3 days'),
    accepted_at TIMESTAMPTZ, 
    created_at TIMESTAMPTZ DEFAULT now(),
    
    CONSTRAINT invitation_pkey PRIMARY KEY (id),
    CONSTRAINT fk_invitation_business FOREIGN KEY (business_id) REFERENCES master."business"(id),
    -- FIX: Pointing to master."users" instead of "user"
    CONSTRAINT fk_invitation_admin FOREIGN KEY (invited_by) REFERENCES master."user"(id) 
);


INSERT INTO tran."invitation" (
    email, 
    business_id, 
    role, 
    token
) 
VALUES (
    'airshula79@gmail.com', -- Replace with your actual email
    26,                               -- Replace with a valid business ID from master.business
    '[{"role": "admin"}]',                         -- Role                             
    gen_random_uuid() -- Generates a unique token
);