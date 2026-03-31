# 🚀 Quick start

I assume that you've already gone through the **[frontend setup](https://github.com/Kanoncho/tg-spaced-repetition/blob/main/frontend/README.md)** process

1. **📦 Install dependencies**:

   ```
   cd backend
   npm install
   ```

2. **🤖 Get Telegram Bot API token**:\
   In the **[frontend setup](https://github.com/Kanoncho/tg-spaced-repetition/blob/main/frontend/README.md)** you created your Telegram bot. Now you need to get your API token. Send the "/start" command to @BotFather and choose the "/token" option from the menu.

3. **📄 Add .env file**:\
   Create a .env file in the backend root directory and fill it with your credentials:

   ```
   POSTGRES_USER='user'
   POSTGRES_PASSWORD='123456'
   POSTGRES_DATABASE='db'
   POSTGRES_PORT='5433'
   POSTGRES_HOST='localhost'

   POSTGRES_URI='postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DATABASE}?schema=public

   REDIS_HOST='localhost'
   REDIS_PORT='6379'

   OPENAI_API_KEY='YOUR OPENAI API KEY'

   TELEGRAM_BOT_TOKEN='YOUR BOT TOKEN FROM BOTFATHER'
   ```

4. **🐳 Launch the databases**:\
   You need _Docker_ for this part, so you'll have to install it if it's your first time using it. This command only launches the databases:

   ```
   dokcer compose up -d
   ```

5. **🏗️ Apply migrations**:\
   This will sync your database schema with Prisma.

   ```
   npx prisma migrate dev
   ```

6. **🔥 Launch the server**:

   ```
   npm run start:dev
   ```

Done!🎉
