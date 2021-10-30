const bcrypt = require("bcrypt")

module.exports = {
        compare: async (password, passwordToBeCompare) => {
            const valid = await bcrypt.compare(password, passwordToBeCompare);       
            return valid;
          },
}