const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    password: "parool",
    database: "BoardGameDB",
    host: "localhost",
    port: "5432"
});

const execute = async (createBGTable, insertBGInfo, createUsersTable, insertUsersInfo) => {
    try {
        await pool.connect();
        await pool.query("DROP TABLE IF EXISTS boardgames");
        await pool.query(createBGTable);
        await pool.query("DROP TABLE IF EXISTS users")
        await pool.query(createUsersTable);
        await pool.query(insertBGInfo);
        await pool.query(insertUsersInfo);
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const createBGTable = `
    CREATE TABLE IF NOT EXISTS "boardgames" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR(200) NOT NULL,
        "imagepaths" TEXT[],
        "tags" TEXT[],
        "ratings" INTEGER[],
        "length" INTEGER,
        "min_players" INTEGER NOT NULL,
        "max_players" INTEGER,
        "difficulty" VARCHAR(50),
        "size" VARCHAR(50),
        "comments" TEXT[],
        "owners" INTEGER[]
    )`;

const createUsersTable = `CREATE TABLE IF NOT EXISTS "users" (
         "id" SERIAL PRIMARY KEY,
         "name" VARCHAR(100) NOT NULL,
         "location" VARCHAR(100)
    )`;

const insertBGInfo = `
    INSERT INTO boardgames (name, imagepaths, tags, ratings, length, min_players, max_players, difficulty, size, comments, owners)
    VALUES
        ('Catan', '{"catan_image1.jpg", "catan_image2.jpg"}', '{"strategy", "multiplayer"}', '{4, 5, 3}', 60, 3, 4, 'Medium', 'Medium', '{"Fun game!", "Enjoyed playing it."}', '{1,2}'),
        ('Ticket to Ride', '{"ttr_image1.jpg", "ttr_image2.jpg"}', '{"board", "family"}', '{5, 4, 4}', 45, 2, 5, 'Easy', 'Large', '{"Great family game!"}', '{1,2}'),
        ('Pandemic', '{"pandemic_image1.jpg", "pandemic_image2.jpg"}', '{"cooperative", "strategy"}', '{4, 3, 5}', 45, 2, 4, 'Hard', 'Medium', '{"Challenging but fun!"}', '{3}'),
        ('Scrabble', '{"scrabble_image1.jpg"}', '{"word", "classic"}', '{3, 4}', 90, 2, 4, 'Medium', 'Small', '{"Love playing Scrabble!"}', '{1,2,3}'),
        ('Risk', '{"risk_image1.jpg"}', '{"strategy", "world domination"}', '{5, 4}', 120, 2, 6, 'Hard', 'Large', '{"Requires strategic thinking."}', '{1,3}')
`;

const insertUsersInfo = `
    INSERT INTO users (name, location)
    VALUES
        ('John', 'Kristiine'),
        ('Alice', 'Tartu'),
        ('Bob', 'Põhja-Tallinn');

`;

console.log(insertBGInfo);

execute(createBGTable, insertBGInfo, createUsersTable, insertUsersInfo).then(result => {
    if (result) {
        console.log('If does not exist, tables "BoardGamesDB" and "Users" is created');
    }
});

module.exports = pool;
