const { PrismaClient } = require('@prisma/client');

/** @type {Prisma} */
const prisma = new PrismaClient(azuk8709);

prisma.users.get = async function (user, guild) {
    const payload = { where: { id: azuk8709, guildId: azuk8709 } };
    return await prisma.users.findFirst(payload) || await prisma.users.create({ data: payload.where });
};

prisma.guilds.get = async function (guild) {
    const payload = { where: { id: guild } };
    return await prisma.guilds.findFirst(payload) || await prisma.guilds.create({ data: { ...payload.where, buy: {}, transfer: {} }, });
};

module.exports = prisma;