const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys');
const upload = require("../uploads/storage_model/Storage");
var photo;
var preUser;

module.exports.login = async function(req, res) {
  const candidate = await User.findOne({
    email: req.body.email
  });

  if (candidate) {
    // Пользователь существует
    const passwordResult = bcrypt.compareSync(
      req.body.password,
      candidate.password
    );
    if (passwordResult) {
      //Пароль верен, создание токена
      const token = jwt.sign(
        {
          email: candidate.email,
          userId: candidate._id
        },
        keys.jwt,
        { expiresIn: 3600 }
      );

      res.status(200).json({
        token: `Bearer ${token}`,
        expirationDate: 3600,
        user: {
          userId: candidate._id,
          email: candidate.email,
          nickname: candidate.nickname
        }
      });
    } else {
      // Неверный пароль
      res.status(401).json({
        message: 'Password is wrong!'
      });
    }
  } else {
    //Пользователя не сушествует
    return res.status(401).json({
      message: 'Authantication failed!'
    });
  }
};

module.exports.register = async function(req, res) {

  upload(req,res,async function(err) {
    if(err) {
      console.log(err);
      return res.end("Error uploading file.");
    }
    preUser = JSON.parse(req.body.jsonKeys);
    if(req.file){
      photo = req.file.filename;
    } else {
      photo = 'default.jpg'
    }

    console.log(preUser);
    const candidate = await User.findOne({
      email: preUser.email
    });

    if (candidate) {
      //пользователь сушествует, отдать ошибку
      res.status(409).json({
        message: 'This email exist!'
      });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const password = preUser.password;
      //подготавливаем запрос для сохранения пользователя
      const user = new User({
        email: preUser.email,
        password: bcrypt.hashSync(password, salt),
        nickname: preUser.nickname,
        photo: photo
      });

      try {
        //пробуем сохранить пользователя
        await user.save();

        const token = jwt.sign(
            {
              email: user.email,
              userId: user._id
            },
            keys.jwt,
            { expiresIn: 3600 }
        );

        res.status(201).json({
          message: 'User was created!',
          token: `Bearer ${token}`,
          expirationDate: 3600,
          user: {
            userId: user._id,
            email: user.email,
            nickname: user.nickname,
            photo: photo
          }
        });
      } catch (e) {
        //обрабатываем возможную ошибку
        console.log(e.message);
      }
    }

  });

};
