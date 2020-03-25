1) Added Docker
2) Added Babel
3) Added my mongo connector function thing
4) Added user routes they work with the postman test ( thow must document them)
5) You need to add an index to the db table bruv : db.Users.createIndex( { "user_id": 1 }, { unique: true } ) 
6) Moved auth logic to the AuthController ( yay )
7) IMPLEMENTED CSURF FINALLY lol...



// How to use:

add new secret
docker-compose build
docker-compose up
add index to db
register user


/// OFFICIAL DOCS

So this is my new base Api.

ES6 ready
Built in JWT Auth using cookies with Csurf CSRF protection
A nifty little mongo connector and error composer
Dockerized mongo nodeness
