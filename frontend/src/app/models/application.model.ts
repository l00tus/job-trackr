export interface Application {
  id: string;
  user_id: string;
  job_title: string;
  company: string;
  location: string;
  job_link?: string;
  status: string;
  status_history: { status: string; date: string}[];
  date?: string;
}