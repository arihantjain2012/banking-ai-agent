import streamlit as st
import agent

# Page config
st.set_page_config(page_title="Banking AI Agent", layout="centered")

st.title("💰 Banking AI Agent")

# Initialize session state (memory)
if "state" not in st.session_state:
    st.session_state.state = {"history": []}

if "messages" not in st.session_state:
    st.session_state.messages = []


# Display chat history
for msg in st.session_state.messages:
    with st.chat_message(msg["role"]):
        st.markdown(msg["content"])


# User input
user_input = st.chat_input("Ask something...")

if user_input:
    # Show user message
    st.session_state.messages.append({"role": "user", "content": user_input})

    with st.chat_message("user"):
        st.markdown(user_input)

    # Call agent
    st.session_state.state["query"] = user_input
    result = agent.graph.invoke(st.session_state.state)

    response = result.get("response", "No response")

    # Show bot response
    st.session_state.messages.append({"role": "assistant", "content": response})

    with st.chat_message("assistant"):
        st.markdown(response)