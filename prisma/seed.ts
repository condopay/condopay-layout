import { MaritalStatus, PrismaClient, Role, Status } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin users
  const admin = await prisma.user.upsert({
    where: { email: "admin@condopay.com" },
    update: {},
    create: {
      name: "Administrador CondoPay",
      email: "admin@condopay.com",
      password: "admin123", // Em produção, isso deve ser hasheado
      role: Role.ADMIN,
      status: Status.ACTIVE,
      document: "123.456.789-00",
      phone1: "+55 11 99999-9999",
      profession: "Administrador",
      birth_date: new Date("1980-01-01"),
      marital_status: MaritalStatus.MARRIED,
    },
  });

  // Create building manager
  const buildingManager = await prisma.user.upsert({
    where: { email: "sindico@condopay.com" },
    update: {},
    create: {
      name: "João Silva",
      email: "sindico@condopay.com",
      password: "sindico123", // Em produção, isso deve ser hasheado
      role: Role.BUILDING_MANAGER,
      status: Status.ACTIVE,
      document: "987.654.321-00",
      phone1: "+55 11 88888-8888",
      profession: "Engenheiro",
      birth_date: new Date("1975-05-15"),
      marital_status: MaritalStatus.MARRIED,
    },
  });

  // Create counselors
  const counselor1 = await prisma.user.upsert({
    where: { email: "conselheiro1@condopay.com" },
    update: {},
    create: {
      name: "Maria Santos",
      email: "conselheiro1@condopay.com",
      password: "conselheiro123", // Em produção, isso deve ser hasheado
      role: Role.COUNSELOR,
      status: Status.ACTIVE,
      document: "456.789.123-00",
      phone1: "+55 11 77777-7777",
      profession: "Advogada",
      birth_date: new Date("1982-08-20"),
      marital_status: MaritalStatus.SINGLE,
    },
  });

  const counselor2 = await prisma.user.upsert({
    where: { email: "conselheiro2@condopay.com" },
    update: {},
    create: {
      name: "Pedro Oliveira",
      email: "conselheiro2@condopay.com",
      password: "conselheiro123", // Em produção, isso deve ser hasheado
      role: Role.COUNSELOR,
      status: Status.ACTIVE,
      document: "789.123.456-00",
      phone1: "+55 11 66666-6666",
      profession: "Contador",
      birth_date: new Date("1978-12-10"),
      marital_status: MaritalStatus.MARRIED,
    },
  });

  // Create residents
  const resident1 = await prisma.user.upsert({
    where: { email: "morador1@condopay.com" },
    update: {},
    create: {
      name: "Ana Costa",
      email: "morador1@condopay.com",
      password: "morador123", // Em produção, isso deve ser hasheado
      role: Role.RESIDENT,
      status: Status.ACTIVE,
      document: "321.654.987-00",
      phone1: "+55 11 55555-5555",
      profession: "Professora",
      birth_date: new Date("1985-03-25"),
      marital_status: MaritalStatus.MARRIED,
    },
  });

  const resident2 = await prisma.user.upsert({
    where: { email: "morador2@condopay.com" },
    update: {},
    create: {
      name: "Carlos Ferreira",
      email: "morador2@condopay.com",
      password: "morador123", // Em produção, isso deve ser hasheado
      role: Role.RESIDENT,
      status: Status.ACTIVE,
      document: "654.987.321-00",
      phone1: "+55 11 44444-4444",
      profession: "Médico",
      birth_date: new Date("1979-07-08"),
      marital_status: MaritalStatus.DIVORCED,
    },
  });

  console.log("✅ Database seeded successfully!");
  console.log("Created users:", {
    admin: admin.email,
    buildingManager: buildingManager.email,
    counselor1: counselor1.email,
    counselor2: counselor2.email,
    resident1: resident1.email,
    resident2: resident2.email,
  });
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
