export type TUser = {
  image?: string;
  name: string;
  email: string;
  password: string;
  isDeleted: boolean;
  resetPasswordOtp: string | null;
  resetPasswordExpires: Date | null;
};
export type TFeedback = {
  name: string;
  email: string;
  feedbacks: { type: string; message: string }[];
};