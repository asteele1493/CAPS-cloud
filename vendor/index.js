const { startVendor } = require("./handler");

const { chance } = require("../utils");

const name = chance.word({syllables: 5});

startVendor(name);