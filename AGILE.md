# CyberSafe Quest — Agile Development Documentation

## Project Overview

**Project Name:** CyberSafe Quest v2  
**Type:** Cybersecurity Awareness Web Game  
**Technology Stack:** React 18, Vite, JavaScript (ES Modules)  
**Methodology:** Agile — Scrum Framework  
**Total Sprints:** 6  
**Sprint Duration:** 1 Week Each  

---

## What is Agile?

Agile is an iterative software development approach where the project is broken into small, manageable **sprints**. Each sprint delivers a working, testable piece of the product. Feedback is gathered after each sprint and improvements are made in the next one.

**Core Agile Principles used in this project:**
- Deliver working software frequently (every sprint)
- Welcome changing requirements
- Build around motivated team members
- Continuous attention to technical excellence
- Self-organising teams

---

## Product Backlog

The full list of features planned before development began:

| ID | User Story | Priority | Status |
|----|-----------|----------|--------|
| US-01 | As a user, I want to see a home screen so I can start the game | High | Done |
| US-02 | As a user, I want to answer multiple-choice cybersecurity questions | High | Done |
| US-03 | As a user, I want to identify phishing emails from real ones | High | Done |
| US-04 | As a user, I want to spot scam SMS messages | High | Done |
| US-05 | As a user, I want to check if a URL is safe or dangerous | High | Done |
| US-06 | As a user, I want to choose the safest Wi-Fi network | Medium | Done |
| US-07 | As a user, I want to build strong passwords and get feedback | Medium | Done |
| US-08 | As a user, I want to identify unsafe social media posts | Medium | Done |
| US-09 | As a user, I want to see my score and star rating after each level | High | Done |
| US-10 | As a user, I want to earn badges for completing levels | Medium | Done |
| US-11 | As a user, I want a mission map to see all levels and my progress | Medium | Done |
| US-12 | As a user, I want my progress saved so I can return later | Medium | Done |
| US-13 | As a user, I want sound effects to make the game engaging | Low | Done |
| US-14 | As a user, I want to view my profile and stats | Low | Done |
| US-15 | As a user, I want a "How to Play" guide | Low | Done |
| US-16 | As a user, I want settings to toggle sound on/off | Low | Done |

---

## Sprint Plan

---

### Sprint 1 — Project Foundation & Setup
**Duration:** Week 1  
**Goal:** Set up the project structure and deliver a working home screen

#### Sprint Backlog
| Task | User Story | Status |
|------|-----------|--------|
| Initialise Vite + React project | US-01 | Done |
| Create folder structure (components, data, utils) | US-01 | Done |
| Build `App.jsx` with screen navigation system | US-01 | Done |
| Build `Home.jsx` component | US-01 | Done |
| Create `questions.js` data file with Level 1 questions | US-02 | Done |
| Create `levels.js` data file | US-11 | Done |
| Set up `index.css` base styles | US-01 | Done |

#### Sprint Review
- Working home screen delivered
- Navigation between screens functional
- Data layer established for all future levels

#### Definition of Done
- App launches without errors
- Home screen renders correctly
- Navigation system works

---

### Sprint 2 — Core Gameplay & Scoring
**Duration:** Week 2  
**Goal:** Players can play MCQ-style levels and see their results

#### Sprint Backlog
| Task | User Story | Status |
|------|-----------|--------|
| Build `Gameplay.jsx` component | US-02 | Done |
| Build `McqQuestion.jsx` for multiple choice questions | US-02 | Done |
| Build `Results.jsx` with score display and star rating | US-09 | Done |
| Create `scoring.js` utility for calculating scores | US-09 | Done |
| Add Level 1 (Phishing Basics — 6 MCQ questions) | US-02 | Done |
| Add Level 4 (Urgency & Fear Tactics — 6 MCQ questions) | US-02 | Done |
| Add Level 5 (Password Basics — 6 MCQ questions) | US-02 | Done |
| Add Level 7 (Password Reuse Risk — 6 MCQ questions) | US-02 | Done |
| Add Level 11 (Device Security — 6 MCQ questions) | US-02 | Done |
| Connect gameplay to results screen on completion | US-09 | Done |

#### Sprint Review
- 5 fully playable MCQ levels
- Score and star rating system working
- Players can retry or continue after each level

#### Definition of Done
- Player can complete a full level from start to results
- Score and stars calculated correctly
- Retry and continue buttons functional

---

### Sprint 3 — Scenario-Based Question Types
**Duration:** Week 3  
**Goal:** Add real-world scenario questions — phishing emails and SMS scams

#### Sprint Backlog
| Task | User Story | Status |
|------|-----------|--------|
| Build `EmailQuestion.jsx` for phishing email identification | US-03 | Done |
| Build `SmsQuestion.jsx` for scam SMS identification | US-04 | Done |
| Build `SocialPostQuestion.jsx` for unsafe social media posts | US-08 | Done |
| Add Level 2 (Fake Bank Email — 6 email questions) | US-03 | Done |
| Add Level 3 (Delivery Scam Messages — 6 SMS questions) | US-04 | Done |
| Add Level 8 (Social Media Privacy — 6 social post questions) | US-08 | Done |
| Connect new question types to `Gameplay.jsx` | US-03 | Done |

#### Sprint Review
- Three new question types delivered
- Realistic email, SMS, and social post formats implemented
- Players can identify real vs fake communications

#### Definition of Done
- Email, SMS, and social post questions render correctly
- Safe/Unsafe decisions recorded correctly
- Explanations shown after each answer

---

