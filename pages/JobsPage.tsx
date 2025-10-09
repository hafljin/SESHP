import React, { useState, useMemo, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { Job } from '../types';

type FilterType = 'All' | 'Leader' | 'Member';

const JobsPage: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('All');
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('./data/jobs.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jobs: Job[] = await response.json();
        setAllJobs(jobs);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    if (filter === 'All') {
      return allJobs;
    }
    return allJobs.filter(job => job.type === filter);
  }, [filter, allJobs]);
  
  const handleApplyClick = () => {
    window.open('https://forms.gle/your-google-form-link', '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900">案件情報</h1>
        <p className="mt-4 text-lg text-neutral-700">あなたのスキルを活かせる場所がここにあります。</p>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mb-12">
        {(['All', 'Leader', 'Member'] as FilterType[]).map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 text-lg font-semibold rounded-lg transition-colors ${
              filter === type
                ? 'bg-primary text-neutral-50'
                : 'bg-neutral-300 text-neutral-700 hover:bg-primary/20'
            }`}
          >
            {type === 'All' ? 'すべて' : type}
          </button>
        ))}
      </div>

      {/* Job List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <div className="text-center md:col-span-2 lg:col-span-3 py-16">
            <p className="text-xl text-neutral-500">案件情報を読み込んでいます...</p>
          </div>
        ) : filteredJobs.length > 0 ? (
          filteredJobs.map(job => (
            <div key={job.id} className="flex flex-col">
              <Card title={job.title} className="flex-grow">
                <div className="space-y-3">
                  <p><strong className="w-20 inline-block">単価:</strong> <span className="font-bold text-primary">{job.salary}</span></p>
                  <p><strong className="w-20 inline-block">稼働条件:</strong> {job.conditions}</p>
                  <div>
                    <strong className="w-20 inline-block">スキル:</strong>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {job.skills.map(skill => (
                        <span key={skill} className="bg-primary/10 text-primary font-semibold text-sm px-2 py-1 rounded-full">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
              <div className="bg-neutral-50 p-4 rounded-b-xl shadow-lg">
                  <Button className="w-full" onClick={handleApplyClick}>応募する</Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center md:col-span-2 lg:col-span-3 py-16">
            <p className="text-xl text-neutral-500">現在、該当する案件はありません。</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsPage;