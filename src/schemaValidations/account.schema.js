import z from 'zod';

const AccountSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    role: z.enum(["owner", "employee", "user"]),
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
    name: z.string().min(1, { message: 'Name is required' }),
    avatar: z
    .union([
      z.string().url("Avatar must be a valid URL").optional(),
      z
        .instanceof(File)
        .refine((file) => file.size <= 5 * 1024 * 1024, "File must be less than 5MB")
        .refine(
          (file) =>
            ["image/jpeg", "image/png", "image/webp", "image/gif"].includes(
              file.type
            ),
          "Only JPEG, PNG, WebP or GIF images are allowed"
        ),
    ])
    .optional(),
}).strict()

const UpdatePasswordBodySchema = z.object({
    oldPassword: z.string().min(6, 'Password must be at least 6 characters').max(100, 'Password must be less than 100 characters'),
    password: z.string().min(6, 'Password must be at least 6 characters').max(100, 'Password must be less than 100 characters'),
    confirmPassword: z.string().min(6, 'Password must be at least 6 characters').max(100, 'Password must be less than 100 characters'),
})
    .strict()
    .superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                code: 'custom',
                message: 'Passwords do not match',
                path: ['confirmPassword']
            })
        }
    })

const AccountIdParamSchema = z.object({
    id: z.coerce.number(),
})
    .strict()



export { AccountSchema, AccountListResponseSchema, AccountResponseSchema, AccountCreateBodySchema, AccountUpdateBodySchema, UpdatePasswordBodySchema };