# 🤖 Telegram Spaced Repetition Bot

A Telegram bot for studying your notes from Obsidian using the **SuperMemo2** spaced repetition system. Create AI-powered cards from chosen notes, receive notifications when it's time to practice, and review your cards directly in the Telegram Mini App.

---

## 📺 Demo

https://github.com/user-attachments/assets/7c41b94c-b544-4454-b51f-bfaa7ed46eed

---

## 🛠 Stack

- **Backend**: NestJS, Prisma (PostgreSQL), BullMQ, Telegraf (Telegram Bot API).
- **Frontend**: React (Vite + React Router), Tailwind CSS, TypeScript, FSD Architecture.
- **Integrations**: OpenAI API, Telegram Mini App SDK for React, Obsidian Plugin (source code in a **[separate repo](https://github.com/Kanoncho/tg-spaced-repetition-plugin)**).

---

## 💡 Motivation

The idea is to connect two of the most effective strategies for learning new material: active recall and spaced repetition.

First, you write your notes, most importantly, you try to summarize everything you have memorized about a topic as if you were trying to explain it to someone else, rather than just copying information. Then, you regularly review this information until it sticks in your long-term memory.

---

## ⚙️ How it works?

1. **Setup**: Install the Obsidian plugin and set it up by providing your unique token, which you receive from the bot.
2. **Writing**: Continue writing your notes as usual.
3. **Sync**: Whenever you feel a note contains theoretical information worth memorizing, mark it with a special command and send the selected notes to the bot server.
4. **AI Generation**: This generates Q&A cards that become available in the Mini App.
5. **Review**: From now on, the bot will calculate when it's time to review specific cards based on your previous answers and will remind you to practice once a day.

> [!NOTE]
> You can read more specifically about the plugin setup and usage on the **Config** page within the Mini App.

---

## 🚀 Quick Start

Setup instructions for the _[frontend](https://github.com/Kanoncho/tg-spaced-repetition/blob/main/frontend/README.md)_ and _[backend](https://github.com/Kanoncho/tg-spaced-repetition/blob/main/backend/README.md)_ can be found in their respective READMEs. It's assumed that you'll start with the _[frontend](https://github.com/Kanoncho/tg-spaced-repetition/blob/main/frontend/README.md)_.
