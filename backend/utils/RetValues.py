import backend.utils.generate_urls as generate_urls

def get_imp_info(body: str):
    imp_values=[]
    topics = generate_urls.get_main_topic(body)
    currKeywords = ' '.join(topics)
    # print(topics)
    # currKeywords = ' '.join(generate_urls.get_main_topic(main_info))
    # imp_values.append(currKeywords)
    imp_values.append(generate_urls.get_overall_Sentiment(body))
    imp_values.append(topics)

    oppArticle = generate_urls.return_links(body)
    oppArticle = ''.join(oppArticle)
    page1 = generate_urls.requests.get(oppArticle)
    oppArticle = str(oppArticle)
    oppContent = generate_urls.get_content(oppArticle,"t")
    imp_values.append(oppArticle)
    imp_values.append(generate_urls.get_overall_Sentiment(oppContent))
    
    # oppKey = (' '.join(generate_urls.get_main_topic(oppContent)))
    
    # imp_values.append(oppContent)
    return imp_values
