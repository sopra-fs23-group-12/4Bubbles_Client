# UZH SoPra Course FS23

# 4Bubble Trivia

Make Trivia fun again!  \
This is a trivia game with a focus on multiplayer aspects.
You can test your trivia knowledge by battling your friends in your preferred
topic. Choose your difficulty, the number of questions and your game mode.
You have 10 seconds to answer the questions in the bubble and collect points. The faster
you answer, the more points you will get. This will prove more difficult than you might
expect, especially in hard mode. But not to worry - since the bubble sizes change to indicate
the number of people that have already cast their vote on one of the answers, you can go
the safe road and follow your friend's choice ... or can you? Depending on your game mode,
bubble sizes could just be randomly generated without you knowing, or players could change
their answer in the last seconds to try and confuse you.
Whether you chose the correct answer will be revealed when the time is up; if your
bubble doesn't burst, you've made the correct choice!

[Play here](https://sopra-fs23-group-12-client.ew.r.appspot.com). Enjoy!

You can find the corresponding server repository [here](https://github.com/sopra-fs23-group-12/4Bubbles_Server).

## Technologies

This project is a Node.js application running ReactJS with JavaScript.\
Server-Client communications are handled with REST API and Socket.io with the [Netty-Socketio](https://github.com/mrniko/netty-socketio) library for the java server.

## High-level Components

Our Client consists of four major components;

* [Sign up](/src/components/views/Register.js) and [login](/src/components/views/Login.js) allow the user to create a new account or play with an existing one.
* The [welcome page](/src/components/views/WelcomePage.js), where users can choose which action they would like 
to do next (starting a game, joining a game or displaying their profile)
* The [waiting room](/src/components/views/WaitingRoom.js), where everyone waits until all player have joined
* The [question](/src/components/views/Question.js) and [rankin](/src/components/views/Ranking.js) pages, which are integral to the game itself. 
Here the questions are  displayed, the votes are cast and the intermediate and final rankings are displayed.


## Contributing

Please read [contributions.md](https://github.com/sopra-fs23-group-12/4Bubbles_Server/blob/main/contributions.md) for details of our task history.

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

Login/Signup Page; here you can log in or create a new account.
![img.png](/readmepics/login.png)

Welcomepage; here you can choose what you would like to do next.
![img_1.png](/readmepics/welcomepage.png)

User Stats; every user can gain insight on their statistics.
![img_7.png](/readmepics/userprofile.png)

GameRoom; specify the settings for a new game.
![img_2.png](/readmepics/gameroom.png)

join a game; enter the room code displayed in the waiting room of the game you want to join.
![img_3.png](/readmepics/joingame.png)

Waiting Room; wait for players to join. From here on out the game is meant to be played in landscape mode.
![img_4.png](/readmepics/waitingroom.png)

Questions; cast your votes.
![img_5.png](/readmepics/question.png)

Ranking; after every question an intermediate ranking is displayed and when all questions have
been answered, the final ranking is shown.
![img_6.png](/readmepics/ranking.png)

## Roadmap

Developers interested in extending this application are welcome to implement additional features.\
Here are some Ideas that can be used as inspiration:

- additional game modes: We paid special attention to modularity while designing our code. It could therefore be modified to add
  some more game modes than the two that are already implemented.
- awards for special achievements: User statistics are already tracked and stored. Implementing a global leaderboard and
  special awards for all players that achieve a milestone (i.e. winning 20 games) would be a nice extension.



## Authors

in alphabetical order:
* **Dario Küffer** - [GitHub](https://github.com/dariokueffer)
* **Fabio Bertschi** - [GitHub](https://github.com/fabibert)
* **Maaike van Vliet** - [GitHub](https://github.com/Bluee1Bird)
* **Marlen Kühn**  - [GitHub](https://github.com/MarlenKuehn)
* **Louis Devillers** - [GitHub](https://github.com/a1ps)


Special thanks to the authors of the template:
* **Roy Rutishauser** - [GitHub](https://github.com/royru)
* **Dennis Huber** - [GitHub](https://github.com/devnnys)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* This project was build on the basis of the [SoPra Template](https://github.com/HASEL-UZH/sopra-fs23-template-client) FS23 provided by the University of Zurich for the
  Software Engineering Lab (Softwarepraktikum) course supervised by Professor Thomas Fritz
* Special Thanks also to our Teaching Assistant [Valentin Hollenstein](https://github.com/v4lentin1879)

