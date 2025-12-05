import { useState, useEffect } from "react";
import logoDSF from "./assets/logo-dsf.png";
import digiGuide from "./assets/digi-guide.png";
import digiTablet from "./assets/digi-tablet.png";
import petaleBlanc from "./assets/petale-blanc.png";
import badgeOnlineBankStarter from "./assets/Badge_OnlineBankStarter.png";
import digiWelldone from "./assets/digi-welldone.png";

/* ---------- DATA ---------- */

/**
 * 5 parcours (Financial Literacy only)
 * Important: each lesson has its own launchUrl (clean base for later 1 video per lesson).
 * Replace the URLs with the real Storyline/video URLs when ready.
 */

const COURSES = [
  {
    id: 101,
    slug: "getting-started-ewallet",
    category: "Financial Literacy",
    categoryColor: "bg-[#f9b13c] text-[#2e4053]",
    title: "Getting Started with My eWallet",
    subtitle: "Understand the basics, setup, privacy, and support.",
    lessons: 8,
    duration: 45,
    isMine: true,
  },
  {
    id: 102,
    slug: "add-store-use-money-safely",
    category: "Financial Literacy",
    categoryColor: "bg-[#f9b13c] text-[#2e4053]",
    title: "Add, Store, and Use Money Safely",
    subtitle: "Top up, fees, cash out, and safe usage on shared phones.",
    lessons: 7,
    duration: 50,
    isMine: true,
  },
  {
    id: 103,
    slug: "everyday-government-payments",
    category: "Financial Literacy",
    categoryColor: "bg-[#f9b13c] text-[#2e4053]",
    title: "Everyday and Government Payments",
    subtitle: "Pay bills, shops, government fees, and handle failures/refunds.",
    lessons: 7,
    duration: 55,
    isMine: false,
  },
  {
    id: 104,
    slug: "send-receive-money-confidence",
    category: "Financial Literacy",
    categoryColor: "bg-[#f9b13c] text-[#2e4053]",
    title: "Send and Receive Money with Confidence",
    subtitle:
      "Send safely, confirm receipts, act fast on errors, understand limits.",
    lessons: 7,
    duration: 50,
    isMine: false,
  },
  {
    id: 105,
    slug: "protect-from-fraud-fix-issues",
    category: "Financial Literacy",
    categoryColor: "bg-[#f9b13c] text-[#2e4053]",
    title: "Protect Myself from Fraud and Fix Issues",
    subtitle:
      "Avoid scams, secure your account, solve disputes, and report fraud safely.",
    lessons: 7,
    duration: 60,
    isMine: false,
  },
];

const MAIN_TABS = [
  { id: "myCourses", label: "My courses", icon: "📚" },
  { id: "allCourses", label: "All courses", icon: "📖" },
  { id: "myProgress", label: "My progress", icon: "📊" },
];

/**
 * PATHS
 * Each step has:
 * - key: unique and stable (used for QUIZZES and completion)
 * - launchUrl: unique per lesson (placeholder for now)
 *
 * Replace base URL below if needed. Keep /story.html when you paste real Storyline URLs.
 */
const CONTENT_BASE =
  "https://dsf.global/wp-content/uploads/articulate_uploads/ewallet_finlit";

const PATHS = {
  "getting-started-ewallet": {
    title: "Getting Started with My eWallet",
    description:
      "Start from the basics, set up your wallet securely, understand privacy, and find official support.",
    steps: [
      {
        id: 1,
        key: "getting-started-ewallet__1",
        title: "What an eWallet Is (and Why It Helps)",
        duration: "8 min",
        launchUrl:
          "https://dsf.global/wp-content/uploads/articulate_uploads/What_is_an_electronic_wallet/story.html"
      },
      {
        id: 2,
        key: "getting-started-ewallet__2",
        title: "Create My Wallet and Set My PIN",
        duration: "10 min",
        launchUrl:
          "https://dsf.global/wp-content/uploads/articulate_uploads/What_is_an_electronic_wallet/story.html"
      },
      {
        id: 3,
        key: "getting-started-ewallet__3",
        title: "Verify My Identity (Simple Explanation)",
        duration: "10 min",
        launchUrl:
          "https://dsf.global/wp-content/uploads/articulate_uploads/What_is_an_electronic_wallet/story.html"
      },
      {
        id: 4,
        key: "getting-started-ewallet__4",
        title: "Check My Balance and Transaction History",
        duration: "8 min",
        launchUrl:
          "https://dsf.global/wp-content/uploads/articulate_uploads/What_is_an_electronic_wallet/story.html"
      },
      {
        id: 5,
        key: "getting-started-ewallet__5",
        title: "Understand Notifications and Status Messages",
        duration: "8 min",
        launchUrl:
          "https://dsf.global/wp-content/uploads/articulate_uploads/What_is_an_electronic_wallet/story.html"
      },
      {
        id: 6,
        key: "getting-started-ewallet__6",
        title: "Find Official Help and Support in the App",
        duration: "8 min",
        launchUrl:
          "https://dsf.global/wp-content/uploads/articulate_uploads/What_is_an_electronic_wallet/story.html"
      },
      {
        id: 7,
        key: "getting-started-ewallet__7",
        title: "Privacy Basics: What Data Is Used and Why",
        duration: "10 min",
        launchUrl:
          "https://dsf.global/wp-content/uploads/articulate_uploads/What_is_an_electronic_wallet/story.html"
      },
      {
        id: 8,
        key: "getting-started-ewallet__8",
        title: "Quick recap and safe next steps",
        duration: "6 min",
        launchUrl:
          "https://dsf.global/wp-content/uploads/articulate_uploads/What_is_an_electronic_wallet/story.html"
      },
    ],
  },

  "add-store-use-money-safely": {
    title: "Add, Store, and Use Money Safely",
    description:
      "Learn safe top ups, understand fees, handle pending transactions, and use your wallet safely on shared phones.",
    steps: [
      {
        id: 1,
        key: "add-store-use-money-safely__1",
        title: "Add Money (Top Up): Safe Steps",
        duration: "10 min",
        launchUrl: `${CONTENT_BASE}/add-store-use/lesson-01/story.html`,
      },
      {
        id: 2,
        key: "add-store-use-money-safely__2",
        title: "Fees Explained: What I Pay and Why",
        duration: "8 min",
        launchUrl: `${CONTENT_BASE}/add-store-use/lesson-02/story.html`,
      },
      {
        id: 3,
        key: "add-store-use-money-safely__3",
        title: "Cash Out: When and How It Works",
        duration: "10 min",
        launchUrl: `${CONTENT_BASE}/add-store-use/lesson-03/story.html`,
      },
      {
        id: 4,
        key: "add-store-use-money-safely__4",
        title: "Avoid Problems with Agents (If Agents Exist)",
        duration: "8 min",
        launchUrl: `${CONTENT_BASE}/add-store-use/lesson-04/story.html`,
      },
      {
        id: 5,
        key: "add-store-use-money-safely__5",
        title: "Pending Top Up: What to Do",
        duration: "8 min",
        launchUrl: `${CONTENT_BASE}/add-store-use/lesson-05/story.html`,
      },
      {
        id: 6,
        key: "add-store-use-money-safely__6",
        title: "Keep My Wallet Safe on a Shared Phone",
        duration: "10 min",
        launchUrl: `${CONTENT_BASE}/add-store-use/lesson-06/story.html`,
      },
      {
        id: 7,
        key: "add-store-use-money-safely__7",
        title: "Budget Inside the Wallet: Simple Weekly Plan",
        duration: "10 min",
        launchUrl: `${CONTENT_BASE}/add-store-use/lesson-07/story.html`,
      },
    ],
  },

  "everyday-government-payments": {
    title: "Everyday and Government Payments",
    description:
      "Pay fees, bills, and shops safely. Learn what to check before paying and what to do if things fail.",
    steps: [
      {
        id: 1,
        key: "everyday-government-payments__1",
        title: "Pay a Government Fee Step-by-Step",
        duration: "10 min",
        launchUrl: `${CONTENT_BASE}/payments/lesson-01/story.html`,
      },
      {
        id: 2,
        key: "everyday-government-payments__2",
        title: "Pay Bills (Water, Power, School)",
        duration: "10 min",
        launchUrl: `${CONTENT_BASE}/payments/lesson-02/story.html`,
      },
      {
        id: 3,
        key: "everyday-government-payments__3",
        title: "Pay in a Shop (QR, Code, or Phone Number)",
        duration: "8 min",
        launchUrl: `${CONTENT_BASE}/payments/lesson-03/story.html`,
      },
      {
        id: 4,
        key: "everyday-government-payments__4",
        title: "Before I Pay: The 3 Things I Must Check",
        duration: "8 min",
        launchUrl: `${CONTENT_BASE}/payments/lesson-04/story.html`,
      },
      {
        id: 5,
        key: "everyday-government-payments__5",
        title: "After I Pay: Receipt, Proof, and History",
        duration: "8 min",
        launchUrl: `${CONTENT_BASE}/payments/lesson-05/story.html`,
      },
      {
        id: 6,
        key: "everyday-government-payments__6",
        title: "Payment Failed: First Actions",
        duration: "8 min",
        launchUrl: `${CONTENT_BASE}/payments/lesson-06/story.html`,
      },
      {
        id: 7,
        key: "everyday-government-payments__7",
        title: "Refunds and Chargebacks: What to Expect",
        duration: "10 min",
        launchUrl: `${CONTENT_BASE}/payments/lesson-07/story.html`,
      },
    ],
  },

  "send-receive-money-confidence": {
    title: "Send and Receive Money with Confidence",
    description:
      "Send money to the right person, confirm receipts, understand limits, and learn what can be reversed.",
    steps: [
      {
        id: 1,
        key: "send-receive-money-confidence__1",
        title: "Send Money Safely (Avoid Wrong Person)",
        duration: "10 min",
        launchUrl: `${CONTENT_BASE}/send-receive/lesson-01/story.html`,
      },
      {
        id: 2,
        key: "send-receive-money-confidence__2",
        title: "Receive Money: How to Confirm It Is Real",
        duration: "8 min",
        launchUrl: `${CONTENT_BASE}/send-receive/lesson-02/story.html`,
      },
      {
        id: 3,
        key: "send-receive-money-confidence__3",
        title: "Wrong Number or Wrong Person: Act Fast",
        duration: "8 min",
        launchUrl: `${CONTENT_BASE}/send-receive/lesson-03/story.html`,
      },
      {
        id: 4,
        key: "send-receive-money-confidence__4",
        title: "Limits and Security Checks (Daily/Monthly)",
        duration: "10 min",
        launchUrl: `${CONTENT_BASE}/send-receive/lesson-04/story.html`,
      },
      {
        id: 5,
        key: "send-receive-money-confidence__5",
        title: "Reversals and Refunds: What Can and Cannot Happen",
        duration: "10 min",
        launchUrl: `${CONTENT_BASE}/send-receive/lesson-05/story.html`,
      },
      {
        id: 6,
        key: "send-receive-money-confidence__6",
        title: "Share Proof: How to Send a Receipt",
        duration: "8 min",
        launchUrl: `${CONTENT_BASE}/send-receive/lesson-06/story.html`,
      },
      {
        id: 7,
        key: "send-receive-money-confidence__7",
        title: "Split Payments and Family Contributions (Basic)",
        duration: "8 min",
        launchUrl: `${CONTENT_BASE}/send-receive/lesson-07/story.html`,
      },
    ],
  },

  "protect-from-fraud-fix-issues": {
    title: "Protect Myself from Fraud and Fix Issues",
    description:
      "Recognize scams, protect your codes, secure your account fast, and use official channels for help.",
    steps: [
      {
        id: 1,
        key: "protect-from-fraud-fix-issues__1",
        title: "Scam Messages and Fake Links: Quick Warning Signs",
        duration: "10 min",
        launchUrl: `${CONTENT_BASE}/fraud-issues/lesson-01/story.html`,
      },
      {
        id: 2,
        key: "protect-from-fraud-fix-issues__2",
        title: "Protect My PIN, Password, and OTP Codes",
        duration: "10 min",
        launchUrl: `${CONTENT_BASE}/fraud-issues/lesson-02/story.html`,
      },
      {
        id: 3,
        key: "protect-from-fraud-fix-issues__3",
        title: "Phone Security Basics (Lock, Updates, SIM Risks)",
        duration: "10 min",
        launchUrl: `${CONTENT_BASE}/fraud-issues/lesson-03/story.html`,
      },
      {
        id: 4,
        key: "protect-from-fraud-fix-issues__4",
        title: "If I Lose My Phone: Secure My Wallet Immediately",
        duration: "8 min",
        launchUrl: `${CONTENT_BASE}/fraud-issues/lesson-04/story.html`,
      },
      {
        id: 5,
        key: "protect-from-fraud-fix-issues__5",
        title: "If My Account Is at Risk: Secure It Now",
        duration: "8 min",
        launchUrl: `${CONTENT_BASE}/fraud-issues/lesson-05/story.html`,
      },
      {
        id: 6,
        key: "protect-from-fraud-fix-issues__6",
        title: "Disputes and Complaints: Simple Steps",
        duration: "10 min",
        launchUrl: `${CONTENT_BASE}/fraud-issues/lesson-06/story.html`,
      },
      {
        id: 7,
        key: "protect-from-fraud-fix-issues__7",
        title: "Report Fraud Safely (Official Channels Only)",
        duration: "10 min",
        launchUrl: `${CONTENT_BASE}/fraud-issues/lesson-07/story.html`,
      },
    ],
  },
};
/**
 * QUIZZES
 * - 3 questions par lesson
 * - clé = step.key
 * - format identique à ton QuizModal (answers avec correct: true|false)
 *
 * Note: pour rester maintenable, les questions sont "génériques mais pertinentes"
 * et couvrent logique safe steps / checking / privacy / fraud.
 */
