const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'role',
    description: 'Manage roles and members.',
    options: [
        {
            name: 'create',
            description: 'Create a new role.',
            type: 1, // SUB_COMMAND
            options: [
                { name: 'name', type: 3, description: 'The name of the new role', required: true },
                { name: 'color', type: 3, description: 'The color of the new role (hex code)', required: false },
                { name: 'mentionable', type: 5, description: 'Whether the role should be mentionable', required: false },
            ],
        },
        {
            name: 'delete',
            description: 'Delete a role.',
            type: 1, // SUB_COMMAND
            options: [{ name: 'role', type: 8, description: 'The role to delete', required: true }],
        },
        {
            name: 'add',
            description: 'Add a role to a user.',
            type: 1, // SUB_COMMAND
            options: [
                { name: 'user', type: 6, description: 'The user to add the role to', required: true },
                { name: 'role', type: 8, description: 'The role to add', required: true },
            ],
        },
        {
            name: 'remove',
            description: 'Remove a role from a user.',
            type: 1, // SUB_COMMAND
            options: [
                { name: 'user', type: 6, description: 'The user to remove the role from', required: true },
                { name: 'role', type: 8, description: 'The role to remove', required: true },
            ],
        },
        {
            name: 'rename',
            description: 'Rename a role.',
            type: 1, // SUB_COMMAND
            options: [
                { name: 'role', type: 8, description: 'The role to rename', required: true },
                { name: 'newname', type: 3, description: 'The new name for the role', required: true },
            ],
        },
        {
            name: 'color',
            description: 'Change the color of a role.',
            type: 1, // SUB_COMMAND
            options: [
                { name: 'role', type: 8, description: 'The role to change the color of', required: true },
                { name: 'newcolor', type: 3, description: 'The new color for the role (hex code)', required: true },
            ],
        },
    ],
    async execute(interactionOrMessage) {
        const member = interactionOrMessage.member;
        if (!member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
            return interactionOrMessage.reply({ content: 'You do not have permission to manage roles.', ephemeral: true });
        }

        const subcommand = interactionOrMessage.options.getSubcommand();

        if (subcommand === 'create') {
            const name = interactionOrMessage.options.getString('name');
            const color = interactionOrMessage.options.getString('color');
            const mentionable = interactionOrMessage.options.getBoolean('mentionable') || false;

            try {
                const role = await interactionOrMessage.guild.roles.create({
                    name,
                    color,
                    mentionable,
                });
                interactionOrMessage.reply({ content: `Created role ${role}.` });
            } catch (error) {
                console.error(error);
                interactionOrMessage.reply({ content: 'There was an error creating the role.', ephemeral: true });
            }
        } else if (subcommand === 'delete') {
            const role = interactionOrMessage.options.getRole('role');
            try {
                await role.delete();
                interactionOrMessage.reply({ content: `Deleted role ​${role.name}​.` });
            } catch (error) {
                console.error(error);
                interactionOrMessage.reply({ content: 'There was an error deleting the role.', ephemeral: true });
            }
        } else if (subcommand === 'add') {
            const user = interactionOrMessage.options.getUser('user');
            const role = interactionOrMessage.options.getRole('role');
            const member = interactionOrMessage.guild.members.cache.get(user.id);
            try {
                await member.roles.add(role);
                interactionOrMessage.reply({ content: `Added role ${role} to ${user}.` });
            } catch (error) {
                console.error(error);
                interactionOrMessage.reply({ content: 'There was an error adding the role to the user.', ephemeral: true });
            }
        } else if (subcommand === 'remove') {
            const user = interactionOrMessage.options.getUser('user');
            const role = interactionOrMessage.options.getRole('role');
            const member = interactionOrMessage.guild.members.cache.get(user.id);
            try {
                await member.roles.remove(role);
                interactionOrMessage.reply({ content: `Removed role ${role} from ${user}.` });
            } catch (error) {
                console.error(error);
                interactionOrMessage.reply({ content: 'There was an error removing the role from the user.', ephemeral: true });
            }
        } else if (subcommand === 'rename') {
            const role = interactionOrMessage.options.getRole('role');
            const newname = interactionOrMessage.options.getString('newname');
            try {
                await role.setName(newname);
                interactionOrMessage.reply({ content: `Renamed role ​${role.name}​ to ​${newname}​.` });
            } catch (error) {
                console.error(error);
                interactionOrMessage.reply({ content: 'There was an error renaming the role.', ephemeral: true });
            }
        } else if (subcommand === 'color') {
            const role = interactionOrMessage.options.getRole('role');
            const newcolor = interactionOrMessage.options.getString('newcolor');
            try {
                await role.setColor(newcolor);
                interactionOrMessage.reply({ content: `Changed the color of role ${role} to ​${newcolor}​.` });
            } catch (error) {
                console.error(error);
                interactionOrMessage.reply({ content: 'There was an error changing the color of the role. Make sure you provide a valid hex color code.', ephemeral: true });
            }
        }
    },
};
