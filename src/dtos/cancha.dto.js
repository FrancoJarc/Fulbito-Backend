import Joi from "joi";

export const canchaDto = Joi.object({
    nombre: Joi.string().min(2).required(),
    telefono: Joi.number().integer().required(), 
    capacidad: Joi.number().integer().positive().required(), 
    precio_hora: Joi.number().positive().required(),
    calle: Joi.string().min(2).required(), 
    
})

// se podria crear el de usuario tmb