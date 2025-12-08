import { useState, useEffect } from 'react';
import { profileAPI, resumeAPI, applicationAPI, interviewAPI, aiAPI } from '@/lib/api';
import { useAuth } from '@clerk/clerk-react';

export interface DashboardData {
  profile: any | null;
  resumes: any[];
  applications: any[];
  interviews: any[];
  aiSessions: any[];
  stats: {
    applicationsCount: number;
    interviewsCount: number;
    atsScore: number;
    aiSessionsToday: number;
  };
  loading: boolean;
  error: string | null;
}

export const useDashboardData = () => {
  const { getToken } = useAuth();
  const [data, setData] = useState<DashboardData>({
    profile: null,
    resumes: [],
    applications: [],
    interviews: [],
    aiSessions: [],
    stats: {
      applicationsCount: 0,
      interviewsCount: 0,
      atsScore: 0,
      aiSessionsToday: 0,
    },
    loading: true,
    error: null,
  });

  const fetchDashboardData = async () => {
    try {
      setData(prev => ({ ...prev, loading: true, error: null }));

      // Get auth token and inject it globally for axios interceptor
      const token = await getToken();
      (window as any).__CLERK_TOKEN__ = token;

      // Fetch all data in parallel
      const [profile, resumes, applications, interviews, aiSessions] = await Promise.all([
        profileAPI.getProfile().catch(() => null),
        resumeAPI.getResumes().catch(() => []),
        applicationAPI.getApplications().catch(() => []),
        interviewAPI.getInterviews().catch(() => []),
        aiAPI.getHistory().catch(() => []),
      ]);

      // Calculate stats
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const aiSessionsToday = Array.isArray(aiSessions)
        ? aiSessions.filter((session: any) => {
            const sessionDate = new Date(session.createdAt);
            sessionDate.setHours(0, 0, 0, 0);
            return sessionDate.getTime() === today.getTime();
          }).length
        : 0;

      // Get primary resume ATS score
      const primaryResume = Array.isArray(resumes)
        ? resumes.find((r: any) => r.isPrimary)
        : null;
      const atsScore = primaryResume?.strengthScore || 0;

      setData({
        profile,
        resumes: Array.isArray(resumes) ? resumes : [],
        applications: Array.isArray(applications) ? applications : [],
        interviews: Array.isArray(interviews) ? interviews : [],
        aiSessions: Array.isArray(aiSessions) ? aiSessions : [],
        stats: {
          applicationsCount: Array.isArray(applications) ? applications.length : 0,
          interviewsCount: Array.isArray(interviews)
            ? interviews.filter((i: any) => i.status === 'SCHEDULED').length
            : 0,
          atsScore,
          aiSessionsToday,
        },
        loading: false,
        error: null,
      });
    } catch (error: any) {
      console.error('Error fetching dashboard data:', error);
      setData(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to load dashboard data',
      }));
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return {
    ...data,
    refetch: fetchDashboardData,
  };
};
