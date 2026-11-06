export default function AnimatedBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Bright teal glow */}
      <div
        className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] rounded-full opacity-40 animate-glow-1 motion-reduce:animate-none"
        style={{
          background:
            "radial-gradient(circle, rgba(15,90,110,0.6) 0%, rgba(15,90,110,0) 70%)",
        }}
      />
      {/* Deeper teal glow */}
      <div
        className="absolute bottom-[-15%] right-[-5%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full opacity-35 animate-glow-2 motion-reduce:animate-none"
        style={{
          background:
            "radial-gradient(circle, rgba(6,34,47,0.8) 0%, rgba(6,34,47,0) 70%)",
        }}
      />
      {/* Faint cream glow */}
      <div
        className="absolute top-[40%] left-[50%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full opacity-15 animate-glow-3 motion-reduce:animate-none"
        style={{
          background:
            "radial-gradient(circle, rgba(243,236,210,0.3) 0%, rgba(243,236,210,0) 70%)",
        }}
      />
    </div>
  );
}
