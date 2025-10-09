import React from 'react';
import Card from '../components/Card';
import { COMPANY_INFO } from '../constants';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 space-y-16">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900">会社概要</h1>
        <p className="mt-4 text-lg text-neutral-700">私たちについて</p>
      </div>

      {/* Philosophy Section with Image */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
          <Card title="企業理念">
            <h3 className="text-2xl font-bold text-primary mb-4">"Technology for a Better Tomorrow"</h3>
            <p className="text-lg leading-relaxed">
              私たちは、テクノロジーの力で人々の生活と社会をより良くすることを目指しています。
              最高の技術と最高のチームで、お客様の課題解決に貢献し、共に未来を創造するパートナーであり続けます。
            </p>
          </Card>
        </div>
        <div className="order-1 md:order-2">
          <img 
            src="https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=1000&auto=format&fit=crop"
            alt="A focused engineer working in a creative and well-lit workspace"
            className="rounded-lg shadow-2xl"
          />
        </div>
      </div>

      {/* Company Info Section */}
      <Card title="企業情報">
        <dl className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
          <div className="md:col-span-1">
            <dt className="font-semibold text-neutral-900">会社名</dt>
            <dd className="mt-1 text-neutral-700">{COMPANY_INFO.name}</dd>
          </div>
          <div className="md:col-span-1">
            <dt className="font-semibold text-neutral-900">代表者</dt>
            <dd className="mt-1 text-neutral-700">{COMPANY_INFO.ceo}</dd>
          </div>
          <div className="md:col-span-1">
            <dt className="font-semibold text-neutral-900">所在地</dt>
            <dd className="mt-1 text-neutral-700">{COMPANY_INFO.address}</dd>
          </div>
        </dl>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Services Section */}
        <Card title="事業内容">
          <ul className="list-disc list-inside space-y-2">
            <li><strong>SES (システムエンジニアリングサービス) 事業:</strong> クラウド、SRE、アジャイル開発領域の専門家を提供</li>
            <li><strong>クラウド導入支援事業:</strong> GCP, AWS, Azureの導入コンサルティングと設計・構築</li>
          </ul>
        </Card>

        {/* Track Record Section */}
        <Card title="主な実績">
          <ul className="list-disc list-inside space-y-2">
            <li>大手クレジットカード企業の決済システムSRE支援</li>
            <li>動画配信サービスのGCPインフラ構築・運用</li>
            <li>大手ECサイトのマイクロサービス化支援</li>
            <li>金融機関向け勘定系システムのAWS移行プロジェクト</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;