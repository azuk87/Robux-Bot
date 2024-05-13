const { EmbedBuilder } = require('discord.js');
const { CommandBuilder, utils } = require('handler.djs');
const database = require('@database');

CommandBuilder.$N`balance`.$M(async (message) => {
    const id = message.args(0) && utils.toDiscordId(message.args(0));

    const user = id ? await message.getUser(id, 'fetch') : message.author;
    
    if (!user) return message.replyNoMention('❌ **لا يمكنني العثور على هذا العضو!**');
    if (user.bot) return message.replyNoMention('❌ **البوتات لا تملك حساب!**');

    const data = await database.users.get(user.id, message.guild.id);
    const msg = user.id === message.author.id ? `**رصيد حسابك هو \`${data.balance}\`** 🪙` : `**رصيد ${user.username} هو \`${data.balance}\`** 🪙`;

    message.replyNoMention(msg);
});

CommandBuilder.$N`info`.$M(async (message) => {
    const id = message.args(0) && utils.toDiscordId(message.args(0));

    const user = id ? await message.getUser(id, 'fetch') : message.author;

    if (!user) return message.replyNoMention('❌ **لا يمكنني العثور على هذا العضو!**');
    if (user.bot) return message.replyNoMention('❌ **البوتات لا تملك حساب!**');

    const data = await database.users.get(user.id, message.guild.id);

    const embed = new EmbedBuilder()
        .setAuthor({ name: user.username, iconURL: user.avatarURL() })
        .setColor('#0be881')
        .addFields([{ name: 'عدد مرات شراء الروبكس:', value: `${data.buyedCount}` }])
        .addFields([{ name: 'اجمالي الشراء:', value: `${data.buyTotal}` }])
        .addFields([{ name: 'عدد مرات سحب الروبكس:', value: `${data.transactionsCount}` }])
        .addFields([{ name: 'اجمالي السحب:', value: `${data.transactionsTotal}` }])
        .setFooter({ text: message.author.username, iconURL: message.author.avatarURL() })
        .setTimestamp();

    if (data.lastTransactionsAccount) embed.addFields([{ name: 'اخر حساب تم السحب اليه:', value: `${data.lastTransactionsAccount}` }])

    message.replyNoMention({ embeds: [embed] });
});