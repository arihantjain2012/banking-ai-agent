🏦 Banking AI Agent (Agentic System using LangGraph)
📌 Overview

This project implements a Banking AI Agent that intelligently:

Identifies high-value customers
Predicts loan conversion probability
Recommends financial products
Generates personalized WhatsApp messages
Handles conversational queries

The system combines:

Node.js backend (business logic + APIs)
MongoDB (data storage)
Python Agent (LangGraph + LLM reasoning)
Streamlit UI (chat interface)
🧠 Architecture
User (Streamlit UI)
        ↓
LangGraph Agent (Python)
        ↓
Tool Layer (API Calls)
        ↓
Node.js Backend (Express)
        ↓
MongoDB (Customers + Transactions)
🔁 Execution Flow
Step 1: User Input

User enters query in Streamlit UI:

"Find high-value customers and generate WhatsApp messages"
Step 2: Planner (LLM Reasoning)

Agent decides:

TOOL: get_loan_targets
Step 3: Tool Execution

Python agent calls:

get_loan_targets()

→ Calls Node API:

GET /api/customers/loan-targets
Step 4: Backend Processing

Node.js performs:

Fetch customers from MongoDB
Run conversion prediction
Analyze transaction behavior
Generate product recommendation
Step 5: Agent Second Reasoning

LLM receives:

User Query + Tool Result

Then:

Understands intent (messages / summary / details)
Generates final response
Step 6: Response
Hi Amit! You are eligible for ₹400,000 loan...
⚙️ Backend Design (Node.js)
📁 Controllers
getLoanTargets
Core API for agent
Combines:
Conversion prediction
Recommendation engine
getCustomerByName
Fetch single customer
Used for conversational queries
addDummyCustomers
Seeds initial dataset
addDummyTransactions
Generates credit/debit data
📁 Services
1. Conversion Service
predictConversion(customer)

Calculates:

Income score
Credit score
Net transaction flow

Returns:

{
  probability: 0.6,
  netFlow: 20000
}
2. Recommendation Service
recommendProduct(customer, conversion)

Outputs:

Product type
Loan amount
Reasoning
3. Scoring Service
calculateScore(customer)

Used for:

High-value customer filtering
🤖 Agent Design (LangGraph)
🧩 State
class AgentState:
    query
    history
    tool_result
    response
🔁 Graph Flow
User Query
    ↓
Planner (LLM)
    ↓
Tool Executor
    ↓
Final Response (LLM)
    ↓
END
🧠 Core Logic
1. Planner
Understands user intent
Decides:
TOOL: get_loan_targets
2. Tool Executor
Calls correct backend API
Returns structured data
3. Final Response (Second LLM)
Interprets tool output
Generates:
Messages
Summaries
Explanations
🧰 Tools (Agent Layer)
1. get_loan_targets()

Calls:

/api/customers/loan-targets

Returns:

Customers
Conversion probability
Recommendation
2. get_customer_details(name)

Calls:

/api/customers/customer/:name

Returns:

Customer profile
Used in conversation
💬 Conversational Capability

The agent maintains:

history = []

Supports:

Follow-up queries
Context awareness
Multi-intent understanding
📊 Database Design
Customers Collection
{
  name,
  income,
  creditScore,
  city
}
Transactions Collection
{
  customerId,
  amount,
  type (credit/debit),
  date
}
🎯 Key Design Decisions
✅ 1. Separation of Concerns
Backend → business logic
Agent → reasoning
Tools → integration layer
✅ 2. Agentic Pattern
Think → Act → Think → Respond
✅ 3. Two-step LLM Reasoning
First: decide action
Second: generate response
✅ 4. API-based Tools
Decouples agent from backend
Makes system scalable
⚖️ Trade-offs & Limitations
Trade-offs
Simple planner (not recursive loop)
Controlled tool execution
Limitations
Limited intent classification
No authentication layer
No async processing
Not fully autonomous multi-step agent
🛠️ Setup Instructions
1. Clone Repo
git clone <repo-url>
cd banking-ai-agent
2. Run Backend
npm install
npm run dev
3. Setup Python Agent
cd agent
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
4. Add OpenAI Key

Create .env:

OPENAI_API_KEY=your_key_here
5. Run UI
streamlit run app.py
