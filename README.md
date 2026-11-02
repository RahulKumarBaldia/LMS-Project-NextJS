# LMSCourse: AI Course Advisor with PayPal Checkout

Built for the **PayPal AI Hackathon** (Devpost).

LMSCourse is a full-stack Learning Management System built with Next.js and MongoDB. For this hackathon I added an **AI course advisor agent** and **PayPal checkout** on top of it. A student tells the agent what they want to learn and their budget. The agent searches the real course catalog, checks what the student already owns, recommends courses, and prepares a PayPal checkout. **The agent can never charge anyone. The student approves every payment on PayPal.**

- Hosted demo: https://lms-project-next-js-bols.vercel.app
- Demo video (under 3 minutes): [ADD YOUTUBE LINK]

## The problem

Self-learners on a tight budget waste time comparing paid courses, and a chatbot that only gives generic advice does not help them finish a purchase. LMSCourse's agent works on the platform's real data: it searches the actual catalog within the student's budget, avoids recommending courses they already own, and takes them to checkout in the same conversation.

## How PayPal and AI are used

### PayPal
- **PayPal Orders v2 REST API** from the server: create order and capture order (sandbox).
- **PayPal JS SDK buttons** in the browser through `@paypal/react-paypal-js`.
- The **price is always read from the database on the server**, never trusted from the browser.
- Every order is stored in a `Payment` record (created, completed, failed). Capture checks that the order belongs to the logged-in user and refuses to capture the same order twice.
- When PayPal returns `COMPLETED`, the student is **enrolled automatically**.

### AI
- **Google Gemini** through the `@google/genai` SDK with **function calling**.
- Models are tried in order: `gemini-3.8-flash`, then `gemini-3.6-flash`, then `gemini-2.5-flash`. If one is busy or out of quota, the agent moves to the next one. Gemini 3 models run with a low thinking level for faster replies.
- The agent has three tools:

| Tool | What it does |
|---|---|
| `search_courses` | Searches paid courses in MongoDB by keywords and max price (USD) |
| `get_my_enrollments` | Lists courses the logged-in student already owns |
| `show_checkout` | Shows a checkout card for one course. **It does not charge anything.** |

- The agent can only recommend courses returned by `search_courses`. It cannot invent courses or prices.
- `show_checkout` is only called after the student clearly says which course they want. The server checks that the course exists, has a price, and is not already owned.
- An **Agent Activity** panel shows every tool the agent ran for each question.
- Chat history is **saved per user** in MongoDB, so it survives a page reload (last 60 messages are stored, the AI sees the last 12).

## Safety by design

1. The agent has no tool that moves money. It can only show a checkout card.
2. Payment happens only when the student presses the PayPal button and logs in to PayPal.
3. Prices come from the database on the server.
4. All agent and PayPal API routes require a logged-in user.
5. Secrets live in environment variables and are never committed.
6. PayPal is used in **sandbox mode only**. No real money moves.

## What I built during the hackathon

The LMS foundation (auth, courses, enrollment, lessons, progress, dashboard, admin) existed before the hackathon. The following was built **after October 1, 2026**:

- `price` field on courses (USD)
- PayPal server integration: token, create order, capture order (`src/services/paypal.service.js`)
- Payment records and capture-to-enrollment flow (`Payment` model, `paymentService.js`)
- PayPal checkout button component (`PayPalCheckout.js`)
- The AI agent with Gemini function calling (`agentService.js`)
- Assistant page with chat UI, checkout card, success state and Agent Activity panel (`/assistant`, `AgentChat.js`)
- Saved chat history per user (`AgentChat` model, `chatHistoryService.js`)
- Model fallback, timeouts and quota handling for the free Gemini tier

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router), React 19 |
| UI | Tailwind CSS 4, Lucide icons |
| Database | MongoDB + Mongoose |
| Auth | JWT in httpOnly cookies + bcrypt |
| Payments | PayPal Orders v2 (sandbox) + `@paypal/react-paypal-js` |
| AI | Google Gemini API (`@google/genai`), function calling |

Architecture follows a layered flow: **API route → controller → service → model**

## Project structure

