const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys')


module.exports.login = async function(req, res) {
  const candidate = await User.findOne({
    email: req.body.email
  });

  if(candidate){
    // Пользователь существует
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
    if(passwordResult){
      //Пароль верен, создание токена
      const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id,
      }, keys.jwt, {expiresIn: 3600});

      res.status(200).json({
        token:  `Bearer ${token}`,
        expirationDate: 3600,
        user: {
        userId: candidate._id,
        email: candidate.email,
        nickname:candidate.nickname,
      }})

    } else {
      // Неверный пароль
      res.status(401).json({
        message: 'Password is wrong!'
      })
    }
  } else {
    //Пользователя не сушествует
    return res.status(401).json({
      message: 'Authantication failed!'
    })

  }

};


module.exports.register = async function(req, res) {
  // email password

  const candidate = await User.findOne({
    email: req.body.email
  })

  if (candidate){
    //пользователь сушествует, отдать ошибку
    res.status(409).json({
      message: "This email exist!"
    });
  } else {
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;
    //подготавливаем запрос для сохранения пользователя
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt),
      nickname: req.body.nickname
    });

    try {
      //пробуем сохранить пользователя
      await await user.save();

      const token = jwt.sign({
        email: user.email,
        userId: user._id,
      }, keys.jwt, {expiresIn: 3600});

      res.status(201).json({
        message: "User was created!",
        token:  `Bearer ${token}`,
        expirationDate: 3600,
        user: user
      });
    } catch (e) {
      //обрабатываем возможную ошибку
      console.log(e.message)
    }
  }

};