const axios = require(`axios`);
const Mavlina = require("../Mavlina");
const tnd = require("./tnd");
class wyr extends tnd {

    async wyr(){
        try {
        const options = {
            method: 'GET',
            url: `https://mavlina-api.sazgal.repl.co/api/wyr`,
          };
          const ax = await axios.request(options)
          return ax.data
        } catch(err){
            return err = "Internal Server Error"
        }
    }
}

module.exports = wyr;
