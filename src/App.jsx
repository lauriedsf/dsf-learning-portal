import { useState } from "react";
import logoDSF from "./assets/logo-dsf.png";
import digiGuide from "./assets/digi-guide.png";
import digiTablet from "./assets/digi-tablet.png";

/* ---------- DATA ---------- */

const COURSES = [
  {
    id: 1,
    slug: "intro-online-banking",
    category: "Financial Literacy",
    categoryColor: "bg-[#f9b13c] text-[#2e4053]",
    title: "Introduction to online banking",
    subtitle: "Learn how to use online banking services safely.",
    lessons: 5,
    duration: 45,
    track: "finance",
    isMine: true,
  },
  {
    id: 2,
    slug: "digital-budgeting-basics",
    category: "Financial Literacy",
    categoryColor: "bg-[#f9b13c] text-[#2e4053]",
    title: "Digital budgeting basics",
    subtitle: "Master simple tools to plan and track your money.",
    lessons: 6,
    duration: 60,
    track: "finance",
    isMine: true,
  },
  {
    id: 3,
    slug: "internet-navigation-beginners",
    category: "Digital Skills",
    categoryColor: "bg-[#0e5988] text-white",
    title: "Internet navigation for beginners",
    subtitle: "Learn the basics to browse the internet with confidence.",
    lessons: 4,
    duration: 30,
    track: "digital",
    isMine: false,
  },
];

const CATEGORY_TABS = [
  { id: "all", label: "All topics" },
  { id: "finance", label: "💰 Finance" },
  { id: "digital", label: "💻 Digital" },
  { id: "security", label: "🔒 Security" },
];

const MAIN_TABS = [
  { id: "myCourses", label: "My courses", icon: "📚" },
  { id: "allCourses", label: "All courses", icon: "📖" },
  { id: "myProgress", label: "My progress", icon: "📊" },
];

/* Parcours pour "Introduction to online banking" */

const PATHS = {
  "intro-online-banking": {
    title: "Introduction to online banking",
    description:
      "Follow the steps to understand, set up and safely use online banking.",
    steps: [
      {
        id: 1,
        title: "What is online banking?",
        status: "current",
        duration: "5 min",
        launchUrl:
          "https://dsf.global/wp-content/uploads/articulate_uploads/What_is_an_electronic_wallet/story.html",
      },
      {
        id: 2,
        title: "Create a secure account",
        status: "locked",
        duration: "10 min",
      },
      {
        id: 3,
        title: "Log in safely",
        status: "locked",
        duration: "10 min",
      },
      {
        id: 4,
        title: "Check your balance",
        status: "locked",
        duration: "10 min",
      },
      {
        id: 5,
        title: "Make a transfer",
        status: "locked",
        duration: "10 min",
      },
      {
        id: 6,
        title: "Avoid scams and fraud",
        status: "locked",
        duration: "10 min",
      },
    ],
  },
};

/* ---------- APP ---------- */

export default function App() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeMainTab, setActiveMainTab] = useState("allCourses");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeModuleUrl, setActiveModuleUrl] = useState(null);

  // Courses filtered by main tab
  const coursesBySection =
    activeMainTab === "myCourses"
      ? COURSES.filter((c) => c.isMine)
      : COURSES;

  // Courses filtered by category
  const filteredCourses =
    activeCategory === "all"
      ? coursesBySection
      : coursesBySection.filter((course) => course.track === activeCategory);

  // What to show depending on main tab
  const showCourses =
    activeMainTab === "myCourses" || activeMainTab === "allCourses";

  const showProgressHeader =
    activeMainTab === "myCourses" || activeMainTab === "myProgress";

  const openPath = (course) => {
    setSelectedCourse(course);
  };

  const closePath = () => {
    setSelectedCourse(null);
  };

  const openModule = (url) => {
    setActiveModuleUrl(url);
  };

  const closeModule = () => {
    setActiveModuleUrl(null);
  };

  return (
    <div className="min-h-screen bg-[#eae4df] flex flex-col">
      {/* Fixed header */}
      <Header />

      {/* Main content */}
      <main className="flex-1 pt-20 pb-20">
        <div className="mx-auto max-w-5xl px-4 py-4 space-y-6">
          <PageHeader activeMainTab={activeMainTab} />

          {showProgressHeader && (
            <ProgressHeader completed={0} total={8} badges={0} />
          )}

          {activeMainTab === "myProgress" && <ProgressDetails />}

          {showCourses && (
            <>
              <CategoryTabs
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />

              <CourseGrid courses={filteredCourses} onOpenPath={openPath} />
            </>
          )}
        </div>
      </main>

      {/* Bottom navigation */}
      <BottomNav
        activeMainTab={activeMainTab}
        setActiveMainTab={setActiveMainTab}
      />

      {/* Path modal */}
      {selectedCourse && (
        <PathModal
          course={selectedCourse}
          onClose={closePath}
          onStartModule={openModule}
        />
      )}

      {/* Learning module viewer */}
      {activeModuleUrl && (
        <LearningModule launchUrl={activeModuleUrl} onClose={closeModule} />
      )}
    </div>
  );
}

