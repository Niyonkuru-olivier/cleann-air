"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    try {
        const userCount = await prisma.user.count();
        console.log(`Total users in database: ${userCount}`);
    }
    catch (error) {
        console.error('Error checking users:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
main();
//# sourceMappingURL=check-users.js.map