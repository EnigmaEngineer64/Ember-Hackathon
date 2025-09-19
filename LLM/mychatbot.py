from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.environ.get("GROQ_API_KEY"))
while True:
    user_input = input("You: ")
    if user_input.lower() in ["exit", "quit"]:
        break

    response = client.chat.completions.create(
        messages=[{"role": "user", "content": user_input}],
        model="gemma2-9b-it"
    )
    print("Bot:", response.choices[0].message.content.strip())

