import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';
import { MemoryRouter } from 'react-router-dom';

// TC-003: 会社情報・SNSリンクが正しいURLを指していること

describe('Footer', () => {
  it('should render company info and SNS links with correct URLs (TC-003)', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText('Donrichy株式会社')).toBeInTheDocument();
    const xLink = screen.getByLabelText('X');
    expect(xLink).toHaveAttribute('href', expect.stringContaining('twitter.com'));
    expect(xLink).toHaveAttribute('target', '_blank');
    const linkedinLink = screen.getByLabelText('LinkedIn');
    expect(linkedinLink).toHaveAttribute('href', expect.stringContaining('linkedin.com'));
    expect(linkedinLink).toHaveAttribute('target', '_blank');
  });
});
