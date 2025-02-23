export interface User {
  id: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  sub: string;
}
