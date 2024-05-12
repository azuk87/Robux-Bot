const { CommandBuilder, utils } = require('handler.djs');
const database = require('@database');

CommandBuilder.$N`balance`.$M(async (message) => {
    const id = message.args(0) && utils.toDiscordId(message.args(0));

    const user = id ? await message.getUser(id, 'fetch') : message.author;
    if (!user) return message.replyNoMention({ content: '❌ **لا يمكنني العثور على هذا العضو!**' });
    if (user.bot) return message.replyNoMention({ content: '❌ **البوتات لا تملك حساب!**' });

    const data = await database.users.get(user.id, message.guild.id);
    const msg = user.id === message.author.id ? `**رصيد حسابك هو \`${data.balance}\`** 🪙` : `**رصيد ${user.username} هو \`${data.balance}\`** 🪙`;

    message.replyNoMention(msg);
});