/**
 * Authentication Feature Types
 * Types specific to the authentication feature
 */

// User Entity (Feature-specific)
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  emailVerified?: boolean;
  createdAt: string;
  updatedAt: string;
}

// Form Data Types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UpdateProfileFormData {
  name: string;
  avatar?: string;
}

// Form Error Types
export type LoginFormErrors = {
  [K in keyof LoginFormData]?: string;
};

export type RegisterFormErrors = {
  [K in keyof RegisterFormData]?: string;
};

// Auth Context Types
export interface AuthContextValue {
  // State
  user: User | null;
  isLoading: boolean;
  isAuthenticating: boolean;
  isAuthenticated: boolean;

  // Actions
  login: (data: LoginFormData) => Promise<User | null>;
  register: (data: Omit<RegisterFormData, 'confirmPassword'>) => Promise<User | null>;
  logout: () => Promise<void>;
  updateProfile: (data: UpdateProfileFormData) => Promise<void>;
}

// Navigation Types
export type AuthStackParamList = {
  Login: undefined;
  Register?: undefined; // Optional for future use
};

// Hook Return Types
export interface UseAuthReturn extends AuthContextValue {}

export type SubmitButtonStatus =
  | 'idle'
  | 'submit-demo'
  | 'submit-login'
  | 'submit-register';

export interface UseLoginFormReturn {
  formData: LoginFormData;
  errors: LoginFormErrors;
  submitButtonStatus: SubmitButtonStatus;
  handleChange: (field: keyof LoginFormData, value: string) => void;
  handleSubmit: () => Promise<void>;
  handleDemoLogin: () => Promise<void>;
  clearErrors: () => void;
}

export interface UseRegisterFormReturn {
  formData: RegisterFormData;
  errors: RegisterFormErrors;
  submitButtonStatus: SubmitButtonStatus;
  handleChange: (field: keyof RegisterFormData, value: string) => void;
  handleSubmit: () => Promise<void>;
  clearErrors: () => void;
  validateForm: () => boolean;
}
