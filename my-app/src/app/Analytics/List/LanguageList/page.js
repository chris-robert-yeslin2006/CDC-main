'use client';

import { useSearchParams, useRouter } from 'next/navigation';

const languages = ['Japanese', 'Mandarin', 'German', 'Spanish', 'French', 'English'];

export default function LanguageList() {
  const searchParams = useSearchParams();
  const orgId = searchParams.get('orgId'); // ✅ CORRECT

  const router = useRouter();

  return (
    <div className="analytics-container">
      <h2>Languages</h2>
      {languages.map(lang => (
        <div key={lang} className="analytics-card">
          <h3>{lang}</h3>
          <button
            onClick={() =>
              router.push(
                `/Analytics/List/LanguageList/LanguageDetails?orgId=${orgId}&language=${lang}`
              )
            }
          >
            View Details
          </button>
        </div>
      ))}
    </div>
  );
}
