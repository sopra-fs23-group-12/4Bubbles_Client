## UZH SoPra Course FS23


# 4Bubble Trivia 
<img title="favicon" alt="Soap Bubble" src="/public/favicon.png" width="150">

Make Trivia fun again!  \
This is a trivia game with a focus on multiplayer aspects.
You can test your trivia knowledge by battling your friends in your preferred
topic. Choose your difficulty, the number of questions and your game mode.
You have 10 seconds to answer the questions in the bubble and collect points. The faster
you answer, the more points you will get. This will prove more difficult than you might
expect, especially in hard mode. But not to worry - since the bubble sizes change to indicate
the number of people that have already cast their vote on one of the answers, you can go
the safe road and follow your friend's choice ... or can you? \
The game supports two game modes; standard locks your choice in, once you've cast your vote
you cannot change it anymore. 3,2,1 ... let's you change your vote. Players in this game mode
have to be extra careful when deciding whether to trust their friend's choice.
If you chose the correct answer will be revealed when the time is up; if your
bubble doesn't burst, you've made the correct choice!

[Play here](https://sopra-fs23-group-12-client.ew.r.appspot.com). Enjoy!
Check [here](https://sopra.dkueffer.ch) whether the server is running correctly.

You can find the corresponding server repository [here](https://github.com/sopra-fs23-group-12/4Bubbles_Server).

## Technologies

This project is a Node.js application running ReactJS with JavaScript.\
Server-Client communications are handled with REST API and Socket.io with the [Netty-Socketio](https://github.com/mrniko/netty-socketio) library for the java server.

## High-level Components

Our Client consists of four major components;

* [Sign up](/src/components/views/Register.js) and [login](/src/components/views/Login.js) allow the user to create a new account or play with an existing one.
* The [welcome page](/src/components/views/WelcomePage.js), where users can choose which action they would like 
to do next (starting a game, joining a game or displaying their profile).
* The [waiting room](/src/components/views/WaitingRoom.js), where everyone waits until all player have joined.
* The [question](/src/components/views/Question.js) and [ranking](/src/components/views/Ranking.js) pages, which are integral to the game itself. 
Here the questions are  displayed, the votes are cast and the intermediate and final rankings are displayed.



## Prerequisites and Installation
For your local development environment, you will need Node.js. You can download it [here](https://nodejs.org). All other dependencies, including React, get installed with:

```npm install```

Run this command before you start your application for the first time. Next, you can start the app with:

```npm run dev```

Now you can open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### Testing
You can run the tests with `npm run test`.
This launches the test runner in an interactive watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.


### Build
Finally, `npm run build` builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance: the build is minified, and the filenames include hashes.<br>

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## Illustrations 
<h6 align="center">
  Login/Signup Page; here you can log in or create a new account.
  <br>
  <br>
  <a href="https://github.com/soprafs22-group17"><img src="/readmepics/login.png" alt="login" width="200"></a>
  <br>
  <br>
</h6>
<h6 align="center">
  Welcomepage; here you can choose what you would like to do next.
  <br>
  <br>
  <a href="https://github.com/soprafs22-group17"><img src="/readmepics/welcomepage.png" alt="welcomepage" width="200"></a>
  <br>
  <br>
</h6>
<h6 align="center">
  User Stats; every user can gain insight on their statistics.
  <br>
  <br>
  <a href="https://github.com/soprafs22-group17"><img src="/readmepics/userprofile.jpg" alt="userprofile" width="200"></a>
  <br>
  <br>
</h6>
<h6 align="center">
  GameRoom; specify the settings for a new game.
  <br>
  <br>
  <a href="https://github.com/soprafs22-group17"><img src="/readmepics/gameroom.png" alt="gameroom" width="200"></a>
  <br>
  <br>
</h6>
<h6 align="center">
  join a game; enter the room code displayed in the waiting room of the game you want to join.
  <br>
  <br>
  <a href="https://github.com/soprafs22-group17"><img src="/readmepics/joingame.png" alt="joingame" width="200"></a>
  <br>
  <br>
</h6>
<h6 align="center">
  Waiting Room; wait for players to join. From here on out the game is meant to be played in landscape mode.
  <br>
  <br>
  <a href="https://github.com/soprafs22-group17"><img src="/readmepics/waitingroom.png" alt="waitingroom" width="200"></a>
  <br>
  <br>
</h6>
<h6 align="center">
  Questions; cast your votes.
  <br>
  <br>
  <a href="https://github.com/soprafs22-group17"><img src="/readmepics/question.png" alt="question" width="200"></a>
  <br>
  <br>
</h6>
<h6 align="center">
  Ranking; after every question an intermediate ranking is displayed and when all questions have
been answered, the final ranking is shown.
  <br>
  <br>
  <a href="https://github.com/soprafs22-group17"><img src="/readmepics/ranking.jpg" alt="ranking" width="200"></a>
  <br>
  <br>
</h6>

## Roadmap

Developers interested in extending this application are welcome to implement additional features.\
Here are some Ideas that can be used as inspiration:

- [Additional game modes](https://github.com/sopra-fs23-group-12/4Bubbles_Server/issues/25): We paid special attention to modularity while designing our code. It could therefore be modified to add
  some more game modes than the two that are already implemented.
- [Awards for special achievements](https://github.com/sopra-fs23-group-12/4Bubbles_Server/issues/19): User statistics are already tracked and stored. Implementing a global leaderboard and
  special awards for all players that achieve a milestone (i.e. winning 20 games) would be a nice extension.



## Authors

In alphabetical order:
* **Dario Küffer** - [GitHub](https://github.com/dariokueffer)
* **Fabio Bertschi** - [GitHub](https://github.com/fabibert)
* **Maaike van Vliet** - [GitHub](https://github.com/Bluee1Bird)
* **Marlen Kühn**  - [GitHub](https://github.com/MarlenKuehn)
* **Louis Devillers** - [GitHub](https://github.com/a1ps)


Special thanks to the authors of the template:
* **Roy Rutishauser** - [GitHub](https://github.com/royru)
* **Dennis Huber** - [GitHub](https://github.com/devnnys)

## Contributing

Please read [contributions.md](https://github.com/sopra-fs23-group-12/4Bubbles_Server/blob/main/contributions.md) for details of our task history.

## Acknowledgments

* This project was build on the basis of the [SoPra Template FS23](https://github.com/HASEL-UZH/sopra-fs23-template-client) provided by the University of Zurich for the
  Software Engineering Lab (Softwarepraktikum) course supervised by [Professor Thomas Fritz](https://www.ifi.uzh.ch/en/hasel/people/fritz.html).
* Special Thanks also to our Teaching Assistant [Valentin Hollenstein](https://github.com/v4lentin1879).
* We are also very grateful to the creators and contributors of the external API [Open Trivia Database](https://opentdb.com/) which we used as source for 
our questions.


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

