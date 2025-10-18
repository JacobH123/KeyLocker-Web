from flask_mail import Message
from . import mail

def send_email(recipient: str, subject: str, body_html: str):
    """Send an HTML email via Flask-Mail"""
    msg = Message(subject, recipients=[recipient])
    msg.html = body_html

    try:
        mail.send(msg)
        return True
    except Exception as e:
        print("Email error:", e)
        return False
