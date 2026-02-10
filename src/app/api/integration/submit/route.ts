import { NextRequest, NextResponse } from "next/server";

/**
 * API Route: Submit Integration Request
 * POST /api/integration/submit
 *
 * This is a placeholder implementation. Replace with your actual database logic.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { protocolName, tokenAddress, idlSource, contactInfo } = body;

    // Validate required fields
    if (!protocolName || !tokenAddress || !idlSource || !contactInfo) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // TODO: Replace with actual database insertion
    // Example using Prisma:
    // const integrationRequest = await prisma.integrationRequest.create({
    //   data: {
    //     protocolName,
    //     tokenAddress,
    //     idlSource,
    //     contactInfo,
    //     status: "PENDING_REVIEW",
    //   },
    // });

    // PLACEHOLDER: Log the submission
    console.log("Integration Request Received:", {
      protocolName,
      tokenAddress,
      idlSource,
      contactInfo,
      timestamp: new Date().toISOString(),
    });

    // TODO: Send notification to your team
    // Example:
    // await sendSlackNotification({
    //   type: "new_integration_request",
    //   protocolName,
    //   tokenAddress,
    //   contactInfo,
    // });
    //
    // await sendTelegramMessage({
    //   chat_id: process.env.TELEGRAM_CHAT_ID,
    //   text: `New Integration Request:\nProtocol: ${protocolName}\nToken: ${tokenAddress}\nContact: ${contactInfo}`,
    // });

    return NextResponse.json({
      success: true,
      message: "Integration request submitted successfully",
    });
  } catch (error) {
    console.error("Error submitting integration request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
