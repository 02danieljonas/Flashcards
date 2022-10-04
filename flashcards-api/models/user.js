const db = require("../db");
const bcrypt = require("bcrypt");
const { UnauthorizedError, BadRequestError } = require("../utils/errors");
const { BCRYPT_WORK_FACTOR } = require("../config");

class User {
    static async makePublicUser(user) {
        return {
            id: user.id,
            set_id: user.set_id,
            username: user.username,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            createdAt: user.created_at,
        };
    }

    static async login(credentials) {
        const requiredFields = ["username", "password"];
        requiredFields.forEach((field) => {
            if (!credentials.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body.`);
            }
        });
        const user = await User.fetchUserByUsername(credentials.username);
        if (user) {
            const isValid = await bcrypt.compare(
                credentials.password,
                user.password
            );
            if (isValid) {
                return User.makePublicUser(user);
            }
        } else {
            await bcrypt.compare(
                "$2b$13$YFcwwKjaYhqqEuGHFlH.vO2I85GC2SSAEw5d5ATpAWvFi4haHGsyq",
                credentials.password
            );
        }
        throw new UnauthorizedError("Invalid username or password");
    }

    static async register(credentials) {
        const requiredFields = [
            "email",
            "username",
            "firstName",
            "lastName",
            "password",
        ];
        requiredFields.forEach((field) => {
            if (!credentials.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body.`);
            }
        });

        if (credentials.email.indexOf("@") <= 0) {
            throw new BadRequestError("Invalid email");
        }

        const existingUser = await User.fetchUserByEmail(credentials.email);
        if (existingUser) {
            throw new BadRequestError(`Duplicate email: ${credentials.email}`);
        }

        const lowercasedEmail = credentials.email.toLowerCase();
        const hashedPassword = await bcrypt.hash(
            credentials.password,
            BCRYPT_WORK_FACTOR
        );
        console.log(hashedPassword)

        const result = await db.query(
            ` INSERT INTO users (
                email,
                username,
                password,
                first_name,
                last_name
                )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, username, first_name, last_name, email, created_at, set_id
            `,
            [
                lowercasedEmail,
                credentials.username,
                hashedPassword,
                credentials.firstName,
                credentials.lastName,
            ]
        );

        const user = result.rows[0];
        return User.makePublicUser(user);
    }

    static async updateProfile(email, credentials) {
        const requiredFields = [
            "username",
            "firstName",
            "lastName",
            "oldPassword",
            "newPassword"
        ];
        requiredFields.forEach((field) => {
            if (!credentials.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body.`);
            }
        });

        const selectedUser = await User.fetchUserByEmail(email);
        // const isValid = await bcrypt.compare(
        //     credentials.oldPassword,
        //     selectedUser.password
        // );
        // console.log(selectedUser);
        // console.log(isValid);
        // user on file

        if (!selectedUser) {
            throw new UnauthorizedError("User does not exists");
        }
        // old password matches password on file
        const isValid = await bcrypt.compare(
            credentials.oldPassword,
            selectedUser.password
        );

        if (!isValid) {
            throw new UnauthorizedError(
                "The old password provided is not correct"
            );
        }

        const hashedPassword = await bcrypt.hash(
            credentials.newPassword,
            BCRYPT_WORK_FACTOR
        );

        const result = await db.query(
            ` UPDATE users
                    SET
                    username=$1,
                    first_name=$2,
                    last_name=$3,
                    password=$4
                    WHERE 
                    email = $5 
                    RETURNING id, username, first_name, last_name, email, created_at, set_id
                    `,
            [
                credentials.username,
                credentials.firstName,
                credentials.lastName,
                hashedPassword,
                email,
            ]
        );
        const user = result.rows[0];
        return User.makePublicUser(user);
    }

    static async fetchUserByUsername(username) {
        if (!username) {
            throw new BadRequestError("No username provided");
        }
        const query = `SELECT * FROM users WHERE username = $1`;
        const result = await db.query(query, [username]);

        const user = result.rows[0];

        return user;
    }

    static async fetchUserByEmail(email) {
        if (!email) {
            throw new BadRequestError("No email provided");
        }
        const query = `SELECT * FROM users WHERE email = $1`;
        const result = await db.query(query, [email.toLowerCase()]);

        const user = result.rows[0];

        return user;
    }
}

module.exports = User;
