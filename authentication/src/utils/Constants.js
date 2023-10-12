export const ADMIN_ENUM = "admin"

export const PATIENT_ENUM = "patient"

export const DOCTOR_ENUM = "doctor"

export const USER_ARR_ENUM = [ADMIN_ENUM, PATIENT_ENUM, DOCTOR_ENUM]

export const DUPLICATE_KEY_ERROR_CODE = 11000;

export const ONE_DAY_MAX_AGE_IN_MIINUTS = 24 * 60 * 60;

export const ONE_DAY_MAX_AGE_IN_MILLEMIINUTS = 1000 * 24 * 60 * 60;

export const BAD_REQUEST_CODE_400 = 400;

export const OK_REQUEST_CODE_200 = 200;

export const PATIENT_SIGNUP_URL = "http://localhost:8002/signup"

export const ADMIN_SIGNUP_URL = "http://localhost:8001/add-admin"

export const DOCOTOR_SIGNUP_URL = "http://localhost:8001/add-doctor-req"

export const DUB_EMAIL_ERROR_MESSAGE = `that email is already registered`

export const DUB_USERNAME_ERROR_MESSAGE = `that username is already registered`

export const PORT = 8004;
