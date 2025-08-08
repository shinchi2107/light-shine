import z from 'zod';

const LoginBodySchema = z.object({
    email: z.string().min(1, { message: 'Email is required' }).email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters').max(30, 'Password must be less than 30 characters')
})
    .strict()

const RegisterBodySchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().min(1, { message: 'Email is required' }).email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters').max(30, 'Password must be less than 30 characters'),
    confirmPassword: z.string()
})
    .strict()
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword']
    })

const LoginResponseSchema = z.object({
    data: z.object({
        accessToken: z.string(),
        refreshToken: z.string(),
    }),
    message: z.string()
})

const RefreshTokenBodySchema = z
    .object({
        refreshToken: z.string()
    })
    .strict()

const RefreshTokenResponseSchema = z.object({
    data: z.object({
        accessToken: z.string(),
        refreshToken: z.string()
    }),
    message: z.string()
})

const LogoutBodySchema = z
    .object({
        refreshToken: z.string()
    })
    .strict()

const LoginGoogleQuery = z.object({
    code: z.string()
})

export { LoginBodySchema, LoginResponseSchema, RefreshTokenBodySchema, RefreshTokenResponseSchema, LogoutBodySchema, LoginGoogleQuery, RegisterBodySchema };