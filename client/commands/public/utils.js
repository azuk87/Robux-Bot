const { EmbedBuilder } = require('discord.js');
const { CommandBuilder } = require('handler.djs');

CommandBuilder.$N`ping`.$M(async (message) => {
    let now = message.createdTimestamp;
    const msg = await message.replyNoMention('**🏓 Pong...**');
    now = Date.now() - now;

    const embed = new EmbedBuilder()
        .setColor(0x0068ff)
        .setDescription(`**⏰ Discord API: ${message.client.ws.ping}ms\n📊 Time Taken: ${now}ms**`)
        .setTimestamp()

    msg.edit({ content: '', embeds: [embed] });
});


CommandBuilder.$N`ids`.$M(async (message) => {
    const embed = new EmbedBuilder()
        .setColor(0x0068ff)
        .setDescription(`**🪪: ${ids.size}**`)
        .setTimestamp()

    message.replyNoMention({ embeds: [embed] });
});