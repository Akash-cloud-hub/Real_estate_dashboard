-- Stores all user accounts independent of business.So its not connected to the business table
CREATE TABLE IF NOT EXISTS master."user"
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    email text ,
    password text ,
    full_name text ,
    is_active boolean Default True,
    status JSONB , -- invited | active | inactive | suspended | deleted
    created_at TIMESTAMPTZ Default now(),
    updated_at TIMESTAMPTZ Default now(),
    -- businesses JSONB, -- list of business ids the user is associated with
    /*
    [{ "business_id": 1,
        "role": "admin"  -- admin | owner | member | agent | viewer | developer
        },
        {
        "business_id": 2,
        "role": "agent"
        }
    ]
    */
    CONSTRAINT user_pkey PRIMARY KEY (id)
)

ALTER TABLE master."user"
ADD COLUMN clerk_id TEXT UNIQUE Not NULL; --“All appointments go to this user for now.”