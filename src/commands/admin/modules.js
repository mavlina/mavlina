const { PermissionsBitField } = require('discord.js');
const prisma = require('../../utils/db');
const { getGuildSettings } = require('../../utils/guild');

module.exports = {
    name: 'modules',
    description: 'Enable or disable command modules and individual commands.',
    options: [
        {
            name: 'on',
            description: 'Enable a command module.',
            type: 1, // SUB_COMMAND
            options: [{ name: 'module', type: 3, description: 'The module to enable', required: true }],
        },
        {
            name: 'off',
            description: 'Disable a command module.',
            type: 1, // SUB_COMMAND
            options: [{ name: 'module', type: 3, description: 'The module to disable', required: true }],
        },
        {
            name: 'enable',
            description: 'Enable a single command.',
            type: 1, // SUB_COMMAND
            options: [{ name: 'command', type: 3, description: 'The command to enable', required: true }],
        },
        {
            name: 'disable',
            description: 'Disable a single command.',
            type: 1, // SUB_COMMAND
            options: [{ name: 'command', type: 3, description: 'The command to disable', required: true }],
        },
        {
            name: 'status',
            description: 'Show the status of all modules and commands.',
            type: 1, // SUB_COMMAND
        },
    ],
    async execute(interactionOrMessage) {
        const member = interactionOrMessage.member;
        if (!member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return interactionOrMessage.reply({
                content: 'You must be an administrator to use this command.',
                ephemeral: true,
            });
        }

        const subcommand = interactionOrMessage.options.getSubcommand();
        const guildId = interactionOrMessage.guild.id;
        const settings = await getGuildSettings(guildId);

        if (subcommand === 'on') {
            const moduleName = interactionOrMessage.options.getString('module');
            if (!settings.disabledModules.includes(moduleName)) {
                return interactionOrMessage.reply({
                    content: `Module ${moduleName} is already enabled.`,
                    ephemeral: true,
                });
            }
            await prisma.guild.update({
                where: { id: guildId },
                data: { disabledModules: settings.disabledModules.filter((m) => m !== moduleName) },
            });
            interactionOrMessage.reply({ content: `Module ​${moduleName}​ has been enabled.` });
        } else if (subcommand === 'off') {
            const moduleName = interactionOrMessage.options.getString('module');
            if (settings.disabledModules.includes(moduleName)) {
                return interactionOrMessage.reply({
                    content: `Module ​${moduleName}​ is already disabled.`,
                    ephemeral: true,
                });
            }
            await prisma.guild.update({
                where: { id: guildId },
                data: { disabledModules: [...settings.disabledModules, moduleName] },
            });
            interactionOrMessage.reply({ content: `Module ​${moduleName}​ has been disabled.` });
        } else if (subcommand === 'enable') {
            const commandName = interactionOrMessage.options.getString('command');
            if (!settings.disabledCommands.includes(commandName)) {
                return interactionOrMessage.reply({
                    content: `Command ​${commandName}​ is already enabled.`,
                    ephemeral: true,
                });
            }
            await prisma.guild.update({
                where: { id: guildId },
                data: { disabledCommands: settings.disabledCommands.filter((c) => c !== commandName) },
            });
            interactionOrMessage.reply({ content: `Command ​${commandName}​ has been enabled.` });
        } else if (subcommand === 'disable') {
            const commandName = interactionOrMessage.options.getString('command');
            if (settings.disabledCommands.includes(commandName)) {
                return interactionOrMessage.reply({
                    content: `Command ​${commandName}​ is already disabled.`,
                    ephemeral: true,
                });
            }
            await prisma.guild.update({
                where: { id: guildId },
                data: { disabledCommands: [...settings.disabledCommands, commandName] },
            });
            interactionOrMessage.reply({ content: `Command ​${commandName}​ has been disabled.` });
        } else if (subcommand === 'status') {
            const { disabledModules, disabledCommands } = settings;
            const allModules = [
                ...new Set(
                    Array.from(interactionOrMessage.client.commandHandler.commands.values()).map((cmd) => cmd.category),
                ),
            ];

            let status = '**Modules Status:**\n';
            allModules.forEach((moduleName) => {
                status += `​${moduleName}​: ${disabledModules.includes(moduleName) ? 'Disabled' : 'Enabled'}\n`;
            });

            status += '\n**Disabled Commands:**\n';
            if (disabledCommands.length > 0) {
                status += disabledCommands.map((cmd) => `​${cmd}​`).join(', ');
            } else {
                status += 'None';
            }

            interactionOrMessage.reply({ content: status, ephemeral: true });
        }
    },
};
