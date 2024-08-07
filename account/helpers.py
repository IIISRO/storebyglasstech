import random
import requests
def create_and_send_password(user):
    print(1)
    password = ''.join(random.choices("0123456789", k=6))
    user.set_password(password)
    user.save()
    message = f'Salam. Bu sifre daimidir. Profilinzden istediyiniz zaman deyisdire bilersiniz.\nSifre: {password}\nSTOREGLASSTECH'  
    number = user.number.replace('+994', '994').replace(' ', '')
    response = requests.post(f'https://html.smilesms.az:8443/SmileWS2/webSmpp.jsp?username=2578&password=StRX92!SM&numberId=1649&msisdn={number}&msgBody={message}') 

    if response.ok:
        return 1
    return 0