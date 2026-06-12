import createHttpError from 'http-errors'

import prisma from '../../prisma/client.js'

export async function getAnnouncements(req, res) {
  const announcements =
    await prisma.announcement.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

  res.json(announcements)
}

export async function getAnnouncementById(req, res) {
  const announcement =
    await prisma.announcement.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            name: true,
          },
        },
      },
    })

  if (!announcement) {
    throw createHttpError(
      404,
      'Announcement not found'
    )
  }

  res.json(announcement)
}

export async function createAnnouncement(req, res) {
  const announcement =
    await prisma.announcement.create({
      data: {
        ...req.body,
        userId: req.user.id,
      },
    })

  res.status(201).json(announcement)
}

export async function updateAnnouncement(req, res) {
  const id = Number(req.params.id)

  const announcement =
    await prisma.announcement.findUnique({
      where: { id },
    })

  if (!announcement) {
    throw createHttpError(
      404,
      'Announcement not found'
    )
  }

  if (announcement.userId !== req.user.id) {
    throw createHttpError(
      403,
      'Access denied'
    )
  }

  const updatedAnnouncement =
    await prisma.announcement.update({
      where: { id },
      data: req.body,
    })

  res.json(updatedAnnouncement)
}

export async function deleteAnnouncement(req, res) {
  const id = Number(req.params.id)

  const announcement =
    await prisma.announcement.findUnique({
      where: { id },
    })

  if (!announcement) {
    throw createHttpError(
      404,
      'Announcement not found'
    )
  }

  if (announcement.userId !== req.user.id) {
    throw createHttpError(
      403,
      'Access denied'
    )
  }

  await prisma.announcement.delete({
    where: { id },
  })

  res.json({
    message:
      'Announcement deleted successfully',
  })
}