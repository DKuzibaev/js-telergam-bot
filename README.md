# Telegram Bot with Firebase Integration and Scheduled Task

This documentation explains the code that implements a Telegram bot using Firebase for storing links and performs a scheduled task to send random articles to users.

## Dependencies

To run the bot, you need the following dependencies:

- `node-telegram-bot-api`: Library for interacting with the Telegram Bot API.
- `node-cron`: Library for scheduling tasks.
- `fs`: Built-in module for working with the file system.
- `dotenv`: Library for loading environment variables from a `.env` file.
- `firebase-admin`: Official library for interacting with Firebase.

## Setup

1. Install all necessary dependencies by running the command `npm install`.
2. Create a `.env` file in the project's root directory and add the following variables:
   - `TELEGRAM_BOT_TOKEN`: Your Telegram bot token.
   - `FIREBASE_DATABASE_URL`: URL of your Firebase database.
3. Create a Firebase service account and upload the JSON key file. Specify the path to the file in the `serviceAccountKey.json` variable.

## Main Functionality

### Initialization

- The bot is initialized using the token loaded from environment variables. The `polling` parameter is set to `true` for receiving updates through long polling.

### Bot Commands

- `/start`: Bot responds with a welcome message.
- `/info`: Bot responds with the user's name.
- `/addlink <link>`: Adds a link to the `links` collection in Firebase.
- `/randomarticle`: Sends a random article from the `links` collection.

### Message Handling

- The bot reacts to various user commands and processes unclear messages.

### Integration with Firebase

- Firebase connection is established using the service account and data from environment variables.
- Firestore is used for database operations. The bot performs adding and selecting links.

### Scheduled Task

- The bot uses `node-cron` to schedule a task.
- The task runs every day at 13:00. The bot selects a random article from the `links` collection and sends it to the chat.

## Running the Bot

Execute the code by running the command `node your_file.js`, where `your_file.js` contains the code described above.

## Notes

- This code provides basic bot functionality and can be further customized according to your needs.
- Before using, make sure you have all the required dependencies and settings.

---

# Telegram Бот с интеграцией Firebase и Запланированной Задачей

Эта документация объясняет код, который реализует Telegram бота с использованием Firebase для хранения ссылок и выполняет запланированную задачу по отправке случайных статей пользователям.

## Зависимости

Для работы бота вам понадобятся следующие зависимости:

- `node-telegram-bot-api`: Библиотека для взаимодействия с Telegram Bot API.
- `node-cron`: Библиотека для планирования задач.
- `fs`: Встроенный модуль для работы с файловой системой.
- `dotenv`: Библиотека для загрузки переменных окружения из файла `.env`.
- `firebase-admin`: Официальная библиотека для взаимодействия с Firebase.

## Настройка

1. Установите все необходимые зависимости, выполнив команду `npm install`.
2. Создайте файл `.env` в корневой директории проекта и добавьте в него следующие переменные:
   - `TELEGRAM_BOT_TOKEN`: Токен вашего Telegram бота.
   - `FIREBASE_DATABASE_URL`: URL вашей Firebase базы данных.
3. Создайте служебный аккаунт Firebase и загрузите файл с ключами в формате JSON. Укажите путь к файлу в переменной `serviceAccountKey.json`.

## Основной Функционал

### Инициализация

- Бот инициализируется с использованием токена из переменных окружения. Параметр `polling` установлен в `true` для получения обновлений через долгий polling.

### Команды бота

- `/start`: Бот отвечает приветственным сообщением.
- `/info`: Бот отвечает именем пользователя.
- `/addlink <ссылка>`: Добавляет ссылку в коллекцию `links` в Firebase.
- `/randomarticle`: Отправляет случайную статью из коллекции `links`.

### Обработка сообщений

- Бот реагирует на различные команды пользователя и обрабатывает непонятные сообщения.

### Интеграция с Firebase

- Подключение к Firebase осуществляется с использованием служебного аккаунта и данных из переменных окружения.
- Для работы с базой данных используется Firestore. Бот выполняет операции добавления и выборки ссылок.

### Запланированная Задача

- Бот использует `node-cron` для планирования задачи.
- Задача выполняется каждый день в 13:00. Бот выбирает случайную статью из коллекции `links` и отправляет ее в чат.

## Запуск Бота

Запустите код, выполнив команду `node ваш_файл.js`, где `ваш_файл.js` содержит описанный выше код.

## Примечания

- Этот код предоставляет базовый функционал бота и может быть дополнен согласно вашим потребностям.
- Перед использованием убедитесь, что у вас есть все необходимые зависимости и настройки.
