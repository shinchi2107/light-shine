import z from 'zod';

const AccountSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    role: z.enum([Role.Owner, Role.Employee]),
    avatar: z.string().nullable(),
    status: z.enum(['active', 'inactive']),
})

const AccountListResponseSchema = z.object({
    data: z.array(AccountSchema),
    message: z.string()
})

const AccountResponseSchema = z.object({
    data: AccountSchema,
    message: z.string()
})
    .strict()

const AccountCreateBodySchema = z.object({
    name: z.string().min(1, { message: 'required' }),
    email: z.string().min(1, { message: 'required' }).email('invalid email'),
    password: z.string().min(6, 'minmax password').max(100, 'minmax password'),
    avatar: z.string().nullable(),
    confirmPassword: z.string().min(6, 'minmax password').max(100, 'minmax password'),
})
    .strict()
    .superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                code: 'custom',
                message: 'Password not match',
                path: ['confirmPassword']
            })
        }
    })

const AccountUpdateBodySchema = z.object({
    name: z.string().min(1, { message: 'required' }),
    email: z.string().min(1, { message: 'required' }).email('invalid email'),
    avatar: z.string().nullable(),
    status: z.enum(['active', 'inactive']),
})
    .strict()

const UpdatePasswordBodySchema = z.object({
    oldPassword: z.string().min(6, 'minmax password').max(100, 'minmax password'),
    password: z.string().min(6, 'minmax password').max(100, 'minmax password'),
    confirmPassword: z.string().min(6, 'minmax password').max(100, 'minmax password'),
})
    .strict()
    .superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                code: 'custom',
                message: 'Password not match',
                path: ['confirmPassword']
            })
        }
    })

const AccountIdParamSchema = z.object({
    id: z.coerce.number(),
})
    .strict()



export { AccountSchema, AccountListResponseSchema, AccountResponseSchema, AccountCreateBodySchema, AccountUpdateBodySchema, UpdatePasswordBodySchema };