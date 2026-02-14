import { NextRequest, NextResponse } from "next/server";
import { getQueueStatus } from "@/lib/fal/client";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const model = searchParams.get("model");
    const requestId = searchParams.get("requestId");

    if (!model) {
      return NextResponse.json(
        { error: "Model parameter is required" },
        { status: 400 }
      );
    }

    if (!requestId) {
      return NextResponse.json(
        { error: "Request ID parameter is required" },
        { status: 400 }
      );
    }

    const status = await getQueueStatus(model, requestId);

    return NextResponse.json(status);
  } catch (error) {
    console.error("Error in status route:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
