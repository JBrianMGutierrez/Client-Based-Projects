var config = {}

config.host = process.env.HOST || "justintime.documents.azure.com:443";
config.authKey = process.env.AUTH_KEY || "kOSkIzNzptEOCVzIq5Lp16j1162DqsRNSU1MnNmxUpSjv9qmhTxR3Axgl3TGN7SFQS4cd1oSzyJj8QJbNiDIWA==";
config.databaseId = "ToDoList";
config.collectionId = "Items";

module.exports = config;
