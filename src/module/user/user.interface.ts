export type TUser = {
  image?: string;
  name: string;
  email: string;
  password: string;
  isDeleted: boolean;
  resetPasswordOtp: string | null;
  resetPasswordExpires: Date | null;
};
