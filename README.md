# Authentication and Testing Sprint Challenge

**Read these instructions carefully. Understand exactly what is expected _before_ starting this Sprint Challenge.**

This challenge allows you to practice the concepts and techniques learned over the past sprint and apply them in a concrete project. This sprint explored **Authentication and Testing**. During this sprint, you studied **authentication, JSON web tokens, unit testing, and backend testing**. In your challenge this week, you will demonstrate your mastery of these skills by creating **a dad jokes app**.

This is an individual assessment. All work must be your own. All projects will be submitted to Codegrade for automated review. You will also be given feedback by code reviewers on Monday following the challenge submission. For more information on the review process [click here.](https://www.notion.so/lambdaschool/How-to-View-Feedback-in-CodeGrade-c5147cee220c4044a25de28bcb6bb54a)

You are not allowed to collaborate during the sprint challenge.

## Project Setup

- [ ] Fork and clone the repo. Delete your old fork from Github first if you are repeating this Unit.
- [ ] Open the assignment in Canvas and click on the "Set up git" option.
- [ ] Follow instructions to set up Codegrade's Webhook and Deploy Key.
- [ ] Make a commit and push it to Github.
- [ ] Check to see that Codegrade has accepted your git submission.

For a step-by-step on setting up Codegrade see [this guide.](https://www.notion.so/lambdaschool/Submitting-an-assignment-via-Code-Grade-A-Step-by-Step-Walkthrough-07bd65f5f8364e709ecb5064735ce374)

## Project Instructions

Dad jokes are all the rage these days! In this challenge, you will build a real wise-guy application.

Users must be able to call the `[POST] /api/auth/register` endpoint to create a new account, and the `[POST] /api/auth/login` endpoint to get a token.

We also need to make sure nobody without the token can call `[GET] /api/jokes` and gain access to our dad jokes.

We will hash the user's password using `bcryptjs`, and use JSON Web Tokens and the `jsonwebtoken` library.
  
### MVP

Your finished project must include all of the following requirements (further instructions are found inside each file):

- [ ] An authentication workflow with functionality for account creation and login, implemented inside `api/auth/auth-router.js`.
- [ ] Middleware used to restrict access to resources from non-authenticated requests, implemented inside `api/middleware/restricted.js`.
- [ ] A minimum of 2 tests per API endpoint, written inside `api/server.test.js`.

**IMPORTANT Notes:**

- Execute tests locally by running `npm test`.
- Do not exceed 2^8 rounds of hashing with `bcryptjs`.
- If you use environment variables make sure to provide fallbacks in the code (e.g. `process.env.SECRET || "shh"`).
- You are welcome to create additional files but **do not move or rename existing files** or folders.
- Do not alter your `package.json` file except to install extra libraries. Do not update existing packages.
- The database already has the `users` table, but if you run into issues, the migration is available.
- In your solution, it is essential that you follow best practices and produce clean and professional results.
- Schedule time to review, refine, and assess your work and perform basic professional polishing including spell-checking and grammar-checking on your work.
- It is better to submit a challenge that meets MVP than one that attempts too much and does not.

## Submission format

- [ ] Submit via Codegrade by committing and pushing any new changes.
- [ ] Create a pull request to merge `<firstName-lastName>` branch into `main`.
- [ ] Please don't merge your own pull request and make sure **you are on your own repo**.
- [ ] Check Codegrade for automated feedback.
- [ ] Check Codegrade on the days following the Sprint Challenge for reviewer feedback.
- [ ] Any changes pushed after the deadline will not receive any feedback.

## Interview Questions

Be prepared to demonstrate your understanding of this week's concepts by answering questions on the following topics.

1. Differences between using _sessions_ or _JSON Web Tokens_ for authentication.

    For sessions, the server creates a session id when a user logs in. The server stores the session id in a cookie and sends the cookie to the user's browser. On subsequent requests, the cookie is sent with the request. The server compares the session id in the cookie to the session id stored in memory and, if the session id matches a current open session, the server sends back a response. Authenticating with sessions is less scalable because the session information is stored in server memory. This can become a problem when there are many users simultaneously sending requests to the server. Cookies are best when requesting resources from a single origin and are not advised when authenticating users on mobile devices or other devices.

    For JSON Web Tokens, the server creates a JWT (encoded from the header, payload, and signature) when a user logs in. The server sends the token to the client, which stores the token (usually in local storage). On subsequent requests, the token is sent in the request headers. The server decodes the token signature and validates the token by comparing the signature. The biggest difference from sessions is that the user's state is stored on the client side (in a token) rather than on the server side (in a session). This makes JWT better fits for mobile device authentication and scalability.

2. What does `bcryptjs` do to help us store passwords in a secure manner?

    bcryptjs hashes passwords before they are stored in a database, which means that even if the database is stolen, password information would be secure. bcrypt allows for iterative hashing, meaning a password is hashed many times (ie 2 ^ 8) times. This makes passwords even more resistant to brute force attacks as it significantly increases computation time. Additionally, it adds a salt to each hash, which is a random string that makes each resulting hash unique, even for the same password.

3. How are unit tests different from integration and end-to-end testing?

    Unit tests single units of an application such as the result of a single function in an application. Integration tests if individual units or modules are working as expected _with_ other units or bits of code. Integration tests also test how external systems work with internal modules. End-to-end tests test the entire user experience from start to finish.

4. How does _Test Driven Development_ change the way we write applications and tests?

    With TDD, you write tests before you write the corresponding application code. Specifically, you write the tests, which will initially fail. You then write the corresponding application code and get the test to pass, which gives you confidence that your application is working as expected. You then refactor code and continue to test. This way, the test can alert you when your changes break your application.
