import { ForumPost } from '@/types';

export const mockForumPosts: ForumPost[] = [
  {
    id: 1,
    user: 'Sarah',
    avatar: '👩‍💼',
    time: '2 hours ago',
    content: 'Just found an amazing place near UWA for $280/week! The landlord is super friendly. DM me if you need details!',
    likes: 12,
    comments: 5,
    tags: ['Experience']
  },
  {
    id: 2,
    user: 'Mike',
    avatar: '👨‍🎓',
    time: '5 hours ago',
    content: 'Does anyone know the typical bond amount in Australia? Is it one month or two months rent? First time renting here, need advice!',
    likes: 8,
    comments: 15,
    tags: ['Help']
  },
  {
    id: 3,
    user: 'Lisa',
    avatar: '👩‍🎨',
    time: '1 day ago',
    content: 'Pro tip: Always check water pressure and internet speed during inspections! Learned this the hard way.',
    likes: 25,
    comments: 8,
    tags: ['Tips']
  },
  {
    id: 4,
    user: 'David',
    avatar: '👨‍💻',
    time: '1 day ago',
    content: 'Looking for a flatmate in Subiaco! 2BR apartment, $200-250/week each. Great location and amenities. Contact me if interested!',
    likes: 6,
    comments: 12,
    tags: ['Flatmate']
  }
];