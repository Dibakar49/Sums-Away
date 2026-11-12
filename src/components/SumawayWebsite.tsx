/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Star,
  Play,
  Sparkles,
  Check,
  X,
  Delete,
  Lightbulb,
  FastForward,
  Compass,
  Award,
  BarChart3,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Clock,
  GraduationCap,
  CheckCircle2,
  XCircle,
  Volume2,
  VolumeX,
  RotateCcw,
  Mail,
} from 'lucide-react';
import { POLICY_METADATA } from '../utils/policyData';

interface SumawayWebsiteProps {
  onNavigateToPrivacy: () => void;
}

interface AppScreenSlide {
  id: string;
  tabLabel: string;
  headline: string;
  subheadline: string;
  image: string;
  description: string;
  highlights: string[];
}

const APP_SCREENS: AppScreenSlide[] = [
  {
    id: 'home',
    tabLabel: 'Daily Home',
    headline: 'A little learning, every day',
    subheadline: 'Play offline · No ads',
    image: '/assets/aistudio/image_161af807.png',
    description:
      'Kids open a welcoming, distraction-free home screen with their chosen explorer avatar, current XP progress bar, Treasure Trail milestones, earned badges, and quick access to the Parental Dashboard.',
    highlights: [
      'Instant Continue button picks up right where your child left off',
      'Treasure Trail rewards consistent practice after completing levels',
      'My Badges showcase highlights recent star and sunshine achievements',
      '100% offline gameplay with zero third-party advertisements',
    ],
  },
  {
    id: 'worlds',
    tabLabel: '5 Worlds · 100 Levels',
    headline: 'A world of little victories',
    subheadline: '5 worlds · 100 levels',
    image: '/assets/aistudio/image_63f899c8.png',
    description:
      'Journey through 5 handcrafted themed worlds starting in Meadow Valley. Children advance step by step across 100 levels, earning up to 3 stars on every stepping stone and unlocking treasure chests along the path.',
    highlights: [
      '5 distinct adventure worlds with 100 structured math levels',
      'Up to 3 gold stars per level to encourage accuracy and replay',
      'Milestone treasure chests tucked along the winding valley trail',
      'Gentle difficulty curve designed for young learners',
    ],
  },
  {
    id: 'tap-mode',
    tabLabel: 'Tap Your Answer',
    headline: 'Little steps. Big discoveries.',
    subheadline: 'Math games for curious kids',
    image: '/assets/aistudio/image_2f0ff38e.png',
    description:
      'Designed for early confidence, Tap Your Answer presents clear, high-contrast sums with friendly choice cards, an optional Help hint button for visual guidance, and a stress-free Skip option.',
    highlights: [
      'Large, tactile answer tiles tailored for young fingers',
      'Built-in Help button offers gentle hints when a child gets stuck',
      'Comfortable 10-question rounds per level in Meadow Valley',
      'Skip option ensures kids never feel frustrated or trapped',
    ],
  },
  {
    id: 'type-mode',
    tabLabel: 'Type Your Answer',
    headline: 'Build number confidence',
    subheadline: 'Simple sums. A comfortable pace.',
    image: '/assets/aistudio/image_bdadee95.png',
    description:
      'When learners are ready to recall sums independently, Type Your Answer provides a colorful, responsive number pad so children can enter answers at their own comfortable pace.',
    highlights: [
      'Color-coded 0–9 number keypad with clear backspace and check keys',
      'No stressful countdown timers—children think at their own pace',
      'Audio toggle in the top corner for quiet or sound-guided play',
      'Builds mental arithmetic fluency step by step',
    ],
  },
  {
    id: 'badges',
    tabLabel: 'Badges & Rewards',
    headline: 'Celebrate every little win',
    subheadline: 'Earn badges as you learn',
    image: '/assets/aistudio/image_9b66dbd4.png',
    description:
      'Every milestone is celebrated with cheerful collectible 3D badges and Special Star Badges at 10, 25, and 50 Level Stars—turning daily math practice into a rewarding habit.',
    highlights: [
      '9+ themed skill badges for addition, subtraction, streaks, and speed',
      'Special Star Badges unlocked at 10, 25, and 50 Level Stars',
      'Dedicated Badges and Rewards collection tabs',
      'All rewards are earned through learning—never in-app purchases',
    ],
  },
  {
    id: 'parents',
    tabLabel: 'Parental Dashboard',
    headline: 'See their learning journey',
    subheadline: 'Daily, weekly and monthly insights',
    image: '/assets/aistudio/image_26f27e09.png',
    description:
      'Parents can check progress anytime on the same phone with no account or cloud upload required. View App Screen Time, active Learning Time, Correct vs. Incorrect answers, and daily practice bar charts.',
    highlights: [
      'Filter local activity by Today, Last 7 days, This month, or All time',
      'Separates total App Screen Time from active Learning Time',
      'Tracks Correct and Incorrect answer counts plus daily app time bars',
      'Stored locally on your phone—opens directly without a PIN or login',
    ],
  },
];

interface MathQuestion {
  a: number;
  b: number;
  operator: '+' | '-';
  answer: number;
  choices: [number, number];
  hintText: string;
}

