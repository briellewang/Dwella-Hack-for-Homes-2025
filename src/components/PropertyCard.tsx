'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Property, SwipeDirection } from '@/types';

interface PropertyCardProps {
  property: Property;
  onSwipe: (direction: SwipeDirection) => void;
  isTop?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  onSwipe, 
  isTop = false 
}) => {
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isSwipingOut, setIsSwipingOut] = useState(false);
  const dragOffsetRef = useRef({ x: 0, y: 0 });

  const handleStart = (clientX: number, clientY: number) => {
    if (!isTop || isSwipingOut) return;
    
    setIsDragging(true);
    const startX = clientX;
    const startY = clientY;

    const handleMove = (moveClientX: number, moveClientY: number) => {
      const deltaX = moveClientX - startX;
      const deltaY = moveClientY - startY;
      const newOffset = { x: deltaX, y: deltaY };
      setDragOffset(newOffset);
      dragOffsetRef.current = newOffset;
    };

    const handleEnd = () => {
      setIsDragging(false);
      
      const currentOffset = dragOffsetRef.current;
      
      if (Math.abs(currentOffset.x) > 100) {
        // Trigger swipe out animation
        setIsSwipingOut(true);
        const direction = currentOffset.x > 0 ? 'right' : 'left';
        
        // Animate card out
        const finalX = currentOffset.x > 0 ? 500 : -500;
        setDragOffset({ x: finalX, y: currentOffset.y });
        
        // Call onSwipe after animation
        setTimeout(() => {
          onSwipe(direction);
          setIsSwipingOut(false);
          setDragOffset({ x: 0, y: 0 });
          dragOffsetRef.current = { x: 0, y: 0 };
        }, 300);
      } else if (currentOffset.y < -100) {
        // Trigger swipe up animation
        setIsSwipingOut(true);
        
        // Animate card up
        setDragOffset({ x: currentOffset.x, y: -500 });
        
        // Call onSwipe after animation
        setTimeout(() => {
          onSwipe('up');
          setIsSwipingOut(false);
          setDragOffset({ x: 0, y: 0 });
          dragOffsetRef.current = { x: 0, y: 0 };
        }, 300);
      } else {
        // Reset to original position
        setDragOffset({ x: 0, y: 0 });
        dragOffsetRef.current = { x: 0, y: 0 };
      }
    };

    return { handleMove, handleEnd };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const { handleMove, handleEnd } = handleStart(e.clientX, e.clientY);
    if (!handleMove || !handleEnd) return;

    const mouseMoveHandler = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const mouseUpHandler = () => {
      handleEnd();
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const { handleMove, handleEnd } = handleStart(touch.clientX, touch.clientY);
    if (!handleMove || !handleEnd) return;

    const touchMoveHandler = (e: TouchEvent) => {
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    };
    const touchEndHandler = () => {
      handleEnd();
      document.removeEventListener('touchmove', touchMoveHandler);
      document.removeEventListener('touchend', touchEndHandler);
    };

    document.addEventListener('touchmove', touchMoveHandler);
    document.addEventListener('touchend', touchEndHandler);
  };

  const rotation = dragOffset.x * 0.1;
  const opacity = Math.max(0.7, 1 - Math.abs(dragOffset.x) * 0.001);

  return (
    <div
      className={`absolute inset-4 bg-white rounded-3xl shadow-2xl cursor-grab active:cursor-grabbing ${
        isTop ? 'z-20' : 'z-10 scale-95 opacity-60'
      } ${isSwipingOut ? 'transition-transform duration-300 ease-out' : 'transition-all duration-200'}`}
      style={{
        transform: isTop
          ? `translateX(${dragOffset.x}px) translateY(${dragOffset.y}px) rotate(${rotation}deg)`
          : 'translateX(0) translateY(0) rotate(0deg)',
        opacity: isTop ? opacity : 0.6,
        maxHeight: 'calc(100vh - 200px)' // 确保卡片不会太大
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* Swipe Indicators */}
      {isTop && dragOffset.x > 50 && (
        <div className="absolute top-20 left-8 bg-green-500 text-white px-6 py-3 rounded-full font-bold text-lg transform -rotate-12 z-30">
          LIKE
        </div>
      )}
      {isTop && dragOffset.x < -50 && (
        <div className="absolute top-20 right-8 bg-red-500 text-white px-6 py-3 rounded-full font-bold text-lg transform rotate-12 z-30">
          PASS
        </div>
      )}
      {isTop && dragOffset.y < -50 && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-6 py-3 rounded-full font-bold text-lg z-30">
          SUPER LIKE
        </div>
      )}

      {/* Property Image */}
      <div className="h-full relative overflow-hidden rounded-3xl">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover"
          draggable={false}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        
        {/* Property Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-end justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">{property.title}</h2>
              <p className="text-lg opacity-90 mb-3">{property.location}</p>
              <div className="flex flex-wrap gap-2">
                {property.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-right ml-4">
              <div className="text-2xl font-bold">{property.price}</div>
              <div className="text-sm opacity-75">{property.distance}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};