const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    password: "parool",
    database: "BoardGameDB",
    host: "localhost",
    port: "5432"
});

const execute = async (
    createUsersTable,
    createBGTable,
    createEmailPasswordTable,
    createSettingIdsTable,
    createReviewTable,
    createUserReviewTable,
    createUserBGRelationTable,
    createFriendsTable,
    createMessageTable,
    createTokenTable,
    createSettingsTable,
    insertUsersInfo,
    insertBGInfo,
    insertEmailPasswordRelations,
    insertSettingIdsInfo,
    insertRelations,
    insertSettingsInfo,
    insertReviews,
    insertUserReview,
    insertMessages,
    insertFriends
) => {
    try {
        await pool.connect();
        await pool.query('DROP SCHEMA public CASCADE');
        await pool.query('CREATE SCHEMA public');
        await pool.query(createUsersTable);
        await pool.query(createBGTable);
        await pool.query(createEmailPasswordTable);
        await pool.query(createSettingIdsTable);
        await pool.query(createReviewTable);
        await pool.query(createUserReviewTable);
        await pool.query(createUserBGRelationTable);
        await pool.query(createFriendsTable);
        await pool.query(createMessageTable);
        await pool.query(createTokenTable);
        await pool.query(createSettingsTable);
        await pool.query(insertUsersInfo);
        await pool.query(insertBGInfo);
        await pool.query(insertEmailPasswordRelations);
        await pool.query(insertSettingIdsInfo);
        await pool.query(insertRelations);
        await pool.query(insertSettingsInfo);
        await pool.query(insertReviews);
        await pool.query(insertUserReview);
        await pool.query(insertMessages);
        await pool.query(insertFriends);
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};
const createBGTable = `
    CREATE TABLE IF NOT EXISTS "boardgames" (
        id SERIAL PRIMARY KEY,
        name VARCHAR(200) UNIQUE NOT NULL,
        imagepaths TEXT[],
        tags TEXT[],
        length INTEGER,
        min_players INTEGER NOT NULL,
        max_players INTEGER,
        difficulty VARCHAR(50),
        size VARCHAR(50)
        )`;

const createUsersTable = `
    CREATE TABLE IF NOT EXISTS "users" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(100) NOT NULL,
    "location" VARCHAR(100),
    "email" VARCHAR(100) UNIQUE NOT NULL
    )`;

const createEmailPasswordTable = `
    CREATE TABLE IF NOT EXISTS "email_password" (
    "email" VARCHAR(100) PRIMARY KEY REFERENCES users(email),
    "password" VARCHAR(100) NOT NULL
    )`;

const insertEmailPasswordRelations = `
    INSERT INTO email_password (email, password)
    VALUES
        ('john@example.com', 'password123'),
        ('alice@example.com', 'securepassword'),
        ('bob@example.com', 'p@ssw0rd');
`;

const createUserBGRelationTable = `
    CREATE TABLE IF NOT EXISTS "user_boardgame" (
    user_id INTEGER REFERENCES users(id),
    boardgame_id INTEGER REFERENCES boardgames(id),
    PRIMARY KEY (user_id, boardgame_id)
    )`;


const createReviewTable = `
    CREATE TABLE IF NOT EXISTS "reviews" (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        boardgame_id INTEGER REFERENCES boardgames(id),
        rating INTEGER,
        review TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
`;

const createTokenTable = `
    CREATE TABLE IF NOT EXISTS "auth_tokens" (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        token VARCHAR(255) UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        expires_at TIMESTAMP
        )
`;

const createMessageTable = `
    CREATE TABLE IF NOT EXISTS "messages" (
        id SERIAL PRIMARY KEY,
        sender_id INTEGER REFERENCES users(id),
        receiver_id INTEGER REFERENCES users(id),
        message_text TEXT,
        sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
`;

const createFriendsTable = `
    CREATE TABLE IF NOT EXISTS "friends" (
        user_id INTEGER REFERENCES users(id),
        friend_id INTEGER REFERENCES users(id),
        PRIMARY KEY (user_id, friend_id)
        )`;

const insertRelations = `
    INSERT INTO user_boardgame (user_id, boardgame_id) VALUES
       (1, 1),
       (2, 1),
       (2, 2),
       (3, 3),
       (1, 4),
       (2, 5);
`;
const createSettingIdsTable = `
    CREATE TABLE IF NOT EXISTS "setting_ids" (
       id SERIAL PRIMARY KEY,
       setting_name VARCHAR(100) UNIQUE NOT NULL
        )
`;

const insertSettingIdsInfo = `
        INSERT INTO setting_ids (setting_name)
        VALUES
            ('notifications'),
            ('theme'),
            ('language');
    `;

const createSettingsTable = `
    CREATE TABLE IF NOT EXISTS "user_settings" (
         id SERIAL PRIMARY KEY,
         user_id INTEGER REFERENCES users(id),
        setting_id INTEGER REFERENCES setting_ids(id),
        setting_value TEXT
        )
`;

const createUserReviewTable = `
    CREATE TABLE IF NOT EXISTS "user_review" (
        user_id INTEGER REFERENCES users(id),
        review_id INTEGER REFERENCES reviews(id),
        PRIMARY KEY (user_id, review_id)
        )`;

const insertSettingsInfo = async () => {
    await pool.query(`
        INSERT INTO user_settings (user_id, setting_id, setting_value)
        VALUES
            (1, 1, 'true'), -- notifications
            (1, 2, 'dark'), -- theme
            (1, 3, 'english'), -- language
            (2, 1, 'true'),
            (2, 2, 'light'),
            (2, 3, 'estonian'),
            (3, 1, 'false'),
            (3, 2, 'dark'),
            (3, 3, 'english');
    `);
};

const insertUserReview = async () => {
    await pool.query(`
        INSERT INTO user_review (user_id, review_id)
        VALUES
            (1, 1), 
            (2, 2),
            (3, 3), 
            (1, 4),
            (2, 5);
    `);
};

const insertMessages = async () => {
    await pool.query(`
        INSERT INTO messages (sender_id, receiver_id, message_text)
        VALUES
            (1, 2, 'Hey, how are you?'),
            (2, 1, 'Im good, thanks! How about you?'),
            (2, 3, 'Are you coming to the game night?'),
            (3, 2, 'Yes, Ill be there!'),
            (1, 3, 'Looking forward to it!');
    `);
};

const insertFriends = async () => {
    await pool.query(`
        INSERT INTO friends (user_id, friend_id)
        VALUES
            (1, 2),
            (1, 3),
            (2, 1),
            (3, 1);
    `);
};

const insertBGInfo = `
    INSERT INTO boardgames (name, imagepaths, tags, length, min_players, max_players, difficulty, size)
    VALUES
        ('Catan', '{"catan_image1.jpg", "catan_image2.jpg"}', '{"strategy", "multiplayer"}', 60, 3, 4, 'Medium', 'Medium'),
        ('Ticket to Ride', '{"ttr_image1.jpg", "ttr_image2.jpg"}', '{"board", "family"}', 45, 2, 5, 'Easy', 'Large'),
        ('Pandemic', '{"pandemic_image1.jpg", "pandemic_image2.jpg"}', '{"cooperative", "strategy"}', 45, 2, 4, 'Hard', 'Medium'),
        ('Scrabble', '{"scrabble_image1.jpg"}', '{"word", "classic"}', 90, 2, 4, 'Medium', 'Small'),
        ('Risk', '{"risk_image1.jpg"}', '{"strategy", "world domination"}', 120, 2, 6, 'Hard', 'Large');

`;

const insertUsersInfo = `
    INSERT INTO users (name, location, email)
    VALUES
        ('John', 'Kristiine', 'john@example.com'),
        ('Alice', 'Tartu', 'alice@example.com'),
        ('Bob', 'Põhja-Tallinn', 'bob@example.com');
`;

const insertReviews = async () => {
    try {
        await pool.query(`
            INSERT INTO reviews (user_id, boardgame_id, rating, review)
            VALUES
                (1, 1, 5, 'Catan is an amazing game! I love the strategy involved.'),
                (2, 2, 4, 'Ticket to Ride is a fun family game. We enjoy playing it together.'),
                (3, 3, 4, 'Pandemic is challenging but rewarding. Great cooperative experience.'),
                (1, 4, 3, 'Scrabble is a classic word game. It never gets old!'),
                (2, 5, 5, 'Risk requires strategic thinking. Love dominating the world!');
        `);
    } catch (error) {
        console.error('Error inserting reviews:', error);
    }
};


execute(
    createUsersTable,
    createBGTable,
    createEmailPasswordTable,
    createSettingIdsTable,
    createReviewTable,
    createUserReviewTable,
    createUserBGRelationTable,
    createFriendsTable,
    createMessageTable,
    createTokenTable,
    createSettingsTable,
    insertUsersInfo,
    insertBGInfo,
    insertEmailPasswordRelations,
    insertSettingIdsInfo,
    insertRelations,
    insertSettingsInfo,
    insertReviews,
    insertUserReview,
    insertMessages,
    insertFriends
).then(result => {
    if (result) {
        console.log('Tables and data inserted successfully.');
    }
});

console.log("Creating databases.")
module.exports = pool;


console.log("Creating databases.")
module.exports = pool;
