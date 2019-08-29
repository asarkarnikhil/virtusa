# virtusa
test repo
1) use /auth/login to genrate a auth token. use this token for all the apis for authentication.

2) create user /user/createuser
json body: {"firstname": "amol",
"lastname": "bhuskute",
"emailaddress": "test1@test.com",
"username": "testamoll33"
}

pass auth token as authorization


3) get user: user/getuserlist
pass auth token as authorization

4) Mongo atls: It connects to a mongo atls cluster for DB.
