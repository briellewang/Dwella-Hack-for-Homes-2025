export interface Property {
  id: number;
  image: string;
  title: string;
  price: string;
  location: string;
  distance: string;
  tags: string[];
  description?: string;
  bedrooms?: number;
  bathrooms?: number;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export interface ForumPost {
  id: number;
  user: string;
  avatar: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
  tags: string[];
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  university?: string;
}

export type SwipeDirection = 'left' | 'right' | 'up';
export type NavigationPage = 'swipe' | 'chat' | 'matches' | 'forum' | 'profile';