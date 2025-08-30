'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Settings, Sliders, X, Zap, Heart, RotateCcw } from 'lucide-react';
import { PropertyCard } from '@/components/PropertyCard';
import { BottomNav } from '@/components/BottomNav';
import { useSwipeCards } from '@/hooks/useSwipeCards';
import { usePropertyStore } from '@/store/usePropertyStore';
import { mockProperties } from '@/data/properties';
import { SwipeDirection } from '@/types';

export default function SwipePage() {
  const router = useRouter();
  const { likeProperty, resetAll } = usePropertyStore();
  const { currentCard, nextCard, currentIndex, hasCards, remainingCards, swipe, reset } = useSwipeCards(mockProperties);

  const handleSwipe = (direction: SwipeDirection) => {
    if (currentCard && (direction === 'right' || direction === 'up')) {
      likeProperty(currentCard);
    }
    swipe(direction);
  };

  const handleButtonAction = (action: 'pass' | 'super' | 'like') => {
    const directionMap: Record<string, SwipeDirection> = {
      'pass': 'left',
      'super': 'up',
      'like': 'right'
    };
    handleSwipe(directionMap[action]);
  };

  const handleReset = () => {
    resetAll(); // 清除所有滑动状态
    reset(); // 重置当前索引
  };

  return (
    <div className="min-h-screen gradient-tertiary relative pb-24">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-30 flex justify-between items-center p-4">
        <button className="glass p-3 rounded-full">
          <Settings className="text-white" size={20} />
        </button>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Dwella</h1>
          <p className="text-white/70 text-sm">{remainingCards} properties left</p>
        </div>
        <button className="glass p-3 rounded-full">
          <Sliders className="text-white" size={20} />
        </button>
      </div>

      {/* Cards Container */}
      <div className="pt-24 pb-48 h-screen relative">
        {!hasCards ? (
          <div className="flex flex-col items-center justify-center h-full text-white px-8">
            <div className="glass rounded-3xl p-8 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold mb-3">That&apos;s all for now!</h2>
              <p className="text-white/80 mb-6 leading-relaxed">
                You&apos;ve seen all available properties. Check your matches or reset to see them again.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => router.push('/matches')}
                  className="w-full bg-pink-500 text-white font-semibold py-3 px-6 rounded-full hover:bg-pink-600 transition-colors"
                >
                  View My Matches
                </button>
                <button
                  onClick={handleReset}
                  className="w-full glass text-white font-semibold py-3 px-6 rounded-full hover:bg-white/20 transition-colors flex items-center justify-center"
                >
                  <RotateCcw size={16} className="mr-2" />
                  Start Over
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Next Card (Background) */}
            {nextCard && (
              <PropertyCard
                key={`next-${nextCard.id}`}
                property={nextCard}
                onSwipe={() => {}}
                isTop={false}
              />
            )}
            
            {/* Current Card (Top) */}
            {currentCard && (
              <PropertyCard
                key={`current-${currentCard.id}`}
                property={currentCard}
                onSwipe={handleSwipe}
                isTop={true}
              />
            )}
          </>
        )}
      </div>

      {/* Action Buttons */}
      {hasCards && (
        <div className="absolute bottom-40 left-0 right-0 px-8 z-40">
          <div className="flex justify-center items-center space-x-6">
            <button
              onClick={() => handleButtonAction('pass')}
              className="bg-white/20 backdrop-blur-sm shadow-lg p-4 rounded-full hover:scale-110 hover:bg-red-500/20 transition-all"
              aria-label="Pass"
            >
              <X className="text-white" size={28} />
            </button>
            
            <button
              onClick={() => handleButtonAction('super')}
              className="bg-blue-500/80 backdrop-blur-sm shadow-lg p-3 rounded-full hover:scale-110 hover:bg-blue-500 transition-all"
              aria-label="Super Like"
            >
              <Zap className="text-white" size={24} />
            </button>
            
            <button
              onClick={() => handleButtonAction('like')}
              className="bg-white/20 backdrop-blur-sm shadow-lg p-4 rounded-full hover:scale-110 hover:bg-green-500/20 transition-all"
              aria-label="Like"
            >
              <Heart className="text-white" size={28} />
            </button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}