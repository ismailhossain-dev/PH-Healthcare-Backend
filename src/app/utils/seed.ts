import { Role } from "../../generated/prisma/enums";
import config from "../config";
import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";
export const seedSupperAdmin = async () => {
  try {
    const isSupperAdminExist = await prisma.user.findUnique({
      where: {
        email: config.super_admin_email,
      },
    });

    if (isSupperAdminExist) {
      console.log("Super Admin Already Exist");
      return;
    }
    const name = config.super_amdin_name;
    const email = config.super_admin_email;
    const password = config.super_amdin_password;

    if (!name || !email || !password) {
      console.log("Super Admin Name , Email, Password Missing In Env File !!");
    }

    const hashPassword = await bcrypt.hash(
      password,
      Number(config.bcrypt_salt_rounds),
    );

    const superadmin = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        role: Role.SUPER_ADMIN,
        needPasswordChange: false,
        emailVerified: true,
      },
    });

    console.log("Super Admin Created", superadmin);
  } catch (error) {
    console.log("Error Seeding Super Admin : ", error);
    //if any error sentding supper admin so delete super admin
    await prisma.user.delete({
      where: {
        email: config.super_admin_email,
      },
    });
  }
};

export const seedTesterAdmin = async () => {
  try {
    const isTesterAdminExist = await prisma.user.findUnique({
      where: {
        email: config.tester_admin_email,
      },
    });

    if (isTesterAdminExist) {
      console.log("Tester Admin Already Exist");
      return;
    }

    const name = config.tester_admin_name;
    const email = config.tester_admin_email;
    const password = config.tester_admin_password;

    if (!name || !email || !password) {
      console.log("Tester Admin Name , Email, Password Missing In Env File !!");
    }

    const hashPassword = await bcrypt.hash(
      password,
      Number(config.bcrypt_salt_rounds),
    );

    const testerAdmin = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        role: Role.ADMIN,
        needPasswordChange: false,
        emailVerified: true,
      },
    });

    console.log("Tester Admin Created", testerAdmin);
  } catch (error) {
    console.log("Error Seeding Tester Admin : ", error);

    await prisma.user.delete({
      where: {
        email: config.tester_admin_email,
      },
    });
  }
};

export const seedTesterDoctor = async () => {
  try {
    const isTesterDoctorExist = await prisma.user.findUnique({
      where: {
        email: config.tester_doctor_email,
      },
    });

    if (isTesterDoctorExist) {
      console.log("Tester Doctor Already Exist");
      return;
    }

    const name = config.tester_doctor_name;
    const email = config.tester_doctor_email;
    const password = config.tester_doctor_password;

    if (!name || !email || !password) {
      console.log(
        "Tester Doctor Name , Email , Password Missing In Env File !!",
      );
    }

    const hashPassword = await bcrypt.hash(
      password,
      Number(config.bcrypt_salt_rounds),
    );

    const testerDoctor = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        role: Role.DOCTOR,
        needPasswordChange: false,
        emailVerified: true,
      },
    });

    console.log("Tester Doctor Created: ", testerDoctor);
  } catch (error) {
    console.log("Error Sedning Tester Doctor : ", error);
  }
};
