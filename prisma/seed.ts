import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
async function main() {
  // Create a new user
  const hashedPassword = await bcrypt.hash("password", 10);
  const user = await prisma.user.create({
    data: {
      username: "admin",
      email: "admin@eamail.com",
      password: hashedPassword,
      profile: {
        create: {
          fullname: "Mushawiruddin",
          nickname: "Admin",
          phone: "1234567890",
          type: "admin",
        },
      },
    },
  });

  console.log(user);
}

main()
  .then(async () => {
    console.log("Seed complete");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
