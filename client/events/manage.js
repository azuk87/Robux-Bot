const { ModalSubmitInteraction } = require('discord.js');
const { EventBuilder } = require('handler.djs');
const noblox = require('noblox.js');
const database = require('@database');

EventBuilder.$N`interactionCreate`.$E(Execution).$L();

/**
 * @param {ModalSubmitInteraction} interaction 
 */
async function Execution(interaction) {
    if (!interaction.isModalSubmit()) return;

    if (interaction.customId == 'cookie') {
        await interaction.deferReply({ ephemeral: true });

        const cookie = interaction.fields.getField('cookie').value;
        const auth = await noblox.setCookie(cookie).catch(e => null);

        if (!auth) return interaction.editReply('❌ ');

        await database.guilds.get(interaction.guild.id);

        await database.guilds.update({
            where: { id: interaction.guild.id },
            data: { cookie }
        });

        interaction.editReply(`✅ ${auth.UserName}`);
    }
}