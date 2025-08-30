import { useState, useEffect } from 'react';
import { Property, SwipeDirection } from '@/types';
import { usePropertyStore } from '@/store/usePropertyStore';

export const useSwipeCards = (cards: Property[]) => {
  const { swipedProperties, markPropertyAsSwiped } = usePropertyStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastDirection, setLastDirection] = useState<SwipeDirection | undefined>();

  // 过滤掉已经滑动过的房产
  const availableCards = cards.filter(card => !swipedProperties.includes(card.id));
  
  const currentCard = availableCards[currentIndex];
  const nextCard = availableCards[currentIndex + 1];
  const hasCards = currentIndex < availableCards.length;
  const remainingCards = availableCards.length - currentIndex;

  // 当 swipedProperties 变化时，重新计算 currentIndex
  useEffect(() => {
    setCurrentIndex(0);
  }, [swipedProperties.length]);

  const swipe = (direction: SwipeDirection) => {
    if (hasCards && currentCard) {
      setLastDirection(direction);
      markPropertyAsSwiped(currentCard.id);
      setCurrentIndex(prev => prev + 1);
    }
  };

  const reset = () => {
    setCurrentIndex(0);
    setLastDirection(undefined);
  };

  return {
    currentCard,
    nextCard,
    currentIndex,
    hasCards,
    remainingCards,
    lastDirection,
    swipe,
    reset,
    availableCards
  };
};