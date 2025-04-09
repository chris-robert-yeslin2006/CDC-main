'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LanguageDetailPage() {
  const searchParams = useSearchParams();
  const orgId = searchParams.get('orgId'); // ✅ match the new name
  const language = searchParams.get('language'); // ✅ match the new name

  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/analytics/students?org_id=${orgId}&language=${language}`
        );
        const data = await res.json();
        setStudents(data.students || []);
      } catch (error) {
        console.error('Error fetching language details:', error);
      }
    };

    if (orgId && language) fetchStudents();
  }, [orgId, language]);

  return (
    <div className="language-detail-container">
      <h1 className="heading">{language} - Student Details</h1>
      {students.length === 0 ? (
        <p className="no-data">No students found for this language.</p>
      ) : (
        <table className="student-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Overall Mark</th>
              <th>Average</th>
              <th>Recent Test</th>
              <th>Fluency</th>
              <th>Vocabulary</th>
              <th>Sentence Mastery</th>
              <th>Pronunciation</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.overall_mark}</td>
                <td>{student.average_mark}</td>
                <td>{student.recent_test_mark}</td>
                <td>{student.fluency_mark}</td>
                <td>{student.vocab_mark}</td>
                <td>{student.sentence_mastery}</td>
                <td>{student.pronunciation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
