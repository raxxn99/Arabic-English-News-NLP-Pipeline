# 📘 Arabic–English News NLP Pipeline (Project A)

## 📌 Project Overview
This project implements an end-to-end Natural Language Processing (NLP) pipeline designed to classify news articles in both **Arabic** and **English**. The system ingests raw text data, performs language-specific preprocessing (normalization, stop-word removal), conducts Exploratory Data Analysis (EDA), and trains a Machine Learning model to categorize articles into four main topics:
* Politics
* Business
* Sports
* Technology

## 📂 Repository Structure
The repository is organized as follows:

```text
.
├── data/               # Contains dataset files 
├── notebooks/          # Jupyter Notebooks (Main analysis & modeling)
├── src/                # Source code 
├── requirements.txt    # List of required Python libraries
├── run_pipeline.sh     # Shell script to execute the pipeline
├── LICENSE             # Project License
└── README.md           # Project Documentation

📊 Features & Methodology
Data Collection: Aggregated news data from Kaggle (Arabic News Dataset & Malaysia News Collection).

Preprocessing:

English: Lowercasing, regex cleaning, NLTK stopword removal.

Arabic: Unicode normalization, removal of diacritics, and Arabic-specific stopword filtering.

Visualization: Class distribution charts, text length analysis, and WordClouds for both languages.


👥 Authors
Rana yahay
Aaya Ehab
Alia AL Ali
Reem Bin Haider
Salma Amara