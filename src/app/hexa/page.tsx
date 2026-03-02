import dynamic from "next/dynamic";

const SceneHost = dynamic(
  () =>
    import("@/components/three/hexa-scenes/SceneHost").then(
      (m) => m.SceneHost,
    ),
  { ssr: false },
);

export default function HexaPage() {
  return (
    <main className="min-h-screen bg-white">
      <SceneHost />
    </main>
  );
}
