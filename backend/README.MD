Sample curl requests for signup, signing and get user details:
===


Signup:
---
```
curl --request POST \
--url http://localhost:8080/api/auth/signup \
--header 'Content-Type: application/json' \
--header 'User-Agent: insomnia/8.5.1' \
--cookie JSESSIONID=C710A3BBA94C2C0822CE1D50BA48951E \
--data '{
"username":"usr",
"password":"pas",
"email":"email"
}'
```

Signin:
---

```
curl --request POST \
  --url http://localhost:8080/api/auth/signin \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/8.5.1' \
  --cookie JSESSIONID=C710A3BBA94C2C0822CE1D50BA48951E \
  --data '{
	"username":"usr",
	"password":"pas"
}'
```

Get User Details:
---

```
curl --request GET \
  --url http://localhost:8080/api/user/1 \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c3IiLCJpYXQiOjE3MDM5NzQ5MDQsImV4cCI6MTcwNDA2MTMwNH0.yqsv-cET_l0mv8COpMqPcj8-EwRZcu9HD-1ahJd574w' \
  --header 'User-Agent: insomnia/8.5.1' \
  --cookie JSESSIONID=C710A3BBA94C2C0822CE1D50BA48951E
```