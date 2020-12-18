const moongose = require("mongoose");

const dbConnection = async () => {
  const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

  const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

  try {
    await moongose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log("DB CORRIENDO AHUEVO");
  } catch (e) {
    console.error(e);
    throw new Error("Error en la base de datos");
  }
};

module.exports = { dbConnection };
