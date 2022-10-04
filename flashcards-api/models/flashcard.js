const db = require("../db");
const bcrypt = require("bcrypt");
const {
    UnauthorizedError,
    BadRequestError,
    NotFoundError,
} = require("../utils/errors");
const { BCRYPT_WORK_FACTOR } = require("../config");
const { json } = require("express");
const User = require("./user");

class Flashcard {
    static async makeSetPublic(set) {
        return {
            id: set.id,
            owner: set.userId,
            isPublic: set.isPublic,
            createdAt: set.createdAt.toDateString(),
            title: set.title,
            description: set.description,
            flashcards: JSON.parse(set.flashcards),
        };
    }

    static validateFlashcards(flashcards) {
        //Checks to see if the flashcards are set up properly
        if (!Array.isArray(flashcards)) {
            throw new BadRequestError(
                `flashcards should be an array of objects`
            );
        }
        flashcards.forEach((e, idx) => {
            e.id = idx;
            if (typeof e !== "object" || Array.isArray(e) || e === null) {
                throw new BadRequestError(
                    `flashcards should be an array of objects`
                );
            }
            const requiredFiled = ["term", "definition"];
            requiredFiled.forEach((field) => {
                if (!e.hasOwnProperty(field)) {
                    throw new BadRequestError(
                        `Missing a ${field} for at least one flashcard`
                    );
                }
            });
        });
        return JSON.stringify(flashcards);
    }

    static async listSetsForUser(email) {
        const result = await db.query(
            `SELECT 
                id, 
                user_id AS "userId", 
                is_public AS "isPublic", 
                created_at as "createdAt",
                title, 
                description, 
                flashcards
            FROM FlashcardSets WHERE user_id = (select id from users where email = $1)`,
            [email]
        );
        const userSets = [];
        result.rows.forEach(async (e) => {
            userSets.push(await Flashcard.makeSetPublic(e));
        });
        return userSets;
    }

    static async createSets(email, data) {
        const requiredFiled = ["flashcards", "title"];
        requiredFiled.forEach((field) => {
            if (!data.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body`);
            }
        });

        //validate flashcards
        const flashcards = Flashcard.validateFlashcards(data.flashcards);

        const result = await db.query(
            `
        INSERT INTO FlashcardSets (
            title,
            description,
            is_public,
            flashcards,
            user_id
        )
        VALUES ($1, $2, $3, $4, (select id from users where email = $5))
        RETURNING 
        id,
        title,
        description,
        is_public AS "isPublic",
        flashcards,
        user_id AS "userId",
        created_at AS "createdAt"
        `,
            [
                data.title,
                data.description,
                data.isPublic || false,
                flashcards,
                email,
            ]
        );

        return await Flashcard.makeSetPublic(result.rows[0]);
    }

    static async updateSets(email, data) {
        const requiredFiled = ["flashcards", "title", "id"];
        requiredFiled.forEach((field) => {
            if (!data.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body`);
            }
        });

        //validate flashcards
        const flashcards = Flashcard.validateFlashcards(data.flashcards);

        //query the database for the setID and then update it

        const result = await db.query(
            `
        UPDATE FlashcardSets
        SET
        title=$1,
        description=$2,
        is_public=$3,
        flashcards=$4
        WHERE 
        id = $5 AND user_id = (select id from users where email = $6)
        RETURNING 
        id,
        title,
        description,
        is_public AS "isPublic",
        flashcards,
        user_id AS "userId",
        created_at AS "createdAt"
        `,
            [
                data.title,
                data.description,
                data.isPublic || false,
                flashcards,
                data.id,
                email,
            ]
        );

        return await Flashcard.makeSetPublic(result.rows[0]);
    }

    static async fetchPublicSetById({ id }) {
        const result = await db.query(
            `
                SELECT 
                FlashcardSets.id, 
                FlashcardSets.user_id AS "userId", 
                FlashcardSets.is_public AS "isPublic", 
                FlashcardSets.created_at as "createdAt",
                FlashcardSets.title, 
                FlashcardSets.description, 
                FlashcardSets.flashcards
                
                FROM FlashcardSets
                WHERE FlashcardSets.id = $1 AND is_public = True
                `,
            [id]
        );
        if (result.rows.length == 0) {
            throw new NotFoundError("The provided set is not found");
        }
        return await Flashcard.makeSetPublic(result.rows[0]);
    }

    static async deleteMySet(email, data) {
        const result = await db.query(
            `
        DELETE FROM FlashcardSets
        WHERE 
        id = $1 AND user_id = (select id from users where email = $2)
        RETURNING *

        `,
            [data.id, email]
        );
        if (!result.rows[0]) {
            throw new BadRequestError(`The set can not be deleted`);
        }
        return await Flashcard.makeSetPublic(result.rows[0]);
    }

    static async fetchPublicSetsBySearch({ searchQuery }) {
        //This somehow takes the words in a string and turns them into an array of those words
        const searchQueryArray = searchQuery.match(/[-\w]+/g);

        const searchQueryString = searchQueryArray.join(":* & ") + ":*";

        const result = await db.query(
            `
            select
            FlashcardSets.id, 
            FlashcardSets.user_id AS "userId", 
            FlashcardSets.is_public AS "isPublic", 
            FlashcardSets.created_at as "createdAt",
            FlashcardSets.title, 
            FlashcardSets.description, 
            FlashcardSets.flashcards
        from FlashcardSets
        where to_tsvector(title || ' ' || description || ' ') @@ to_tsquery($1) AND is_public = True;
                `,
            [searchQueryString]
        );
        if (result.rows.length == 0) {
            throw new NotFoundError(
                "No sets were found with that description or title"
            );
        }
        const userSets = [];
        result.rows.forEach(async (e) => {
            userSets.push(await Flashcard.makeSetPublic(e));
        });
        return userSets;
    }
}

module.exports = Flashcard;
