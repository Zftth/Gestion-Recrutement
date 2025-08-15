export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string;
  salary?: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  status: 'active' | 'closed' | 'draft';
  created_at: string;
  updated_at: string;
}

export interface Application {
  id: number;
  job_id: number;
  candidate_id: number;
  status: 'pending' | 'accepted' | 'rejected' | 'interviewed';
  cover_letter?: string;
  resume_path?: string;
  applied_at: string;
  job?: Job;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'recruiter' | 'candidate';
  created_at: string;
  updated_at: string;
}

export interface Interview {
  id: number;
  application_id: number;
  scheduled_at: string;
  duration: number;
  location?: string;
  notes?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}