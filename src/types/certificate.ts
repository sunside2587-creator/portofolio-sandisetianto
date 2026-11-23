export type CertificateCategory = 'course' | 'program' | 'event' | 'award';
export type CertificateFilter = 'all' | CertificateCategory;

export interface CertificateImage {
  readonly thumb: string;
  readonly full: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

export interface Certificate {
  readonly id: string;
  readonly title: string;
  readonly issuer: string;
  readonly category: CertificateCategory;
  readonly issuedAt: string | null;
  readonly expiresAt?: string;
  readonly credentialId?: string;
  readonly verifyUrl?: string;
  readonly rank?: string;
  readonly image?: CertificateImage;
  readonly pdfUrl?: string;
  readonly featured?: boolean;
  readonly featuredHighlight?: boolean;
  readonly skills?: readonly string[];
}
