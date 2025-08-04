import z from "zod";

const envSchema = z.object({
    NEXT_PUBLIC_API_URL: z.string(),
    NEXT_PUBLIC_URL: z.string(),
});

const configParse = envSchema.safeParse(
    {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    }
);
if(!configParse.success) {
    console.error(configParse.error.format());
    throw new Error("Invalid environment variables");
}

const envConfig = configParse.data;

export default envConfig;
