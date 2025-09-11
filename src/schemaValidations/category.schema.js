import z from "zod";

const CategoryCreateBodySchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    description: z.string().optional(),
    image: z.string().optional(),
})
    .strict()

const CategoryUpdateBodySchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    description: z.string().optional(),
    image: z
    .union([
        z.string().url("Image must be a valid URL").optional(),
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
})
    .strict()

export { CategoryCreateBodySchema, CategoryUpdateBodySchema };