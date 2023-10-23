import nltk
from flask import Flask, request, jsonify

app = Flask(__name__)

nltk.download('punkt')  # Download NLTK data if not already downloaded

@app.route('/process-text', methods=['POST'])
def process_text():
    data = request.get_json()
    text = data['text']   
    word_count = len(text.split())

    # Return the result as JSON
    result = {'word_count': word_count}
    # Tokenize the text into sentences using NLTK
    sentences = nltk.sent_tokenize(text)
    sentence_count = len(sentences)
    avg_word_per_sentece=word_count/sentence_count

    # Return the result as JSON
    result = {'avg_word_per_sentence': avg_word_per_sentece,'word_count':word_count,'sentence_count':sentence_count}
    return jsonify(result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
