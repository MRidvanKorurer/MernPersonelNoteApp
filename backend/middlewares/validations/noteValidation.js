const joi = require("joi");

class NoteValidation {
  constructor() {}

  static create = async (req, res, next) => {
    try {
      await joi
        .object({
          title: joi.string().required().max(100).trim().messages({
            "string.base": "Başlık alanı normal metin olmalıdır",
            "string.empty": "Başlık alanı boş bırakılamaz",
            "string.required": "Başlık alanı zorunludur",
            "string.max": "Başlık alanı 100 karakterden fazla olamaz",
          }),
          description: joi.string().required().max(500).trim().messages({
            "string.base": "Açıklama alanı normal metin olmalıdır",
            "string.empty": "Açıklama alanı boş bırakılamaz",
            "string.required": "Açıklama alanı zorunludur",
            "string.max": "Açıklama alanı 500 karakterden fazla olamaz",
          }),
        })
        .validateAsync(req.body);
    } catch (error) {
      return res.status(500).json({
        message: error.details[0].message,
      });
    }
    next();
  };

  static update = async (req, res, next) => {
    try {
      await joi
        .object({
          title: joi.string().required().max(100).trim().messages({
            "string.base": "Başlık alanı normal metin olmalıdır",
            "string.empty": "Başlık alanı boş bırakılamaz",
            "string.required": "Başlık alanı zorunludur",
            "string.max": "Başlık alanı 100 karakterden fazla olamaz",
          }),
          description: joi.string().required().max(500).trim().messages({
            "string.base": "Açıklama alanı normal metin olmalıdır",
            "string.empty": "Açıklama alanı boş bırakılamaz",
            "string.required": "Açıklama alanı zorunludur",
            "string.max": "Açıklama alanı 500 karakterden fazla olamaz",
          }),
          id: joi.string(),
        })
        .validateAsync(req.body);
    } catch (error) {
      return res.status(500).json({
        message: error.details[0].message,
      });
    }
    next();
  };
}

module.exports = NoteValidation;
