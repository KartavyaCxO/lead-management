import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
export async function POST(request) {
  try {
    const req = await request.json();
    const access = request.cookies.get("access_token").value;
    const parsed_access = await JSON.parse(access);
    const resData = await fetch("https://www.zohoapis.in/crm/v2/Upwork_bids", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Zoho-oauthtoken ${parsed_access}`,
      },
      body: JSON.stringify(req),
    });
    const data = await resData.json();
    return NextResponse.json({ message: data, status: 200 });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}
