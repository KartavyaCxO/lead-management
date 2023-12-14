import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
export async function POST(request) {
  try {
    const req = await request.json();
    const access = request.cookies.get("auth_token").value;
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
    console.log(data);
    return NextResponse.json({ message: data, status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error, status: 500 });
  }
}

export async function GET(request) {
  try {
    const access = request.cookies.get("auth_token").value;
    const parsed_access = await JSON.parse(access);
    const resData = await fetch("https://www.zohoapis.in/crm/v2/Upwork_bids", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Zoho-oauthtoken ${parsed_access}`,
      },
    });
    const res = await resData.json();

    if ("data" in res) {
      console.log("Fetched Data");
      const data = res.data.map((item) => {
        return {
          ptitle: item.Project_Title,
          company_name: item.Company_Name,
          bidtype: item.Bid_Type,
          currancy: item.$currency_symbol,
          createdby: item.Created_By,
          createdtime: item.Created_Time,
          function: item.Function,
          location: item.Location,
          boosted: item.Boosted_or_not,
          ticket_type: item.Ticket_Type,
          connects_spent: item.connects_spent,
          bitquoted: item.Bid_Quoted,
          project_url: item.Project_URL,
        };
      });
      return NextResponse.json({ message: data, status: 200 });
    } else {
      if (res.code === "INVALID_TOKEN") {
        console.log(res);
        return NextResponse.json({ message: [], status: 200 });
      }
      console.log("No Data");
      return NextResponse.json({ message: [], status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error, status: 500 });
  }
}
