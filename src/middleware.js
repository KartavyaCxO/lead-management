import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(request) {
  const clientid = process.env.SELF_CLIENT_ID ?? "";
  const clientsecret = process.env.SELF_CLIENT_SECRET ?? "";

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const code = request.nextUrl.searchParams.get("code");
    if (!code) {
      return NextResponse.next();
    }
    const response = NextResponse.next({
      request: { headers: new Headers(request.headers) },
    });
    const resData = await fetch("https://accounts.zoho.in/oauth/v2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: clientid,
        client_secret: clientsecret,
        redirect_uri: "http://localhost:3000/dashboard",
        code: code,
      }),
    });

    const data = await resData.json();
    const auth_token = JSON.stringify(data.access_token);
    const refresh_token = JSON.stringify(data.refresh_token);
    console.log(JSON.stringify(data));
    const oneday = new Date(Number(new Date()) + 3600000);
    const oneyear = new Date(Number(new Date()) + 31536000000);
    response.cookies.set("auth_token", auth_token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      expires: oneday,
    });
    response.cookies.set("refresh_token", refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      expires: oneyear,
    });
    return response;
  }
  if (
    request.cookies.has("next-auth.session-token") &&
    request.cookies.get("next-auth.session-token")?.value
  ) {
    if (
      !request.cookies.has("refresh_token") &&
      !request.cookies.get("refresh_token")?.value
    ) {
      return NextResponse.redirect(
        "https://accounts.zoho.com/oauth/v2/auth?scope=ZohoCRM.settings.related_lists.ALL,ZohoCRM.settings.fields.ALL,ZohoCRM.modules.ALL,ZohoCRM.settings.fields.ALL&client_id=1000.X36NDOLRIIGO3CFYUQ8Q97PPFEI9RZ&response_type=code&access_type=offline&redirect_uri=http://localhost:3000/dashboard&prompt=consent"
      );
    }
    if (
      request.cookies.has("refresh_token") &&
      !request.cookies.has("auth_token")
    ) {
      const response = NextResponse.next({
        request: { headers: new Headers(request.headers) },
      });
      const refresh_token = request.cookies.get("refresh_token")?.value;
      const parsed_refresh_token = JSON.parse(refresh_token);
      const resData = await fetch("https://accounts.zoho.in/oauth/v2/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          client_id: clientid,
          client_secret: clientsecret,
          redirect_uri: "http://localhost:3000/dashboard",
          refresh_token: parsed_refresh_token,
        }),
      });
      if (resData.status === 200) {
        const data = await resData.json();
        const auth_token = JSON.stringify(data.access_token);
        const oneday = new Date(Number(new Date()) + 3600000);
        response.cookies.set("auth_token", auth_token, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          path: "/",
          expires: oneday,
        });
      } else {
        console.log("error in rengenerating token");
        return NextResponse.next({
          request: { headers: new Headers(request.headers) },
        });
      }
      return response;
    }
  } else {
    return NextResponse.next();
  }
}
