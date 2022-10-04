\echo 'Delete and recreate flashcards db?' \prompt 'Return for yes or control-C to cancel > ' answer
DROP DATABASE flashcards;

CREATE DATABASE flashcards;

\connect flashcards

\i flashcards_schema.sql

\i flashcards-seed.sql