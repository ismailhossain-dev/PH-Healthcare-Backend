import { Role } from "../../generated/prisma/enums";
import config from "../config";
import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";
export const isSupperAdmin = async () => {
  try {
    const isSupperAdminExist = await prisma.user.findFirst({
      where: {
        role: Role.SUPER_ADMIN,
      },
    });

    if (isSupperAdminExist) {
      console.log("Super Admin Already Exist");
      return;
    }
    const name = config.super_amdin_name;
    const email= config.super_admin_email;
    const password =config.super_amdin_password;

    if(!name || !email || !password ) {
        console.log("Super Admin Name , Email, Password Missing In Env File !!")
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
