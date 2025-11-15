export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-4xl w-full text-center">
        <div className="text-8xl mb-8 animate-pulse">🔥</div>

        <h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-purple-500 to-orange-500 bg-clip-text text-transparent">
          RoastArena
        </h1>

        <p className="text-2xl text-gray-400 mb-12">
          AI-Powered Roast Battles
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <a
            href="/login"
            className="p-6 bg-gradient-to-r from-purple-500 to-orange-500 rounded-2xl hover:scale-105 transition-transform"
          >
            <div className="text-4xl mb-2">🔑</div>
            <div className="font-bold text-xl">Get Started</div>
          </a>

          <a
            href="/feed"
            className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors"
          >
            <div className="text-4xl mb-2">🏠</div>
            <div className="font-bold text-xl">Browse Feed</div>
          </a>
        </div>

        <div className="mt-16 text-sm text-gray-600">
          <p>🌍 Multi-language • 💰 Multi-currency • 🎁 Gift system</p>
        </div>
      </div>
    </div>
  )
}
