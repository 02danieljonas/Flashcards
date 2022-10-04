const express = require("express");
const Flashcard = require("../models/flashcard.js");
const { createUserJwt } = require("../utils/tokens");
const security = require("../middleware/security");
const router = express.Router();

router.get("/ping", (req, res, next) => {
    try {
        return res.status(200).json({ ping: "pong" });
    } catch (err) {
        next(err);
    }
});

//get a search public sets
router.post("/search", async (req, res, next) => {
    try {
        const set = await Flashcard.fetchPublicSetsBySearch(req.body);
        return res.status(201).json({ set });
    } catch (err) {
        next(err);
    }
});

//get a public sets
router.post("/", async (req, res, next) => {
    try {
        const set = await Flashcard.fetchPublicSetById(req.body);
        return res.status(201).json({ set });
    } catch (err) {
        next(err);
    }
});

//create your own set
router.post(
    "/mysets",
    security.requireAuthenticatedUser,
    async (req, res, next) => {
        try {
            const set = await Flashcard.createSets(
                res.locals.user.email,
                req.body
            );
            return res.status(201).json({ set });
        } catch (err) {
            next(err);
        }
    }
);

//get all mysets
router.get(
    "/mysets",
    security.requireAuthenticatedUser,
    async (req, res, next) => {
        try {
            const mySets = await Flashcard.listSetsForUser(
                res.locals.user.email
            );
            return res.status(200).json({ mySets });
        } catch (err) {
            next(err);
        }
    }
);

//update your own sets
router.put(
    "/mysets",
    security.requireAuthenticatedUser,
    async (req, res, next) => {
        try {
            const mySet = await Flashcard.updateSets(
                res.locals.user.email,
                req.body
            );
            return res.status(201).json({ mySet });
        } catch (err) {
            next(err);
        }
    }
);

//delete your own sets
router.delete(
    "/mysets",
    security.requireAuthenticatedUser,
    async (req, res, next) => {
        try {
            const mySet = await Flashcard.deleteMySet(
                res.locals.user.email,
                req.body
            );
            return res.status(200).json({ mySet });
        } catch (err) {
            next(err);
        }
    }
);

module.exports = router;
