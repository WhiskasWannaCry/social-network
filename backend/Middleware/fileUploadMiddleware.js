const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination(req,file,cb) {
    const userId = req.query.userId; // Получаем userId из параметров запроса

    // Путь к директории для сохранения аватаров пользователя
    const userAvatarDir = path.join(__dirname, "..", "public", "avatars", userId);

    // Создаем директорию пользователя, если она еще не существует
    if (!fs.existsSync(userAvatarDir)) {
      try {
        fs.mkdirSync(userAvatarDir, { recursive: true });
      } catch (error) {
        console.error("Error creating directory:", error);
      }
    }

    // Указываем путь для сохранения файла
    cb(null, userAvatarDir);
  },
  filename(req,file,cb) {
    const uniqueFileName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueFileName);
  }
})

module.exports = multer({storage})