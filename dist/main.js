"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const start = async () => {
    try {
        const PORT = process.env.PORT || 4000;
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.enableCors();
        await app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
    }
    catch (e) {
        console.error(e);
    }
};
start();
//# sourceMappingURL=main.js.map