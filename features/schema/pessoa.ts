const Joi = require('joi')
const { object, string, date, number, array } = Joi.types()

export const pessoaResponseSchema = Joi.object({
    _id: Joi.string().required(),
    nome: Joi.string().required(),
    telefone: Joi.string().allow(null),
    email: Joi.string().allow(null),
    createdAt: Joi.date().required(),
    updatedAt: Joi.date().allow(null).required(),
    __v: Joi.number().required()
})

export const pessoasResponseSchema = Joi.array().items(
    pessoaResponseSchema
)