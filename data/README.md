# 🗃️ Dataset Information

This directory is intended to store the CSV files used for training and analysis.

## 📄 Files Required
1. **Arabic_news.csv**
2. **English_news.csv**

## 🌐 Data Sources
If the CSV files are not present in this folder (to save space), please download them from the following sources:

- Malaysia biggest online news collection on Kaggle(English)

data link:https://www.kaggle.com/datasets/azraimohamad/news-article-weekly-updated  

- Arabic News Dataset (Kaggle)

data link:https://www.kaggle.com/datasets/asmaaabdelwahab/arabic-news-datase

**License:** Open access for educational use  
**Cleaning:** Removed punctuation, HTML, numbers, and stopwords; normalized text.  
**Ethics:** All data is public and anonymized.

## 📋 Data Schema
Both datasets have been standardized to contain the following columns during the pipeline processing:

**Languages:** Arabic, English  
**Dataset Size:** ~2,000 news articles (1,000 per language)  
**Categories:** Politics, Business, Sports, Technology

* `text`: The main body of the news article (combined title and content).
* `category`: The target label (Politics, Sports, Business, Technology).
* `language`: Added field (`ar` for Arabic, `en` for English).

## ⚠️ Note on Usage
Ensure that the CSV filenames match those listed in the "Files Required" section above so that the notebook can load them automatically.