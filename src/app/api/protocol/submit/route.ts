import { NextRequest, NextResponse } from "next/server";

/**
 * API Route: Submit Protocol Integration Request
 * POST /api/protocol/submit
 *
 * This is a placeholder implementation. Replace with your actual database logic.
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const walletAddress = formData.get("walletAddress") as string;
    const protocolName = formData.get("protocolName") as string;
    const tokenContractAddress = formData.get("tokenContractAddress") as string;
    const idlInput = formData.get("idlInput") as string;
    const contactInfo = formData.get("contactInfo") as string;
    const idlFile = formData.get("idlFile") as File | null;

    // Validate required fields
    if (!walletAddress || !protocolName || !tokenContractAddress || !contactInfo) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!idlInput && !idlFile) {
      return NextResponse.json(
        { error: "Either IDL URL or IDL file is required" },
        { status: 400 }
      );
    }

    // TODO: Replace with actual database insertion
    // Example using Prisma:
    // const protocolRequest = await prisma.protocolRequest.create({
    //   data: {
    //     walletAddress,
    //     protocolName,
    //     tokenContractAddress,
    //     idlSource: idlInput || "file_upload",
    //     contactInfo,
    //     status: "PENDING_REVIEW",
    //   },
    // });

    // TODO: Handle file upload if idlFile exists
    // You might want to upload it to S3, Cloudflare R2, or save it locally

    // PLACEHOLDER: Log the submission
    console.log("Protocol Integration Request:", {
      walletAddress,
      protocolName,
      tokenContractAddress,
      idlInput: idlInput || "File uploaded",
      contactInfo,
      timestamp: new Date().toISOString(),
    });

    // TODO: Send notification email/Telegram message to your team
    // Example:
    // await sendNotification({
    //   type: "new_protocol_request",
    //   protocolName,
    //   walletAddress,
    //   contactInfo,
    // });

    return NextResponse.json({
      success: true,
      message: "Protocol integration request submitted successfully",
    });
  } catch (error) {
    console.error("Error submitting protocol:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
