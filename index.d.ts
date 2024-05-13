type Message = import('handler.djs').Message & import('discord.js').Message;

interface CustomPrismaClient {
    users: {
        get(user: string, guild: string): Promise<import('@prisma/client').Users>;
    };
    guilds: {
        get(guild: string): Promise<import('@prisma/client').Guilds>;
    }
}

type Prisma = import('@prisma/client').PrismaClient & CustomPrismaClient;