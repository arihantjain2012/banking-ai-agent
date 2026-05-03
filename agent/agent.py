from langgraph.graph import StateGraph, END
from langchain_openai import ChatOpenAI
from tools import get_loan_targets, get_customer_details

from typing import TypedDict, List, Dict, Any

llm = ChatOpenAI(model="gpt-4o-mini")


# -----------------------------
# STATE (memory + context)
# -----------------------------
class AgentState(TypedDict, total=False):
    query: str
    history: List[str]
    tool_result: Any
    response: str


# -----------------------------
# 1. LLM decides action
# -----------------------------
def planner(state: AgentState):
    query = state["query"]
    history = state.get("history", [])

    prompt = f"""
You are a banking AI agent.

Available tools:
1. get_loan_targets → fetch loan customers
2. get_customer_details(name) → get specific customer

Conversation:
{history}

User: {query}

Decide:
- If tool needed → respond EXACTLY:
  TOOL: tool_name | args

Examples:
TOOL: get_loan_targets | {{}}
TOOL: get_customer_details | Amit

- If no tool needed → respond normally
"""

    decision = llm.invoke(prompt).content.strip()

    history.append(f"User: {query}")
    history.append(f"Decision: {decision}")

    return {**state, "history": history, "response": decision}


# -----------------------------
# 2. Tool Executor
# -----------------------------
def tool_executor(state: AgentState):
    decision = state["response"]

    if not decision.startswith("TOOL:"):
        return state  # no tool needed

    try:
        _, rest = decision.split("TOOL:")
        tool_name, args = rest.strip().split("|")

        tool_name = tool_name.strip()
        args = args.strip()

        if tool_name == "get_loan_targets":
            result = get_loan_targets()

        elif tool_name == "get_customer_details":
            result = get_customer_details(args)

        else:
            result = {"error": "Unknown tool"}

    except Exception as e:
        result = {"error": str(e)}

    return {**state, "tool_result": result}


# -----------------------------
# 3. Final Response
# -----------------------------
def final_response(state: AgentState):
    decision = state["response"]
    tool_result = state.get("tool_result")
    query = state.get("query", "")
    history = state.get("history", [])

    # If no tool → return directly
    if not decision.startswith("TOOL:"):
        return {**state, "response": decision}

    # 🔥 SECOND REASONING STEP (this is the key)
    prompt = f"""
You are a banking AI agent.

User query:
{query}

Tool result:
{tool_result}

Now decide what to do next:
- If user asked for messages → generate WhatsApp messages
- If user asked for explanation → explain
- If this is enough → summarize nicely

Return FINAL answer only.
"""

    response = llm.invoke(prompt).content

    history.append(f"Assistant: {response}")

    return {**state, "response": response, "history": history}


# -----------------------------
# GRAPH
# -----------------------------
builder = StateGraph(AgentState)

builder.add_node("planner", planner)
builder.add_node("tool_executor", tool_executor)
builder.add_node("final", final_response)

builder.set_entry_point("planner")

builder.add_edge("planner", "tool_executor")
builder.add_edge("tool_executor", "final")

builder.set_finish_point("final")

graph = builder.compile()