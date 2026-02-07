import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, PlayCircle, RefreshCcw, FileText } from 'lucide-react';
import Header from '../components/homepage/Header';

const defaultAssessments = [
  {
    id: 'frontend-fundamentals',
    title: 'Frontend Fundamentals',
    level: 'Intermediate',
    duration: '45 mins',
    category: 'Frontend',
    questions: [
      {
        text: 'Which CSS property controls stacking order?',
        options: ['position', 'z-index', 'display', 'overflow'],
        answer: 1,
      },
      {
        text: 'Which hook is best for memoizing expensive calculations?',
        options: ['useEffect', 'useMemo', 'useRef', 'useCallback'],
        answer: 1,
      },
      {
        text: 'What does React StrictMode do?',
        options: [
          'Runs app twice in production',
          'Highlights potential issues',
          'Adds hot reloading',
          'Disables warnings',
        ],
        answer: 1,
      },
      {
        text: 'Which HTTP status means resource created?',
        options: ['200', '201', '204', '301'],
        answer: 1,
      },
      {
        text: 'What improves performance for large lists in React?',
        options: ['Virtualization', 'Inline styles', 'Nested components', 'More state'],
        answer: 0,
      },
    ],
  },
  {
    id: 'sql-data-analysis',
    title: 'SQL & Data Analysis',
    level: 'Advanced',
    duration: '60 mins',
    category: 'Data',
    questions: [
      {
        text: 'Which clause filters aggregated results?',
        options: ['WHERE', 'HAVING', 'GROUP BY', 'ORDER BY'],
        answer: 1,
      },
      {
        text: 'What does a LEFT JOIN return?',
        options: ['Only matching rows', 'All right rows', 'All left rows', 'No nulls'],
        answer: 2,
      },
      {
        text: 'Which index type is best for range queries?',
        options: ['Hash', 'B-Tree', 'Bitmap only', 'Full-text only'],
        answer: 1,
      },
      {
        text: 'What does ETL stand for?',
        options: [
          'Extract, Transform, Load',
          'Evaluate, Track, Log',
          'Export, Transfer, Load',
          'Extract, Test, Link',
        ],
        answer: 0,
      },
      {
        text: 'A KPI should be:',
        options: ['Vague', 'Measurable', 'Hidden', 'Unchanging'],
        answer: 1,
      },
    ],
  },
  {
    id: 'product-thinking',
    title: 'Product Thinking',
    level: 'Beginner',
    duration: '30 mins',
    category: 'Product',
    questions: [
      {
        text: 'Which metric best captures retention?',
        options: ['CTR', 'DAU/MAU', 'CAC', 'ARPU'],
        answer: 1,
      },
      {
        text: 'A good PRD includes:',
        options: [
          'Only UI mocks',
          'User problem and success metrics',
          'Competitor list only',
          'Just timelines',
        ],
        answer: 1,
      },
      {
        text: 'MVP stands for:',
        options: [
          'Most Valuable Product',
          'Minimum Viable Product',
          'Main Visual Prototype',
          'Market Value Plan',
        ],
        answer: 1,
      },
      {
        text: 'Qualitative research helps answer:',
        options: ['Why', 'How many', 'Revenue', 'Latency'],
        answer: 0,
      },
      {
        text: 'Which tool maps user experience?',
        options: ['Funnel', 'Journey map', 'Burn down chart', 'Kanban'],
        answer: 1,
      },
    ],
  },
];

const getStoredAssessments = () => {
  const stored = localStorage.getItem('skillAssessmentsState');
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
};

