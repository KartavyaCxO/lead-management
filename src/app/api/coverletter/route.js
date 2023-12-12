import { OpenAI } from "openai";
import { NextResponse } from "next/server";
export async function POST(request) {
  const openAi = new OpenAI({ apiKey: process.env.OPENAI_KEY });
  try {
    const req = await request.json();
    const ProjectDescription = req.ProjectDescription;
    const completion = await openAi.completions.create({
      model: "gpt-3.5-turbo-instruct",
      max_tokens: 3000,
      temperature: 0.8,
      prompt: `You are a CTO at a consulting company, Your CxO Online, an on-demand consulting agency with 60+ years of combined experience. Write a proposal for this UpWork gig pasted below in less than 150 words in informal language. Follow these instructions: 1. Refer to how the experience from my profile pasted below can be relevant to this job and only add relevant skills and experience in the proposal. 2. Make the first line very catchy and attractive to sell our proposal better 3. Ask a question about the project at the end. 4. List down some of the skills in pointers when explaining the relevant skills in the middle of the proposal. 5. Also mention that we have a portfolio deck attached below. Also, add the fact that they can schedule a call with the team by clicking on the following link (https://bit.ly/meetyoucxoonline). Job Description: ${ProjectDescription} Our profile: we can help with- Wordpress CMS, WooCommerce & Shopify for Ecommerce, MERN & MEAN Stack, Android, iOS & React JS & Native- Branding & Design: Bespoke Content & Artwork- Cloud Hosting on AWS- Digital Marketing Operations: Google, Facebook, Instagram, Linkedin, Youtube- CRM & Marketing Automation: Zoho, hubSpot, Mailchimp, Twilio, ZoomInfo, SalesLoft- Payment Gateway Integrations: Razorpay, Paytm, Stripe, Paypal- Inventory Management: WooCommerce, Zoho- Chatbot Integrations: Facebook, Whatsapp, Zoho, HubSpot`,
    });
    console.log(completion.choices[0].text);
    return NextResponse.json({
      message: completion.choices[0].text,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
