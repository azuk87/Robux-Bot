const { EmbedBuilder } = require('discord.js');
const { CommandBuilder, utils } = require('handler.djs');
const database = require('@database');

CommandBuilder.$N`credit`.$M(async (message) => {
    const amount = message.args(0);

    if (!utils.isPositiveInteger(amount)) return message.replyNoMention('❌ **يجب أن تقوم بتحديد رقم صحيح!**');

    const guildData = await database.guilds.get(message.guild.id);
    const guildPrice = guildData.price;

    if (amount * 0.95 == 2 ? 1 : amount < guildPrice * 1 || amount == guildPrice) return message.replyNoMention(`❌ **يجب أن يكون عدد الكريديت \`${Math.ceil((guildPrice * 1) / 0.95)}\` على الأقل!**`);

    const buy = Math.floor((amount * 0.95) / guildPrice);
    const price = buy * guildPrice;
    const withtax = Math.ceil(price / 0.95);

    message.replyNoMention({
        embeds: [
            new EmbedBuilder()
                .setColor('#0be881')
                .setThumbnail(message.guild.iconURL())
                .setTitle('ضريبة الكريديت')
                .addFields([{ name: 'يمكنك شراء :', value: `${amount == 1 ? 1 : buy} روبكس` }])
                .addFields([{ name: 'السعر :', value: `${amount == 1 ? 1 : price}` }])
                .addFields([{ name: 'السعر مع الضريبة :', value: `${amount == 1 ? 1 : price == 1 ? 1 : withtax}` }])
                .setTimestamp()
        ]
    });

});

CommandBuilder.$N`tax`.$M(async (message) => {
    const amount = message.args(0);
    if (!utils.isPositiveInteger(amount)) return message.replyNoMention('❌ **يجب أن تقوم بتحديد رقم صحيح!**');

    const tax = Math.ceil(amount * 20 / 19);
    const transformation = Math.floor(amount * 0.95);

    return message.replyNoMention({
        embeds: [
            new EmbedBuilder()
                .setColor('#0be881')
                .setThumbnail(message.guild.iconURL())
                .setTitle('ضريبة بروبوت')
                .addFields([{ name: 'المبلغ بدون الضريبة :', value: transformation == 0 ? '1' : '' + transformation }])
                .addFields([{ name: 'المبلغ بعد الضريبة :', value: tax == 2 ? '1' : '' + tax }])
                .setTimestamp()
        ]
    })
});

CommandBuilder.$N`robux`.$M(async (message) => {
    const amount = message.args(0);
    if (!utils.isPositiveInteger(amount)) return message.replyNoMention('❌ **يجب أن تقوم بتحديد رقم صحيح!**');

    const guildData = await database.guilds.get(message.guild.id);
    const guildPrice = guildData.price;

    const price = Math.floor(amount * guildPrice);

    return message.replyNoMention({
        embeds: [
            new EmbedBuilder()
                .setColor('#0be881')
                .setThumbnail(message.guild.iconURL())
                .setTitle('ضريبة الروبكس')
                .addFields([{ name: 'المبلغ بدون الضريبة :', value: '' + price }])
                .addFields([{ name: 'المبلغ بعد الضريبة :', value: Math.ceil(price / 0.95) == 2 ? '1' : '' + Math.ceil(price / 0.95) }])
                .setTimestamp()
        ]
    });
});