const SkillAssessments = () => {
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState(() => {
    const stored = getStoredAssessments();
    if (!stored) {
      return defaultAssessments.map(assessment => ({
        ...assessment,
        status: 'not_started',
        score: null,
        attempts: 0,
        lastCompleted: null,
      }));
    }

    return defaultAssessments.map(assessment => {
      const saved = stored.find(item => item.id === assessment.id);
      return {
        ...assessment,
        status: saved?.status || 'not_started',
        score: saved?.score ?? null,
        attempts: saved?.attempts ?? 0,
        lastCompleted: saved?.lastCompleted ?? null,
      };
    });
  });

  const [activeAssessmentId, setActiveAssessmentId] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const payload = assessments.map(({ questions, ...rest }) => rest);
    localStorage.setItem('skillAssessmentsState', JSON.stringify(payload));
  }, [assessments]);

  const activeAssessment = useMemo(
    () => assessments.find(item => item.id === activeAssessmentId),
    [assessments, activeAssessmentId]
  );

  const stats = useMemo(() => {
    const completed = assessments.filter(item => item.status === 'completed');
    const averageScore = completed.length
      ? Math.round(completed.reduce((sum, item) => sum + (item.score || 0), 0) / completed.length)
      : 0;
    return {
      completed: completed.length,
      averageScore,
      upcoming: assessments.filter(item => item.status !== 'completed').length,
    };
  }, [assessments]);

  const startAssessment = assessment => {
    setActiveAssessmentId(assessment.id);
    setCurrentQuestion(0);
    setAnswers([]);
    setAssessments(prev =>
      prev.map(item =>
        item.id === assessment.id
          ? { ...item, status: 'in_progress', attempts: item.attempts + 1 }
          : item
      )
    );
  };

  const recordAnswer = optionIndex => {
    const nextAnswers = [...answers];
    nextAnswers[currentQuestion] = optionIndex;
    setAnswers(nextAnswers);
  };

  const finishAssessment = () => {
    if (!activeAssessment) return;
    const correct = activeAssessment.questions.reduce((sum, question, index) => {
      return sum + (answers[index] === question.answer ? 1 : 0);
    }, 0);
    const score = Math.round((correct / activeAssessment.questions.length) * 100);

    setAssessments(prev =>
      prev.map(item =>
        item.id === activeAssessment.id
          ? { ...item, status: 'completed', score, lastCompleted: new Date().toISOString() }
          : item
      )
    );
    setActiveAssessmentId(null);
    setCurrentQuestion(0);
    setAnswers([]);
  };

  const resetAssessment = assessmentId => {
    setAssessments(prev =>
      prev.map(item =>
        item.id === assessmentId
          ? { ...item, status: 'not_started', score: null, lastCompleted: null }
          : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-blue-600 font-medium mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Skill Assessments</h1>
            <p className="text-gray-600 mt-2">
              Validate your skills with curated assessments and share your results with recruiters.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 flex gap-6">
            <div>
              <p className="text-xs uppercase text-gray-500">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-gray-500">Avg. Score</p>
              <p className="text-2xl font-bold text-gray-900">{stats.averageScore}%</p>
            </div>
            <div>
              <p className="text-xs uppercase text-gray-500">Upcoming</p>
              <p className="text-2xl font-bold text-gray-900">{stats.upcoming}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {assessments.map(assessment => (
            <div
              key={assessment.id}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs uppercase text-indigo-500 font-semibold">
                    {assessment.category}
                  </p>
                  <h2 className="text-xl font-bold text-gray-900">{assessment.title}</h2>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                  {assessment.level}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                <span>{assessment.duration}</span>
                {assessment.status === 'completed' && (
                  <span className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    {assessment.score}%
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-3">
                {assessment.status !== 'completed' && (
                  <button
                    onClick={() => startAssessment(assessment)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                  >
                    <PlayCircle className="w-4 h-4" />
                    {assessment.status === 'in_progress' ? 'Resume' : 'Start'}
                  </button>
                )}
                {assessment.status === 'completed' && (
                  <button
                    onClick={() => startAssessment(assessment)}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:border-gray-300"
                  >
                    <RefreshCcw className="w-4 h-4" />
                    Retake
                  </button>
                )}
                <button
                  onClick={() => resetAssessment(assessment.id)}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:border-gray-300"
                >
                  <FileText className="w-4 h-4" />
                  Reset
                </button>
              </div>
              {assessment.lastCompleted && (
                <p className="text-xs text-gray-500 mt-4">
                  Last completed: {new Date(assessment.lastCompleted).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {activeAssessment && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs uppercase text-indigo-500 font-semibold">
                  {activeAssessment.category}
                </p>
                <h3 className="text-xl font-bold text-gray-900">{activeAssessment.title}</h3>
              </div>
              <p className="text-sm text-gray-500">
                Question {currentQuestion + 1} of {activeAssessment.questions.length}
              </p>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold text-gray-900 mb-4">
                {activeAssessment.questions[currentQuestion].text}
              </p>
              <div className="space-y-3">
                {activeAssessment.questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={option}
                    onClick={() => recordAnswer(index)}
                    className={`w-full text-left px-4 py-3 border rounded-lg transition ${
                      answers[currentQuestion] === index
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setActiveAssessmentId(null)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Exit Assessment
              </button>
              {currentQuestion < activeAssessment.questions.length - 1 ? (
                <button
                  onClick={() => setCurrentQuestion(prev => prev + 1)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium"
                >
                  Next Question
                </button>
              ) : (
                <button
                  onClick={finishAssessment}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium"
                >
                  Finish Assessment
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillAssessments;
