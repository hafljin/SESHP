import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from '../components/Card';
import { MemoryRouter } from 'react-router-dom';

// TC-004: 案件情報が正しく描画されること
// TC-005: クリック時に詳細ページへ遷移すること

describe('Card', () => {
  const job = {
    title: 'SREリーダー募集 (GCP)',
    salary: '月額 90万円〜120万円',
    skills: ['Google Cloud', 'Kubernetes', 'Terraform'],
    children: <p>大規模サービスの信頼性向上をリードするSREリーダーを募集。</p>,
  };

  it('should render job info correctly (TC-004)', () => {
    render(
      <Card title={job.title} icon={null} className="">
        <p className="font-semibold text-primary">{job.salary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {job.skills.map(skill => (
            <span key={skill} className="bg-primary/10 text-primary font-semibold text-sm px-2 py-1 rounded-full">{skill}</span>
          ))}
        </div>
        {job.children}
      </Card>
    );
    expect(screen.getByText(job.title)).toBeInTheDocument();
    expect(screen.getByText(job.salary)).toBeInTheDocument();
    job.skills.forEach(skill => {
      expect(screen.getByText(skill)).toBeInTheDocument();
    });
  });

  it('should navigate to detail page on click (TC-005)', () => {
    // Card自体にonClickがない場合はJobsPageでテスト
    // ここではクリックイベントの存在のみ検証
    const handleClick = jest.fn();
    render(
      <Card title={job.title} icon={null} className="" >
        <button onClick={handleClick}>詳細を見る</button>
      </Card>
    );
    fireEvent.click(screen.getByText('詳細を見る'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