### Sprint 4 — Advanced Interactive Question Types
**Duration:** Week 4  
**Goal:** Add URL checking, Wi-Fi selection, and password building interactions

#### Sprint Backlog
| Task | User Story | Status |
|------|-----------|--------|
| Build `UrlQuestion.jsx` for URL safety checking | US-05 | Done |
| Build `WifiQuestion.jsx` for Wi-Fi network selection | US-06 | Done |
| Build `PasswordQuestion.jsx` for password strength builder | US-07 | Done |
| Create `passwordStrength.js` utility for strength scoring | US-07 | Done |
| Add Level 9 (Online Shopping Safety — 6 URL questions) | US-05 | Done |
| Add Level 10 (Public Wi-Fi Safety — 5 Wi-Fi scenarios) | US-06 | Done |
| Add Level 6 (Strong Password Builder — 5 challenges) | US-07 | Done |

#### Sprint Review
- Three interactive question types added
- Password strength meter working in real-time
- Wi-Fi scenario picker functional

#### Definition of Done
- URL questions show correct/dangerous verdict
- Wi-Fi question shows network options and explains the best choice
- Password builder evaluates strength and gives pass/fail on target strength

---

### Sprint 5 — Gamification & User Progression
**Duration:** Week 5  
**Goal:** Add mission map, badges, profile, and persistent progress saving

#### Sprint Backlog
| Task | User Story | Status |
|------|-----------|--------|
| Build `MissionMap.jsx` with all 12 levels | US-11 | Done |
| Build `Badges.jsx` component showing earned badges | US-10 | Done |
| Build `Profile.jsx` with user stats overview | US-14 | Done |
| Create `storage.js` utility for localStorage persistence | US-12 | Done |
| Implement badge award logic on level completion | US-10 | Done |
| Show locked/unlocked state on mission map | US-11 | Done |
| Display star ratings on completed levels in the map | US-11 | Done |
| Build `Header.jsx` navigation bar | US-14 | Done |

#### Sprint Review
- Progress now persists between sessions
- Players can see all 12 levels on the mission map
- Badge collection screen working
- Profile shows total score, stars, and completion

#### Definition of Done
- Progress saved to localStorage and reloaded on next visit
- Mission map reflects real completion state
- Badges awarded correctly on level completion

---

### Sprint 6 — Final Challenge, Polish & Deployment
**Duration:** Week 6  
**Goal:** Add the final challenge level, sounds, settings, and deploy to production

#### Sprint Backlog
| Task | User Story | Status |
|------|-----------|--------|
| Add Level 12 (Final Challenge — 8 mixed questions) | US-02 | Done |
| Build `Settings.jsx` with sound toggle | US-16 | Done |
| Build `HowToPlay.jsx` guide screen | US-15 | Done |
| Create `sounds.js` utility for audio feedback | US-13 | Done |
| Add click and level-complete sound effects | US-13 | Done |
| Integrate sound toggle with `App.jsx` state | US-16 | Done |
| Final testing of all 12 levels end-to-end | All | Done |
| Push code to GitHub repository | All | Done |
| Deploy to production (Railway / Render) | All | Done |

#### Sprint Review
- All 12 levels complete and playable
- Sound effects enhance user experience
- Settings and HowToPlay screens functional
- Project deployed and accessible online

#### Definition of Done
- All 12 levels playable with no errors
- Deployment live and accessible via URL
- All user stories marked as done

---

## Sprint Velocity Summary

| Sprint | Goal | User Stories Completed | Status |
|--------|------|----------------------|--------|
| Sprint 1 | Foundation & Setup | US-01 | Done |
| Sprint 2 | Core Gameplay | US-02, US-09 | Done |
| Sprint 3 | Scenario Questions | US-03, US-04, US-08 | Done |
| Sprint 4 | Advanced Interactions | US-05, US-06, US-07 | Done |
| Sprint 5 | Gamification | US-10, US-11, US-12, US-14 | Done |
| Sprint 6 | Polish & Deploy | US-13, US-15, US-16 | Done |

---

## Final Product — Features Delivered

| Feature | Levels | Question Type |
|---------|--------|--------------|
| Phishing Basics | Level 1 | Multiple Choice (MCQ) |
| Fake Bank Emails | Level 2 | Email Identification |
| Delivery Scam SMS | Level 3 | SMS Identification |
| Urgency & Fear Tactics | Level 4 | Multiple Choice (MCQ) |
| Password Basics | Level 5 | Multiple Choice (MCQ) |
| Password Builder | Level 6 | Interactive Password Strength |
| Password Reuse Risk | Level 7 | Multiple Choice (MCQ) |
| Social Media Privacy | Level 8 | Social Post Review |
| Online Shopping Safety | Level 9 | URL Safety Check |
| Public Wi-Fi Safety | Level 10 | Wi-Fi Network Selection |
| Device Security | Level 11 | Multiple Choice (MCQ) |
| Final Challenge | Level 12 | Mixed (All Types) |

**Total Questions:** 68 questions across 12 levels  
**Question Types:** 6 (MCQ, Email, SMS, Social Post, URL Check, Wi-Fi, Password Builder)  

---

## Agile Retrospective

### What Went Well
- Breaking the project into sprints made each feature manageable
- Delivering one working question type per sprint allowed early testing
- Data-driven design (questions.js) made adding content easy without changing components

### What Could Be Improved
- Unit tests could be added in a future sprint
- User testing with real users would improve UX
- A backend could be added to support leaderboards and user accounts

### Lessons Learned
- Iterative development avoids "big bang" failures
- Small, focused sprints keep momentum high
- Separating data from UI (questions.js vs components) follows good Agile practices
