const axios = require(`axios`);
const Mavlina = require("../Mavlina");
const wyr = require("./wyr");
class nhie extends wyr {

    async nhei(type){
        if(typeof type !== 'string') throw new Error("Type method must be in string")
        if(!type) throw new Error('You have to pass the type method')
        let method = ['normal','nsfw']
        if(!method.includes(type))  throw new Error('You have provided wrong type method')
            try {
               
                const options = {
                    method: 'GET',
                    url: `https://mavlina-api.sazgal.repl.co/api/nhie?type=${type}`,
                  };
                  const ax = await axios.request(options)
                  return ax.data
            } catch(err){
                return err = "Internal Server Error"
            }
        }
}

module.exports = nhie;
