import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(request) {
  if (
    !request.cookies.has("access_token") &&
    request.cookies.get("access_token") === undefined
  ) {
    const response = NextResponse.next();
    const reftoken = process.env.SELF_REFRESH_TOKEN ?? "";
    const resData = await fetch(`https://accounts.zoho.in/oauth/v2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        client_id: process.env.SELF_CLIENT_ID ?? "",
        client_secret: process.env.SELF_CLIENT_SECRET ?? "",
        redirect_uri: "http://localhost:3000/zohonewauth",
        refresh_token: reftoken,
      }),
    });
    const data = await resData.json();
    const auth_token = JSON.stringify(data.access_token);
    const oneday = new Date(Number(new Date()) + 3600000);
    response.cookies.set("access_token", auth_token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      expires: oneday,
    });
    return response;
  }
}
