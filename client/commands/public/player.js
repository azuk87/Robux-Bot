const { EmbedBuilder } = require('discord.js');
const { CommandBuilder } = require('handler.djs');
const noblox = require('noblox.js');

CommandBuilder.$N`avatar`.$M(async (message) => {
    const username = message.args(0);
    if (!username) return message.replyNoMention('❌ **يبدو أن هذا اللاعب غير متواجد في روبلوكس!**');

    const userId = ids.get(username) ?? await noblox.getIdFromUsername(username);
    if (!userId) return message.replyNoMention('❌ **يبدو أن هذا اللاعب غير متواجد في روبلوكس!**');

    ids.set(username, userId);

    const thumbnail = await noblox.getPlayerThumbnail(userId, 420, "png", true, "Headshot")

    const embed = new EmbedBuilder()
        .setAuthor({ name: username, iconURL: thumbnail[0].imageUrl })
        .setTitle(username)
        .setImage(thumbnail[0].imageUrl)
        .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL() })
        .setTimestamp();

    message.replyNoMention({ embeds: [embed] });
});

CommandBuilder.$N`player`.$M(async (message) => {
    const username = message.args(0);
    if (!username) return message.replyNoMention('❌ **يبدو أن هذا اللاعب غير متواجد في روبلوكس!**');

    const userId = ids.get(username) ?? await noblox.getIdFromUsername(username);
    if (!userId) return message.replyNoMention('❌ **يبدو أن هذا اللاعب غير متواجد في روبلوكس!**');

    ids.set(username, userId);

    const user = await noblox.getPlayerInfo(userId);
    const groups = await noblox.getGroups(userId);
    const thumbnail = await noblox.getPlayerThumbnail(userId, 420, "png", true, "Headshot")

    const embed = new EmbedBuilder()
        .setTitle('Roblox Player Information')
        .setColor('#0be881')
        .setThumbnail(thumbnail[0].imageUrl)
        .addFields([{ name: 'Username', value: `**[${user.username}]**` }])
        .addFields([{ name: 'Display Name', value: `${user.displayName}` }])
        .addFields([{ name: 'About me', value: `${user.blurb}` || 'None' }])
        .addFields([{ name: 'Groups', value: `${groups.length}` }])
        .addFields([{ name: 'Friends Number', value: `${user.friendCount}` }])
        .addFields([{ name: 'Followers', value: `${user.followerCount}` }])
        .addFields([{ name: 'Following', value: `${user.followingCount}` }])
        .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL() })
        .setTimestamp()

    message.replyNoMention({ embeds: [embed] });
});

CommandBuilder.$N`skin`.$M(async (message) => {
    const username = message.args(0);
    if (!username) return message.replyNoMention('❌ **يبدو أن هذا اللاعب غير متواجد في روبلوكس!**');

    const userId = ids.get(username) ?? await noblox.getIdFromUsername(username);
    if (!userId) return message.replyNoMention('❌ **يبدو أن هذا اللاعب غير متواجد في روبلوكس!**');

    ids.set(username, userId);

    const user = await noblox.getPlayerInfo(userId);
    const thumbnail = await noblox.getPlayerThumbnail(userId, 420, "png", true, "Headshot");
    const avatarURL = thumbnail[0].imageUrl;

    const embed = new EmbedBuilder()
        .setAuthor({ name: user.username, iconURL: avatarURL })
        .setTitle(user.username)
        // .setURL(user.profileURL)
        .setImage(avatarURL)
        .setFooter({ text: message.author.username, iconURL: message.author.avatarURL() })
        .setTimestamp();

    message.replyNoMention({ embeds: [embed] });
});