const SAMPLE_QUESTIONS: MathQuestion[] = [
  {
    a: 3,
    b: 2,
    operator: '+',
    answer: 5,
    choices: [4, 5],
    hintText: 'Start at 3 and count 2 more stars: 4, 5!',
  },
  {
    a: 1,
    b: 2,
    operator: '+',
    answer: 3,
    choices: [3, 4],
    hintText: '1 star plus 2 more stars makes 3 stars altogether!',
  },
  {
    a: 4,
    b: 3,
    operator: '+',
    answer: 7,
    choices: [6, 7],
    hintText: 'Start with 4 and add 3 steps forward: 5, 6, 7!',
  },
  {
    a: 6,
    b: 2,
    operator: '-',
    answer: 4,
    choices: [4, 5],
    hintText: 'Start with 6 items and take away 2: you have 4 left!',
  },
  {
    a: 5,
    b: 4,
    operator: '+',
    answer: 9,
    choices: [8, 9],
    hintText: '5 plus 4 equals 9—almost a full 10!',
  },
];

type TimeRangeKey = 'today' | '7days' | 'month' | 'all';

interface DashboardTimeData {
  label: string;
  screenTimeMin: number;
  learningTimeMin: number;
  correct: number;
  incorrect: number;
  answerChecks: number;
  dailyBars: { day: string; min: number }[];
}

const DASHBOARD_DATA: Record<TimeRangeKey, DashboardTimeData> = {
  today: {
    label: 'Today',
    screenTimeMin: 11,
    learningTimeMin: 9,
    correct: 8,
    incorrect: 1,
    answerChecks: 9,
    dailyBars: [
      { day: 'Mon', min: 8 },
      { day: 'Tue', min: 12 },
      { day: 'Wed', min: 10 },
      { day: 'Thu', min: 6 },
      { day: 'Fri', min: 14 },
      { day: 'Sat', min: 9 },
      { day: 'Sun', min: 11 },
    ],
  },
  '7days': {
    label: 'Last 7 days',
    screenTimeMin: 70,
    learningTimeMin: 49,
    correct: 42,
    incorrect: 8,
    answerChecks: 50,
    dailyBars: [
      { day: 'Mon', min: 8 },
      { day: 'Tue', min: 12 },
      { day: 'Wed', min: 10 },
      { day: 'Thu', min: 6 },
      { day: 'Fri', min: 14 },
      { day: 'Sat', min: 9 },
      { day: 'Sun', min: 11 },
    ],
  },
  month: {
    label: 'This month',
    screenTimeMin: 265,
    learningTimeMin: 198,
    correct: 176,
    incorrect: 24,
    answerChecks: 200,
    dailyBars: [
      { day: 'Mon', min: 10 },
      { day: 'Tue', min: 14 },
      { day: 'Wed', min: 11 },
      { day: 'Thu', min: 9 },
      { day: 'Fri', min: 15 },
      { day: 'Sat', min: 12 },
      { day: 'Sun', min: 13 },
    ],
  },
  all: {
    label: 'All time',
    screenTimeMin: 640,
    learningTimeMin: 510,
    correct: 468,
    incorrect: 52,
    answerChecks: 520,
    dailyBars: [
      { day: 'Mon', min: 11 },
      { day: 'Tue', min: 13 },
      { day: 'Wed', min: 12 },
      { day: 'Thu', min: 10 },
      { day: 'Fri', min: 16 },
      { day: 'Sat', min: 14 },
      { day: 'Sun', min: 12 },
    ],
  },
};

