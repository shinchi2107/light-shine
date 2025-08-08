import authApiRequest from "@/src/api/request/auth";
import { cookies } from "next/headers"
import jwt from "jsonwebtoken";
import { HttpError } from "@/src/lib/http";

export async function POST(request) {
    try {

        const body = await request.json()
        const cookieStore = await cookies();
        const { payload } = await authApiRequest.sLogin(body);
        if (payload.errors) {
            return Response.json(payload)
        }

        const { accessToken, refreshToken } = payload.data;
        const decodedAccessToken = jwt.decode(accessToken);
        const decodedRefreshToken = jwt.decode(refreshToken);
        cookieStore.set("accessToken", accessToken, {
            path: "/",
            httpOnly: true,
            sameSite: "lax",
            secure: true,
            expires: decodedAccessToken.exp * 1000,
        });

        cookieStore.set("refreshToken", refreshToken, {
            path: "/",
            httpOnly: true,
            sameSite: "lax",
            secure: true,
            expires: decodedRefreshToken.exp * 1000,
        });

        return Response.json(payload)
    }
    catch (error) {
        if (error instanceof HttpError) {
            return Response.json({ error: error.payload }, { status: error.status })
        }
        return Response.json({ error: error.message }, { status: 500 })
    }
}