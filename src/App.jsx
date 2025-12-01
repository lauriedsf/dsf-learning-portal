import { useState, useEffect } from "react";
import logoDSF from "./assets/logo-dsf.png";
import digiGuide from "./assets/digi-guide.png";
import digiTablet from "./assets/digi-tablet.png";
import petaleBlanc from "./assets/petale-blanc.png";
import badgeOnlineBankStarter from "./assets/Badge_OnlineBankStarter.png";
import digiWelldone from "./assets/digi-welldone.png";

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

/* ---------- BADGES & QUIZ DATA ---------- */
/* On choisit UNE seule clé et on la garde partout: "online-bank-starter" */

const BADGES = {
  "online-bank-starter": {
    id: "online-bank-starter",
    icon: "💳",
    title: "Online Bank Starter",
    description: "Completed the introduction to online banking quiz.",
    image: badgeOnlineBankStarter,
  },
};

const QUIZ_INTRO_ONLINE_BANKING = [
  {
    id: 1,
    question: "What is the main advantage of using online banking?",
    answers: [
      { text: "You can access your bank 24/7 from anywhere", correct: true },
      { text: "You never need a password again", correct: false },
      { text: "The bank will automatically send you money", correct: false },
    ],
  },
  {
    id: 2,
    question: "What do you need to log in to your online banking safely?",
    answers: [
      { text: "Your user ID and a strong password", correct: true },
      { text: "Just your first name", correct: false },
      {
        text: "Any password that is easy to remember, like 1234",
        correct: false,
      },
    ],
  },
  {
    id: 3,
    question: "Which of these actions is the safest?",
    answers: [
      {
        text: "Logging in only on trusted devices and secure networks",
        correct: true,
      },
      {
        text: "Sharing your password with a friend if you need help",
        correct: false,
      },
      {
        text: "Clicking any link you receive by SMS about your bank",
        correct: false,
      },
    ],
  },
];

/* ---------- APP ---------- */

