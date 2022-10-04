CREATE TABLE users( 
    id              SERIAL PRIMARY KEY,
    set_id          INTEGER[],
    username        TEXT NOT NULL,
    password        TEXT NOT NULL,
    first_name      TEXT NOT NULL,
    last_name       TEXT NOT NULL,
    email           TEXT NOT NULL UNIQUE CHECK(POSITION('@' IN email) > 1),
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    last_ping       TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE FlashcardSets( 
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    is_public       boolean NOT NULL,
    description	    TEXT,
    title	        TEXT NOT NULL,
    flashcards	    TEXT NOT NULL,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP NOT NULL DEFAULT NOW()
);
