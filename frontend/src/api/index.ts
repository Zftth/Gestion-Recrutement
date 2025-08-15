// Auth Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'recruiter' | 'candidate';
  avatar?: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: 'recruiter' | 'candidate';
  phone?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  expires_in: number;
}

// Job Types
export interface JobOffer {
  id: string;
  title: string;
  description: string;
  requirements: string;
  location: string;
  salary_range?: string;
  contract_type: 'CDI' | 'CDD' | 'Stage' | 'Freelance';
  experience_level: 'Junior' | 'Mid' | 'Senior' | 'Expert';
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  published_at?: string;
  expires_at?: string;
  recruiter_id: string;
  recruiter: User;
  applications_count?: number;
  created_at: string;
  updated_at: string;
}

export interface CreateJobOfferData {
  title: string;
  description: string;
  requirements: string;
  location: string;
  salary_range?: string;
  contract_type: string;
  experience_level: string;
  tags: string[];
  published_at?: string;
  expires_at?: string;
}

// Application Types
export interface Application {
  id: string;
  job_offer_id: string;
  candidate_id: string;
  status: 'received' | 'in_progress' | 'interview' | 'accepted' | 'rejected';
  cv_path?: string;
  cover_letter_path?: string;
  message?: string;
  feedback?: string;
  applied_at: string;
  updated_at: string;
  job_offer: JobOffer;
  candidate: User;
  interviews: Interview[];
  status_history: StatusHistory[];
}

export interface StatusHistory {
  id: string;
  application_id: string;
  status: string;
  comment?: string;
  changed_by: string;
  changed_at: string;
}

export interface CreateApplicationData {
  job_offer_id: string;
  message?: string;
  cv: File;
  cover_letter?: File;
}

// Interview Types
export interface Interview {
  id: string;
  application_id: string;
  title: string;
  description?: string;
  scheduled_at: string;
  duration: number; // en minutes
  location?: string;
  meeting_link?: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  feedback?: string;
  rating?: number;
  created_at: string;
  updated_at: string;
  application: Application;
}

export interface CreateInterviewData {
  application_id: string;
  title: string;
  description?: string;
  scheduled_at: string;
  duration: number;
  location?: string;
  meeting_link?: string;
}

// Notification Types
export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  data?: Record<string, any>;
  read_at?: string;
  created_at: string;
}

// Dashboard Types
export interface DashboardStats {
  total_jobs: number;
  active_jobs: number;
  total_applications: number;
  pending_applications: number;
  scheduled_interviews: number;
  this_month_applications: number;
  conversion_rate: number;
}

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

// Search and Filter Types
export interface JobSearchFilters {
  keyword?: string;
  location?: string;
  contract_type?: string[];
  experience_level?: string[];
  tags?: string[];
  salary_min?: number;
  salary_max?: number;
  date_posted?: string;
}

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}

export interface ApiResponse<T> {
  data: T;
  meta?: PaginationMeta;
  message?: string;
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'file' | 'date';
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: Record<string, any>;
}

// UI Component Props
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md';
  children: React.ReactNode;
}

// Constants
export const APPLICATION_STATUSES = {
  received: { label: 'Reçue', color: 'bg-blue-500' },
  in_progress: { label: 'En cours', color: 'bg-yellow-500' },
  interview: { label: 'Entretien', color: 'bg-purple-500' },
  accepted: { label: 'Acceptée', color: 'bg-green-500' },
  rejected: { label: 'Refusée', color: 'bg-red-500' },
} as const;

export const CONTRACT_TYPES = [
  { value: 'CDI', label: 'CDI' },
  { value: 'CDD', label: 'CDD' },
  { value: 'Stage', label: 'Stage' },
  { value: 'Freelance', label: 'Freelance' },
] as const;

export const EXPERIENCE_LEVELS = [
  { value: 'Junior', label: 'Junior (0-2 ans)' },
  { value: 'Mid', label: 'Intermédiaire (3-5 ans)' },
  { value: 'Senior', label: 'Senior (6+ ans)' },
  { value: 'Expert', label: 'Expert (10+ ans)' },
] as const;