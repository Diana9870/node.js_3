import prisma from '../../prisma/client.js'

const PER_PAGE = 10

export async function getAnnouncements(req, res) {
  const { search, sort, page = 1 } = req.query

  const currentPage = Number(page)

  const where = {}

  if (search?.trim()) {
    where.title = {
      contains: search,
      mode: 'insensitive',
    }
  }

  const orderBy = {
    createdAt: sort === 'oldest' ? 'asc' : 'desc',
  }

  const [data, total] = await Promise.all([
    prisma.announcement.findMany({
      where,
      orderBy,
      skip: (currentPage - 1) * PER_PAGE,
      take: PER_PAGE,
    }),

    prisma.announcement.count({ where }),
  ])

  res.json({
    data,
    pagination: {
      total,
      page: currentPage,
      totalPages: Math.ceil(total / PER_PAGE),
      perPage: PER_PAGE,
    },
  })
}

export async function getAnnouncementById(req, res) {
  const announcement = await prisma.announcement.findUniqueOrThrow({
    where: {
      id: Number(req.params.id),
    },
  })

  res.json(announcement)
}

export async function createAnnouncement(req, res) {
  const announcement = await prisma.announcement.create({
    data: req.body,
  })

  res.status(201).json(announcement)
}

export async function updateAnnouncement(req, res) {
  const announcement = await prisma.announcement.update({
    where: {
      id: Number(req.params.id),
    },
    data: req.body,
  })

  res.json(announcement)
}

export async function deleteAnnouncement(req, res) {
  await prisma.announcement.delete({
    where: {
      id: Number(req.params.id),
    },
  })

  res.status(204).end()
}