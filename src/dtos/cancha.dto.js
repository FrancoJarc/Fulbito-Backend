import Joi from "joi";

export const canchaDto = Joi.object({
    nombre: Joi.string().min(2).required(),
    precio: Joi.number().positive().required(),
    capacidad: Joi.number().integer().positive().required(), 
    calle: Joi.string().min(2).required(), 
    telefono: Joi.string().min(8).max(14).required(), 
    
})
