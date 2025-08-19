import authApiRequest from "@/src/api/request/auth";
import { cookies } from "next/headers"
import { AUTHENTICATION_ERROR_STATUS, HttpError } from "@/src/lib/http";
import { deleteCookies } from "@/src/lib/utils";


export async function POST(request) {
    const body = await request.json()
    const cookieStore = await cookies();

    try {
        const accessToken = cookieStore.get("accessToken")?.value;
        const refreshToken = cookieStore.get("refreshToken")?.value;
        if (body?.isInvalidToken || !accessToken || !refreshToken) {
            deleteCookies(cookieStore)
            return Response.json({ error: "Unauthorized" }, { status: 401 })
        }
        body.refreshToken = refreshToken;
        const { payload } = await authApiRequest.sLogout(body, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });
        deleteCookies(cookieStore)
        return Response.json(payload)
    }
    catch (error) {
        if (error.status == AUTHENTICATION_ERROR_STATUS) {
            deleteCookies(cookieStore);
            return NextResponse.redirect(new URL('/login', request.url))
        }
        if (error instanceof HttpError) {
            return Response.json({ error: error.payload }, { status: error.status })
        }
        return Response.json({ error: error.message }, { status: 500 })
    }
    finally {
        deleteCookies(cookieStore)
    }
}