const QUIZZES = {
  // --- PATH 1: Getting Started ---
  "getting-started-ewallet__1": [
    { id: 1, question: "What is an eWallet used for?", answers: [
      { text: "To store and use money digitally in an app", correct: true },
      { text: "To create money without a bank", correct: false },
      { text: "To avoid any identity checks forever", correct: false },
    ] },
    { id: 2, question: "What is a key benefit of an eWallet?", answers: [
      { text: "You can check balance and history without traveling", correct: true },
      { text: "You never need to protect your phone", correct: false },
      { text: "Payments cannot fail", correct: false },
    ] },
    { id: 3, question: "What is a safe habit when using an eWallet?", answers: [
      { text: "Keep your PIN private and your phone locked", correct: true },
      { text: "Share your PIN with family to make it easier", correct: false },
      { text: "Use any link you receive to log in", correct: false },
    ] },
  ],
  "getting-started-ewallet__2": [
    { id: 1, question: "What should your wallet PIN be like?", answers: [
      { text: "Hard to guess and kept secret", correct: true },
      { text: "The same as your birth year", correct: false },
      { text: "Written on the phone screen for reminders", correct: false },
    ] },
    { id: 2, question: "What is a safe step during setup?", answers: [
      { text: "Set a screen lock on your phone before using the wallet", correct: true },
      { text: "Disable security prompts permanently", correct: false },
      { text: "Share your login details with an agent", correct: false },
    ] },
    { id: 3, question: "If someone asks for your PIN to help you, what should you do?", answers: [
      { text: "Refuse and use official support channels instead", correct: true },
      { text: "Give it only for one minute", correct: false },
      { text: "Send it by SMS to save time", correct: false },
    ] },
  ],
  "getting-started-ewallet__3": [
    { id: 1, question: "Why might identity verification be required?", answers: [
      { text: "To comply with rules and protect against fraud", correct: true },
      { text: "To let other people access your account", correct: false },
      { text: "To remove all transaction limits instantly", correct: false },
    ] },
    { id: 2, question: "Which is a safe verification practice?", answers: [
      { text: "Use only the official app flow and official channels", correct: true },
      { text: "Send your ID to a random social media account", correct: false },
      { text: "Share your OTP code with a helper", correct: false },
    ] },
    { id: 3, question: "What should you keep private during verification?", answers: [
      { text: "PINs, passwords, and OTP codes", correct: true },
      { text: "Your app language setting", correct: false },
      { text: "Your transaction history screenshots", correct: false },
    ] },
  ],
  "getting-started-ewallet__4": [
    { id: 1, question: "Where can you confirm a payment or top up happened?", answers: [
      { text: "In the wallet transaction history", correct: true },
      { text: "Only in a text message from anyone", correct: false },
      { text: "By guessing based on your memory", correct: false },
    ] },
    { id: 2, question: "What is a good first check if money seems missing?", answers: [
      { text: "Look for a pending status in the transaction list", correct: true },
      { text: "Share your PIN with a friend to investigate", correct: false },
      { text: "Immediately delete the app", correct: false },
    ] },
    { id: 3, question: "Which action is safest on a shared phone?", answers: [
      { text: "Log out or lock the app after checking your balance", correct: true },
      { text: "Leave the app open for convenience", correct: false },
      { text: "Save PIN in notes", correct: false },
    ] },
  ],
  "getting-started-ewallet__5": [
    { id: 1, question: "What does a notification often tell you?", answers: [
      { text: "A transaction status like pending, success, or failed", correct: true },
      { text: "Your PIN in case you forget it", correct: false },
      { text: "That you must click a random link immediately", correct: false },
    ] },
    { id: 2, question: "If a message asks you to click a link to 'fix' your wallet, what is safest?", answers: [
      { text: "Open the app directly, not the link, and verify in-app", correct: true },
      { text: "Click quickly because it expires", correct: false },
      { text: "Forward it to friends to confirm", correct: false },
    ] },
    { id: 3, question: "What is a common scam sign?", answers: [
      { text: "Urgency plus request for codes or PIN", correct: true },
      { text: "A receipt inside the official app", correct: false },
      { text: "A status message that matches your history", correct: false },
    ] },
  ],
  "getting-started-ewallet__6": [
    { id: 1, question: "Where should you seek help first?", answers: [
      { text: "Official in-app help/support or official channels", correct: true },
      { text: "A random phone number in a message", correct: false },
      { text: "Someone offering help for a fee in the street", correct: false },
    ] },
    { id: 2, question: "What information should you avoid sharing with support agents?", answers: [
      { text: "Your PIN, password, or OTP", correct: true },
      { text: "A transaction reference number", correct: false },
      { text: "The general problem description", correct: false },
    ] },
    { id: 3, question: "What is useful to prepare before contacting support?", answers: [
      { text: "Transaction time, amount, and status from history", correct: true },
      { text: "Your full PIN and OTP to speed up", correct: false },
      { text: "Your friend’s phone for login", correct: false },
    ] },
  ],
  "getting-started-ewallet__7": [
    { id: 1, question: "Why does an app use some personal data?", answers: [
      { text: "To operate services securely and prevent fraud", correct: true },
      { text: "To share your account with others automatically", correct: false },
      { text: "To remove security settings", correct: false },
    ] },
    { id: 2, question: "What is a safe privacy habit?", answers: [
      { text: "Review permissions and keep your phone locked", correct: true },
      { text: "Post screenshots of your balance online", correct: false },
      { text: "Share your OTP codes with family", correct: false },
    ] },
    { id: 3, question: "What should you do before using a new feature that asks permissions?", answers: [
      { text: "Read what data is requested and why", correct: true },
      { text: "Allow everything without reading", correct: false },
      { text: "Disable all security updates", correct: false },
    ] },
  ],
  "getting-started-ewallet__8": [
    { id: 1, question: "What is the safest next step after finishing setup?", answers: [
      { text: "Practice checking history and keeping your account secure", correct: true },
      { text: "Share your PIN with someone for backup", correct: false },
      { text: "Disable notifications and locks", correct: false },
    ] },
    { id: 2, question: "What should you do if you suspect suspicious activity?", answers: [
      { text: "Secure the account and contact official support", correct: true },
      { text: "Wait and hope it goes away", correct: false },
      { text: "Click a link in the suspicious message", correct: false },
    ] },
    { id: 3, question: "Which habit reduces risk the most?", answers: [
      { text: "Never share PIN/OTP and use device lock", correct: true },
      { text: "Use the same password everywhere", correct: false },
      { text: "Save codes inside chat apps", correct: false },
    ] },
  ],

  // --- PATH 2: Add, Store, Use ---
  "add-store-use-money-safely__1": [
    { id: 1, question: "What is a safe step before topping up?", answers: [
      { text: "Confirm the correct account and amount before confirming", correct: true },
      { text: "Share your PIN with the person helping", correct: false },
      { text: "Send OTP by SMS to an agent", correct: false },
    ] },
    { id: 2, question: "Where should you verify the top up status?", answers: [
      { text: "In the in-app transaction history", correct: true },
      { text: "Only from a text message screenshot", correct: false },
      { text: "By restarting your phone and guessing", correct: false },
    ] },
    { id: 3, question: "What is a common risk during top up?", answers: [
      { text: "Confirming wrong amount or wrong destination", correct: true },
      { text: "Having a receipt generated", correct: false },
      { text: "Using the official app", correct: false },
    ] },
  ],
  "add-store-use-money-safely__2": [
    { id: 1, question: "Why should you understand fees?", answers: [
      { text: "To know the final amount you pay or receive", correct: true },
      { text: "Because fees never change", correct: false },
      { text: "So you can avoid reading receipts", correct: false },
    ] },
    { id: 2, question: "What is a safe way to check fees?", answers: [
      { text: "Use official in-app fee info or official support", correct: true },
      { text: "Trust any message promising 'zero fees' links", correct: false },
      { text: "Share your password to get fee help", correct: false },
    ] },
    { id: 3, question: "If the fee looks unexpected, what should you do first?", answers: [
      { text: "Stop and review details before confirming", correct: true },
      { text: "Confirm quickly to avoid cancellation", correct: false },
      { text: "Send OTP to verify with a helper", correct: false },
    ] },
  ],
  "add-store-use-money-safely__3": [
    { id: 1, question: "What should you check before cashing out?", answers: [
      { text: "Amount, fees, and the correct cash out method", correct: true },
      { text: "Only your phone battery level", correct: false },
      { text: "That someone else has your PIN", correct: false },
    ] },
    { id: 2, question: "Where is the safest proof of cash out?", answers: [
      { text: "Receipt or record in the wallet history", correct: true },
      { text: "A verbal promise", correct: false },
      { text: "A random SMS link", correct: false },
    ] },
    { id: 3, question: "If something feels wrong during cash out, what is safest?", answers: [
      { text: "Stop, keep proof, and use official support", correct: true },
      { text: "Share your OTP to speed up", correct: false },
      { text: "Hand over your phone unlocked", correct: false },
    ] },
  ],
  "add-store-use-money-safely__4": [
    { id: 1, question: "What is a safe rule with agents?", answers: [
      { text: "Never share PIN/OTP and always confirm amounts yourself", correct: true },
      { text: "Let the agent type your PIN for you", correct: false },
      { text: "Give your phone to the agent until it works", correct: false },
    ] },
    { id: 2, question: "What proof should you keep after a transaction with an agent?", answers: [
      { text: "A receipt or in-app history record", correct: true },
      { text: "Only a handwritten note", correct: false },
      { text: "A screenshot from the agent’s phone", correct: false },
    ] },
    { id: 3, question: "If an agent pressures you to go fast, what is safest?", answers: [
      { text: "Slow down, verify details, or cancel", correct: true },
      { text: "Proceed because speed means safety", correct: false },
      { text: "Share OTP to finish quickly", correct: false },
    ] },
  ],
  "add-store-use-money-safely__5": [
    { id: 1, question: "What does 'pending' usually mean?", answers: [
      { text: "The transaction is not finished yet", correct: true },
      { text: "The fee is always doubled", correct: false },
      { text: "The money is permanently lost", correct: false },
    ] },
    { id: 2, question: "What is a safe first action when a top up is pending?", answers: [
      { text: "Wait a little and check status in history before retrying", correct: true },
      { text: "Retry many times immediately", correct: false },
      { text: "Share password so someone else can fix it", correct: false },
    ] },
    { id: 3, question: "What should you save if a pending issue continues?", answers: [
      { text: "Transaction reference, time, and status", correct: true },
      { text: "Your PIN and OTP codes", correct: false },
      { text: "A random link from a message", correct: false },
    ] },
  ],
  "add-store-use-money-safely__6": [
    { id: 1, question: "What is the safest practice on a shared phone?", answers: [
      { text: "Use phone lock and do not store PIN anywhere", correct: true },
      { text: "Keep wallet open to save time", correct: false },
      { text: "Write PIN in notes app", correct: false },
    ] },
    { id: 2, question: "Why is logging out or locking the app important?", answers: [
      { text: "It reduces unauthorized access risk", correct: true },
      { text: "It makes transactions pending forever", correct: false },
      { text: "It increases fees", correct: false },
    ] },
    { id: 3, question: "If someone needs to borrow your phone, what is safest?", answers: [
      { text: "Lock the phone and close the wallet first", correct: true },
      { text: "Share PIN so they can help", correct: false },
      { text: "Hand over the phone unlocked", correct: false },
    ] },
  ],
  "add-store-use-money-safely__7": [
    { id: 1, question: "What is a simple weekly budget goal?", answers: [
      { text: "Plan spending so essentials are covered first", correct: true },
      { text: "Spend everything early to avoid tracking", correct: false },
      { text: "Ignore transaction history", correct: false },
    ] },
    { id: 2, question: "What helps you stay on budget inside a wallet?", answers: [
      { text: "Checking history and setting simple weekly limits", correct: true },
      { text: "Sharing your password with family", correct: false },
      { text: "Turning off receipts", correct: false },
    ] },
    { id: 3, question: "Which is a safe budgeting habit?", answers: [
      { text: "Review spending regularly and adjust", correct: true },
      { text: "Never check your balance", correct: false },
      { text: "Save OTP codes for later", correct: false },
    ] },
  ],

  // --- PATH 3: Payments ---
  "everyday-government-payments__1": [
    { id: 1, question: "What should you check before paying a government fee?", answers: [
      { text: "Correct service, amount, and official recipient details", correct: true },
      { text: "Only that it is a message you received", correct: false },
      { text: "That someone else can enter your PIN", correct: false },
    ] },
    { id: 2, question: "What is the safest way to start the payment?", answers: [
      { text: "From inside the official app, not from external links", correct: true },
      { text: "From any social media link", correct: false },
      { text: "By sharing OTP with a helper", correct: false },
    ] },
    { id: 3, question: "What proof should you keep after paying?", answers: [
      { text: "Receipt and transaction history record", correct: true },
      { text: "A verbal confirmation only", correct: false },
      { text: "Your PIN written down", correct: false },
    ] },
  ],
  "everyday-government-payments__2": [
    { id: 1, question: "What should you confirm when paying a bill?", answers: [
      { text: "Bill reference, recipient, and amount", correct: true },
      { text: "Only your phone model", correct: false },
      { text: "That the link came by SMS", correct: false },
    ] },
    { id: 2, question: "Why is bill reference important?", answers: [
      { text: "It helps match payment to the correct bill", correct: true },
      { text: "It replaces your PIN", correct: false },
      { text: "It makes fees disappear", correct: false },
    ] },
    { id: 3, question: "What is a safe habit after paying bills?", answers: [
      { text: "Check history and keep proof of payment", correct: true },
      { text: "Delete the app to be safe", correct: false },
      { text: "Share receipt plus PIN together", correct: false },
    ] },
  ],
  "everyday-government-payments__3": [
    { id: 1, question: "When paying in a shop, what should you verify?", answers: [
      { text: "Merchant name/number and amount before confirming", correct: true },
      { text: "Only the shop color or logo", correct: false },
      { text: "That the cashier knows your PIN", correct: false },
    ] },
    { id: 2, question: "Which is the safest behaviour with QR codes?", answers: [
      { text: "Confirm merchant details in-app before paying", correct: true },
      { text: "Scan any QR code you see", correct: false },
      { text: "Send your OTP to confirm the scan", correct: false },
    ] },
    { id: 3, question: "After paying in a shop, what should you do?", answers: [
      { text: "Save or show official receipt/proof", correct: true },
      { text: "Share your PIN to prove it", correct: false },
      { text: "Ignore the payment status", correct: false },
    ] },
  ],
  "everyday-government-payments__4": [
    { id: 1, question: "Before paying, what are the 3 most important checks?", answers: [
      { text: "Recipient, amount, and reference/purpose", correct: true },
      { text: "Battery, wallpaper, and ringtone", correct: false },
      { text: "Friend approval, agent approval, and speed", correct: false },
    ] },
    { id: 2, question: "Why is checking recipient crucial?", answers: [
      { text: "Payments can be hard or impossible to reverse", correct: true },
      { text: "It makes the phone faster", correct: false },
      { text: "It reduces PIN length", correct: false },
    ] },
    { id: 3, question: "What is safest if any check does not match?", answers: [
      { text: "Stop and do not confirm the payment", correct: true },
      { text: "Confirm anyway to save time", correct: false },
      { text: "Send OTP to a helper for advice", correct: false },
    ] },
  ],
  "everyday-government-payments__5": [
    { id: 1, question: "What is a receipt useful for?", answers: [
      { text: "Proof of payment and dispute support", correct: true },
      { text: "Sharing your PIN safely", correct: false },
      { text: "Bypassing security checks", correct: false },
    ] },
    { id: 2, question: "Where is the best place to confirm it went through?", answers: [
      { text: "In transaction history with success status", correct: true },
      { text: "From unverified SMS screenshots", correct: false },
      { text: "From someone else’s phone", correct: false },
    ] },
    { id: 3, question: "What should you keep private even when sharing proof?", answers: [
      { text: "PIN, password, OTP codes", correct: true },
      { text: "Transaction amount", correct: false },
      { text: "Merchant name", correct: false },
    ] },
  ],
  "everyday-government-payments__6": [
    { id: 1, question: "If a payment fails, what is a safe first step?", answers: [
      { text: "Check status in history and read the error message", correct: true },
      { text: "Repeat payment many times quickly", correct: false },
      { text: "Share OTP for instant fix", correct: false },
    ] },
    { id: 2, question: "What can happen if you retry too quickly?", answers: [
      { text: "You might pay twice if one attempt later succeeds", correct: true },
      { text: "Fees always become zero", correct: false },
      { text: "Security becomes unnecessary", correct: false },
    ] },
    { id: 3, question: "What details help support resolve failed payments?", answers: [
      { text: "Reference, time, amount, and status", correct: true },
      { text: "Your PIN and OTP", correct: false },
      { text: "Your phone gallery", correct: false },
    ] },
  ],
  "everyday-government-payments__7": [
    { id: 1, question: "What is realistic about refunds/chargebacks?", answers: [
      { text: "They can take time and depend on rules and evidence", correct: true },
      { text: "They are always instant", correct: false },
      { text: "They require sharing your PIN", correct: false },
    ] },
    { id: 2, question: "What proof usually helps in a refund request?", answers: [
      { text: "Receipt and transaction record", correct: true },
      { text: "Your OTP codes", correct: false },
      { text: "A random chat message", correct: false },
    ] },
    { id: 3, question: "What is safest if someone offers a refund through a link?", answers: [
      { text: "Do not click; verify inside the official app", correct: true },
      { text: "Click immediately to claim it", correct: false },
      { text: "Send your password to confirm identity", correct: false },
    ] },
  ],

  // --- PATH 4: Send/Receive ---
  "send-receive-money-confidence__1": [
    { id: 1, question: "What should you confirm before sending money?", answers: [
      { text: "Recipient identity/number and amount", correct: true },
      { text: "Only your phone battery", correct: false },
      { text: "That a friend has your OTP", correct: false },
    ] },
    { id: 2, question: "What is safest if you are not 100% sure about the recipient?", answers: [
      { text: "Stop and verify with the person using a trusted method", correct: true },
      { text: "Send a small amount and hope", correct: false },
      { text: "Share your PIN to confirm", correct: false },
    ] },
    { id: 3, question: "Why is 'wrong person' a serious risk?", answers: [
      { text: "Transfers can be difficult to reverse", correct: true },
      { text: "Transfers always fail anyway", correct: false },
      { text: "It only changes notification sounds", correct: false },
    ] },
  ],
  "send-receive-money-confidence__2": [
    { id: 1, question: "How can you confirm money received is real?", answers: [
      { text: "Check in-app balance/history, not only messages", correct: true },
      { text: "Trust any screenshot you receive", correct: false },
      { text: "Ask for the sender’s PIN", correct: false },
    ] },
    { id: 2, question: "What is a scam sign about receiving money?", answers: [
      { text: "Pressure to refund before confirming in your wallet", correct: true },
      { text: "A normal in-app receipt", correct: false },
      { text: "A legitimate transaction history entry", correct: false },
    ] },
    { id: 3, question: "What is safest if someone says they sent money but you do not see it?", answers: [
      { text: "Ask for transaction reference and verify in-app", correct: true },
      { text: "Send them money back anyway", correct: false },
      { text: "Share your OTP so they can check", correct: false },
    ] },
  ],
  "send-receive-money-confidence__3": [
    { id: 1, question: "If you send to the wrong number, what should you do first?", answers: [
      { text: "Act fast: check status and contact official support", correct: true },
      { text: "Wait several days and do nothing", correct: false },
      { text: "Share your PIN to recover funds", correct: false },
    ] },
    { id: 2, question: "What information is useful for a wrong-recipient case?", answers: [
      { text: "Reference ID, time, amount, recipient", correct: true },
      { text: "Your OTP codes", correct: false },
      { text: "Your phone unlock pattern", correct: false },
    ] },
    { id: 3, question: "What is unsafe to do after sending to the wrong person?", answers: [
      { text: "Share PIN/OTP with anyone claiming they can reverse it", correct: true },
      { text: "Contact official support", correct: false },
      { text: "Keep the receipt and details", correct: false },
    ] },
  ],
  "send-receive-money-confidence__4": [
    { id: 1, question: "Why do wallets have limits and security checks?", answers: [
      { text: "To reduce fraud and protect users", correct: true },
      { text: "To force you to share passwords", correct: false },
      { text: "To hide transaction records", correct: false },
    ] },
    { id: 2, question: "What is safest if you hit a limit?", answers: [
      { text: "Review limits in-app and follow official guidance", correct: true },
      { text: "Use a random link to remove limits", correct: false },
      { text: "Send OTP to someone to bypass checks", correct: false },
    ] },
    { id: 3, question: "Which behaviour improves security most?", answers: [
      { text: "Use device lock and never share codes", correct: true },
      { text: "Reuse the same PIN everywhere", correct: false },
      { text: "Save OTP codes",
        correct: false },
    ] },
  ],
  "send-receive-money-confidence__5": [
    { id: 1, question: "What is true about reversals and refunds?", answers: [
      { text: "Some transactions cannot be reversed, and rules apply", correct: true },
      { text: "Every transfer is instant-reversible", correct: false },
      { text: "Sharing OTP makes it reversible", correct: false },
    ] },
    { id: 2, question: "What is safest to do if you need a reversal?", answers: [
      { text: "Use official dispute/support process with proof", correct: true },
      { text: "Click a refund link in a message", correct: false },
      { text: "Send your PIN to an agent", correct: false },
    ] },
    { id: 3, question: "What proof helps most in these cases?", answers: [
      { text: "Receipt, reference, and history status", correct: true },
      { text: "Your passwords", correct: false },
      { text: "Your contact list", correct: false },
    ] },
  ],
  "send-receive-money-confidence__6": [
    { id: 1, question: "What should a shared proof/receipt include?", answers: [
      { text: "Reference, amount, date (without sharing PIN/OTP)", correct: true },
      { text: "Your PIN to prove it was yours", correct: false },
      { text: "A random link to your account", correct: false },
    ] },
    { id: 2, question: "What is the safest way to share proof?", answers: [
      { text: "Share only receipt details, not security codes", correct: true },
      { text: "Share OTP codes for extra trust", correct: false },
      { text: "Share your password so they can see it", correct: false },
    ] },
    { id: 3, question: "Why keep proof?", answers: [
      { text: "To resolve disputes and confirm payments", correct: true },
      { text: "To make fees higher", correct: false },
      { text: "To disable security checks", correct: false },
    ] },
  ],
  "send-receive-money-confidence__7": [
    { id: 1, question: "What is a safe way to split payments?", answers: [
      { text: "Agree amounts first, then send with correct recipient checks", correct: true },
      { text: "Send to any number and fix later", correct: false },
      { text: "Share PIN with family to simplify", correct: false },
    ] },
    { id: 2, question: "What should you check before each family contribution transfer?", answers: [
      { text: "Recipient and amount every time", correct: true },
      { text: "Only once for the whole month", correct: false },
      { text: "That someone has your OTP", correct: false },
    ] },
    { id: 3, question: "What is safest if a family member asks for your OTP?", answers: [
      { text: "Do not share; use official methods and your own actions", correct: true },
      { text: "Share only for small amounts", correct: false },
      { text: "Post it in a group chat", correct: false },
    ] },
  ],

  // --- PATH 5: Fraud & Issues ---
  "protect-from-fraud-fix-issues__1": [
    { id: 1, question: "Which is a common scam message sign?", answers: [
      { text: "Urgent request plus a link to 'verify' and ask for codes", correct: true },
      { text: "A calm message telling you to open the official app", correct: false },
      { text: "A normal in-app notification", correct: false },
    ] },
    { id: 2, question: "What is safest when receiving a suspicious link?", answers: [
      { text: "Do not click; open the app directly and verify", correct: true },
      { text: "Click quickly to avoid missing out", correct: false },
      { text: "Share the link to friends for advice", correct: false },
    ] },
    { id: 3, question: "What should you never share?", answers: [
      { text: "PIN, password, OTP codes", correct: true },
      { text: "App language", correct: false },
      { text: "General problem description", correct: false },
    ] },
  ],
  "protect-from-fraud-fix-issues__2": [
    { id: 1, question: "What does OTP mean in practice?", answers: [
      { text: "A one-time code used to confirm sensitive actions", correct: true },
      { text: "A code you can share safely with support", correct: false },
      { text: "A public code for marketing", correct: false },
    ] },
    { id: 2, question: "If someone claims to be support and asks for OTP, what is safest?", answers: [
      { text: "Refuse and contact official support yourself", correct: true },
      { text: "Share it once only", correct: false },
      { text: "Send it if they sound professional", correct: false },
    ] },
    { id: 3, question: "What is a strong protection habit?", answers: [
      { text: "Use device lock, keep codes private, and review activity", correct: true },
      { text: "Reuse the same PIN everywhere", correct: false },
      { text: "Save OTP codes in notes", correct: false },
    ] },
  ],
  "protect-from-fraud-fix-issues__3": [
    { id: 1, question: "Why are phone updates important?", answers: [
      { text: "They fix security vulnerabilities", correct: true },
      { text: "They remove the need for PIN", correct: false },
      { text: "They guarantee refunds", correct: false },
    ] },
    { id: 2, question: "What is a SIM risk?", answers: [
      { text: "Someone could try to take over your number for codes", correct: true },
      { text: "It makes your screen brighter", correct: false },
      { text: "It doubles your balance", correct: false },
    ] },
    { id: 3, question: "What is the safest baseline setup?", answers: [
      { text: "Screen lock + updates + careful handling of codes", correct: true },
      { text: "No lock because it is annoying", correct: false },
      { text: "Share PIN to ensure access", correct: false },
    ] },
  ],
  "protect-from-fraud-fix-issues__4": [
    { id: 1, question: "If you lose your phone, what should you do first?", answers: [
      { text: "Secure the wallet immediately using official steps", correct: true },
      { text: "Wait to see if it comes back", correct: false },
      { text: "Post your PIN online to warn others", correct: false },
    ] },
    { id: 2, question: "What is unsafe after losing a phone?", answers: [
      { text: "Sharing your OTP with someone to 'help' secure it", correct: true },
      { text: "Contacting official support", correct: false },
      { text: "Following official account security steps", correct: false },
    ] },
    { id: 3, question: "Why act fast?", answers: [
      { text: "To reduce unauthorized access and fraud risk", correct: true },
      { text: "Because fees increase every minute", correct: false },
      { text: "Because history gets erased automatically", correct: false },
    ] },
  ],
  "protect-from-fraud-fix-issues__5": [
    { id: 1, question: "If you suspect account risk, what is a safe next step?", answers: [
      { text: "Secure access and contact official support with proof", correct: true },
      { text: "Share PIN so someone can check quickly", correct: false },
      { text: "Click a link in the suspicious message", correct: false },
    ] },
    { id: 2, question: "What information should stay private at all times?", answers: [
      { text: "PIN, password, OTP codes", correct: true },
      { text: "Transaction date", correct: false },
      { text: "Merchant name", correct: false },
    ] },
    { id: 3, question: "What helps you detect issues early?", answers: [
      { text: "Regularly checking transaction history and notifications", correct: true },
      { text: "Never checking your balance", correct: false },
      { text: "Sharing access with others", correct: false },
    ] },
  ],
  "protect-from-fraud-fix-issues__6": [
    { id: 1, question: "What is the purpose of a dispute/complaint process?", answers: [
      { text: "To investigate issues using evidence and records", correct: true },
      { text: "To instantly reverse all payments", correct: false },
      { text: "To collect your PIN for verification", correct: false },
    ] },
    { id: 2, question: "What evidence helps a complaint?", answers: [
      { text: "Receipt, reference, time, and status", correct: true },
      { text: "OTP codes", correct: false },
      { text: "Your phone unlock code", correct: false },
    ] },
    { id: 3, question: "What is safest if someone offers 'fast dispute resolution' via a link?", answers: [
      { text: "Ignore it and use official channels only", correct: true },
      { text: "Click it because it is faster", correct: false },
      { text: "Send password for verification", correct: false },
    ] },
  ],
  "protect-from-fraud-fix-issues__7": [
    { id: 1, question: "Where should fraud be reported?", answers: [
      { text: "Official channels only (in-app/support)", correct: true },
      { text: "Any number in a message", correct: false },
      { text: "A social media page that promises refunds", correct: false },
    ] },
    { id: 2, question: "What is a safe reporting habit?", answers: [
      { text: "Provide transaction details, not PIN/OTP", correct: true },
      { text: "Send OTP to prove identity quickly", correct: false },
      { text: "Share your password with the reporter", correct: false },
    ] },
    { id: 3, question: "What is an important reason to report fraud?", answers: [
      { text: "To protect your account and help prevent future scams", correct: true },
      { text: "To remove the need for security forever", correct: false },
      { text: "To increase limits automatically", correct: false },
    ] },
  ],
};
/* ---------- OUTCOMES (Now you can...) ---------- */
/* Simple default outcomes for every lesson (you can refine later). */
const OUTCOMES = Object.fromEntries(
  Object.values(PATHS)
    .flatMap((p) => p.steps)
    .map((step) => [
      step.key,
      [
        "Check the key details before confirming an action (recipient, amount, reference).",
        "Use the transaction history to verify status (success, pending, failed).",
        "Know the safest next step: stop, verify in-app, and use official support channels.",
      ],
    ])
);

