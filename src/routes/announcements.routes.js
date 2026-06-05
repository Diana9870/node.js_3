import { Router } from 'express'

import {
  getAnnouncements,
  getAnnouncementById,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from '../controllers/announcements.controller.js'

import {
  getAnnouncementsValidator,
  createAnnouncementValidator,
  updateAnnouncementValidator,
  idValidator,
} from '../validators/announcements.validator.js'

const router = Router()

/**
 * @swagger
 * /announcements:
 *   get:
 *     summary: Get announcements list
 *     tags: [Announcements]
 */
router.get(
  '/',
  getAnnouncementsValidator,
  getAnnouncements,
)

/**
 * @swagger
 * /announcements/{id}:
 *   get:
 *     summary: Get announcement by id
 *     tags: [Announcements]
 */
router.get(
  '/:id',
  idValidator,
  getAnnouncementById,
)

/**
 * @swagger
 * /announcements:
 *   post:
 *     summary: Create announcement
 *     tags: [Announcements]
 */
router.post(
  '/',
  createAnnouncementValidator,
  createAnnouncement,
)

/**
 * @swagger
 * /announcements/{id}:
 *   patch:
 *     summary: Update announcement
 *     tags: [Announcements]
 */
router.patch(
  '/:id',
  idValidator,
  updateAnnouncementValidator,
  updateAnnouncement,
)

/**
 * @swagger
 * /announcements/{id}:
 *   delete:
 *     summary: Delete announcement
 *     tags: [Announcements]
 */
router.delete(
  '/:id',
  idValidator,
  deleteAnnouncement,
)

export default router