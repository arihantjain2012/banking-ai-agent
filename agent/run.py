import agent

state = {"history": []}

while True:
    query = input("\nYou: ")

    if query.lower() in ["exit", "quit"]:
        break

    state["query"] = query

    state = agent.graph.invoke(state)

    print("\nAssistant:", state["response"])