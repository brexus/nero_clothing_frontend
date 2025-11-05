import { z } from "zod";
import {
    CITY_REGEX,
    STREET_REGEX,
    ZIP_CODE_REGEX,
    BUILDING_REGEX,
    APARTMENT_REGEX,
    NAME_REGEX,
    PHONE_NUMBER_REGEX
} from "@/validation/regex";

export const loginSchema = z.object({
    email: z.string()
        .min(5, { message: "Email must contain at least 5 characters." })
        .max(50, { message: "Email can contain maximum 50 characters." })
        .email({ message: "Enter a valid email address." }),

    password: z.string()
        .min(6, { message: "Password must contain at least 6 characters." })
        .max(32, { message: "Password can contain maximum 32 characters." })
});

export const registerSchema = z.object({
    email: z.string()
        .min(5, {message: "Email must contain at least 5 characters."})
        .max(50, {message: "Email can contain maximum 50 characters."})
        .email({message: "Enter a valid e-mail address."})
        .trim(),

    password: z.string()
        .min(6, {message: "Password must contain at least 6 characters."})
        .max(32, {message: "Password can contain maximum 32 characters."})
        .trim(),

    firstName: z.string()
        .min(2, {message: "First name must contain at least 2 characters."})
        .max(30, {message: "First name can contain maximum 30 characters."})
        .regex(NAME_REGEX, {message: "First name can only contain letters."})
        .trim(),

    lastName: z.string()
        .min(2, {message: "Last name must contain at least 2 characters."})
        .max(30, {message: "Last name can contain maximum 30 characters."})
        .regex(NAME_REGEX, {message: "Last name can only contain letters."})
        .trim(),

    phoneNumber: z.string()
        .regex(PHONE_NUMBER_REGEX, {message: "Enter a valid phone number."})
        .min(9, {message: "Phone number must contain at least 9 digits."})
        .max(15, {message: "Phone number can contain maximum 15 digits."})
        .trim(),
});

export const orderSchema = (isAuthenticated: boolean) =>
    z.object({
        email: isAuthenticated
            ? z.string().optional()
            : z.string()
                .min(5, { message: "Email must contain at least 5 characters." })
                .max(50, { message: "Email can contain maximum 50 characters." })
                .email({message: "Enter a valid email address."})
                .trim(),

        phoneNumber: z.string()
            .regex(PHONE_NUMBER_REGEX, {message: "Enter a valid phone number."})
            .min(9, {message: "Phone number must contain at least 9 digits."})
            .max(15, {message: "Phone number can contain maximum 15 digits."})
            .trim(),

        firstName: z.string()
            .min(2, {message: "First name must contain at least 2 characters."})
            .max(30, {message: "First name can contain maximum 30 characters."})
            .regex(NAME_REGEX, {message: "First name can only contain letters."})
            .trim(),

        lastName: z.string()
            .min(2, {message: "Last name must contain at least 2 characters."})
            .max(30, {message: "Last name can contain maximum 30 characters."})
            .regex(NAME_REGEX, {message: "Last name can only contain letters."})
            .trim(),

        street: z.string()
            .max(100, {message: "Street can contain maximum 100 characters."})
            .regex(STREET_REGEX, {message: "Street name contains invalid characters."})
            .trim(),

        building: z.string()
            .max(6, {message: "Building number can contain maximum 6 characters."})
            .regex(BUILDING_REGEX, {message: "Enter a valid building number (e.g. 12A, 10/2)."})
            .trim(),

        apartment: z.string()
            .max(5, {message: "Apartment number can contain maximum 5 characters."})
            .regex(APARTMENT_REGEX, {message: "Apartment number can contain only digits."})
            .optional()
            .or(z.literal("")),

        zipCode: z.string()
            .regex(ZIP_CODE_REGEX, {message: "Enter a valid zip code format (e.g. 00-123)."}),

        city: z.string()
            .max(80, {message: "City name can contain maximum 80 characters."})
            .regex(CITY_REGEX, {message: "City can contain only letters and spaces."})
            .trim(),

        country: z.string(),

        paymentMethod: z.string()
            .min(1, {message: "Payment method is required."}),

        terms: z.boolean()
            .refine((val) => val === true, {message: "You must accept the terms & conditions."}),
    });
