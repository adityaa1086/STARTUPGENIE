from flask import Flask, request, jsonify, send_from_directory
import pandas as pd
import matplotlib.pyplot as plt
import os

app = Flask(__name__)

@app.route('/analyze', methods=['POST'])
def analyze_data():
    file = request.files['datafile']
    data = pd.read_csv(file)

    # Sample analysis
    avg_funding = data.groupby('sector')['funding_received'].mean()
    
    # Visualization
    plt.figure(figsize=(10,6))
    avg_funding.plot(kind='bar')
    plt.title('Average Funding by Sector')
    plt.ylabel('Average Funding (in $)')
    plt.xlabel('Sector')
    
    # Save figure
    if not os.path.exists('static'):
        os.makedirs('static')
    plot_path = "static/analysis_result.png"
    plt.savefig(plot_path)
    
    return jsonify({"result_image": plot_path})

@app.route('/static/<filename>')
def serve_static(filename):
    return send_from_directory('static', filename)

if __name__ == '__main__':
    app.run(debug=True)