/* ---------- HEADER ---------- */

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-20 bg-white/95 backdrop-blur border-b border-[#eae4df]">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={logoDSF} alt="DSF logo" className="h-8 w-auto" />
        </div>

        <button
          className="h-9 w-9 rounded-full bg-[#eae4df] flex items-center justify-center text-[#2e4053] hover:bg-[#f9b13c] hover:text-white border border-[#eae4df] text-sm"
          aria-label="Profile menu"
        >
          👤
        </button>
      </div>
    </header>
  );
}

/* ---------- MAIN CONTENT ---------- */

function PageHeader({ activeMainTab }) {
  const title = "My DSF learning portal";
  const subtitle =
    "Explore learning paths to build your digital and financial skills.";

  const showDigiOnAllCourses = activeMainTab === "allCourses";

  return (
    <header className="space-y-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#2e4053]">
          {title}
        </h1>
        <p className="text-sm text-[#2e4053]/70 mt-1">{subtitle}</p>
      </div>

      {showDigiOnAllCourses && (
        <div className="flex justify-center sm:justify-start">
          <img
            src={digiTablet}
            alt="Digi, your learning guide"
            className="h-32 w-auto drop-shadow-sm"
          />
        </div>
      )}
    </header>
  );
}

/* ---------- PROGRESS HEADER & DETAILS ---------- */

function ProgressHeader({ completed, total, badges }) {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <section className="bg-gradient-to-r from-[#fff7ec] to-[#ffeef5] border border-[#fbe2c0] rounded-3xl p-4 sm:p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#2e4053] flex items-center gap-2">
            <span>🎯 My progress</span>
          </p>
          <p className="text-xs text-[#2e4053]/70 mt-1">
            Track your learning paths and badges in one place.
          </p>
        </div>

        <div className="flex gap-3 text-right">
          <div>
            <div className="text-[11px] text-[#2e4053]/60">
              Completed courses
            </div>
            <div className="text-sm font-semibold text-[#2e4053]">
              {completed} / {total}
            </div>
          </div>
          <div>
            <div className="text-[11px] text-[#2e4053]/60">Badges earned</div>
            <div className="text-sm font-semibold text-[#2e4053]">
              {badges}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-1">
        <div className="h-2 rounded-full bg-white/70 overflow-hidden">
          <div
            className="h-full bg-[#ef7d00] rounded-full"
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className="mt-1 text-[11px] text-[#2e4053]/60">
          {percent}% completed
        </div>
      </div>
    </section>
  );
}

function ProgressDetails() {
  return (
    <section className="bg-white rounded-3xl border border-[#eae4df] p-4 sm:p-5 space-y-3">
      <h2 className="text-sm font-semibold text-[#2e4053]">
        Your learning insights
      </h2>
      <p className="text-xs text-[#2e4053]/70">
        Here you will see detailed information about your completed courses,
        badges and learning streaks. This space can be connected later to real
        analytics from Moodle or the national platform.
      </p>
    </section>
  );
}

/* ---------- CATEGORY TABS & COURSES GRID ---------- */

function CategoryTabs({ activeCategory, setActiveCategory }) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {CATEGORY_TABS.map((tab) => {
        const isActive = tab.id === activeCategory;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={
              "px-3 py-1.5 rounded-full text-xs font-medium border transition " +
              (isActive
                ? "bg-[#2e4053] text-white border-[#2e4053]"
                : "bg-white text-[#2e4053]/70 border-[#eae4df] hover:bg-[#f9f3ec]")
            }
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

function CourseGrid({ courses, onOpenPath }) {
  if (courses.length === 0) {
    return (
      <p className="text-xs text-[#2e4053]/60 mt-4">
        No courses in this category yet.
      </p>
    );
  }

  return (
    <section className="grid gap-4 mt-4 sm:grid-cols-2">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          onOpenPath={() => onOpenPath(course)}
        />
      ))}
    </section>
  );
}

function CourseCard({ course, onOpenPath }) {
  return (
    <article className="bg-white rounded-3xl border border-[#eae4df] p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition">
      <div className="space-y-2">
        <span
          className={
            "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold " +
            course.categoryColor
          }
        >
          {course.category}
        </span>

        <h3 className="text-sm font-semibold text-[#2e4053]">
          {course.title}
        </h3>
        <p className="text-xs text-[#2e4053]/70">{course.subtitle}</p>
      </div>

      <div className="mt-4 flex items-center justify-between text-[11px] text-[#2e4053]/60">
        <span>{course.lessons} lessons</span>
        <span>{course.duration} min</span>
      </div>

      <button
        onClick={onOpenPath}
        className="mt-3 inline-flex items-center justify-center rounded-full bg-[#ef7d00] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#f9b13c] transition"
      >
        Start this path
      </button>
    </article>
  );
}

/* ---------- BOTTOM NAV ---------- */

