import openai
import generate_urls
from google.cloud.language_v1 import types
from google.cloud import language_v1
import requests
from bs4 import BeautifulSoup
import os
from GoogleNews import GoogleNews
import time

# Initialize the OpenAI API client
openai.api_key = "YOUR_API_KEY"

page = generate_urls.requests.get(url)
main_info = generate_urls.get_content(url,"t")
# currKeywords = ' '.join(generate_urls.get_main_topic(main_info))
oppArticle = generate_urls.return_links(main_info)
oppArticle = ''.join(oppArticle)
page1 = generate_urls.requests.get(oppArticle)
oppArticle = str(oppArticle)
oppContent = generate_urls.get_content(oppArticle,"t")
    
def summarize_article(text):
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt="Summarize this article: " + text,
        max_tokens=100,
        n=1,
        stop=None,
        temperature=0.5,
    )
    message = response["choices"][0]["text"]
    return message

# Summarize two articles
article1 = main_info
article2 = oppContent

summary1 = summarize_article(article1)
summary2 = summarize_article(article2)
main_summary = summarize_article(''.join(summary1,summary2))

print(main_summary)