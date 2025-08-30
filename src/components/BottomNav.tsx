'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Home, MessageCircle, Heart, User, Zap } from 'lucide-react';
import { NavigationPage } from '@/types';

export const BottomNav: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: 'Swipe', path: '/swipe' },
    { icon: Zap, label: 'Chat', path: '/chat' },
    { icon: Heart, label: 'Matches', path: '/matches' },
    { icon: MessageCircle, label: 'Forum', path: '/forum' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200/50 px-4 py-2 z-50 shadow-lg">
      <div className="flex justify-around max-w-sm mx-auto">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = pathname === path;
          
          return (
            <button
              key={path}
              onClick={() => router.push(path)}
              className={`flex flex-col items-center space-y-1 p-3 rounded-2xl transition-all duration-200 relative group ${
                isActive 
                  ? 'text-pink-500 bg-pink-50 shadow-sm' 
                  : 'text-gray-500 hover:text-pink-400 hover:bg-gray-50'
              }`}
              aria-label={label}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-pink-500 rounded-full"></div>
              )}
              
              {/* Icon with animation */}
              <div className={`relative transition-all duration-200 ${
                isActive ? 'scale-110' : 'group-hover:scale-105'
              }`}>
                <Icon size={22} />
                {isActive && (
                  <div className="absolute inset-0 bg-pink-500/10 rounded-full blur-sm"></div>
                )}
              </div>
              
              {/* Label */}
              <span className={`text-xs font-medium transition-all duration-200 ${
                isActive ? 'text-pink-500' : 'text-gray-500 group-hover:text-pink-400'
              }`}>
                {label}
              </span>
              
              {/* Ripple effect */}
              <div className="absolute inset-0 rounded-2xl bg-pink-500/0 group-active:bg-pink-500/10 transition-all duration-150"></div>
            </button>
          );
        })}
      </div>
      
      {/* Bottom safe area for devices with home indicator */}
      <div className="h-1 bg-gradient-to-r from-transparent via-gray-200/50 to-transparent"></div>
    </div>
  );
};