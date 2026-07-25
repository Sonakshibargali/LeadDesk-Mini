import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@leaddesk.co';
  const plainPassword = 'admin123';

  console.log('[Seed] Checking for existing admin account...');

  try {
    const existingAdmin = await prisma.admin.findUnique({
      where: { email }
    });

    if (existingAdmin) {
      console.log(`[Seed] Default admin account already exists: ${email}`);
      return;
    }

    console.log(`[Seed] Creating default admin: ${email}...`);
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const admin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword
      }
    });

    console.log(`[Seed] Successfully seeded default admin: ${admin.email}`);
  } catch (error) {
    console.error('[Seed] Seeding failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
