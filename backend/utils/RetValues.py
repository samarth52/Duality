import backend.utils.generate_urls as generate_urls

def get_imp_info(url: str):
    page = generate_urls.requests.get(url)
    main_info = generate_urls.get_content(url,"t")
    result = ""
    imp_values=[]
    imp_values.append(url)
    topics = generate_urls.get_main_topic(main_info)
    currKeywords = ' '.join(topics)
    imp_values.append(topics)
    # print(topics)
    # currKeywords = ' '.join(generate_urls.get_main_topic(main_info))
    imp_values.append(currKeywords)
    imp_values.append(generate_urls.get_overall_Sentiment(main_info))

    oppArticle = generate_urls.return_links(main_info)
    oppArticle = ''.join(oppArticle)
    page1 = generate_urls.requests.get(oppArticle)
    oppArticle = str(oppArticle)
    imp_values.append(generate_urls.get_overall_Sentiment(oppArticle))
    imp_values.append(oppArticle)
    # oppContent = generate_urls.get_content(oppArticle,"t")
    # oppKey = (' '.join(generate_urls.get_main_topic(oppContent)))
    
    # imp_values.append(oppContent)
    return imp_values

print(get_imp_info("https://www.whitehouse.gov/briefing-room/statements-releases/2023/02/11/readout-of-president-bidens-call-with-prime-minister-trudeau-of-canada-2/"))
