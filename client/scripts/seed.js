const {Client} = require('pg');
const {
    users
} = require('../src/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
    try {
        // const createUUID = 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp"'
        // await client.query(createUUID);
        // // Create the "users" table if it doesn't exist
        // const createUsersQuery = `
        //   CREATE TABLE IF NOT EXISTS users (
        //     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        //     name VARCHAR(255) NOT NULL,
        //     email TEXT NOT NULL UNIQUE,
        //     password TEXT NOT NULL,
        //     is_deleted BOOLEAN DEFAULT FALSE NOT NULL,
        //     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  NOT NULL,
        //     created_by VARCHAR(255),
        //     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  NOT NULL,
        //     updated_by VARCHAR(255)
        //   );
        // `;
        // const createTable = await client.query(createUsersQuery);


        // Insert data into the "users" table
        const insertedUsers = await Promise.all(
            users.map(async (user) => {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                const query = `
                        INSERT INTO users (name, email, password, is_deleted,created_by)
                        VALUES ('${user.name}', '${user.email}', '${hashedPassword}',false,'setup')
                        ON CONFLICT (id) DO NOTHING;`;
                console.log(query);
                return client.query(query);
            }),
        );

        console.log(`Seeded ${insertedUsers.length} users`);

        return {
            users: insertedUsers
        };
    } catch (error) {
        console.error('Error seeding users:', error);
        throw error;
    }
}

async function main() {
    const client = new Client({
        user: 'snakk',
        password: 'pggi5115',
        host: 'localhost',
        database: 'zenb',
        port: 5432
    });
    client.connect()
    await seedUsers(client);

    await client.end();
}

main().catch((err) => {
    console.error(
        'An error occurred while attempting to seed the database:',
        err,
    );
});
