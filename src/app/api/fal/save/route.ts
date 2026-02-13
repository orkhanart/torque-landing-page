import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";
import { GenerationType } from "@/lib/fal/types";

function generateFilename(type: GenerationType, originalUrl: string): string {
  const timestamp = Date.now();
  const hash = Math.random().toString(36).substring(2, 8);

  // Extract extension from URL or use defaults
  let ext = "png";
  if (type === "video") {
    ext = "mp4";
  } else if (type === "3d") {
    ext = "glb";
  } else {
    // Try to extract from URL
    const urlExt = originalUrl.split(".").pop()?.split("?")[0];
    if (urlExt && ["png", "jpg", "jpeg", "webp"].includes(urlExt.toLowerCase())) {
      ext = urlExt.toLowerCase();
    }
  }

  return `${timestamp}-${hash}.${ext}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, type } = body as { url: string; type: GenerationType };

    if (!url) {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }

    if (!type || !["image", "video", "3d"].includes(type)) {
      return NextResponse.json(
        { error: "Valid type (image, video, 3d) is required" },
        { status: 400 }
      );
    }

    // Create directory structure
    const publicDir = path.join(process.cwd(), "public", "generated", type);

    if (!existsSync(publicDir)) {
      await mkdir(publicDir, { recursive: true });
    }

    // Download the file from fal.ai CDN
    const response = await fetch(url);
    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to download file: ${response.statusText}` },
        { status: 500 }
      );
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    const filename = generateFilename(type, url);
    const filePath = path.join(publicDir, filename);

    // Write file to public directory
    await writeFile(filePath, buffer);

    const localPath = `/generated/${type}/${filename}`;

    return NextResponse.json({
      success: true,
      localPath,
      publicUrl: localPath,
    });
  } catch (error) {
    console.error("Error in save route:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
