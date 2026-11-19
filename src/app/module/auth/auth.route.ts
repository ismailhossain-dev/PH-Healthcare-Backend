import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/checkAuth";
import { AuthController } from "./auth.controller";

import { Router } from "express";
import { validationRequest } from "../../middleware/ValidateRequest";
import { UserValidation } from "./auth.validation";

const router = Router();

router.post(
  "/register",
  validationRequest(UserValidation.patientRegistrationZodSchema),
  AuthController.registerPatient,
);

router.post(
  "/login",
  validationRequest(UserValidation.loginZodSchema),
  AuthController.loginUser,
);

// auth er por zod validation higher order ta call korbo karone role na match korle validation kore ki lab
router.get(
  "/me",
  auth(Role.ADMIN, Role.DOCTOR, Role.PATIENT, Role.SUPER_ADMIN),
  AuthController.getMe,
);
router.post("/refresh-token", AuthController.refreshToken);
router.post("/google", AuthController.googleLogin);
export const AuthRoutes = router;
