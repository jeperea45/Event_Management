export interface Event {
    id: string;
    name: string;
    description: string;
    date: string;
    time: string;
    location: string;
    userId: string;
  }
  
  export interface FilterState {
    search: string;
    date: string;
    location: string;
  }
  
  export interface AuthState {
    user: {
      id: string;
      email: string;
      name: string;
    } | null;
    isAuthenticated: boolean;
  }
  