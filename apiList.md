# DevTinder APIs

## Auth router

- POST /login
- POST /signup
- POST /logout

## Profile router

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## Connection router

- POST /request/send/:status/:userId -> ignoring (left swipe) / sending (right swipe) connection request
- POST /request/view/:status/:requestId -> accepting/rejecting the connection request received from other users

## User router

- GET /user/connection
- GET /user/requests/received
- GET /user/feed

\*Status : [ ACCEPTED, REJECTED, PASS, LIKE ]

## Features to consider adding later

1. Chat
2. Add forgot password feature
