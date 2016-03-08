## 臺大女一舍洗衣機監控平台
#####Washing Machine Monitoring Platform of NTU Girls' Dorm

In NTU school dorm, about 60 students have to take turns to use one washing machine. There are a lot of problems in this kind of situation. For example, when a washing machine finishes washing and student A forgets to pick up her clothes, the next user B may take out student A's clean clothes and put it somewhere else if B is in a hurry to use washing machine.

Therefore, we made a monitoring platform that allows everyone to see the current state(進水,洗衣,脫水,etc) of the washing machines in school dorm. Also, we created a subscription service. If a washing machine is subscribed, we will send text messages to the users whom have subscribed it when it finishes washing.

We use ``Node.js``, ``Express.js``, ``Angular.js`` and ``MySQL`` to build the app.
There are two parts in our app. The [DataFatcher](https://github.com/cosrick/dataFetcher) fetches data from smart plug api ,watches the pattern of electric current and determines the current state. The second one is this repository, including all front end pages and apis of subscription data and user data.


##System Structure
![]( ./client/assets/images/structure-en.png )

##ScreenShot
![]( ./client/assets/images/washingMachine.png )

##Achievement
![]( ./client/assets/images/achievement.jpeg )
