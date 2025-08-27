import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import authApiRequest from "@/src/api/request/auth";
import jwt from "jsonwebtoken";
import { HttpError } from "@/src/lib/http";

export async function GET(request) {
    const cookieStore = await cookies();
    const searchParams = request.nextUrl.searchParams
    try {
        const force = searchParams.get("force");
        const accessToken = cookieStore.get("accessToken")?.value;
        const refreshToken = cookieStore.get("refreshToken")?.value;
        if (!force && accessToken && refreshToken) {
            return NextResponse.json({
                status: 200,
                data: {
                    accessToken, refreshToken
                }
            });
        }
        if (!refreshToken) {
            cookieStore.delete("accessToken");
            return NextResponse.redirect(new URL("/login", request.url));
        }
        const { payload } = await authApiRequest.sRefreshToken({ token: refreshToken });
        console.log(payload);
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = payload.data;
        const decodedAccessToken = jwt.decode(newAccessToken);
        const decodedRefreshToken = jwt.decode(newRefreshToken);
        cookieStore.set("accessToken", accessToken, {
            path: "/",
            httpOnly: true,
            sameSite: "lax",
            expires: decodedAccessToken.exp * 1000,
        });

        cookieStore.set("refreshToken", newRefreshToken, {
            path: "/",
            httpOnly: true,
            sameSite: "lax",
            expires: decodedRefreshToken.exp * 1000, // based on the old refresh token’s expiration time
        });
        return NextResponse.json(payload);

    } catch (error) {
        console.log(JSON.stringify(error));
        if (error instanceof HttpError) {
            return Response.json({ error: error.payload }, { status: error.status })
        }
        return Response.json({ error: error.message }, { status: 500 })
    }
}