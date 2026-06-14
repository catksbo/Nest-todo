import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import 'dotenv/config';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const USER_1_ID = '7baf2dc7-ea3c-4ed0-9d2d-246168540e32';
const USER_2_ID = '92b60a3d-01a7-4ad2-968a-7442a4cfb820';
const USER_3_ID = '4635d7e1-79dc-43be-a9ca-5738d30492d0';

async function main() {

  await prisma.todoListItem.createMany({
    data: [
      // User 1
      { title: 'Buy groceries', userId: USER_1_ID },
      { title: 'Finish NestJS auth module', userId: USER_1_ID },
      { title: 'Read Prisma documentation', userId: USER_1_ID },

      // User 2
      { title: 'Go for a 30 minute walk', userId: USER_2_ID },
      { title: 'Prepare weekly report', userId: USER_2_ID },
      { title: 'Reply to emails', userId: USER_2_ID },

      // User 3
      { title: 'Book dentist appointment', userId: USER_3_ID },
      { title: 'Clean workspace', userId: USER_3_ID },
      { title: 'Plan weekend trip', userId: USER_3_ID },
    ],
  });

  console.log('Seed completed');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });