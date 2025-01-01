const axios = require("axios");

const flaskFlag = async (FLASK_PORT) => {
  try {
    const response = await axios.get(FLASK_PORT);
    console.log("> Flask ML-Server:\t\t { OK } :-:");
    console.log("> Flask ML-Server:\t\t", response.data);
    return response.data.message;
  } catch (error) {
    console.log("Flask ML-Server:\t { NOT-OK } :-:");
    // console.error("Error calling Flask API:", error);
    throw error;
  }
};

module.exports = { flaskFlag };
