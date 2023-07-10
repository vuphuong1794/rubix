export type Review = {
  id: string;
  created_at: string;
  updated_at: string;
  content: string;
  rating: number;
  user: UserReview;
};

type UserReview = {
  id: string;
  username: string;
  email: string;
};

export type ReviewRes = {
  data: Review[];
};
