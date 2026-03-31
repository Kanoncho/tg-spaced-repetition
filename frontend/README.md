# 🚀🤔 Quick Start

Because we are trying to launch a web app inside Telegram, the setup will get a little trickier than usual.

1. **📂 Clone the project**:

```
git clone https://github.com/Kanoncho/tg-spaced-repetition.git
```

2. **📦 Install dependencies**:\
   It's a monorepo, so you'll have to install separate dependencies for the frontend and backend parts

```
cd frontend
npm install
```

> [!NOTE]
> The **[backend](https://github.com/Kanoncho/tg-spaced-repetition/blob/main/backend/README.md)** directory also has a README.md file which describes how to spin up a backend server.

Here comes the fun part

3. **🤖 Create a Telegram bot**:\
   Every Telegram bot comes from **[@BotFather](https://telegram.me/BotFather)** which is just another bot for creating bots. Start BotFather and select the "/newbot" option in the menu. Then follow BotFather's instructions.

4. **🔒 Get a secure url**:\
   Now you need to provide a url which Telegram will open whenever someone tries to access the Mini App. Telegram requires an _https_ connection, so you cannot just specify _localhost_ in the Mini App url.

   The easiest way to obtain it is to either use a tunnel (for example from Cloudflare) or to deploy the frontend part on Vercel. I recommend the latter if you aren't sure what you're doing or if you want just to see how the bot works. However, a tunnel is recommended if you are developing a Mini App locally, because changes will apply instantly and you will not have to wait for Vercel to redeploy your project after every change

---

### ▲ Vercel way

1. **Fork this repository**:
   Fork this repository by pressing the "Fork" button next to the repository name at the top of the page

2. **Login on **[Vercel]()\*\*:
   I recommend using your GitHub account to login.

3. **Create a new project**:
   Hit the "Add new" button, then "Project". Select your repository by clicking "Import".

> [!NOTE]
> Do not forget to specify the _frontend_ directory path as the "Root directory" by clicking "Edit"

4. **Hit the "Deploy" button**

---

5. **⚙️ Set up the bot**:

Now as you have a url with https protocol, open the BotFather Mini App, select the bot you have just created, than go to "Settings" section -> "Mini Apps" -> "Main App". Copy your Vercel (or tunnel) url and paste it into the "Main App url" field.

6. **🧠 Setting up the backend part**:

Whew, almost done! You can try to open the Mini App where you should see the bottom tabs and a "Loading..." text. However, to have a properly working bot, you also need to start the backend server. Fortunately the **[backend setup](https://github.com/Kanoncho/tg-spaced-repetition/blob/main/backend/README.md)** proccess is much easier.
