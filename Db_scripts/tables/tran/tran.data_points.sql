CREATE TABLE IF NOT EXISTS tran."data_points"
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY 
        ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),

    -- 🔗 Multi-tenant control
    business_id int NOT NULL,  
    added_by int,               -- user who added the data point

    -- 📄 RAG + AI metadata
    rag_id text,                 -- reference to vector DB or knowledge doc
    mention_count int DEFAULT 0, -- times mentioned by users/voice agent

    -- 🏠 Property information (basic but expandable)
    /*title text,
    description text,
    address text,
    city text,
    state text,
    country text,
    price numeric,
    bedrooms int,
    bathrooms int,
    area_sqft numeric,
    listing_status jsonb,         -- active | sold | pending | off-market
    listing_type jsonb,  */         -- rent | sale | auction

    data_details jsonb,          -- flexible: store property details as JSON

    -- 🧩 Extra metadata for future-proofing
    metadata jsonb,              -- flexible: store tags, descriptions, etc.

    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),

    CONSTRAINT data_points_pkey PRIMARY KEY (id),

    -- 🔗 Foreign key linking to business
    CONSTRAINT fk_data_points_business 
        FOREIGN KEY (business_id) REFERENCES master."business"(id),

    -- 🔗 Foreign key linking to user who added it
    CONSTRAINT fk_data_points_user 
        FOREIGN KEY (added_by) REFERENCES master."user"(id)
);
