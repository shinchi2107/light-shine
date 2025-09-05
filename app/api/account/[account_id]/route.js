import { NextResponse } from "next/server";
import accountApiRequest from "@/src/api/request/account";
import { cookies } from "next/headers";
import { AUTHENTICATION_ERROR_STATUS, HttpError } from "@/src/lib/http";
import { deleteCookies } from "@/src/lib/utils";

export async function GET(request, ctx) {
    const cookieStore = await cookies();
    const { account_id } = await ctx.params;
    try {
        const accessToken = cookieStore.get("accessToken")?.value;
        const refreshToken = cookieStore.get("refreshToken")?.value;
        if (!accessToken || !refreshToken) {
            return NextResponse.json({ isAuth: false }, { status: 200 });
        }
        const { payload } = await accountApiRequest.sFindAccountById({
            headers: { Authorization: `Bearer ${accessToken}` }
        }, account_id);
        return NextResponse.json(payload);
    } catch (error) {
        if (error.status == AUTHENTICATION_ERROR_STATUS) {
            deleteCookies(cookieStore);
            return NextResponse.redirect(new URL('/login', request.url))
        }
        if (error instanceof HttpError) {
            return NextResponse.json({ error: error.payload }, { status: error.status })
        }
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}