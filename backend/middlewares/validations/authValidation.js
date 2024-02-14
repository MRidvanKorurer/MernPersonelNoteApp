const joi = require("joi");

class AuthValidation {
  constructor() {}

  static register = async (req, res, next) => {
    try {
      await joi
        .object({
          name: joi.string().required().min(2).max(50).messages({
            "string.empty": "İsim alanı boş geçilemez",
            "string.base": "İsim Alanı Normal Metin Olmalıdır",
            "string.required": "İsim alanı zorunludur",
            "string.min": "İsim alanı en az 2 karakterden oluşmalıdır",
            "string.max": "İsim alanı en fazla 50 karakterden oluşmalıdır",
          }),
          email: joi.string().email().required().messages({
            "string.empty": "Email alanı boş geçilemez",
            "string.base": "Email Alanı Normal Metin Olmalıdır",
            "string.required": "Email alanı zorunludur",
            "string.email": "Email formatında giriniz",
          }),
          password: joi.string().required().min(6).max(1000).messages({
            "string.empty": "Şifre alanı boş geçilemez",
            "string.base": "Şifre Alanı Normal Metin Olmalıdır",
            "string.required": "Şifre alanı zorunludur",
            "string.min": "Şifre alanı en az 6 karakterden oluşmalıdır",
          }),
        })
        .validateAsync(req.body);
    } catch (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    next();
  };

  static login = async (req, res, next) => {
    try {
      await joi
        .object({
          email: joi.string().email().required().messages({
            "string.empty": "Email alanı boş geçilemez",
            "string.base": "Email Alanı Normal Metin Olmalıdır",
            "string.required": "Email alanı zorunludur",
            "string.email": "Email formatında giriniz",
          }),
          password: joi.string().required().min(6).messages({
            "string.empty": "Şifre alanı boş geçilemez",
            "string.base": "Şifre Alanı Normal Metin Olmalıdır",
            "string.required": "Şifre alanı zorunludur",
            "string.min": "Şifre alanı en az 6 karakterden oluşmalıdır",
          }),
        })
        .validateAsync(req.body);
    } catch (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    next();
  };
}

module.exports = AuthValidation;
