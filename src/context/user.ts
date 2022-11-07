import create from "zustand";

type RightType = {
    Id: number;
    Right: string;
    ValidFrom: string;
    ValidTo: string | null;
  };
  
  type Capability = {
    Id: number;
    Name: string;
    Description: string;
  };

export type UserType = {
  TokenInfo: {
    Token: string;
    Created: string;
    ValidTo: string;
  };
  User: {
    UserId: number;
    Username: string;
    Domain: string;
    ParentDomain: string;
    Agent: string;
    Rights: RightType[];
    Capabilities: Capability[];
    CreationTime: string;
    ActivationTime: string;
    MustChangePassword: boolean;
    MainUserId: number;
  };
  UserLogin: {
    Username: string;
    Password: string;
  }
};

interface UserState {
  isAuthenticated: boolean;
  user: null | UserType;
  authenticate: (user: UserType) => void;
}

const useUserStore = create<UserState>()((set) => ({
  isAuthenticated: false,
  user: null,
  authenticate: (user: UserType) => set(() => ({ isAuthenticated: true, user })),
}));

export default useUserStore;