export const SumawayWebsite: React.FC<SumawayWebsiteProps> = ({ onNavigateToPrivacy }) => {
  // Hero / App Showcase active slide
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  // Interactive Math Mini-Game state
  const [gameMode, setGameMode] = useState<'tap' | 'type'>('tap');
  const [questionIdx, setQuestionIdx] = useState(0);
  const [typedInput, setTypedInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'try-again'>('idle');
  const [xp, setXp] = useState(40);
  const [starsCount, setStarsCount] = useState(12);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Interactive Parental Dashboard state
  const [dashboardRange, setDashboardRange] = useState<TimeRangeKey>('7days');
  const [dashboardTab, setDashboardTab] = useState<'Overview' | 'Learning' | 'Reports' | 'Preferences'>('Overview');

  const currentQuestion = SAMPLE_QUESTIONS[questionIdx];
  const activeSlide = APP_SCREENS[activeSlideIndex];
  const activeDashboard = DASHBOARD_DATA[dashboardRange];

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCheckAnswer = (submittedAnswer: number) => {
    if (submittedAnswer === currentQuestion.answer) {
      setFeedback('correct');
      setXp((prev) => Math.min(100, prev + 20));
      setStarsCount((prev) => prev + 1);
      setTimeout(() => {
        setFeedback('idle');
        setTypedInput('');
        setShowHint(false);
        setQuestionIdx((prev) => (prev + 1) % SAMPLE_QUESTIONS.length);
      }, 1100);
    } else {
      setFeedback('try-again');
      setTimeout(() => {
        setFeedback('idle');
      }, 900);
    }
  };

  const handleKeypadPress = (digit: string) => {
    if (feedback === 'correct') return;
    setFeedback('idle');
    setTypedInput((prev) => (prev.length < 2 ? prev + digit : prev));
  };

  const handleSkipQuestion = () => {
    setFeedback('idle');
    setTypedInput('');
    setShowHint(false);
    setQuestionIdx((prev) => (prev + 1) % SAMPLE_QUESTIONS.length);
  };

  const handleResetGame = () => {
    setQuestionIdx(0);
    setTypedInput('');
    setShowHint(false);
    setFeedback('idle');
    setXp(40);
    setStarsCount(12);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 font-sans selection:bg-amber-200">
      {/* Top Navigation Bar — Strict 3-Zone Contract */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-element Brand Wordmark */}
          <a
            href="/website"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xl font-sans font-extrabold tracking-tight text-indigo-950 whitespace-nowrap shrink-0"
          >
            Sumaway
          </a>

          {/* Zone 2: 5 Single-Line Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600" aria-label="Website Navigation">
            <button
              onClick={() => scrollToSection('interactive-play')}
              className="hover:text-indigo-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Try Math Game
            </button>
            <button
              onClick={() => scrollToSection('app-screens')}
              className="hover:text-indigo-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              App Screens
            </button>
            <button
              onClick={() => scrollToSection('worlds-badges')}
              className="hover:text-indigo-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Worlds & Badges
            </button>
            <button
              onClick={() => scrollToSection('parent-dashboard')}
              className="hover:text-indigo-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Parent Dashboard
            </button>
            <button
              onClick={onNavigateToPrivacy}
              className="hover:text-indigo-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Privacy Policy
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center shrink-0">
            <button
              onClick={() => scrollToSection('interactive-play')}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-indigo-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
            >
              Play Sample Level
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* 1. Animated Hero Section */}
        <section className="relative overflow-hidden pt-10 pb-16 sm:pt-14 sm:pb-24 border-b border-stone-200/80 bg-gradient-to-b from-sky-50/70 via-[#FAF8F5] to-[#FAF8F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Brand Proposition & Controls */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="lg:col-span-7 space-y-6"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-indigo-900/80">
                  <span>Math Games for Kids</span>
                  <span aria-hidden="true">·</span>
                  <span>Play Offline</span>
                  <span aria-hidden="true">·</span>
                  <span>No Ads</span>
                  <span aria-hidden="true">·</span>
                  <span>5 Worlds &amp; 100 Levels</span>
                </div>

                <h1
                  className="font-sans font-extrabold text-indigo-950 tracking-tight leading-[1.08]"
                  style={{ fontSize: 'clamp(2.35rem, 4.5vw, 3.85rem)', textWrap: 'balance' }}
                >
                  A little learning, every day.
                </h1>

                <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl">
                  <strong>Sumaway</strong> helps children build number confidence with simple sums at a comfortable pace. Explore 5 vibrant worlds across 100 levels, collect cheerful star badges, and review daily learning insights directly on your phone—completely offline and free of ads.
                </p>

                {/* Primary Decision Block */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => scrollToSection('interactive-play')}
                    className="inline-flex items-center gap-2 px-6 py-3.5 text-sm sm:text-base font-bold text-indigo-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-sm transition-transform active:scale-98 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Play className="w-4 h-4 fill-indigo-950" />
                    <span>Try Interactive Math Level</span>
                  </button>

                  <button
                    onClick={onNavigateToPrivacy}
                    className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-slate-800 bg-white hover:bg-stone-100 border border-stone-300 rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>Official Privacy Policy</span>
                  </button>
                </div>

                {/* Screen Switcher Bar for the Hero Showcase */}
                <div className="pt-4">
                  <p className="text-xs font-mono text-slate-500 mb-2.5">
                    Select an app screen to preview ({activeSlideIndex + 1} of {APP_SCREENS.length}):
                  </p>
                  <div className="flex flex-wrap gap-1.5 p-1.5 bg-stone-200/70 rounded-xl max-w-xl">
                    {APP_SCREENS.map((screen, idx) => (
                      <button
                        key={screen.id}
                        onClick={() => setActiveSlideIndex(idx)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                          activeSlideIndex === idx
                            ? 'bg-indigo-950 text-white shadow-xs'
                            : 'text-slate-700 hover:text-indigo-950 hover:bg-white/60'
                        }`}
                      >
                        {screen.tabLabel}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Animated Phone Screen Showcase */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-5 flex flex-col items-center"
              >
                <div className="relative w-full max-w-[340px] sm:max-w-[360px]">
                  {/* Animated Floating Equation Card */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                    className="hidden sm:flex items-center gap-2.5 px-3.5 py-2 bg-white border border-stone-200 rounded-xl shadow-md absolute -left-10 top-8 z-20"
                  >
                    <span className="text-sm font-extrabold text-emerald-600 tabular-nums">1 + 2 = 3</span>
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  </motion.div>

                  {/* Animated Floating Stars Counter */}
                  <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
                    className="hidden sm:flex items-center gap-2 px-3.5 py-2 bg-white border border-stone-200 rounded-xl shadow-md absolute -right-8 bottom-20 z-20"
                  >
                    <Award className="w-4 h-4 text-purple-600" />
                    <span className="text-xs font-bold text-indigo-950">5 Worlds · 100 Levels</span>
                  </motion.div>

                  {/* Phone Frame */}
                  <div className="rounded-[28px] bg-indigo-950 p-3 shadow-xl border border-indigo-900">
                    <div className="rounded-[20px] overflow-hidden bg-sky-100 aspect-[9/16] relative">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeSlide.id}
                          initial={{ opacity: 0, x: 16 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -16 }}
                          transition={{ duration: 0.25 }}
                          className="w-full h-full"
                        >
                          {!failedImages[activeSlide.id] ? (
                            <img
                              src={activeSlide.image}
                              alt={`${activeSlide.headline} - Sumaway App Screen`}
                              referrerPolicy="no-referrer"
                              onError={() => handleImageError(activeSlide.id)}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-sky-200 to-emerald-100">
                              <Sparkles className="w-10 h-10 text-indigo-900 mb-3" />
                              <p className="text-lg font-extrabold text-indigo-950">{activeSlide.headline}</p>
                              <p className="text-xs text-indigo-900/80 mt-1">{activeSlide.subheadline}</p>
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Caption & Prev/Next Controls */}
                  <div className="mt-4 flex items-center justify-between gap-4 px-1">
                    <div>
                      <p className="text-sm font-bold text-indigo-950">{activeSlide.headline}</p>
                      <p className="text-xs text-slate-600">{activeSlide.subheadline}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() =>
                          setActiveSlideIndex((prev) => (prev - 1 + APP_SCREENS.length) % APP_SCREENS.length)
                        }
                        aria-label="Previous app screen"
                        className="p-2 rounded-lg bg-white hover:bg-stone-100 border border-stone-200 text-slate-700 transition-colors cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setActiveSlideIndex((prev) => (prev + 1) % APP_SCREENS.length)}
                        aria-label="Next app screen"
                        className="p-2 rounded-lg bg-white hover:bg-stone-100 border border-stone-200 text-slate-700 transition-colors cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Full-Width 4-Column Key Highlights Strip Below Hero */}
            <div className="mt-14 pt-8 border-t border-stone-200/90 grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <p className="text-2xl sm:text-3xl font-sans font-extrabold text-indigo-950 tabular-nums">
                  5 Worlds · 100 Levels
                </p>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Step-by-step math adventures starting in Meadow Valley
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-sans font-extrabold text-indigo-950">
                  2 Play Modes
                </p>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Tap Your Answer choices &amp; Type Your Answer keypad
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-sans font-extrabold text-indigo-950">
                  100% Offline
                </p>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  No internet required, zero ads, and no login accounts
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-sans font-extrabold text-indigo-950">
                  Local Dashboard
                </p>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Daily, weekly &amp; monthly parent insights stored on your phone
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Interactive Math Practice Playground ("Try a Level") */}
        <section id="interactive-play" className="py-16 sm:py-24 bg-white border-b border-stone-200/80 scroll-mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <p className="text-xs font-mono uppercase tracking-wider text-indigo-900/70 mb-2">
                01. Interactive Math Playground
              </p>
              <h2
                className="text-2xl sm:text-4xl font-sans font-extrabold text-indigo-950 tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Little steps. Big discoveries. Try both practice modes right here.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                Switch between <strong>Tap your answer</strong> (guided choices with visual hints) and{' '}
                <strong>Type your answer</strong> (tactile number keypad) — modeled directly on Level 1 of Meadow Valley.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left 7 Columns: Live Interactive Game Board */}
              <div className="lg:col-span-7 bg-gradient-to-b from-sky-100/90 via-sky-50 to-emerald-50/80 border border-stone-200 rounded-2xl p-5 sm:p-8 flex flex-col justify-between">
                {/* Game Top Header Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-sky-200/70">
                  <div className="flex items-center gap-3">
                    <div className="px-3.5 py-1.5 bg-white rounded-xl border border-stone-200 shadow-2xs">
                      <span className="text-xs font-extrabold text-indigo-950 block">Level 1 · Meadow Valley</span>
                      <span className="text-[11px] text-slate-500 font-mono tabular-nums">
                        Question {questionIdx + 1} / {SAMPLE_QUESTIONS.length}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-xl border border-stone-200 shadow-2xs">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="text-xs font-extrabold text-indigo-950 tabular-nums">{starsCount}</span>
                    </div>
                  </div>

                  {/* Mode Switcher */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 p-1 bg-white/90 border border-stone-200 rounded-xl">
                      <button
                        onClick={() => {
                          setGameMode('tap');
                          setFeedback('idle');
                        }}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                          gameMode === 'tap'
                            ? 'bg-indigo-950 text-white'
                            : 'text-slate-600 hover:text-indigo-950'
                        }`}
                      >
                        Tap Answer
                      </button>
                      <button
                        onClick={() => {
                          setGameMode('type');
                          setFeedback('idle');
                        }}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                          gameMode === 'type'
                            ? 'bg-indigo-950 text-white'
                            : 'text-slate-600 hover:text-indigo-950'
                        }`}
                      >
                        Type Keypad
                      </button>
                    </div>

                    <button
                      onClick={() => setSoundEnabled((prev) => !prev)}
                      aria-label={soundEnabled ? 'Mute sound effects' : 'Unmute sound effects'}
                      className="p-2 bg-white border border-stone-200 rounded-xl text-indigo-950 hover:bg-stone-50 transition-colors cursor-pointer"
                    >
                      {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
                    </button>
                  </div>
                </div>

                {/* XP Progress Bar */}
                <div className="my-4 flex items-center gap-3">
                  <span className="text-xs font-extrabold text-indigo-950 whitespace-nowrap">Level 3</span>
                  <div className="flex-1 h-3 bg-white rounded-full overflow-hidden border border-stone-200 p-0.5">
                    <motion.div
                      animate={{ width: `${xp}%` }}
                      transition={{ duration: 0.3 }}
                      className="h-full bg-amber-400 rounded-full"
                    />
                  </div>
                  <span className="text-xs font-extrabold text-indigo-950 font-mono tabular-nums whitespace-nowrap">
                    {xp} / 100 XP
                  </span>
                </div>

                {/* Equation Board */}
                <div className="my-2 bg-[#FFFDF9] border-2 border-purple-300 rounded-2xl p-6 text-center shadow-xs">
                  <p className="text-sm font-extrabold text-indigo-950 mb-3">
                    {gameMode === 'tap' ? 'Tap your answer' : 'Type your answer'}
                  </p>

                  <div className="flex items-center justify-center gap-3 sm:gap-5 text-4xl sm:text-6xl font-sans font-extrabold tabular-nums">
                    <span className="text-emerald-500">{currentQuestion.a}</span>
                    <span className="text-indigo-950">{currentQuestion.operator}</span>
                    <span className="text-purple-500">{currentQuestion.b}</span>
                    <span className="text-indigo-950">=</span>

                    {gameMode === 'tap' ? (
                      <span className="text-indigo-950">
                        {feedback === 'correct' ? currentQuestion.answer : '?'}
                      </span>
                    ) : (
                      <div className="min-w-[72px] sm:min-w-[88px] h-14 sm:h-16 px-3 rounded-xl border-2 border-purple-300 bg-amber-50/50 flex items-center justify-center text-3xl sm:text-5xl text-indigo-950">
                        {typedInput || <span className="text-indigo-950/30">|</span>}
                      </div>
                    )}
                  </div>

                  {/* Feedback or Hint Banner */}
                  <AnimatePresence mode="wait">
                    {feedback === 'correct' && (
                      <motion.div
                        key="correct"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-4 inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-700"
                      >
                        <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                        <span>Awesome job! +20 XP &amp; +1 Star earned!</span>
                      </motion.div>
                    )}
                    {feedback === 'try-again' && (
                      <motion.div
                        key="try-again"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-4 inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-800"
                      >
                        <span>Almost! Try counting one more time or tap Help below.</span>
                      </motion.div>
                    )}
                    {showHint && feedback === 'idle' && (
                      <motion.div
                        key="hint"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs font-medium text-indigo-950"
                      >
                        <p>{currentQuestion.hintText}</p>
                        <div className="flex items-center justify-center gap-1.5 mt-2">
                          {Array.from({ length: currentQuestion.answer }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Controls Area: Tap Choices vs Type Keypad */}
                {gameMode === 'tap' ? (
                  <div className="mt-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {currentQuestion.choices.map((choice, idx) => (
                        <button
                          key={choice}
                          onClick={() => handleCheckAnswer(choice)}
                          className={`py-6 rounded-2xl text-3xl sm:text-4xl font-sans font-extrabold text-indigo-950 shadow-xs border-b-4 transition-transform active:scale-98 cursor-pointer tabular-nums ${
                            idx === 0
                              ? 'bg-emerald-300 hover:bg-emerald-200 border-emerald-500'
                              : 'bg-purple-300 hover:bg-purple-200 border-purple-500'
                          }`}
                        >
                          {choice}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={() => setShowHint((prev) => !prev)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-indigo-950 transition-colors cursor-pointer"
                      >
                        <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                        <span>{showHint ? 'Hide Help' : 'Help'}</span>
                      </button>

                      <button
                        onClick={handleResetGame}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-indigo-950 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset XP</span>
                      </button>

                      <button
                        onClick={handleSkipQuestion}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-indigo-950 transition-colors cursor-pointer"
                      >
                        <span>Skip</span>
                        <FastForward className="w-3.5 h-3.5 text-indigo-950" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 space-y-3">
                    <div className="grid grid-cols-3 gap-2.5">
                      {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit, i) => {
                        const colors = [
                          'bg-emerald-200 hover:bg-emerald-100 border-emerald-400',
                          'bg-purple-200 hover:bg-purple-100 border-purple-400',
                          'bg-orange-200 hover:bg-orange-100 border-orange-400',
                          'bg-amber-200 hover:bg-amber-100 border-amber-400',
                          'bg-sky-200 hover:bg-sky-100 border-sky-400',
                          'bg-emerald-200 hover:bg-emerald-100 border-emerald-400',
                          'bg-purple-200 hover:bg-purple-100 border-purple-400',
                          'bg-orange-200 hover:bg-orange-100 border-orange-400',
                          'bg-amber-200 hover:bg-amber-100 border-amber-400',
                        ];
                        return (
                          <button
                            key={digit}
                            onClick={() => handleKeypadPress(digit)}
                            className={`py-3 rounded-xl text-xl font-extrabold text-indigo-950 border-b-2 transition-transform active:scale-98 cursor-pointer tabular-nums ${colors[i]}`}
                          >
                            {digit}
                          </button>
                        );
                      })}
                      <button
                        onClick={() => setTypedInput((prev) => prev.slice(0, -1))}
                        aria-label="Backspace"
                        className="py-3 rounded-xl bg-sky-200 hover:bg-sky-100 border-b-2 border-sky-400 flex items-center justify-center text-indigo-950 cursor-pointer"
                      >
                        <Delete className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleKeypadPress('0')}
                        className="py-3 rounded-xl text-xl font-extrabold text-indigo-950 bg-purple-200 hover:bg-purple-100 border-b-2 border-purple-400 cursor-pointer tabular-nums"
                      >
                        0
                      </button>
                      <button
                        onClick={() => {
                          if (typedInput !== '') {
                            handleCheckAnswer( Number(typedInput) );
                          }
                        }}
                        aria-label="Submit answer"
                        className="py-3 rounded-xl bg-emerald-300 hover:bg-emerald-200 border-b-2 border-emerald-500 flex items-center justify-center text-emerald-950 cursor-pointer"
                      >
                        <Check className="w-6 h-6 stroke-[3]" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={() => setShowHint((prev) => !prev)}
                        className="text-xs font-bold text-indigo-900 hover:underline cursor-pointer"
                      >
                        {showHint ? 'Hide Hint' : 'Need a Hint?'}
                      </button>
                      <button
                        onClick={handleSkipQuestion}
                        className="text-xs font-bold text-slate-600 hover:text-indigo-950 cursor-pointer"
                      >
                        Skip Question
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Right 5 Columns: Side-by-Side Comparison of the 2 Modes from Screenshots */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-6">
                <div className="p-6 bg-[#FAF8F5] border border-stone-200 rounded-2xl flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-mono text-indigo-900/70 mb-1">
                      Mode 01 · Guided Discovery
                    </div>
                    <h3 className="text-xl font-sans font-extrabold text-indigo-950">
                      Tap your answer: Little steps, big discoveries
                    </h3>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                      Ideal for younger children starting out with addition and subtraction. Two clear choices let kids focus on number sense, supported by a one-tap <strong>Help</strong> button and <strong>Skip</strong> control.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-stone-200/80 flex items-center justify-between text-xs text-slate-600">
                    <span>Level 1 · Meadow Valley</span>
                    <button
                      onClick={() => setGameMode('tap')}
                      className="font-bold text-indigo-950 underline underline-offset-2 cursor-pointer"
                    >
                      Switch to Tap Mode
                    </button>
                  </div>
                </div>

                <div className="p-6 bg-[#FAF8F5] border border-stone-200 rounded-2xl flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-mono text-indigo-900/70 mb-1">
                      Mode 02 · Independent Recall
                    </div>
                    <h3 className="text-xl font-sans font-extrabold text-indigo-950">
                      Type your answer: Build number confidence
                    </h3>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                      As learners progress through the 5 worlds, the colorful 0–9 keypad invites them to calculate and enter sums on their own—building lasting arithmetic fluency at a comfortable pace.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-stone-200/80 flex items-center justify-between text-xs text-slate-600">
                    <span>Simple sums · Comfortable pace</span>
                    <button
                      onClick={() => setGameMode('type')}
                      className="font-bold text-indigo-950 underline underline-offset-2 cursor-pointer"
                    >
                      Switch to Keypad Mode
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Complete 6-Screen App Tour */}
        <section id="app-screens" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-stone-200/80 scroll-mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-indigo-900/70 mb-2">
                  02. Complete App Walkthrough
                </p>
                <h2
                  className="text-2xl sm:text-4xl font-sans font-extrabold text-indigo-950 tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  Every screen crafted for calm, joyful math practice
                </h2>
              </div>
              <p className="text-sm text-slate-600 max-w-md">
                Explore all 6 screens from the offline Android version of Sumaway—from Meadow Valley's level trail to the on-device Parental Dashboard.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {APP_SCREENS.map((screen, index) => (
                <motion.article
                  key={screen.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className="bg-white border border-stone-200 rounded-2xl overflow-hidden flex flex-col justify-between shadow-2xs"
                >
                  <div>
                    {/* Screen Image Container */}
                    <div className="bg-sky-50 border-b border-stone-200/80 p-4 flex justify-center">
                      <div className="w-48 sm:w-52 aspect-[9/16] rounded-xl overflow-hidden border border-stone-200 shadow-sm bg-white">
                        {!failedImages[`card-${screen.id}`] ? (
                          <img
                            src={screen.image}
                            alt={screen.headline}
                            referrerPolicy="no-referrer"
                            onError={() => handleImageError(`card-${screen.id}`)}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-sky-100">
                            <Sparkles className="w-6 h-6 text-indigo-900 mb-2" />
                            <span className="text-xs font-bold text-indigo-950">{screen.headline}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Text Content */}
                    <div className="p-6">
                      <div className="text-xs font-mono text-slate-500 mb-1">
                        0{index + 1} · {screen.subheadline}
                      </div>
                      <h3 className="text-lg font-sans font-extrabold text-indigo-950 mb-2">
                        {screen.headline}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                        {screen.description}
                      </p>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {screen.highlights.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="px-6 py-3.5 bg-stone-50 border-t border-stone-200/80 flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-600">{screen.tabLabel}</span>
                    <button
                      onClick={() => {
                        setActiveSlideIndex(index);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="font-bold text-indigo-950 hover:underline cursor-pointer"
                    >
                      Inspect in Hero
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Asymmetric Bento Section: 5 Worlds, Treasure Trail & Special Star Badges */}
        <section id="worlds-badges" className="py-16 sm:py-24 bg-white border-b border-stone-200/80 scroll-mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <p className="text-xs font-mono uppercase tracking-wider text-indigo-900/70 mb-2">
                03. Progression &amp; Rewards Architecture
              </p>
              <h2
                className="text-2xl sm:text-4xl font-sans font-extrabold text-indigo-950 tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                A world of little victories that celebrates every milestone
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                Sumaway replaces high-pressure leaderboards with personal milestones: 5 worlds, 100 levels, Treasure Trail gifts, and Special Star Badges.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Span 2: 5 Worlds & 100 Levels Progression */}
              <div className="lg:col-span-2 p-6 sm:p-8 bg-[#FAF8F5] border border-stone-200 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-indigo-900/70 mb-2">
                    01. Adventure Map · 5 Worlds · 100 Levels
                  </div>
                  <h3 className="text-xl sm:text-2xl font-sans font-extrabold text-indigo-950">
                    Step-by-step mastery from Meadow Valley to 100 levels
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed max-w-2xl">
                    Each world introduces twenty carefully paced levels. Children follow numbered stepping stones across bridges, waterfalls, and treehouses—earning up to 3 stars per level and unlocking Treasure Trail chests as they progress.
                  </p>

                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {[
                      { num: 'World 1', name: 'Meadow Valley', levels: 'Levels 1–20' },
                      { num: 'World 2', name: 'Sunny Brook', levels: 'Levels 21–40' },
                      { num: 'World 3', name: 'Pine Ridge', levels: 'Levels 41–60' },
                      { num: 'World 4', name: 'Crystal Peaks', levels: 'Levels 61–80' },
                      { num: 'World 5', name: 'Starlight Summit', levels: 'Levels 81–100' },
                    ].map((w) => (
                      <div key={w.num} className="p-3.5 bg-white border border-stone-200 rounded-xl">
                        <span className="text-[11px] font-mono text-slate-500 block">{w.num}</span>
                        <span className="text-xs font-extrabold text-indigo-950 block mt-0.5">{w.name}</span>
                        <span className="text-[11px] text-emerald-700 font-medium block mt-1 tabular-nums">{w.levels}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-200/80 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
                  <span>Up to 300 Level Stars available across all 5 worlds</span>
                  <span className="font-semibold text-indigo-950">Saved automatically in phone local storage</span>
                </div>
              </div>

              {/* Span 1: Special Star Badges */}
              <div className="p-6 sm:p-8 bg-[#FAF8F5] border border-stone-200 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-indigo-900/70 mb-2">
                    02. Collectible Milestones
                  </div>
                  <h3 className="text-xl font-sans font-extrabold text-indigo-950">
                    Special Star Badges &amp; Treasure Trail
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    As children collect stars across levels, they unlock Special Star Badges and colourful 3D emblems in their personal badge cabinet.
                  </p>

                  <div className="mt-5 space-y-3">
                    {[
                      { stars: '10 Level Stars', title: 'Bronze Ribbon Star Badge', desc: 'First 10 stars earned in Meadow Valley' },
                      { stars: '25 Level Stars', title: 'Sky Ribbon Star Badge', desc: 'Consistent accuracy across early worlds' },
                      { stars: '50 Level Stars', title: 'Royal Ribbon Star Badge', desc: 'Halfway champion milestone award' },
                    ].map((b) => (
                      <div key={b.stars} className="p-3 bg-white border border-stone-200 rounded-xl flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center shrink-0">
                          <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
                        </div>
                        <div>
                          <p className="text-xs font-extrabold text-indigo-950 tabular-nums">{b.stars}</p>
                          <p className="text-[11px] text-slate-600">{b.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-200/80 text-xs text-slate-600">
                  <span>100% earned by learning · Zero microtransactions</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Interactive Parental Dashboard Preview */}
        <section id="parent-dashboard" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-stone-200/80 scroll-mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left 5 Columns: Explanation & Privacy Guarantee */}
              <div className="lg:col-span-5 space-y-5">
                <p className="text-xs font-mono uppercase tracking-wider text-indigo-900/70">
                  04. On-Device Parental Dashboard
                </p>
                <h2
                  className="text-2xl sm:text-4xl font-sans font-extrabold text-indigo-950 tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  See their learning journey—right on your phone.
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  The built-in <strong>Parental Dashboard</strong> calculates daily, weekly, and monthly learning statistics directly on the device. Parents can open it anytime on the same phone without needing a PIN, account, or cloud upload.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="p-4 bg-white border border-stone-200 rounded-xl">
                    <p className="text-sm font-bold text-indigo-950">
                      App Screen Time vs. Active Learning Time
                    </p>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Distinguishes between total time spent in the app (e.g. 70 min over 7 days) and focused math practice time (49 min).
                    </p>
                  </div>

                  <div className="p-4 bg-white border border-stone-200 rounded-xl">
                    <p className="text-sm font-bold text-indigo-950">
                      Answer Accuracy &amp; Daily App Time Bars
                    </p>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Review Correct (42) and Incorrect (8) answers across 50 answer checks alongside a Monday–Sunday daily practice chart.
                    </p>
                  </div>

                  <div className="p-4 bg-white border border-stone-200 rounded-xl">
                    <p className="text-sm font-bold text-indigo-950">
                      Automatic 90-Day Question Clean-up
                    </p>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Detailed question text is automatically removed after 90 days once processed, while compact outcome and time records remain for long-term summaries.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right 7 Columns: Interactive Replica of the Parental Dashboard Screenshot */}
              <div className="lg:col-span-7 bg-[#FFFDF9] border border-stone-200 rounded-2xl p-5 sm:p-8 shadow-xs">
                {/* Dashboard Top Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-stone-200">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-sans font-extrabold text-indigo-950">
                      Parental Dashboard
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      A little learning, every day
                    </p>
                  </div>
                  <div className="px-3.5 py-2 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-950">
                    On this phone · No account or upload
                  </div>
                </div>

                {/* Primary Dashboard Category Tabs */}
                <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['Overview', 'Learning', 'Reports', 'Preferences'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setDashboardTab(tab)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        dashboardTab === tab
                          ? 'bg-purple-200 text-indigo-950 border border-purple-300'
                          : 'bg-stone-100 text-slate-700 hover:bg-stone-200/70'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Time Period Filter Buttons */}
                <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(
                    [
                      { key: 'today', label: 'Today' },
                      { key: '7days', label: 'Last 7 days' },
                      { key: 'month', label: 'This month' },
                      { key: 'all', label: 'All time' },
                    ] as const
                  ).map((period) => (
                    <button
                      key={period.key}
                      onClick={() => setDashboardRange(period.key)}
                      className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        dashboardRange === period.key
                          ? 'bg-purple-600 text-white'
                          : 'bg-stone-100 text-slate-700 hover:bg-stone-200/70'
                      }`}
                    >
                      {period.label}
                    </button>
                  ))}
                </div>

                {/* Example Local Activity Heading */}
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm font-extrabold text-indigo-950">
                    Example local activity ({activeDashboard.label})
                  </p>
                  <span className="text-xs font-mono text-slate-500">
                    View: {dashboardTab}
                  </span>
                </div>

                {/* 2x2 Metrics Grid */}
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="p-4 bg-white border border-stone-200 rounded-xl flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-emerald-700" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-600 block">App screen time</span>
                      <span className="text-2xl font-sans font-extrabold text-indigo-950 tabular-nums">
                        {activeDashboard.screenTimeMin} <span className="text-base">min</span>
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-white border border-stone-200 rounded-xl flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                      <GraduationCap className="w-5 h-5 text-purple-700" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-600 block">Learning time</span>
                      <span className="text-2xl font-sans font-extrabold text-indigo-950 tabular-nums">
                        {activeDashboard.learningTimeMin} <span className="text-base">min</span>
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-white border border-stone-200 rounded-xl flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                      <Check className="w-5 h-5 text-emerald-700 stroke-[3]" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-600 block">Correct</span>
                      <span className="text-2xl font-sans font-extrabold text-indigo-950 tabular-nums">
                        {activeDashboard.correct}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-white border border-stone-200 rounded-xl flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-rose-100 flex items-center justify-center shrink-0">
                      <X className="w-5 h-5 text-rose-600 stroke-[3]" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-600 block">Incorrect</span>
                      <span className="text-2xl font-sans font-extrabold text-indigo-950 tabular-nums">
                        {activeDashboard.incorrect}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Daily App Time Bar Chart */}
                <div className="mt-4 p-4 sm:p-5 bg-white border border-stone-200 rounded-xl">
                  <p className="text-sm font-extrabold text-indigo-950 mb-4">
                    Daily app time
                  </p>
                  <div className="grid grid-cols-7 gap-2 sm:gap-3 items-end h-32 pt-4 border-b border-stone-200 pb-2">
                    {activeDashboard.dailyBars.map((bar) => {
                      const heightPct = Math.min(100, Math.round((bar.min / 16) * 100));
                      return (
                        <div key={bar.day} className="flex flex-col items-center justify-end h-full">
                          <span className="text-[11px] font-extrabold text-indigo-950 font-mono tabular-nums mb-1">
                            {bar.min} min
                          </span>
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${heightPct}%` }}
                            transition={{ duration: 0.35 }}
                            className="w-full max-w-[38px] bg-emerald-400 rounded-t-lg"
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="grid grid-cols-7 gap-2 sm:gap-3 pt-2 text-center">
                    {activeDashboard.dailyBars.map((bar) => (
                      <span key={bar.day} className="text-xs font-medium text-slate-600">
                        {bar.day}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Answer Checks Bar */}
                <div className="mt-4 p-3.5 bg-white border border-stone-200 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                    <span className="text-sm font-extrabold text-indigo-950 tabular-nums">
                      {activeDashboard.answerChecks} <span className="font-semibold text-slate-700">answer checks</span>
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-500">
                    Stored in phone local storage
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Privacy & Developer Contact Callout */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-6 sm:p-10 bg-[#FAF8F5] border border-stone-200 rounded-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <p className="text-xs font-mono uppercase tracking-wider text-indigo-900/70">
                  Privacy-First Offline Architecture
                </p>
                <h2 className="text-2xl sm:text-3xl font-sans font-extrabold text-indigo-950">
                  Built with care for families by {POLICY_METADATA.developer}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Sumaway runs offline on Android, keeps gameplay and learning statistics in your phone's local storage, and never requires an account or internet connection to play. Read our full Privacy Policy or reach out directly with any questions.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  onClick={onNavigateToPrivacy}
                  className="px-5 py-3 text-xs sm:text-sm font-bold text-white bg-indigo-950 hover:bg-indigo-900 rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  Read Full Privacy Policy
                </button>
                <a
                  href={`mailto:${POLICY_METADATA.privacyContact}?subject=Sumaway%20App%20Inquiry`}
                  className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-indigo-950 bg-white hover:bg-stone-100 border border-stone-300 rounded-xl transition-colors whitespace-nowrap shrink-0"
                >
                  <Mail className="w-4 h-4 text-indigo-950" />
                  <span>{POLICY_METADATA.privacyContact}</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-stone-200 bg-[#FAF8F5] py-10 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-indigo-950">{POLICY_METADATA.appName}</span>
            <span aria-hidden="true">·</span>
            <span>Developer: {POLICY_METADATA.developer}</span>
            <span aria-hidden="true">·</span>
            <span>Offline Android Math Game</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-indigo-950 font-medium cursor-pointer"
            >
              Back to Top
            </button>
            <button
              onClick={onNavigateToPrivacy}
              className="font-semibold text-indigo-950 underline underline-offset-2 cursor-pointer"
            >
              Official Privacy Policy (/)
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
