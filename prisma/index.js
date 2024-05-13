const { PrismaClient } = require('@prisma/client');

/** @type {Prisma} */
const prisma = new PrismaClient();

prisma.users.get = async function (user, guild) {
    const payload = { where: { id: user, guildId: guild } };
    return await prisma.users.findFirst(payload) || await prisma.users.create({ data: payload.where });
};

prisma.guilds.get = async function (guild) {
    const payload = { where: { id: guild } };
    return await prisma.guilds.findFirst(payload) || await prisma.guilds.create({ data: { ...payload.where, buy: {}, transfer: {} }, });
};

module.exports = prisma;