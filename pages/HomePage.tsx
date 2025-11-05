import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { Job } from '../types';
import { CloudIcon, SREIcon, AgileIcon } from '../components/icons/FeatureIcons';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('./data/jobs.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jobs: Job[] = await response.json();
        setFeaturedJobs(jobs.filter(job => job.featured));
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="space-y-16 md:space-y-24 pb-24">
      {/* Hero Section */}
      <section className="bg-neutral-50 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-extrabold text-neutral-900 leading-tight">
                  クラウド・ITインフラ・開発領域に強い
                  <br />
                  <span className="text-primary">SESパートナー</span>
              </h1>
              <p className="mt-6 max-w-xl mx-auto md:mx-0 text-lg md:text-xl text-neutral-700">
                  Donrichy株式会社は、クラウド、ITインフラ、アジャイル開発など幅広い技術領域でお客様のビジネス成長を支援するITプロフェッショナル集団です。
              </p>
              <div className="mt-10 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                <Button size="lg" onClick={() => navigate('/jobs')}>案件を探す</Button>
                <Button size="lg" variant="secondary" onClick={() => navigate('/contact')}>企業様はこちら</Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop"
                alt="A diverse team of engineers collaborating at a whiteboard in a modern office" 
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">事業紹介</h2>
          <p className="mt-4 text-lg text-neutral-700">私たちの専門領域</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <Card title="Google Cloud" icon={<CloudIcon className="w-12 h-12 text-primary" />}>
            <p>GCP認定資格を持つエンジニアが、インフラ設計から構築、運用まで一貫してサポートします。</p>
          </Card>
          <Card title="SRE" icon={<SREIcon className="w-12 h-12 text-primary" />}>
            <p>サービスの信頼性、可用性を向上させるためのSREプラクティスを導入し、安定したサービス運用を実現します。</p>
          </Card>
          <Card title="アジャイル開発" icon={<AgileIcon className="w-12 h-12 text-primary" />}>
            <p>スクラムやカンバンを用いたアジャイル開発手法で、迅速かつ柔軟なプロダクト開発を支援します。</p>
          </Card>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">注目の案件</h2>
          <p className="mt-4 text-lg text-neutral-700">現在、以下のポジションを積極的に募集しています。</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {featuredJobs.map(job => (
            <Card key={job.id} title={job.title}>
              <p className="font-semibold text-primary">{job.salary}</p>
              <p className="mt-2">{job.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {job.skills.slice(0, 3).map(skill => (
                  <span key={skill} className="bg-primary/10 text-primary font-semibold text-sm px-2 py-1 rounded-full">{skill}</span>
                ))}
              </div>
            </Card>
          ))}
        </div>
         <div className="text-center mt-12">
            <Button size="lg" onClick={() => navigate('/jobs')}>全ての案件を見る</Button>
         </div>
      </section>
    </div>
  );
};

export default HomePage;