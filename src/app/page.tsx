'use client';

import { useRouter } from 'next/navigation';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen gradient-primary flex flex-col justify-center items-center px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="text-center mb-16 z-10">
        <div className="flex items-center justify-center mb-6">
          <Sparkles className="text-white mr-3" size={32} />
          <h1 className="text-6xl font-bold text-white">Dwella</h1>
        </div>
        <p className="text-xl text-white/90 mb-4 font-medium">Swipe. Match. Move In.</p>
        <p className="text-white/70 max-w-md mx-auto leading-relaxed">
          Find your perfect home with Tinder-style swiping, AI assistance, and community insights.
        </p>
      </div>
      
      {/* Action Buttons */}
      <div className="w-full max-w-sm space-y-4 z-10">
        <button
          onClick={() => router.push('/swipe')}
          className="group w-full bg-white text-pink-500 font-bold py-4 px-6 rounded-full text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
        >
          Start Swiping
          <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
        </button>
        
        <button
          onClick={() => router.push('/swipe')}
          className="w-full glass text-white font-semibold py-4 px-6 rounded-full text-lg hover:bg-white/20 transition-all duration-200"
        >
          Browse Properties
        </button>
      </div>

      {/* Features */}
      <div className="mt-16 grid grid-cols-3 gap-4 w-full max-w-sm text-center z-10">
        <div className="glass rounded-2xl p-4">
          <div className="text-2xl mb-2">🏠</div>
          <p className="text-white/80 text-sm font-medium">Smart Matching</p>
        </div>
        <div className="glass rounded-2xl p-4">
          <div className="text-2xl mb-2">🤖</div>
          <p className="text-white/80 text-sm font-medium">AI Assistant</p>
        </div>
        <div className="glass rounded-2xl p-4">
          <div className="text-2xl mb-2">👥</div>
          <p className="text-white/80 text-sm font-medium">Community</p>
        </div>
      </div>
    </div>
  );
}