module.exports = {
    HOST: "us-cdbr-east-04.cleardb.com",
    USER: "b2f3e9b1af72a0",
    PASSWORD: "894935f5",
    DB: "heroku_7e64f24720c793d",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};