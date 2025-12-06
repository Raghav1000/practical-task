export interface JwtRequest extends Request {
  user: {
    userId: number;
  };
}
