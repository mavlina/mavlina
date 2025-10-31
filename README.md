# Mavlina - A Modular Discord Bot

Mavlina is a powerful and flexible Discord bot built with Node.js and the discord.js library. It features a modular command and event handling system, making it easy to extend and customize.

## Features

*   **Modular Command Handler:** Easily add new commands by creating new files. Commands are automatically loaded and registered.
*   **Dual Invocation:** Commands can be invoked as both slash commands and traditional message (prefix) commands.
*   **Event Handler:** A modular event handler that loads events from individual files.
*   **Sub-command Support:** Organize your commands into sub-folders for better organization.
*   **Comprehensive Help Command:** A user-friendly help command with embeds, select menus, and buttons.
*   **Basic Moderation:** Kick and ban commands with permission checks.
*   **Information Commands:** Get information about users and the server.

## Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/) (v16.9.0 or higher)
*   A Discord Bot Token. You can get one from the [Discord Developer Portal](https://discord.com/developers/applications).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/mavlina.git
    cd mavlina
    ```
2.  **Install the dependencies:**
    ```bash
    npm install
    ```
3.  **Create a `.env` file:**
    Create a `.env` file in the root of the project and add your bot token:
    ```
    TOKEN=your_bot_token
    ```
4.  **Run the bot:**
    ```bash
    node src/index.js
    ```

## Usage

The bot uses `/` for slash commands and `!` for prefix commands.

### General Commands

*   `/help`: Displays a list of available commands.
*   `/ping`: Replies with Pong!

### Information Commands

*   `/userinfo [user]`: Displays information about a user.
*   `/serverinfo`: Displays information about the server.

### Moderation Commands

*   `/kick <user> [reason]`: Kicks a user from the server.
*   `/ban <user> [reason]`: Bans a user from the server.

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or create a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.