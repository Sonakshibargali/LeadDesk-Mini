import prisma from '../config/db.js';

// Create a new Lead
export const createLead = async (req, res, next) => {
  try {
    const { name, email, budget, message } = req.body;
    
    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        budget,
        message,
        status: 'NEW' // Default state
      }
    });

    res.status(201).json({
      success: true,
      message: 'Lead registered successfully',
      data: lead
    });
  } catch (error) {
    next(error);
  }
};

// Retrieve leads (filter by status, search by name/email)
export const getLeads = async (req, res, next) => {
  try {
    const { search, status } = req.query;

    const queryConditions = {};

    // Filter by Status if provided
    if (status && ['NEW', 'CONTACTED', 'CLOSED'].includes(status)) {
      queryConditions.status = status;
    }

    // Search by name or email
    if (search) {
      queryConditions.OR = [
        {
          name: {
            contains: search
          }
        },
        {
          email: {
            contains: search
          }
        }
      ];
    }

    const leads = await prisma.lead.findMany({
      where: queryConditions,
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.status(200).json({
      success: true,
      count: leads.length,
      data: leads
    });
  } catch (error) {
    next(error);
  }
};

// Update status of a Lead
export const updateLeadStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedLead = await prisma.lead.update({
      where: { id },
      data: { status }
    });

    res.status(200).json({
      success: true,
      message: `Lead status updated to ${status}`,
      data: updatedLead
    });
  } catch (error) {
    next(error);
  }
};
