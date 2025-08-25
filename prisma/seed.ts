import { PrismaClient } from "../generated/prisma";

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
      role: "admin",
      status: "active",
      document: "123.456.789-00",
      phone1: "+55 11 99999-9999",
      profession: "Administrador",
      birthDate: "01/01/1980",
      maritalStatus: "Casado",
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
      role: "building_manager",
      status: "active",
      document: "987.654.321-00",
      phone1: "+55 11 88888-8888",
      profession: "Engenheiro",
      birthDate: "15/05/1975",
      maritalStatus: "Casado",
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
      role: "counselor",
      status: "active",
      document: "456.789.123-00",
      phone1: "+55 11 77777-7777",
      profession: "Advogada",
      birthDate: "20/08/1982",
      maritalStatus: "Solteira",
    },
  });

  const counselor2 = await prisma.user.upsert({
    where: { email: "conselheiro2@condopay.com" },
    update: {},
    create: {
      name: "Pedro Oliveira",
      email: "conselheiro2@condopay.com",
      password: "conselheiro123", // Em produção, isso deve ser hasheado
      role: "counselor",
      status: "active",
      document: "789.123.456-00",
      phone1: "+55 11 66666-6666",
      profession: "Contador",
      birthDate: "10/12/1978",
      maritalStatus: "Casado",
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
      role: "resident",
      status: "active",
      document: "321.654.987-00",
      phone1: "+55 11 55555-5555",
      profession: "Professora",
      birthDate: "25/03/1985",
      maritalStatus: "Casada",
    },
  });

  const resident2 = await prisma.user.upsert({
    where: { email: "morador2@condopay.com" },
    update: {},
    create: {
      name: "Carlos Ferreira",
      email: "morador2@condopay.com",
      password: "morador123", // Em produção, isso deve ser hasheado
      role: "resident",
      status: "active",
      document: "654.987.321-00",
      phone1: "+55 11 44444-4444",
      profession: "Médico",
      birthDate: "08/07/1979",
      maritalStatus: "Divorciado",
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
