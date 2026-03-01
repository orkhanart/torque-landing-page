"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { AIGenerationPanel } from "@/components/ai/AIGenerationPanel";

export default function AdminGeneratePage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-black-light bg-black/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
              <div className="h-6 w-px bg-black-light" />
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <h1 className="text-lg font-semibold text-white">
                  AI Generation Studio
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            Generate AI Content
          </h2>
          <p className="text-gray-400">
            Create images, videos, and 3D models using state-of-the-art AI models.
            Generated content can be saved directly to the public folder for use on the website.
          </p>
        </div>

        <AIGenerationPanel defaultType="image" />

        {/* Info Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            title="Image Generation"
            description="Generate high-quality images using FLUX Pro, FLUX Dev, or Stable Diffusion 3. Perfect for hero images, backgrounds, and marketing materials."
            models={["FLUX Pro 1.1", "FLUX Dev", "SD3 Medium"]}
          />
          <InfoCard
            title="Video Generation"
            description="Create AI-powered videos from text prompts or transform images into motion. Great for social media content and animations."
            models={["Minimax Video", "Kling Image-to-Video"]}
          />
          <InfoCard
            title="3D Generation"
            description="Convert images into 3D mesh models. Useful for creating 3D assets, product visualizations, and interactive content."
            models={["TripoSR", "Stable Fast 3D"]}
          />
        </div>
      </main>
    </div>
  );
}

function InfoCard({
  title,
  description,
  models,
}: {
  title: string;
  description: string;
  models: string[];
}) {
  return (
    <div className="p-6 rounded-lg bg-black-light border border-black-light">
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {models.map((model) => (
          <span
            key={model}
            className="px-2 py-1 text-xs bg-black-light text-gray-300 rounded"
          >
            {model}
          </span>
        ))}
      </div>
    </div>
  );
}
