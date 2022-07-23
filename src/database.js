const { connect } = require("mongoose");

(async () => {
  try {
    const db = await connect("mongodb://0.0.0.0:27017/ram-api");
    console.log("Db connectect to", db.connection.name);
  } catch (error) {
    console.log(error);
  }
})();
