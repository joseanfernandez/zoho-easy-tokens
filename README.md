# Zoho easy tokens
Generate grant, refresh and access tokens in Zoho

### Instructions

####  Download the code
```console
git clone https://github.com/joseanfernandez/zoho-easy-tokens.git
```

####  Install dependencies
```console
cd zoho-easy-tokens
npm install
```

#### Modify config.js

You need your:
* clientId
* clientSecret
* redirectUri

Go to [developer console](https://accounts.zoho.com/signin?servicename=AaaServer&serviceurl=%2Fdeveloperconsole)

Register your application.

Copy this data in your config.js and change the scope if it is necesary.

#### How to use it
```console
npm start
```

##### Get grant token

[http://localhost:3005/url/for/grant/token](http://localhost:3005/url/for/grant/token)

You will get redirected to the "redirectUri" that you specified during registration of the app.
Note down the "code={grant_token}" parameter.
This is a short-lived token (valid only for a minute) and will be used to generate the access token and refresh token.

##### Get refresh and access tokens
[http://localhost:3005/get/tokens/{YOUR_GRANT_TOKEN}](http://localhost:3005/get/tokens/{YOUR_GRANT_TOKEN})

A copy of this tokens will be save in tokens.log file.


