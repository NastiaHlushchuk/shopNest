module.exports = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: ["dist/**/**/*.entity{.ts,.js}"],
  migrations: ["dist/**/**/migration/*{.ts,.js}"],
  cli: {
    entitiesDir: "src/database/entity",
    migrationsDir: "src/database/migration",
  },
};
