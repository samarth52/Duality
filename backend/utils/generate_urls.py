from google.cloud.language_v1 import types
from google.cloud import language_v1
import requests
from bs4 import BeautifulSoup
import os
from GoogleNews import GoogleNews
import time

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "C:/Projects/Hacklytics2023/Duality/backend/utils/white-outlook-377503-a6f6da67ebad.json"
client = language_v1.LanguageServiceClient()


def get_main_topic(text):
    document = types.Document(
        content=text,
        type=language_v1.Document.Type.PLAIN_TEXT
    )

    response = client.analyze_entities(document=document)
    entities = response.entities
    entities = response.entities

    # Sort the entities by salience in descending order
    entities = sorted(entities, key=lambda x: x.salience, reverse=True)

    # Return the top 5 entities
    unique_entities = []
    for entity in entities:
        if entity.name not in unique_entities:
            unique_entities.append(entity.name)
        if (len(unique_entities) == 5):
            break

    return unique_entities[:]


def get_overall_Sentiment(text):
    document1 = types.Document(
        content=text,
        type=language_v1.Document.Type.PLAIN_TEXT
    )
    sentiment1 = client.analyze_sentiment(
        request={"document": document1}
    ).document_sentiment
    return sentiment1.score


def get_content(link, title):
    try:

        page = requests.get(link, timeout=0.1)
        soup = BeautifulSoup(page.content, "html.parser")
        article_text = soup.find("article")
        p_tags = article_text.findChildren("p")
        p_tags = [p.text for p in p_tags]
        p_tags = [p for p in p_tags if p]
        p_tags = "\n".join(p_tags)
        return p_tags
    except Exception as e:
        return title


def get_news_results(headline):
    googlenews = GoogleNews()
    googlenews = GoogleNews(lang='en', region='US')
    googlenews = GoogleNews(period='7d')
    googlenews.search(headline)
    return googlenews


def get_link_sentiment(link, title):
    text = get_content(link, title)
    return get_overall_Sentiment(text)


def return_links(text):
    text = ' '.join(get_main_topic(text))
    sent = get_overall_Sentiment(text)
    res_links = []
    if sent > 0.1 or (sent > -0.1 and sent < 0.1):
        page = 1
        min_sent = float('inf')
        ret_link = None
        while page < 4:
            t = time.time()
            news = get_news_results("negative news on " + text)
            news.get_page(page)
            links = news.results()[:10]
            link_sents = [get_link_sentiment(
                link['link'], link['title']) for link in links]
            curr_min = min(link_sents)
            if curr_min < min_sent:
                min_sent = curr_min
                ret_link = links[link_sents.index(curr_min)]['link']
                min_sent = curr_min
            if min_sent < -0.1:
                break
            page += 1

        res_links.append(ret_link)
    if sent < -0.1 or (sent > -0.1 and sent < 0.1):
        page = 1
        min_sent = float('-inf')
        ret_link = None
        while page < 4:
            t = time.time()
            news = get_news_results("positive news on " + text)
            news.get_page(page)
            links = news.results()[:10]
            link_sents = [get_link_sentiment(
                link['link'], link['title']) for link in links]
            curr_min = max(link_sents)
            if curr_min > min_sent:
                min_sent = curr_min
                ret_link = links[link_sents.index(curr_min)]['link']
                min_sent = curr_min
            if min_sent > 0.1:
                break
            page += 1

        res_links.append(ret_link)

    return res_links
