const { ActionRowBuilder, ButtonBuilder, ButtonStyle, TextInputStyle, ModalBuilder, TextInputBuilder } = require('discord.js');
const { CommandBuilder, utils } = require('handler.djs');
const noblox = require('noblox.js');
const database = require('@database');

CommandBuilder.$N`cookie`.$M((message) => {
    const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId('cookie')
            .setLabel('set 🍪')
            .setStyle(ButtonStyle.Primary)
    );

    message.replyNoMention({ components: [row] });
}).$B((interaction) => {
    const modal = new ModalBuilder()
        .setCustomId('cookie')
        .setTitle('Insert Cookie 🍪');


    const cookieInput = new TextInputBuilder()
        .setCustomId('cookie')
        .setLabel("What's your Cookie 🍪🍪?")
        .setStyle(TextInputStyle.Paragraph);

    const firstActionRow = new ActionRowBuilder().addComponents(cookieInput);

    modal.addComponents(firstActionRow);

    interaction.showModal(modal);
});

CommandBuilder.$N`group`.$M(async (message) => {
    const groupId = message.args(0);

    if (!groupId) return message.replyNoMention('❌ **يجب أن تقوم بتحديد معرف الجروب!**');
    if (!utils.isPositiveInteger(groupId)) return message.replyNoMention('❌ **يجب أن يكون معرف المجموعة رقمآ!**');

    const group = await noblox.getGroup(groupId).catch(e => null);
    if (!group) return message.replyNoMention('❌ **يجب أن تقوم بتحديد معرف صحيح للجروب!**');

    const guild = await database.guilds.get(message.guildId);
    if (!guild.cookie) return message.replyNoMention('❌ **يحب أن تحدد الكوكيز اولا!**');

    const auth = await noblox.setCookie(guild.cookie).catch(e => null);
    if (!auth) return message.replyNoMention('❌ **يحب أن تحدد الكوكيز اولا!**');

    if (group.owner.userId !== auth.UserID) return message.replyNoMention('❌ **يجب أن تكون انت مالك الجروب!**');

    await database.guilds.update({
        where: { id: message.guildId },
        data: { group: group.id },
    });

    message.replyNoMention('**✅ تم تحديد الجروب بنجاح!**');
});