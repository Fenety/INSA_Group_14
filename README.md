 Phishing Analysis Tool 🛡️

A lightweight, AI-powered tool designed to detect, analyze, and report phishing URLs and emails efficiently. This project helps security researchers, developers, and organizations quickly identify phishing threats while also raising awareness through a dedicated training website.


 🚩 Problem Statement

Phishing attacks remain one of the most widespread and damaging cybersecurity threats, tricking users into revealing sensitive information via deceptive emails and malicious URLs. Traditional detection methods often fail to catch new and sophisticated scams and lack effective educational resources to empower users.

Our Phishing Analysis Tool combines advanced AI-driven heuristic analysis with integration of trusted threat intelligence sources, offering:

- Enhanced detection of subtle phishing indicators using machine learning and pattern recognition.
- Cross-verification with external databases like VirusTotal and PhishTank for community-verified threat data.
- A complementary web platform for phishing awareness and social engineering training.
- Real-time reporting and a centralized database to track phishing trends over time.

This multi-layered approach empowers organizations and individuals to proactively detect, analyze, and defend against phishing attacks.


🚀 Features

- AI-powered Heuristic Analysis
  Uses machine learning models to detect suspicious patterns in URLs and email headers beyond basic blacklist checks.

- Threat Intelligence Integration
  Queries external services such as VirusTotal and PhishTank to verify and enrich detection results.

- Email Header Parsing
  Identifies anomalies and spoofing attempts by analyzing email header metadata.

- Real-time Reporting
  Generates detailed, easy-to-understand phishing reports with key findings and indicators.

- Phishing Awareness Website  
  Interactive educational platform with tutorials, examples, and training to help users recognize phishing and social engineering tactics.

- Lightweight & Fast
  Designed for minimal resource consumption, enabling deployment on varied hardware and integration into existing security pipelines.


 📂 Project Structure

phishing-analysis-tool/
├── src/ # Main source code and AI models
├── data/ # Sample phishing datasets for training/testing
├── reports/ # Generated phishing analysis reports
├── tests/ # Unit and integration tests
├── web/ # Phishing awareness website code
├── README.md # This documentation file
├── requirements.txt # Python dependencies and AI libraries
└── LICENSE # Project license



 🛠️ Technical Usage

 1. Setup and Installation

Ensure you have Python 3.8+ installed. Clone the repo and install dependencies:

git clone https://github.com/Fenety/INSA_Group_14.git
cd INSA_Group_14
