import { celebrate, Joi, Segments } from 'celebrate'

export const getAnnouncementsValidator = celebrate({
  [Segments.QUERY]: Joi.object({
    search: Joi.string().optional(),
    sort: Joi.string().valid('newest', 'oldest').optional(),
    page: Joi.number().integer().min(1).optional(),
  }),
})

export const idValidator = celebrate({
  [Segments.PARAMS]: Joi.object({
    id: Joi.number().integer().required(),
  }),
})

const announcementSchema = {
  title: Joi.string().min(5).max(100),
  description: Joi.string().min(10),
  price: Joi.number().greater(0),
  category: Joi.string().valid('sale', 'service', 'job', 'other'),
  contactInfo: Joi.string().min(5),
}

export const createAnnouncementValidator = celebrate({
  [Segments.BODY]: Joi.object({
    title: announcementSchema.title.required(),
    description: announcementSchema.description.required(),
    price: announcementSchema.price.required(),
    category: announcementSchema.category.required(),
    contactInfo: announcementSchema.contactInfo.required(),
  }),
})

export const updateAnnouncementValidator = celebrate({
  [Segments.BODY]: Joi.object({
    title: announcementSchema.title,
    description: announcementSchema.description,
    price: announcementSchema.price,
    category: announcementSchema.category,
    contactInfo: announcementSchema.contactInfo,
  }).min(1),
})