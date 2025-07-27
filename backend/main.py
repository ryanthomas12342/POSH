from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from query import implement_rag
from openai import OpenAI
from dotenv import load_dotenv
import os
import logging
from pydantic import BaseModel
import requests
import json
import html

# Load environment variables from .env file
load_dotenv()
api_key = os.getenv("OPENROUTER_API_KEY")

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s"
)
logger = logging.getLogger(__name__)

# OpenAI client config
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=api_key,
)

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

@app.get("/")
async def start():
    logger.info("Health check called.")
    return "hi"

@app.post("/chat")
async def chat(request: ChatRequest):
    logger.info("Health check called.")
    context=implement_rag(request.message)
    logger.info(f" context: {context}")
    instruction = (
    "Please use the following context to provide a relevant and accurate     to the question. "
    "Directly reference the information when possible, but respond in a clear and empathetic way. "
    "If the answer is not in the context, reply accordingly.\n\n"
)

    user_message = instruction + context + "\n\nQuestion: " + request.message
    logger.info(f"Received message: {user_message}")

    if not user_message:
        logger.warning("No message provided in request.")
        return JSONResponse(status_code=400, content={"error": "Missing 'message' in request body."})

    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": "deepseek/deepseek-r1-0528:free",
        "messages": [
            {
                "role": "system",
                "content": (
                    "You are POSH-AI, a friendly and empathetic virtual assistant created to help users understand and address workplace safety, rights, and the Prevention of Sexual Harassment (POSH) Act.\n"
                    "Always respond in a warm, conversational, and respectful tone.\n"
                    "Structure your answers clearly using paragraphs, bullet points, or step-by-step guidance where needed.\n"
                    "Greet users kindly, reaffirm that they are in a safe and confidential space, and provide helpful, non-legal guidance based on POSH awareness.\n"
                    "Avoid legal advice, but encourage contacting designated authorities when necessary.\n"
                    "Close your answers with an inviting follow-up question like: 'Would you like to know more about filing a complaint or your rights at work?'"
                )
            },
            {"role": "user", "content": user_message}
        ],
        "stream": True
    }

    buffer = ""
    answer = ""

    try:
        logger.info("Sending request to OpenRouter API...")
        with requests.post(url, headers=headers, json=payload, stream=True, timeout=30) as r:
            r.raise_for_status()

            for chunk in r.iter_content(chunk_size=1024, decode_unicode=True):
                if chunk:
                    buffer += chunk
                    while True:
                        line_end = buffer.find('\n')
                        if line_end == -1:
                            break
                        line = buffer[:line_end].strip()
                        buffer = buffer[line_end + 1:]

                        if line.startswith('data: '):
                            data = line[6:]
                            if data == '[DONE]':
                                break
                            try:
                                data_obj = json.loads(data)
                                content = data_obj["choices"][0]["delta"].get("content")
                                if content:
                                    answer += content
                            except json.JSONDecodeError as e:
                                logger.error(f"JSON decode error: {e} | Line: {line}")
            logger.info("Response generation complete.")
    except requests.RequestException as e:
        logger.error(f"Error connecting to OpenRouter: {e}")
        return JSONResponse(status_code=500, content={"response": "Error connecting to language model."})
    except Exception as e:
        logger.exception(f"Unexpected server error: {e}")
        return JSONResponse(status_code=500, content={"response": "Unexpected server error occurred."})

    # After answer is built, before returning:
    try:
        answer = answer.encode('latin1').decode('utf-8')
    except Exception:
        pass  # If it fails, just return as is

    return {"response": answer}
