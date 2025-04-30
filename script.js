async function checkURL() {
    const urlInput = document.getElementById('urlInput').value;
    const resultDiv = document.getElementById('result');
    const awarenessDiv = document.getElementById('awareness');

    if (!urlInput) {
        resultDiv.innerHTML = "<span style='color:red;'>Please enter a URL.</span>";
        awarenessDiv.style.display = 'none';
        return;
    }

    try {
        const response = await fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: urlInput })
        });

        const data = await response.json();

        if (data.is_phishing) {
            resultDiv.innerHTML = `<span style="color:red;">Warning: This URL is likely a phishing site!<br>Phishing probability: ${(data.phishing_probability*100).toFixed(2)}%</span>`;
            awarenessDiv.style.display = 'block';
        } else {
            resultDiv.innerHTML = `<span style="color:green;">This URL appears safe.<br>Phishing probability: ${(data.phishing_probability*100).toFixed(2)}%</span>`;
            awarenessDiv.style.display = 'none';
        }
    } catch (error) {
        resultDiv.innerHTML = "<span style='color:red;'>Error checking URL. Please try again later.</span>";
        awarenessDiv.style.display = 'none';
    }
}
