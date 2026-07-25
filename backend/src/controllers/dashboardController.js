import prisma from '../config/db.js';

// Retrieve Lead statistics
export const getStats = async (req, res, next) => {
  try {
    const [total, newCount, contactedCount, closedCount] = await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({ where: { status: 'NEW' } }),
      prisma.lead.count({ where: { status: 'CONTACTED' } }),
      prisma.lead.count({ where: { status: 'CLOSED' } })
    ]);

    res.status(200).json({
      success: true,
      data: {
        total,
        new: newCount,
        contacted: contactedCount,
        closed: closedCount
      }
    });
  } catch (error) {
    next(error);
  }
};
