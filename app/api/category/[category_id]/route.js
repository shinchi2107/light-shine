import { NextResponse } from "next/server";
import categoryApiRequest from "@/src/api/request/category";
import { cookies } from "next/headers";
import { AUTHENTICATION_ERROR_STATUS, HttpError } from "@/src/lib/http";
import { deleteCookies } from "@/src/lib/utils";

export async function GET(request, ctx) {
    const cookieStore = await cookies();
    const { category_id } = await ctx.params;
    try {
        const accessToken = cookieStore.get("accessToken")?.value;
        if (!accessToken) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const { payload } = await categoryApiRequest.sFindCategoryById({
            headers: { Authorization: `Bearer ${accessToken}` }
        }, category_id);
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

export async function PUT(request, ctx) {
    const body = await request.json();
    const cookieStore = await cookies();
    const { category_id } = await ctx.params;
    try {
        const accessToken = cookieStore.get("accessToken")?.value;
        if (!accessToken) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const { payload } = await categoryApiRequest.sUpdateCategoryById({
            headers: { Authorization: `Bearer ${accessToken}` }
        }, category_id, body);
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