/* ---------- MILESTONE BADGES ---------- */
const MILESTONE_BADGES = {
  "first-lesson": {
    id: "first-lesson",
    icon: "🏁",
    title: "First Lesson Completed",
    description: "You completed your first lesson quiz with a perfect score.",
  },
  "path-getting-started-ewallet": {
    id: "path-getting-started-ewallet",
    icon: "🎓",
    title: "Path Completed: Getting Started",
    description: "You completed the full Getting Started with My eWallet path.",
  },
  "path-add-store-use-money-safely": {
    id: "path-add-store-use-money-safely",
    icon: "💰",
    title: "Path Completed: Add & Use Money Safely",
    description: "You completed the full Add, Store, and Use Money Safely path.",
  },
  "path-everyday-government-payments": {
    id: "path-everyday-government-payments",
    icon: "🧾",
    title: "Path Completed: Payments",
    description: "You completed the full Everyday and Government Payments path.",
  },
  "path-send-receive-money-confidence": {
    id: "path-send-receive-money-confidence",
    icon: "📤",
    title: "Path Completed: Send & Receive",
    description: "You completed the full Send and Receive Money with Confidence path.",
  },
  "path-protect-from-fraud-fix-issues": {
    id: "path-protect-from-fraud-fix-issues",
    icon: "🛡️",
    title: "Path Completed: Protect & Fix Issues",
    description: "You completed the full Protect Myself from Fraud and Fix Issues path.",
  },
};

