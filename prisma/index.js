const { PrismaClient } = require('@prisma/client');

/** @type {Prisma} */
const prisma = new PrismaClient();

prisma.users.get = async function (user, guild) {
    const payload = { where: { id: user, guildId: guild } };
    return await prisma.users.findFirst(payload) || await prisma.users.create({ data: payload.where });
};

module.exports = prisma;