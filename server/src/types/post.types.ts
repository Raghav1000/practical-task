export interface RecentLike {
  userId: number;
  name: string;
}

export interface PostResponse {
  id: number;
  title: string;
  description: string;
  imageURL: string;
  likeCount: number;
  author: { id: number; name: string };
  recentLikes: RecentLike[];
  createdAt: Date;
  updatedAt: Date;
}
