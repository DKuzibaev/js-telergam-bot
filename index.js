const TelegraApi = require("node-telegram-bot-api");
const cron = require("node-cron");
const fs = require("fs");
const dotenv = require("dotenv");
const admin = require("firebase-admin");

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegraApi(token, { polling: true });

// Инициализация Firebase
const serviceAccount = require("./serviceAccountKey.json"); // Путь до вашего JSON-файла с данными служебного аккаунта
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL, // Значение URL вашей Firebase базы данных из .env
});

const db = admin.firestore();

bot.setMyCommands([
  { command: "/start", description: "Начальное приветствие" },
  { command: "/info", description: "Информация о пользователе" },
  { command: "/addlink", description: "Добавить ссылку" },
  { command: "/randomarticle", description: "Случайная статья" },
]);

const start = () => {
  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === "/start") {
      return bot.sendMessage(chatId, `Че надо?`);
    } else if (text === "/info") {
      return bot.sendMessage(
        chatId,
        `В целом мне пофиг, как тебя зовут, но раз тебе надо.. Тебя зовут: ${msg.from.first_name}`
      );
    } else if (text.startsWith("/addlink ")) {
      const link = text.substring("/addlink ".length);
      await db.collection("links").add({ link });
      return bot.sendMessage(chatId, `Ссылка добавлена: ${link}`);
    } else if (text === "/randomarticle") {
      const linksSnapshot = await db.collection("links").get();
      const linksArray = [];
      linksSnapshot.forEach((doc) => {
        linksArray.push(doc.data().link);
      });
      if (linksArray.length === 0) {
        return bot.sendMessage(chatId, "Список ссылок пуст.");
      }
      const randomIndex = Math.floor(Math.random() * linksArray.length);
      const randomLink = linksArray[randomIndex];
      return bot.sendMessage(chatId, `Случайная статья: ${randomLink}`);
    } else {
      return bot.sendMessage(
        chatId,
        "Я тебя них*я не понимаю... Или я тупой или ты еб*нутый....."
      );
    }
  });
};

start();

// Запуск задачи по расписанию
cron.schedule("0 13 * * *", async () => {
  const linksSnapshot = await db.collection("links").get();
  const linksArray = [];
  linksSnapshot.forEach((doc) => {
    linksArray.push(doc.data().link);
  });
  if (linksArray.length === 0) {
    return;
  }
  const randomIndex = Math.floor(Math.random() * linksArray.length);
  const randomLink = linksArray[randomIndex];
  let chatId = bot.on("message", (msg) => {
    chatId = msg.chat.id;
  });
  bot.sendMessage(chatId, `Случайная статья на сегодня: ${randomLink}`);
});