export default function App() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeMainTab, setActiveMainTab] = useState("allCourses");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeModuleUrl, setActiveModuleUrl] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [badges, setBadges] = useState([]);
  const [lastEarnedBadge, setLastEarnedBadge] = useState(null);

  // Charger les badges depuis le navigateur
  useEffect(() => {
    try {
      const stored = localStorage.getItem("dsfBadges");
      if (stored) {
        setBadges(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Cannot load badges from storage", e);
    }
  }, []);

  // Sauvegarder les badges dès qu'ils changent
  useEffect(() => {
    try {
      localStorage.setItem("dsfBadges", JSON.stringify(badges));
    } catch (e) {
      console.error("Cannot save badges to storage", e);
    }
  }, [badges]);

  const awardBadge = (badgeId) => {
    const badge = BADGES[badgeId];
    if (!badge) return;

    const alreadyHas = badges.some((b) => b.id === badgeId);
    if (alreadyHas) return;

    const newBadge = BADGES[badgeId];
    setBadges((prev) => [...prev, newBadge]);
    setLastEarnedBadge(newBadge);
  };

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
    const wasIntroModule =
      activeModuleUrl === PATHS["intro-online-banking"].steps[0].launchUrl;

    setActiveModuleUrl(null);

    if (wasIntroModule) {
      setShowQuiz(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#eae4df] flex flex-col">
      {/* Fixed header */}
      <Header />

      {/* Main content */}
      <main className="flex-1 pt-20 pb-20">
        <div className="mx-auto max-w-5xl px-4 py-4 space-y-6">
          <PageHeader activeMainTab={activeMainTab} />

          {/* Digi badge message */}
          {lastEarnedBadge && activeMainTab === "myProgress" && (
            <DigiBadgeMessage
              badge={lastEarnedBadge}
              context="myProgress"
              onClose={() => setLastEarnedBadge(null)}
            />
          )}

          {lastEarnedBadge && activeMainTab !== "myProgress" && (
            <DigiBadgeMessage
              badge={lastEarnedBadge}
              context="default"
              onClose={() => setLastEarnedBadge(null)}
            />
          )}

          {showProgressHeader && (
            <ProgressHeader
              completed={0}
              total={8}
              badges={badges.length}
            />
          )}

          {activeMainTab === "myProgress" && (
            <ProgressDetails badges={badges} />
          )}

          {showCourses && (
            <>
              <CategoryTabs
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />
              <CourseGrid
                courses={filteredCourses}
                onOpenPath={openPath}
              />
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
          badges={badges}
          onClose={closePath}
          onStartModule={openModule}
        />
      )}

      {/* Learning module */}
      {activeModuleUrl && (
        <LearningModule launchUrl={activeModuleUrl} onClose={closeModule} />
      )}

      {/* Quiz modal */}
      {showQuiz && (
        <QuizModal
          questions={QUIZ_INTRO_ONLINE_BANKING}
          badgeId="online-bank-starter"
          onFinish={({ score, badgeId }) => {
            if (badgeId) {
              awardBadge(badgeId);
            }
            setShowQuiz(false);
          }}
        />
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

function PageHeader() {
  const title = "My DSF Learning Portal";
  const subtitle =
    "Explore learning paths to build your digital and financial skills.";

  return (
    <header className="mt-1">
      <div className="relative overflow-hidden rounded-3xl border border-[#f3d5aa] bg-gradient-to-r from-[#ef7d00] via-[#f9b13c] to-[#ef7d00] px-5 py-4 sm:py-5 shadow-md text-white">
        <div className="relative flex items-stretch gap-4 sm:gap-6">
          {/* Colonne texte */}
          <div className="flex-1 space-y-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide">
              <span>✨</span>
              <span>DSF Learning</span>
            </span>

            <h1 className="text-xl sm:text-2xl font-semibold">{title}</h1>

            <p className="text-xs sm:text-sm text-[#fff7ec] max-w-md">
              {subtitle}
            </p>
          </div>

          {/* Colonne graphique : pétale en fond + Digi devant */}
          <div
            className="w-28 sm:w-40 flex items-end justify-center"
            style={{
              backgroundImage: `url(${petaleBlanc})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center bottom",
              backgroundSize: "contain",
            }}
          >
            <img
              src={digiTablet}
              alt="Digi holding a tablet"
              className="h-16 sm:h-20 w-auto drop-shadow-lg mb-1 sm:mb-5"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

function ProgressHeader({ completed, total, badges }) {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <section className="bg-gradient-to-r from-[#fff7ec] to-[#ffeef5] border border-[#fbe2c0] rounded-3xl p-4 sm:p-5 flex flex-col gap-3">
      <div className="flex items-center justify_between gap-4">
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

function ProgressDetails({ badges }) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-[#2e4053]">My achievements</h2>

      {badges.length === 0 && (
        <p className="text-xs text-[#2e4053]/60">
          You have not earned any badges yet.
        </p>
      )}

      {badges.length > 0 && (
        <div className="grid grid-cols-2 gap-3 max-w-xl">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className="flex items-center gap-3 rounded-2xl border border-[#f3d5aa] bg-[#fff7ec] px-3 py-2 shadow-sm h-full"
            >
              {badge.image ? (
                <img
                  src={badge.image}
                  alt={badge.title}
                  className="h-10 w-auto"
                />
              ) : (
                <span className="text-lg">{badge.icon}</span>
              )}

              <div>
                <div className="text-xs font-semibold text-[#2e4053]">
                  {badge.title}
                </div>
                <div className="text-[10px] text-[#2e4053]/70">
                  {badge.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function DigiBadgeMessage({ badge, context, onClose }) {
  if (!badge) return null;

  const baseText = "Digi: Well done!";
  const detailText =
    context === "myProgress"
      ? `You have just earned the badge ${badge.title}.`
      : `You have just earned the badge ${badge.title}. You can find it in your "My progress" tab.`;

  return (
    <div className="rounded-3xl border border-[#eae4df] bg-white px-4 py-3 flex items-center gap-3 shadow-sm">
      <img src={digiWelldone} alt="Digi well done" className="h-10 w-auto" />
      <div className="flex-1">
        <div className="text-xs font-semibold text-[#2e4053]">
          {baseText}
        </div>
        <div className="text-[11px] text-[#2e4053]/70">{detailText}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-xs text-[#2e4053]/50 hover:text-[#2e4053]"
        >
          ✕
        </button>
      )}
    </div>
  );
}

/* ---------- CATEGORY TABS & COURSES GRID ---------- */

function CategoryTabs({ activeCategory, setActiveCategory }) {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
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

/* ---------- QUIZ COMPONENT ---------- */

function QuizModal({ questions, badgeId, onFinish }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [earnedBadge, setEarnedBadge] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [wasCorrect, setWasCorrect] = useState(null);

  const currentQuestion = questions[currentIndex];

  const handleAnswerClick = (answer, idx) => {
    if (selectedIndex !== null) return; // déjà répondu

    setSelectedIndex(idx);
    const correct = answer.correct;
    setWasCorrect(correct);

    if (correct) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedIndex(null);
      setWasCorrect(null);
    } else {
      // dernière question : on termine
      setFinished(true);
      setEarnedBadge(score === questions.length);
    }
  };

  const handleFinish = () => {
    onFinish({
      score,
      badgeId: earnedBadge ? badgeId : null,
    });
  };

  if (finished) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-2 sm:px-4">
        <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-[#eae4df] p-4 sm:p-6 space-y-4">
          <div className="flex flex-col items-center text-center gap-4">
            {earnedBadge && (
              <>
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={digiWelldone}
                    alt="Digi says well done"
                    className="h-24 w-auto drop-shadow-md"
                  />
                  <p className="text-sm font-semibold text-[#2e4053]">
                    Digi: well done! You unlocked a new badge.
                  </p>
                </div>

                <img
                  src={badgeOnlineBankStarter}
                  alt="Online Bank Starter badge"
                  className="h-40 w-auto drop-shadow-lg spin-once"
                />
              </>
            )}

            {!earnedBadge && (
              <p className="text-sm font-semibold text-[#2e4053]">
                Thank you for completing the quiz.
              </p>
            )}

            <p className="text-xs text-[#2e4053]/70">
              You scored {score} out of {questions.length}.
            </p>
          </div>

          <div className="flex justify-center mt-2">
            <button
              onClick={handleFinish}
              className="inline-flex items-center gap-2 rounded-full bg-[#ef7d00] px-5 py-2 text-xs font-semibold text-white hover:bg-[#f9b13c] transition"
            >
              Back to my learning
            </button>
          </div>
        </div>
      </div>
    );
  }

  const correctIndex = currentQuestion.answers.findIndex((a) => a.correct);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-2 sm:px-4">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-[#eae4df] p-4 sm:p-6 space-y-4">
        <h2 className="text-sm font-semibold text-[#2e4053] flex items-center gap-2">
          <span>📝 Quick check</span>
          <span className="text-[11px] text-[#2e4053]/60">
            Module 1 – Introduction to online banking
          </span>
        </h2>

        <div>
          <p className="text-xs text-[#2e4053]/60 mb-1">
            Question {currentIndex + 1} of {questions.length}
          </p>
          <p className="text-sm font-medium text-[#2e4053]">
            {currentQuestion.question}
          </p>
        </div>

        <div className="space-y-2 mt-2">
          {currentQuestion.answers.map((answer, idx) => {
            const isSelected = selectedIndex === idx;
            const isCorrectAnswer = idx === correctIndex;

            let classes =
              "w-full text-left px-3 py-2 rounded-xl border text-xs transition ";

            if (selectedIndex === null) {
              classes +=
                "border-[#eae4df] bg-[#f7f4f0] text-[#2e4053] hover:bg-[#ef7d00] hover:text-white hover:border-[#ef7d00]";
            } else {
              if (isCorrectAnswer) {
                classes +=
                  "border-green-500 bg-green-50 text-[#2e4053] font-semibold";
              } else if (isSelected && !answer.correct) {
                classes += "border-red-500 bg-red-50 text-[#2e4053]";
              } else {
                classes += "border-[#eae4df] bg-white text-[#2e4053]/70";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswerClick(answer, idx)}
                className={classes}
                disabled={selectedIndex !== null}
              >
                {answer.text}
              </button>
            );
          })}
        </div>

        {selectedIndex !== null && (
          <div className="mt-3 flex flex-col gap-2">
            <p className="text-xs text-[#2e4053]/80">
              {wasCorrect
                ? "✅ Correct!"
                : `❌ Not quite. The correct answer was: "${currentQuestion.answers[correctIndex].text}".`}
            </p>
            <div className="flex justify-end">
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 rounded-full bg-[#ef7d00] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#f9b13c] transition"
              >
                {currentIndex === questions.length - 1
                  ? "Finish quiz"
                  : "Next question"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- PATH MODAL ---------- */

function PathModal({ course, badges, onClose, onStartModule }) {
  const path = PATHS[course.slug];
  if (!path) return null;

  const hasOnlineBankStarter = badges?.some(
    (b) => b.id === "online-bank-starter"
  );

  // Statuts dynamiques en fonction du badge
  const stepsWithStatus = path.steps.map((step, index) => {
    if (!hasOnlineBankStarter) {
      // Avant badge : step 1 active, le reste verrouillé
      if (index === 0) return { ...step, status: "current" };
      return { ...step, status: "locked" };
    } else {
      // Après badge : step 1 fait, step 2 active
      if (index === 0) return { ...step, status: "done" };
      if (index === 1) return { ...step, status: "current" };
      return { ...step, status: "locked" };
    }
  });

  const currentStep =
    stepsWithStatus.find((s) => s.status === "current") ?? stepsWithStatus[0];

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-3xl p-6 max-w-xl w-full shadow-xl border border-[#eae4df]">
        {/* Header avec Digi */}
        <div className="flex justify-between items-start gap-4 mb-4">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-[#2e4053]">
              {path.title}
            </h2>
            <p className="text-xs text-[#2e4053]/70 mt-1">
              {path.description}
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <img
              src={digiGuide}
              alt="Digi, your learning guide"
              className="h-12 w-auto"
            />
            <button
              onClick={onClose}
              className="text-sm text-[#2e4053]/60 hover:text-[#2e4053]"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Chemin zigzag */}
        <PathJourneyZigzag steps={stepsWithStatus} />

        {/* Bouton de lancement */}
        <div className="mt-4 flex flex-col items-center gap-2">
          {currentStep.launchUrl ? (
            <button
              onClick={() => {
                onStartModule(currentStep.launchUrl);
                onClose();
              }}
              className="inline-flex items-center gap-2 rounded-full bg-[#ef7d00] px-5 py-2 text-xs font-semibold text-white hover:bg-[#f9b13c] transition"
            >
              ▶ Start lesson: {currentStep.title}
            </button>
          ) : (
            <p className="text-[11px] text-[#2e4053]/60 text-center">
              This step will be available soon.
            </p>
          )}

          <p className="text-[11px] text-[#2e4053]/70 text-center">
            Follow the path step by step. Completing a quiz can unlock the next
            module.
          </p>
        </div>
      </div>
    </div>
  );
}

function PathJourneyZigzag({ steps }) {
  // petits offsets pour faire un chemin en S
  const OFFSETS = ["ml-0", "ml-10", "ml-4", "ml-12", "ml-6", "ml-10"];

  return (
    <div className="mt-4">
      <div className="relative">
        {/* Ligne pointillée verticale en fond */}
        <div className="absolute left-5 top-3 bottom-3 border-l-2 border-dashed border-[#f4c27b]" />

        <div className="space-y-6">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={
                "relative flex items-center " + (OFFSETS[index] || "ml-0")
              }
            >
              <PathBubble step={step} />

              {/* Petit segment horizontal pour l'effet "route" */}
              {index !== steps.length - 1 && (
                <div className="ml-2 flex-1 h-px border-t border-dashed border-[#f4c27b]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PathBubble({ step }) {
  const isCurrent = step.status === "current";
  const isLocked = step.status === "locked";
  const isDone = step.status === "done";

  const bubbleClasses = isCurrent
    ? "bg-[#ef7d00] text-white border-[#ef7d00]"
    : isLocked
    ? "bg-white text-[#2e4053]/50 border-[#eae4df]"
    : "bg-[#0e5988] text-white border-[#0e5988]";

  const icon = isLocked ? "🔒" : isDone ? "✓" : step.id;

  return (
    <div className="flex items-center gap-3">
      <div
        className={
          "h-9 w-9 rounded-full border flex items-center justify-center text-xs font-semibold shadow-sm " +
          bubbleClasses
        }
      >
        {icon}
      </div>
      <div>
        <div className="text-[11px] font-semibold text-[#2e4053]">
          {step.title}
        </div>
        <div className="text-[10px] text-[#9f8972]">{step.duration}</div>
      </div>
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
