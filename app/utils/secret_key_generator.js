const crypto = require("crypto");

const key = crypto.randomBytes(32).toString("hex").toLowerCase();

console.log(key)
//4c3a2968f3ecc510bd26e7d8f15d2a6d05502077de73ec3a72f187bcf513b047
//0f502260c136d8efe1ff572cc190f7ee402a8543f77147040dca5db3bd7e4165