type Message = import('handler.djs').Message & import('discord.js').Message;

interface CustomPrismaClient {
    users: {
        get(user: string, guild: string): Promise<import('@prisma/client').Users>;
    };
}

type Prisma = import('@prisma/client').PrismaClient & CustomPrismaClient;