import re
import string
import nltk
from nltk.corpus import stopwords

# Ensure necessary NLTK data is downloaded
try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')
    nltk.download('punkt')

def normalize_arabic(text):
    """
    Normalizes Arabic text by unifying different forms of Alef and removing diacritics.
    """
    text = re.sub(r"[إأآا]", "ا", text)
    text = re.sub(r"ة", "ه", text)
    text = re.sub(r"ى", "ي", text)
    # Remove Tashkeel (Diacritics)
    text = re.sub(r'[\u064B-\u065F]', '', text)
    return text

def clean_text(text, lang='en'):
    """
    Main cleaning function for both Arabic and English text.
    Args:
        text (str): The raw text string.
        lang (str): 'en' for English, 'ar' for Arabic.
    """
    if not isinstance(text, str):
        return ""

    # 1. Remove HTML tags
    text = re.sub(r'<.*?>', '', text)
    
    # 2. Remove URLs
    text = re.sub(r'http\S+|www\S+', '', text)
    
    # 3. Remove Punctuation & Numbers (Keep only letters and spaces)
    # Note: \w includes Arabic letters.
    text = re.sub(r'[^\w\s]', '', text)
    text = re.sub(r'\d+', '', text)

    # 4. Language Specific Processing
    if lang == 'en':
        text = text.lower()
        stop_words = set(stopwords.words('english'))
    else:
        # Apply Arabic Normalization
        text = normalize_arabic(text)
        stop_words = set(stopwords.words('arabic'))

    # 5. Remove Stopwords
    words = text.split()
    cleaned_words = [w for w in words if w not in stop_words and len(w) > 1]

    return " ".join(cleaned_words)