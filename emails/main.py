import requests

API_KEY = "218a27317f532b85a00b6d09ad410bbf-1654a412-a3bd7ffb"
DOMAIN = "mg.taylorcamacho.com"

def send_email(to, subject, message):
    return requests.post(
        f"https://api.mailgun.net/v3/{DOMAIN}/messages",
        auth=("api", API_KEY),
        data={
            "from": f"Taylor Camacho <hello@{DOMAIN}>",
            "to": to,
            "subject": subject,
            "html": message,
        },
    )

response = send_email("client@example.com", "More Clients, More Sales!", "<h1>Book More Calls</h1><p>Let's talk.</p>")
print(response.status_code, response.text)