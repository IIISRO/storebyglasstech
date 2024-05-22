import random
import requests
def create_and_send_password(user):
    password = ''.join(random.choices("0123456789", k=6))
    user.set_password(password)
    user.save()
    message = f'Salam. Bu sifre daimidir. Profilinzden istediyiniz zaman deyisdire bilersiniz.\nSifre: {password}\nSaglam qalin! BHCmarket'  
    number = user.number.replace('+994', '994').replace(' ', '')
    response = requests.post(f'https://html.smilesms.az:8443/SmileWS2/webSmpp.jsp?username=2569&password=BHCtSMX92&numberId=1630&msisdn={number}&msgBody={message}') 

    if response.ok:
        return 1
    return 0