/* ---------- APP ---------- */

export default function App() {
  const [activeMainTab, setActiveMainTab] = useState("allCourses");
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [activeModuleUrl, setActiveModuleUrl] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);

  // Lesson progression (step unlocking)
  const [completedLessons, setCompletedLessons] = useState([]);
  const [pendingQuizStepKey, setPendingQuizStepKey] = useState(null);

  // Badges (milestones)
  const [badges, setBadges] = useState([]);
  const [lastEarnedBadge, setLastEarnedBadge] = useState(null);

  // Continue learning
  const [lastCourseSlug, setLastCourseSlug] = useState(null);
  const [lastStepKey, setLastStepKey] = useState(null);

  // Streak
  const [streakCount, setStreakCount] = useState(0);
  const [streakLastDate, setStreakLastDate] = useState(null);

  // Now you can modal
  const [showOutcome, setShowOutcome] = useState(false);
  const [outcomeStepKey, setOutcomeStepKey] = useState(null);

  // Certificate modal
  const [showCertificate, setShowCertificate] = useState(false);
  const [certificateSlug, setCertificateSlug] = useState(null);
  const [learnerName, setLearnerName] = useState("");
  const [certificates, setCertificates] = useState([]); // [{slug, date}]

  /* ---------- localStorage: badges ---------- */

  useEffect(() => {
    try {
      const stored = localStorage.getItem("dsfBadges");
      if (stored) setBadges(JSON.parse(stored));
    } catch (e) {
      console.error("Cannot load badges from storage", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("dsfBadges", JSON.stringify(badges));
    } catch (e) {
      console.error("Cannot save badges to storage", e);
    }
  }, [badges]);

  /* ---------- localStorage: completed lessons ---------- */

  useEffect(() => {
    try {
      const stored = localStorage.getItem("dsfCompletedLessons");
      if (stored) setCompletedLessons(JSON.parse(stored));
    } catch (e) {
      console.error("Cannot load completed lessons", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        "dsfCompletedLessons",
        JSON.stringify(completedLessons)
      );
    } catch (e) {
      console.error("Cannot save completed lessons", e);
    }
  }, [completedLessons]);

  /* ---------- localStorage: continue learning ---------- */

  useEffect(() => {
    try {
      setLastCourseSlug(localStorage.getItem("dsfLastCourseSlug") || null);
      setLastStepKey(localStorage.getItem("dsfLastStepKey") || null);
    } catch (e) {
      console.error("Cannot load last progress", e);
    }
  }, []);

  useEffect(() => {
    try {
      if (lastCourseSlug)
        localStorage.setItem("dsfLastCourseSlug", lastCourseSlug);
      if (lastStepKey) localStorage.setItem("dsfLastStepKey", lastStepKey);
    } catch (e) {
      console.error("Cannot save last progress", e);
    }
  }, [lastCourseSlug, lastStepKey]);

  /* ---------- localStorage: streak ---------- */

  useEffect(() => {
    try {
      const c = localStorage.getItem("dsfStreakCount");
      const d = localStorage.getItem("dsfStreakLastDate");
      if (c) setStreakCount(parseInt(c, 10) || 0);
      if (d) setStreakLastDate(d);
    } catch (e) {
      console.error("Cannot load streak", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("dsfStreakCount", String(streakCount));
      if (streakLastDate)
        localStorage.setItem("dsfStreakLastDate", streakLastDate);
    } catch (e) {
      console.error("Cannot save streak", e);
    }
  }, [streakCount, streakLastDate]);

  /* ---------- localStorage: certificates + name ---------- */

  useEffect(() => {
    try {
      const n = localStorage.getItem("dsfLearnerName");
      const cs = localStorage.getItem("dsfCertificates");
      if (n) setLearnerName(n);
      if (cs) setCertificates(JSON.parse(cs));
    } catch (e) {
      console.error("Cannot load certificates", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("dsfLearnerName", learnerName);
      localStorage.setItem("dsfCertificates", JSON.stringify(certificates));
    } catch (e) {
      console.error("Cannot save certificates", e);
    }
  }, [learnerName, certificates]);

  /* ---------- helpers ---------- */

  const todayStr = () => new Date().toISOString().slice(0, 10);

  const addDays = (yyyyMmDd, days) => {
    const [y, m, d] = yyyyMmDd.split("-").map(Number);
    const dt = new Date(y, m - 1, d);
    dt.setDate(dt.getDate() + days);
    return dt.toISOString().slice(0, 10);
  };

  const updateStreakOnCompletion = () => {
    const today = todayStr();
    if (!streakLastDate) {
      setStreakCount(1);
      setStreakLastDate(today);
      return;
    }
    if (streakLastDate === today) return;

    const yesterday = addDays(today, -1);
    if (streakLastDate === yesterday) {
      setStreakCount((s) => (s || 0) + 1);
      setStreakLastDate(today);
    } else {
      setStreakCount(1);
      setStreakLastDate(today);
    }
  };

  const getPathProgress = (slug) => {
    const steps = PATHS[slug]?.steps || [];
    const total = steps.length;
    const done = steps.filter((s) => completedLessons.includes(s.key)).length;
    return { done, total, percent: total ? Math.round((done / total) * 100) : 0 };
  };

  const isPathCompleted = (slug, virtualCompletedSet) => {
    const steps = PATHS[slug]?.steps || [];
    if (steps.length === 0) return false;

    const done = steps.filter((s) =>
      (virtualCompletedSet ? virtualCompletedSet.has(s.key) : completedLessons.includes(s.key))
    ).length;

    return done === steps.length;
  };

  const getNextStepForPath = (slug, virtualCompletedSet) => {
    const steps = PATHS[slug]?.steps || [];
    const hasDone = (k) =>
      virtualCompletedSet ? virtualCompletedSet.has(k) : completedLessons.includes(k);

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      const prev = i === 0 ? null : steps[i - 1];

      const stepDone = hasDone(step.key);
      const prevDone = prev ? hasDone(prev.key) : true;

      if (!stepDone && prevDone) return step;
    }
    return null;
  };

  const awardMilestoneBadge = (badgeId) => {
    const b = MILESTONE_BADGES[badgeId];
    if (!b) return;

    const alreadyHas = badges.some((x) => x.id === badgeId);
    if (alreadyHas) return;

    setBadges((prev) => [...prev, b]);
    setLastEarnedBadge(b);
  };

  const saveCertificate = (slug) => {
    const already = certificates.some((c) => c.slug === slug);
    if (already) return;

    setCertificates((prev) => [...prev, { slug, date: todayStr() }]);
  };

  /* ---------- actions ---------- */

  const markLessonCompleted = (stepKey) => {
    if (!stepKey) return;

    // First lesson badge (based on "before" state)
    if (completedLessons.length === 0) {
      awardMilestoneBadge("first-lesson");
    }

    setCompletedLessons((prev) => {
      if (prev.includes(stepKey)) return prev;
      return [...prev, stepKey];
    });

    updateStreakOnCompletion();
  };

  // Courses filtered by main tab
  const coursesBySection =
    activeMainTab === "myCourses" ? COURSES.filter((c) => c.isMine) : COURSES;

  // No more category filtering (Financial Literacy only)
  const filteredCourses = coursesBySection;

  // What to show depending on main tab
  const showCourses =
    activeMainTab === "myCourses" || activeMainTab === "allCourses";

  const showProgressHeader =
    activeMainTab === "myCourses" || activeMainTab === "myProgress";

  const openPath = (course) => setSelectedCourse(course);
  const closePath = () => setSelectedCourse(null);

  const openModule = (url, stepKey, courseSlug) => {
  if (!url) return; // ✅ évite iframe blanche

  setPendingQuizStepKey(stepKey || null);
  setActiveModuleUrl(url);

  if (courseSlug) setLastCourseSlug(courseSlug);
  if (stepKey) setLastStepKey(stepKey);
};

  const closeModule = () => {
    setActiveModuleUrl(null);

    // After EVERY lesson -> quiz
    if (pendingQuizStepKey) setShowQuiz(true);
  };

  const totalLessonsAllPaths = Object.values(PATHS).reduce(
    (acc, p) => acc + (p.steps?.length || 0),
    0
  );

  return (
    <div className="min-h-screen bg-[#eae4df] flex flex-col">
      {/* Fixed header */}
      <Header />

      {/* Main content */}
      <main className="flex-1 pt-20 pb-20">
        <div className="mx-auto max-w-5xl px-4 py-4 space-y-6">
          <PageHeader activeMainTab={activeMainTab} />

          {/* Continue learning */}
          {(lastCourseSlug || lastStepKey) && (
            <ContinueLearningCard
              onContinue={() => {
                const slug = lastCourseSlug;
                if (!slug) return;

                const next = getNextStepForPath(slug);
                if (next?.launchUrl) {
                  openModule(next.launchUrl, next.key, slug);
                  return;
                }

                // Path finished (or no next) -> certificate
                setCertificateSlug(slug);
                setShowCertificate(true);
              }}
              label="Continue learning"
            />
          )}

          {/* Digi badge message */}
          {lastEarnedBadge && (
            <DigiBadgeMessage
              badge={lastEarnedBadge}
              context={activeMainTab === "myProgress" ? "myProgress" : "default"}
              onClose={() => setLastEarnedBadge(null)}
            />
          )}

          {showProgressHeader && (
            <ProgressHeader
              completed={completedLessons.length}
              total={totalLessonsAllPaths}
              badges={badges.length}
              streak={streakCount}
            />
          )}

          {activeMainTab === "myProgress" && (
            <ProgressDetails badges={badges} />
          )}

          {showCourses && (
            <CourseGrid
              courses={filteredCourses.map((c) => ({
                ...c,
                progress: getPathProgress(c.slug),
                completed: isPathCompleted(c.slug),
              }))}
              onOpenPath={openPath}
            />
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
          completedLessons={completedLessons}
          onClose={closePath}
          onStartModule={(url, stepKey) => openModule(url, stepKey, selectedCourse.slug)}
        />
      )}

      {/* Learning module */}
      {activeModuleUrl && (
        <LearningModule launchUrl={activeModuleUrl} onClose={closeModule} />
      )}

      {/* Quiz modal */}
      {showQuiz && pendingQuizStepKey && (
        <QuizModal
          questions={QUIZZES[pendingQuizStepKey] || []}
          onFinish={({ score, passed }) => {
            if (passed) {
              // 1) completion
              markLessonCompleted(pendingQuizStepKey);

              // 2) outcomes
              setOutcomeStepKey(pendingQuizStepKey);
              setShowOutcome(true);

              // 3) path completion check (virtual)
              const slug = lastCourseSlug;
              if (slug) {
                const virtual = new Set([...completedLessons, pendingQuizStepKey]);

                if (isPathCompleted(slug, virtual)) {
                  awardMilestoneBadge(`path-${slug}`);
                  saveCertificate(slug);
                }
              }
            }

            setShowQuiz(false);
            setPendingQuizStepKey(null);
          }}
        />
      )}

      {/* Outcome modal */}
      {showOutcome && outcomeStepKey && (
        <OutcomeModal
          title="Now you can..."
          items={OUTCOMES[outcomeStepKey] || []}
          onClose={() => {
            setShowOutcome(false);
            setOutcomeStepKey(null);
          }}
          onContinueNext={() => {
            const slug = lastCourseSlug;
            if (!slug) return;

            const next = getNextStepForPath(slug);
            if (next?.launchUrl) {
              setShowOutcome(false);
              setOutcomeStepKey(null);
              openModule(next.launchUrl, next.key, slug);
              return;
            }

            setShowOutcome(false);
            setOutcomeStepKey(null);
            setCertificateSlug(slug);
            setShowCertificate(true);
          }}
        />
      )}

      {/* Certificate modal */}
      {showCertificate && certificateSlug && (
        <CertificateModal
          slug={certificateSlug}
          learnerName={learnerName}
          setLearnerName={setLearnerName}
          date={
            certificates.find((c) => c.slug === certificateSlug)?.date ||
            todayStr()
          }
          onClose={() => {
            setShowCertificate(false);
            setCertificateSlug(null);
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
    "Explore financial literacy learning paths to use your eWallet safely and confidently.";

  return (
    <header className="mt-1">
      <div className="relative overflow-hidden rounded-3xl border border-[#f3d5aa] bg-gradient-to-r from-[#ef7d00] via-[#f9b13c] to-[#ef7d00] px-5 py-4 sm:py-5 shadow-md text-white">
        <div className="relative flex items-stretch gap-4 sm:gap-6">
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

function ProgressHeader({ completed, total, badges, streak }) {
  const safeTotal = total && total > 0 ? total : 0;
  const percent = safeTotal === 0 ? 0 : Math.round((completed / safeTotal) * 100);

  return (
    <section className="bg-gradient-to-r from-[#fff7ec] to-[#ffeef5] border border-[#fbe2c0] rounded-3xl p-4 sm:p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#2e4053] flex items-center gap-2">
            <span>🎯 My progress</span>
          </p>
          <p className="text-xs text-[#2e4053]/70 mt-1">
            Track your lessons completion and achievements.
          </p>
        </div>

        <div className="flex gap-3 text-right">
          <div>
            <div className="text-[11px] text-[#2e4053]/60">Lessons</div>
            <div className="text-sm font-semibold text-[#2e4053]">
              {completed}
              {safeTotal > 0 ? ` / ${safeTotal}` : ""}
            </div>
          </div>

          <div>
            <div className="text-[11px] text-[#2e4053]/60">Badges</div>
            <div className="text-sm font-semibold text-[#2e4053]">{badges}</div>
          </div>

          <div>
            <div className="text-[11px] text-[#2e4053]/60">Streak</div>
            <div className="text-sm font-semibold text-[#2e4053]">
              🔥 {streak || 0}
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
        <div className="rounded-3xl border border-[#eae4df] bg-white p-4">
          <p className="text-xs text-[#2e4053]/70">
            You have not earned any badges yet. Complete a lesson quiz with a perfect score to unlock your first badge.
          </p>
        </div>
      )}

      {badges.length > 0 && (
        <div className="grid grid-cols-2 gap-3 max-w-xl">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className="flex items-center gap-3 rounded-2xl border border-[#f3d5aa] bg-[#fff7ec] px-3 py-2 shadow-sm h-full"
            >
              {badge.image ? (
                <img src={badge.image} alt={badge.title} className="h-10 w-auto" />
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
        <div className="text-xs font-semibold text-[#2e4053]">{baseText}</div>
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
/* ---------- COURSES GRID ---------- */
function ContinueLearningCard({ label = "Continue learning", onContinue }) {
  return (
    <div className="rounded-3xl border border-[#eae4df] bg-white p-4 flex items-center justify-between gap-3 shadow-sm">
      <div>
        <div className="text-sm font-semibold text-[#2e4053]">{label}</div>
        <div className="text-[11px] text-[#2e4053]/70">
          Resume where you left off.
        </div>
      </div>

      <button
        onClick={onContinue}
        className="shrink-0 inline-flex items-center justify-center rounded-full bg-[#ef7d00] px-4 py-2 text-xs font-semibold text-white hover:bg-[#f9b13c] transition"
      >
        Continue
      </button>
    </div>
  );
}

function CourseGrid({ courses, onOpenPath }) {
  if (courses.length === 0) {
    return (
      <p className="text-xs text-[#2e4053]/60 mt-4">
        No courses available yet.
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

        <h3 className="text-sm font-semibold text-[#2e4053]">{course.title}</h3>
        <p className="text-xs text-[#2e4053]/70">{course.subtitle}</p>
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] text-[#2e4053]/60">
        <span>{course.lessons} lessons</span>
        <span>{course.duration} min</span>
      </div>

      {/* Progress per path */}
      {course.progress && (
        <div className="mt-3">
          <div className="flex items-center justify-between text-[11px] text-[#2e4053]/60">
            <span>
              {course.progress.done} / {course.progress.total} lessons
            </span>
            <span>{course.progress.percent}%</span>
          </div>
          <div className="mt-1 h-2 rounded-full bg-[#f7f4f0] overflow-hidden">
            <div
              className="h-full bg-[#ef7d00]"
              style={{ width: `${course.progress.percent}%` }}
            />
          </div>
          {course.completed && (
            <div className="mt-1 text-[11px] font-semibold text-[#0e5988]">
              Completed 🎉
            </div>
          )}
        </div>
      )}

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
/* ---------- QUIZ COMPONENT (random answers) ---------- */

function QuizModal({ questions, onFinish }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [wasCorrect, setWasCorrect] = useState(null);

  // Stable shuffle for this quiz session
  const [sessionQuestions] = useState(() => {
    const shuffle = (arr) => {
      const copy = [...arr];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    };

    return (questions || []).map((q) => ({
      ...q,
      answers: shuffle(q.answers || []),
    }));
  });

  const currentQuestion = sessionQuestions[currentIndex];

  const handleAnswerClick = (answer, idx) => {
    if (selectedIndex !== null) return;

    setSelectedIndex(idx);
    const correct = Boolean(answer.correct);
    setWasCorrect(correct);

    if (correct) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (selectedIndex === null) return;

    if (currentIndex < sessionQuestions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedIndex(null);
      setWasCorrect(null);
      return;
    }
    setFinished(true);
  };

  const passed =
    sessionQuestions.length > 0 && score === sessionQuestions.length;

  const correctIndex =
    currentQuestion?.answers?.findIndex((a) => a.correct) ?? -1;

  const handleFinish = () => onFinish({ score, passed });

  if (!sessionQuestions || sessionQuestions.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-2 sm:px-4">
        <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-[#eae4df] p-4 sm:p-6 space-y-4">
          <p className="text-sm font-semibold text-[#2e4053]">
            Quiz not available yet.
          </p>
          <div className="flex justify-center mt-2">
            <button
              onClick={() => onFinish({ score: 0, passed: false })}
              className="inline-flex items-center gap-2 rounded-full bg-[#ef7d00] px-5 py-2 text-xs font-semibold text-white hover:bg-[#f9b13c] transition"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-2 sm:px-4">
        <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-[#eae4df] p-4 sm:p-6 space-y-4">
          <div className="flex flex-col items-center text-center gap-4">
            {passed ? (
              <>
                <img
                  src={digiWelldone}
                  alt="Digi says well done"
                  className="h-24 w-auto drop-shadow-md"
                />
                <p className="text-sm font-semibold text-[#2e4053]">
                  Digi: well done! Lesson completed.
                </p>
              </>
            ) : (
              <p className="text-sm font-semibold text-[#2e4053]">
                Thank you for completing the quiz.
              </p>
            )}

            <p className="text-xs text-[#2e4053]/70">
              You scored {score} out of {sessionQuestions.length}.
            </p>

            {!passed && (
              <p className="text-[11px] text-[#2e4053]/70">
                Tip: You need a perfect score to unlock the next lesson. You can
                retry later from the path.
              </p>
            )}
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-2 sm:px-4">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-[#eae4df] p-4 sm:p-6 space-y-4">
        <h2 className="text-sm font-semibold text-[#2e4053] flex items-center gap-2">
          <span>📝 Quick check</span>
          <span className="text-[11px] text-[#2e4053]/60">3 questions</span>
        </h2>

        <div>
          <p className="text-xs text-[#2e4053]/60 mb-1">
            Question {currentIndex + 1} of {sessionQuestions.length}
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
                : correctIndex >= 0
                ? `❌ Not quite. The correct answer was: "${currentQuestion.answers[correctIndex].text}".`
                : "❌ Not quite."}
            </p>

            <div className="flex justify-end">
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 rounded-full bg-[#ef7d00] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#f9b13c] transition"
              >
                {currentIndex === sessionQuestions.length - 1
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

function OutcomeModal({ title = "Now you can...", items = [], onClose, onContinueNext }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-2 sm:px-4">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-[#eae4df] p-4 sm:p-6 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-[#2e4053]">{title}</div>
            <div className="text-[11px] text-[#2e4053]/70 mt-1">
              Lesson completed. Here are your key takeaways.
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-xs text-[#2e4053]/60 hover:text-[#2e4053]"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="space-y-2">
          {(items || []).map((t, i) => (
            <div
              key={i}
              className="rounded-2xl border border-[#f3d5aa] bg-[#fff7ec] px-3 py-2 text-xs text-[#2e4053]"
            >
              ✅ {t}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="rounded-full border border-[#eae4df] bg-white px-4 py-2 text-xs font-semibold text-[#2e4053] hover:bg-[#f7f4f0]"
          >
            Back
          </button>

          <button
            onClick={onContinueNext}
            className="rounded-full bg-[#ef7d00] px-4 py-2 text-xs font-semibold text-white hover:bg-[#f9b13c] transition"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
/* ---------- PATH MODAL (timeline) ---------- */

function PathModal({ course, completedLessons, onClose, onStartModule }) {
  const path = PATHS[course.slug];
  if (!path) return null;

  const stepsWithStatus = path.steps.map((step, index) => {
    const prevStep = index === 0 ? null : path.steps[index - 1];
    const isDone = completedLessons?.includes(step.key);
    const prevDone = prevStep ? completedLessons?.includes(prevStep.key) : true;

    if (isDone) return { ...step, status: "done" };
    if (prevDone) return { ...step, status: "current" };
    return { ...step, status: "locked" };
  });

  const progressDone = stepsWithStatus.filter((s) => s.status === "done").length;
  const progressTotal = stepsWithStatus.length;

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-3xl p-6 max-w-xl w-full shadow-xl border border-[#eae4df]">
        <div className="flex justify-between items-start gap-4 mb-4">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-[#2e4053]">{path.title}</h2>
            <p className="text-xs text-[#2e4053]/70 mt-1">{path.description}</p>

            <div className="mt-2 text-[11px] text-[#2e4053]/60">
              Progress:{" "}
              <span className="font-semibold text-[#2e4053]">
                {progressDone}/{progressTotal}
              </span>
            </div>
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

        <PathTimeline
          steps={stepsWithStatus}
          onStart={(step) => {
            if (step.status !== "locked" && step.launchUrl) {
              onStartModule(step.launchUrl, step.key);
              onClose(); // ✅ important: close modal before opening iframe
            }
          }}
        />

        <div className="mt-4 flex flex-col items-center gap-2">
          <p className="text-[11px] text-[#2e4053]/70 text-center">
            Complete each quiz with a perfect score to unlock the next lesson.
          </p>
        </div>
      </div>
    </div>
  );
}

function PathTimeline({ steps, onStart }) {
  return (
    <div className="mt-4 space-y-3">
      {steps.map((step, idx) => {
        const isLocked = step.status === "locked";
        const isDone = step.status === "done";
        const isCurrent = step.status === "current";

        const dotClass = isDone
          ? "bg-[#0e5988] text-white border-[#0e5988]"
          : isCurrent
          ? "bg-[#ef7d00] text-white border-[#ef7d00]"
          : "bg-white text-[#2e4053]/50 border-[#eae4df]";

        const rowClass = isLocked ? "opacity-60" : "opacity-100";

        return (
          <div key={step.key || step.id} className={"flex gap-3 " + rowClass}>
            <div className="flex flex-col items-center">
              <div
                className={
                  "h-9 w-9 rounded-full border flex items-center justify-center text-xs font-semibold shadow-sm " +
                  dotClass
                }
              >
                {isDone ? "✓" : idx + 1}
              </div>

              {idx !== steps.length - 1 && (
                <div className="w-px flex-1 bg-[#f4c27b]/70 my-1" />
              )}
            </div>

            <div className="flex-1 pb-2">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-[12px] font-semibold text-[#2e4053]">
                    {step.title}
                  </div>
                  <div className="text-[10px] text-[#9f8972] mt-0.5">
                    {step.duration} •{" "}
                    {isDone ? "Completed" : isCurrent ? "Available" : "Locked"}
                  </div>
                </div>

                <button
                  onClick={() => onStart?.(step)}
                  disabled={isLocked || !step.launchUrl}
                  className={
                    "shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold border transition " +
                    (isLocked || !step.launchUrl
                      ? "bg-white text-[#2e4053]/40 border-[#eae4df] cursor-not-allowed"
                      : isCurrent
                      ? "bg-[#ef7d00] text-white border-[#ef7d00] hover:bg-[#f9b13c]"
                      : "bg-[#0e5988] text-white border-[#0e5988] hover:opacity-90")
                  }
                >
                  {isDone ? "Review" : "Start"}
                </button>
              </div>

              {/* Optional tiny helper line for the current step */}
              {isCurrent && (
                <div className="mt-2 text-[11px] text-[#2e4053]/70">
                  Next step unlocked. Start the lesson, then pass the quiz to unlock the following one.
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- LEARNING MODULE VIEWER ---------- */

function LearningModule({ launchUrl, onClose }) {
  const [status, setStatus] = useState("loading"); // loading | loaded | failed

  useEffect(() => {
    setStatus("loading");

    // if onLoad never fires (blocked iframe / slow / error), show fallback
    const t = setTimeout(() => {
      setStatus((s) => (s === "loading" ? "failed" : s));
    }, 6000);

    return () => clearTimeout(t);
  }, [launchUrl]);

  if (!launchUrl) {
    return (
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-2 sm:px-4">
        <div className="bg-white w-full sm:w-[520px] rounded-3xl overflow-hidden shadow-2xl border border-[#eae4df]">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#eae4df] bg-[#eae4df]/40">
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
          <div className="p-4">
            <div className="rounded-3xl border border-[#fbe2c0] bg-[#fff7ec] p-4">
              <div className="text-sm font-semibold text-[#2e4053]">
                Missing lesson URL
              </div>
              <div className="text-xs text-[#2e4053]/70 mt-1">
                This lesson does not have a video URL yet.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-2 sm:px-4">
      <div className="bg-white w-full h-full sm:h-[90vh] sm:w-[90vw] rounded-none sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-4 py-2 border-b border-[#eae4df] bg-[#eae4df]/40">
          <span className="text-xs font-semibold text-[#2e4053]">
            Learning module
          </span>

          <div className="flex items-center gap-3">
            <a
              href={launchUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-[#0e5988] hover:underline"
            >
              Open in new tab
            </a>

            <button
              onClick={onClose}
              className="text-xs text-[#2e4053]/70 hover:text-[#2e4053]"
            >
              ✕ Close
            </button>
          </div>
        </div>

        {status === "failed" && (
          <div className="p-4">
            <div className="rounded-3xl border border-[#fbe2c0] bg-[#fff7ec] p-4">
              <div className="text-sm font-semibold text-[#2e4053]">
                This content cannot be displayed inside the app
              </div>
              <div className="text-xs text-[#2e4053]/70 mt-1">
                The page may block embedding (security policy) or did not load properly. Use “Open in new tab”.
              </div>
              <div className="mt-3">
                <a
                  href={launchUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[#ef7d00] px-4 py-2 text-xs font-semibold text-white hover:bg-[#f9b13c] transition"
                >
                  Open in new tab
                </a>
              </div>
            </div>
          </div>
        )}

        <iframe
          key={launchUrl} // ✅ remount when URL changes (proper per-lesson video)
          src={launchUrl}
          title="Learning module"
          className="w-full h-full border-0"
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("failed")}
          allow="fullscreen; autoplay"
        />
      </div>
    </div>
  );
}







