import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import accountApiRequest from "@/src/api/request/account";
import { deleteCookies } from "@/src/lib/utils";
import { AUTHENTICATION_ERROR_STATUS } from "@/src/lib/http";
export async function PUT(request) {
    const body = await request.json();
    const cookieStore = await cookies();

    try {
        const accessToken = cookieStore.get("accessToken")?.value;
        if (!accessToken) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const { payload } = await accountApiRequest.sUpdateAccountPassword(body, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });
        return NextResponse.json(payload);
    } catch (error) {
        if (error.status == AUTHENTICATION_ERROR_STATUS) {
            deleteCookies(cookieStore);
            return NextResponse.redirect(new URL('/login', request.url))
        }
        if (error instanceof HttpError) {
            return Response.json({ error: error.payload }, { status: error.status })
        }
        return Response.json({ error: error.message }, { status: 500 })
    }
}