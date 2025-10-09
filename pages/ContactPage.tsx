
import React, { useState } from 'react';
import Button from '../components/Button';

const ContactPage: React.FC = () => {
  const [candidateForm, setCandidateForm] = useState({ name: '', email: '', experience: '' });
  const [clientForm, setClientForm] = useState({ company: '', name: '', email: '', inquiry: '' });
  const [formSubmitted, setFormSubmitted] = useState<string | null>(null);

  const handleCandidateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCandidateForm(prev => ({ ...prev, [name]: value }));
  };

  const handleClientChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setClientForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (formType: 'candidate' | 'client') => (e: React.FormEvent) => {
    e.preventDefault();
    if (formType === 'candidate') {
      console.log('Candidate Form Submitted:', candidateForm);
    } else {
      console.log('Client Form Submitted:', clientForm);
    }
    setFormSubmitted(`お問い合わせありがとうございます。内容を確認の上、担当者よりご連絡いたします。`);
  };

  if (formSubmitted) {
    return (
      <div className="container mx-auto px-4 py-16 md:py-24 text-center">
        <h1 className="text-3xl font-bold text-primary">送信完了</h1>
        <p className="mt-4 text-lg">{formSubmitted}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900">お問い合わせ</h1>
        <p className="mt-4 text-lg text-neutral-700">案件へのご応募、事業に関するご相談など、お気軽にご連絡ください。</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Form for Candidates */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">案件参画をご希望の方</h2>
          <form onSubmit={handleSubmit('candidate')} className="space-y-6 bg-neutral-50 p-8 rounded-lg shadow-md">
            <div>
              <label htmlFor="candidate-name" className="block text-lg font-medium text-neutral-700">お名前</label>
              <input type="text" name="name" id="candidate-name" required value={candidateForm.name} onChange={handleCandidateChange} className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <label htmlFor="candidate-email" className="block text-lg font-medium text-neutral-700">メールアドレス</label>
              <input type="email" name="email" id="candidate-email" required value={candidateForm.email} onChange={handleCandidateChange} className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <label htmlFor="experience" className="block text-lg font-medium text-neutral-700">経験概要</label>
              <textarea name="experience" id="experience" rows={5} required value={candidateForm.experience} onChange={handleCandidateChange} className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" placeholder="GCPでのインフラ構築経験3年、など"></textarea>
            </div>
            <Button type="submit" className="w-full" size="lg">送信する</Button>
          </form>
        </div>

        {/* Form for Clients */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">企業ご担当者様</h2>
          <form onSubmit={handleSubmit('client')} className="space-y-6 bg-neutral-50 p-8 rounded-lg shadow-md">
            <div>
              <label htmlFor="company" className="block text-lg font-medium text-neutral-700">会社名</label>
              <input type="text" name="company" id="company" required value={clientForm.company} onChange={handleClientChange} className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <label htmlFor="client-name" className="block text-lg font-medium text-neutral-700">ご担当者名</label>
              <input type="text" name="name" id="client-name" required value={clientForm.name} onChange={handleClientChange} className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <label htmlFor="client-email" className="block text-lg font-medium text-neutral-700">メールアドレス</label>
              <input type="email" name="email" id="client-email" required value={clientForm.email} onChange={handleClientChange} className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <label htmlFor="inquiry" className="block text-lg font-medium text-neutral-700">お問い合わせ内容</label>
              <textarea name="inquiry" id="inquiry" rows={5} required value={clientForm.inquiry} onChange={handleClientChange} className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" placeholder="SRE支援に関するご相談、など"></textarea>
            </div>
            <Button type="submit" className="w-full" size="lg" variant="secondary">送信する</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