function BottomNav({ activeMainTab, setActiveMainTab }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-[#eae4df] shadow-sm">
      <div className="mx-auto max-w-5xl px-4 py-2 flex items-center justify-between">
        {MAIN_TABS.map((tab) => {
          const isActive = tab.id === activeMainTab;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveMainTab(tab.id)}
              className={
                "flex flex-col items-center gap-0.5 flex-1 text-xs font-medium transition " +
                (isActive
                  ? "text-[#2e4053]"
                  : "text-[#2e4053]/50 hover:text-[#2e4053]")
              }
            >
              <span className="text-base">{tab.icon}</span>
              <span>{tab.label}</span>
              {isActive && (
                <span className="mt-1 h-1 w-10 rounded-full bg-[#2e4053]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

/* ---------- PATH MODAL ---------- */

function PathModal({ course, onClose, onStartModule }) {
  const path = PATHS[course.slug];

  // Safety: path not configured yet
  if (!path) {
    return (
      <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 px-4">
        <div className="bg-white rounded-3xl p-6 max-w-xl w-full shadow-xl border border-[#eae4df] relative">
          {/* Bouton close en haut à droite */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-sm text-[#2e4053]/60 hover:text-[#2e4053]"
          >
            ✕
          </button>

          <div className="flex justify-between items-center mb-3 pr-6">
            <h2 className="text-sm font-semibold text-[#2e4053]">
              Path not yet configured
            </h2>
          </div>
          <p className="text-xs text-[#2e4053]/70">
            The learning path for this course will be added later.
          </p>
        </div>
      </div>
    );
  }

  // Current step = one marked as "current" or the first
  const currentStep =
    path.steps.find((s) => s.status === "current") ?? path.steps[0];

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-3xl p-6 max-w-xl w-full shadow-xl border border-[#eae4df] relative">
        {/* Bouton close en haut à droite */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-sm text-[#2e4053]/60 hover:text-[#2e4053]"
        >
          ✕
        </button>

        {/* Header avec Digi */}
        <div className="flex justify-between items-start gap-4 mb-4 pr-6">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-[#2e4053]">
              {path.title}
            </h2>
            <p className="text-xs text-[#2e4053]/70 mt-1">
              {path.description}
            </p>
          </div>

          <img
            src={digiGuide}
            alt="Digi, your learning guide"
            className="h-12 w-auto"
          />
        </div>

        {/* Steps + Launch button */}
        <div className="flex flex-col items-center gap-4 mt-2">
          <div className="flex items-center justify-between w-full overflow-x-auto pb-2">
            {path.steps.map((step, index) => (
              <PathStep
                key={step.id}
                step={step}
                isLast={index === path.steps.length - 1}
              />
            ))}
          </div>

          {currentStep.launchUrl && (
            <button
              onClick={() => {
                onStartModule(currentStep.launchUrl);
                onClose();
              }}
              className="inline-flex items-center gap-2 rounded-full bg-[#ef7d00] px-5 py-2 text-xs font-semibold text-white hover:bg-[#f9b13c] transition"
            >
              ▶ Start lesson: {currentStep.title}
            </button>
          )}

          <p className="text-[11px] text-[#2e4053]/70 text-center">
            Start with the first step. Each lesson will unlock the next one in
            your path.
          </p>
        </div>
      </div>
    </div>
  );
}

function PathStep({ step, isLast }) {
  const isCurrent = step.status === "current";
  const isLocked = step.status === "locked";

  const bubbleClasses = isCurrent
    ? "bg-[#ef7d00] text-white border-[#ef7d00]"
    : isLocked
    ? "bg-white text-[#2e4053]/50 border-[#eae4df]"
    : "bg-[#0e5988] text-white border-[#0e5988]";

  return (
    <div className="flex items-center min-w-[110px]">
      <div className="flex flex-col items-center gap-1">
        <div
          className={
            "h-10 w-10 rounded-full border flex items-center justify-center text-xs font-semibold shadow-sm " +
            bubbleClasses
          }
        >
          {isLocked ? "🔒" : step.id}
        </div>
        <div className="text-[10px] text-center text-[#2e4053]/80 max-w-[90px] leading-tight">
          {step.title}
        </div>
        <div className="text-[9px] text-[#9f8972]">{step.duration}</div>
      </div>

      {!isLast && (
        <div className="flex-1 h-px bg-[#eae4df] mx-2 hidden sm:block" />
      )}
    </div>
  );
}


/* ---------- LEARNING MODULE VIEWER ---------- */

function LearningModule({ launchUrl, onClose }) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-2 sm:px-4">
      <div className="bg-white w-full h-full sm:h-[90vh] sm:w-[90vw] rounded-none sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-4 py-2 border-b border-[#eae4df] bg-[#eae4df]/40">
          <span className="text-xs font-semibold text-[#2e4053]">
            Learning module
          </span>
          <button
            onClick={onClose}
            className="text-xs text-[#2e4053]/70 hover:text-[#2e4053]"
          >
            ✕ Close
          </button>
        </div>
        <iframe
          src={launchUrl}
          title="Learning module"
          className="w-full h-full border-0"
        />
      </div>
    </div>
  );
}
