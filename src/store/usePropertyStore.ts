import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Property } from '@/types';

interface PropertyStore {
  likedProperties: Property[];
  swipedProperties: number[]; // 存储已滑动房产的 ID
  likeProperty: (property: Property) => void;
  unlikeProperty: (propertyId: number) => void;
  isPropertyLiked: (propertyId: number) => boolean;
  markPropertyAsSwiped: (propertyId: number) => void;
  isPropertySwiped: (propertyId: number) => boolean;
  clearLikedProperties: () => void;
  clearSwipedProperties: () => void;
  resetAll: () => void;
}

export const usePropertyStore = create<PropertyStore>()(
  persist(
    (set, get) => ({
      likedProperties: [],
      swipedProperties: [],

      likeProperty: (property: Property) => {
        set((state) => {
          const isAlreadyLiked = state.likedProperties.some(p => p.id === property.id);
          if (isAlreadyLiked) return state;
          
          return {
            likedProperties: [...state.likedProperties, property]
          };
        });
      },

      unlikeProperty: (propertyId: number) => {
        set((state) => ({
          likedProperties: state.likedProperties.filter(p => p.id !== propertyId)
        }));
      },

      isPropertyLiked: (propertyId: number) => {
        return get().likedProperties.some(p => p.id === propertyId);
      },

      markPropertyAsSwiped: (propertyId: number) => {
        set((state) => {
          const isAlreadySwiped = state.swipedProperties.includes(propertyId);
          if (isAlreadySwiped) return state;
          
          return {
            swipedProperties: [...state.swipedProperties, propertyId]
          };
        });
      },

      isPropertySwiped: (propertyId: number) => {
        return get().swipedProperties.includes(propertyId);
      },

      clearLikedProperties: () => {
        set({ likedProperties: [] });
      },

      clearSwipedProperties: () => {
        set({ swipedProperties: [] });
      },

      resetAll: () => {
        set({ likedProperties: [], swipedProperties: [] });
      }
    }),
    {
      name: 'dwella-properties',
      partialize: (state) => ({ 
        likedProperties: state.likedProperties,
        swipedProperties: state.swipedProperties 
      }),
    }
  )
);