import z from "zod";

const envSchema = z.object({
    NEXT_PUBLIC_API_ENDPOINT: z.string(),
    NEXT_PUBLIC_URL: z.string(),
});

const configParse = envSchema.safeParse(
    {
        NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
        NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    }
);
if(!configParse.success) {
    console.error(configParse.error.format());
    throw new Error("Invalid environment variables");
}

const envConfig = configParse.data;

export const defaultLocale = 'en'

export default envConfig;
