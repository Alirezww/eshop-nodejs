module.exports = {
    EXPIRES_IN : new Date().getTime() + 120000,
    ROLES : {
       USER : "USER",
       ADMIN : "ADMIN",
       WRITER : "WRITER",
       TEACHER : "TEACHER",
       SUPLIER: "SUPLIER"  
    } ,
    MONGO_URI : "mongodb://localhost:27017/nodeStore",
    ACCESS_TOKEN_SECRET_KEY : "4c3a2968f3ecc510bd26e7d8f15d2a6d05502077de73ec3a72f187bcf513b047",
    REFREST_TOKEN_SECRET_KEY : "0f502260c136d8efe1ff572cc190f7ee402a8543f77147040dca5db3bd7e4165"
}