```
src/
├── app/
│   ├── api/
│   │   ├── agent/          # AI agent: GET history, POST message, DELETE chat
│   │   ├── paypal/         # create-order, capture-order
│   │   └── ...             # auth, courses, lessons, enrollment, progress, seed
│   ├── assistant/          # AI course advisor page
│   ├── admin/ courses/ dashboard/ learn/ auth|login|signup/
├── components/             # AgentChat, PayPalCheckout, and the rest of the UI
├── controllers/            # agentController, paymentController, ...
├── services/               # agentService, chatHistoryService, paypal.service, paymentService, ...
├── models/                 # User, Course, Lesson, Enrollment, Progress, Payment, AgentChat
├── middleware/             # Auth + role checks
├── validators/ lib/ context/ data/
```

## Run it locally

You need Node.js, a MongoDB database, a free PayPal developer account, and a free Gemini API key.

### 1. Install

```bash
npm install
cp .env.example .env.local
```

### 2. Fill `.env.local`

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=a_long_random_secret

# PayPal sandbox app (https://developer.paypal.com, Apps & Credentials, Sandbox)
PAYPAL_CLIENT_ID=your_paypal_sandbox_client_id
PAYPAL_CLIENT_SECRET=your_paypal_sandbox_secret
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_sandbox_client_id

# Google AI Studio (https://aistudio.google.com)
GEMINI_API_KEY=your_gemini_api_key
```

`NEXT_PUBLIC_PAYPAL_CLIENT_ID` is the same value as `PAYPAL_CLIENT_ID`. It is public by design. **Never** put the secret or the Gemini key behind a `NEXT_PUBLIC_` name.

Use a PayPal sandbox app that is linked to a **US Business** sandbox account. In my testing, sandbox accounts created for India failed at the PayPal checkout step, while US accounts worked.

### 3. Start and seed

```bash
npm run dev
```

With the app running, open these once in the browser:

```
GET http://localhost:3000/api/seed            # courses
GET http://localhost:3000/api/seed/lessons    # lessons
GET http://localhost:3000/api/seed/admin      # admin user
```

### 4. Set course prices

The agent only sells courses with a price above 0 (USD). In `mongosh` or MongoDB Compass, on your database, run:

```js
db.courses.updateMany({ difficulty: "Beginner" }, { $set: { price: 10 } })
db.courses.updateMany({ difficulty: "Intermediate" }, { $set: { price: 15 } })
db.courses.updateMany({ difficulty: "Advanced" }, { $set: { price: 25 } })
```

### 5. Try it

Sign up, open `http://localhost:3000/assistant`, and ask for a course.

## Testing instructions for judges

1. Open the hosted demo: https://lms-project-next-js-bols.vercel.app or run it locally with the steps above.
2. Log in with the demo student account:
   - Email: hacktest@gmail.com
   - Password: hacktest123456

   You can also create your own account on the signup page.
3. Open `/assistant`. Try:
   - `I am a beginner and want to learn JavaScript, budget 15 dollars`
   - `Show me advanced courses under 30 dollars`
   - `What courses do you have?`
   - `I want to learn cooking` (nothing should match, and the agent should say so)
4. Tell the agent which course you want. A **checkout card** appears. The agent has not charged anything at this point.
5. Press the PayPal button and log in with this **PayPal sandbox buyer** (test account, no real money):
   - Email: sb-f2gim53356754@personal.example.com
   - Password: 7N&i+q-q
6. After payment, the app shows a success card and you are enrolled. Check `/dashboard`.

Notes:
- If the agent says you are already enrolled, use a new account or press **New chat** and choose another course.
- I run Gemini on the **free tier**, which allows only a small number of requests per model per day. If the AI replies that it is busy, wait a minute and try again. The demo video shows the full flow.
- The first page load on a free host can be slow if the app was idle.

## API routes added for the hackathon

| Route | Purpose |
|---|---|
| `GET /api/agent` | Load the logged-in user's saved chat |
| `POST /api/agent` | Send a message to the agent |
| `DELETE /api/agent` | Clear the saved chat |
| `POST /api/paypal/create-order` | Create a PayPal order for a course (price from DB) |
| `POST /api/paypal/capture-order` | Capture an approved order and enroll the student |

## Original LMS features

- Auth: signup, login, logout with httpOnly JWT cookies; roles: student, instructor, admin
- Courses: browse, search, filter by category and difficulty; course detail pages
- Enrollment, lesson viewer with previous / next navigation, progress tracking
- Dashboard: enrolled courses, continue learning, completed courses
- Admin panel for courses and lessons (`/admin`)
- Seed APIs for
