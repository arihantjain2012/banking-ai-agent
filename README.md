# 🏦 Banking AI Agent (Agentic System using LangGraph)

---

## 📌 Overview

This project implements a **Banking AI Agent** that intelligently:

- Identifies high-value customers  
- Predicts loan conversion probability  
- Recommends financial products  
- Generates personalized WhatsApp messages  
- Handles conversational queries  

---

## 🧠 Tech Stack

- **Frontend:** Streamlit  
- **Agent:** LangGraph + OpenAI LLM  
- **Backend:** Node.js (Express)  
- **Database:** MongoDB  

---

## 🧠 Architecture


User (Streamlit UI)
↓
LangGraph Agent (Python)
↓
Tool Layer (API Calls)
↓
Node.js Backend (Express)
↓
MongoDB (Customers + Transactions)


---

## 🔁 Execution Flow

### 1. User Input
User enters query in Streamlit UI:

Find high-value customers and generate WhatsApp messages


---

### 2. Planner (LLM Reasoning)

Agent decides:

TOOL: get_loan_targets


---

### 3. Tool Execution

Python agent calls:
```python
get_loan_targets()

→ Calls backend API:

GET /api/customers/loan-targets
4. Backend Processing

Node.js performs:

Fetch customers from MongoDB
Predict loan conversion probability
Analyze transaction behavior
Generate product recommendation
5. Agent Second Reasoning

LLM processes:

User query
Tool result

Then:

Generates messages / explanation / summary
6. Final Response

Example:

Hi Amit! You are eligible for ₹400,000 loan...
⚙️ Backend Design (Node.js)
📁 Controllers
getLoanTargets
Core API used by agent
Combines:
Conversion prediction
Product recommendation
getCustomerByName
Fetch customer details by name
Used for conversational queries
addDummyCustomers
Seeds customer data
addDummyTransactions
Generates transaction data
📁 Services
1. Conversion Service
predictConversion(customer)

Calculates:

Income score
Credit score
Net transaction flow

Returns:

{
  "probability": 0.6,
  "netFlow": 20000
}
2. Recommendation Service
recommendProduct(customer, conversion)

Outputs:

Product
Loan amount
Reason
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
Planner
Understands intent
Decides which tool to call

Example:

TOOL: get_loan_targets
Tool Executor
Calls backend APIs
Returns structured data
Final Response
Uses LLM again
Generates:
Messages
Explanation
Summary
🧰 Tools
1. get_loan_targets()

Calls:

/api/customers/loan-targets

Returns:

Customer list
Conversion probability
Recommendation
2. get_customer_details(name)

Calls:

/api/customers/customer/:name

Returns:

Customer profile
💬 Conversational Capability

The agent maintains:

history = []

Supports:

Follow-up questions
Context awareness
Conversational interaction
📊 Database Design
Customers Collection
{
  "name": "Amit",
  "income": 120000,
  "creditScore": 780,
  "city": "Delhi"
}
Transactions Collection
{
  "customerId": "ObjectId",
  "amount": 5000,
  "type": "credit",
  "date": "2026-05-02"
}
🎯 Key Design Decisions
Separation of backend and agent logic
Tool-based architecture for scalability
Two-step LLM reasoning (decision + response)
LangGraph for structured orchestration
API-based communication between components
⚖️ Trade-offs & Limitations
Trade-offs
Simple planner instead of multi-step loop
Limited tool set for clarity
Limitations
Basic intent detection
No authentication
No persistent memory
Not a fully autonomous multi-step agent
🛠️ Setup & Run Instructions
1. Clone Repository
git clone <repo-url>
cd banking-ai-agent
2. Run Backend
npm install
npm run dev
3. Seed Data

Open in browser:

http://localhost:5000/api/customers/seed
http://localhost:5000/api/customers/seed-transactions
4. Setup Python Agent
cd agent
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
5. Add OpenAI API Key

Create .env file:

OPENAI_API_KEY=your_key_here
6. Run UI
streamlit run app.py
7. Open Application
http://localhost:8501
🧪 Example Queries
"Give me loan customers"
"Generate WhatsApp messages"
"Tell me about Amit"
"Find high-value customers and message them"
🚀 Conclusion

This project demonstrates:

Agentic AI design
Tool-based reasoning
Real-world system integration
Clean modular architecture
👨‍💻 Author

Arihant Jain
