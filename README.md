<!-- PROJECT LOGO -->
<br />
<div align="center">
    <a href="#">
     <img src="frontend/public/assets/VioREACH.png" alt="vioreach" width="430" height="220" style="pointer-events: none;" />
    </a>
    <h2>- Violence Detection On Social Media -</h2>
</div>

<br />

<!-- ABOUT THE PROJECT -->

### About The Project 👨‍👩‍👧

The fact that many young people and children spend a lot of time in front of screens in modern society is nothing new.
They spend much of their screen time on social media where they are exposed to explicit content including violence, bullying and exclusion.
Our final project aims to create a platform that allows concerned parents to track and monitor their children's behavior and involvement in such acts of violence, by giving us a permission to scan posts and videos of their children Instagram accounts.
By using computer vision and machine learning tools to scan for and recognize signs of violence, we believe we can increase parental awareness and reduce incidents like this.

<br />

---

<br />

### Sneak Peek Images and Videos 🔎:

_Will be edited further in the near future_

<br />

---

<br />

### The Monitoring Process (Behind the Scenes Explanation) 👁️:

- We created a full stack web application to enable a parent to register to our system, and by creating a user and granting access to his child Instagram user account, we are able to run Machine Learning and Computer Vision components on each video to identify and categorize different forms of violence.
- The first model we used to identify acts of violence was [YOLOv8](https://docs.ultralytics.com/). We collected a dataset of violent and non-violent videos to train the model. If violence is detected, we defer categorization of the video for further investigation.
- To improve the accuracy of the algorithm in case it detects violent content, we used several classifiers performed on violent videos:
  - Pose estimation which is based on the [MoveNet](https://www.tensorflow.org/hub/tutorials/movenet) algorithm. It's built for speed, so it's good for real-time apps and to our purposes. Within the pose estimation component we implemented mathematical computations (such as punch detection in an interaction between two people) to gather more information about the situation occurring in the video.
  - Presence of blood using [SVMs](https://en.wikipedia.org/wiki/Support_vector_machine) (support vector machines).
  - Scrum detection using a different YOLOv8 trained model as well.
- A concept called "stacking" is then used to achieve the end result, if any, of categorized violence. The idea is to stack all the small and weak feature outputs and combine them into a final vector to feed into the final classifier. We found the [XGBoost](https://xgboost.readthedocs.io/en/stable/) classifier to be a perfect match for this task.

<br />

---

<br />

### Features Included 🚀:

- Full integration with the Instagram Basic Display API.
-

<br />

---

<br />

### Technologies Stack 👨‍💻:

- The table below contains all the technologies used for the VioREACH integration:

| Field                | Stack                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Frontend Development | ![React](https://img.shields.io/badge/React-61DAFB?logo=React&logoColor=white&style=for-the-badge) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)                                                                                                                                                                                                                                                                         |
| Backend Development  | ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=Node.js&logoColor=white&style=for-the-badge) ![Express](https://img.shields.io/badge/Express-000000?logo=Express&logoColor=white&style=for-the-badge) ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)                                                                                                                                                                                                                                                             |
| Databases            | ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=MongoDB&logoColor=white&style=for-the-badge)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| AI/ML                | ![TensorFlow](https://img.shields.io/badge/TensorFlow-%23FF6F00.svg?style=for-the-badge&logo=TensorFlow&logoColor=white) ![Pandas](https://img.shields.io/badge/pandas-%23150458.svg?style=for-the-badge&logo=pandas&logoColor=white) ![NumPy](https://img.shields.io/badge/numpy-%23013243.svg?style=for-the-badge&logo=numpy&logoColor=white) ![Keras](https://img.shields.io/badge/Keras-%23D00000.svg?style=for-the-badge&logo=Keras&logoColor=white) ![Matplotlib](https://img.shields.io/badge/Matplotlib-%23ffffff.svg?style=for-the-badge&logo=Matplotlib&logoColor=black) ![scikit-learn](https://img.shields.io/badge/scikit--learn-%23F7931E.svg?style=for-the-badge&logo=scikit-learn&logoColor=white) ![OpenCV](https://img.shields.io/badge/OpenCV-F78C40?logo=OpenCV&logoColor=white&style=for-the-badge) |
| IDE's                | ![VisualStudioCode](https://img.shields.io/badge/Visual%20Studio%20Code-007acc?logo=Visual%20Studio%20Code&logoColor=white&style=for-the-badge) ![Pycharm](https://img.shields.io/badge/Pycharm-000000?logo=Pycharm&logoColor=white&style=for-the-badge)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Others               | ![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white) ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

<br />

---

<br />

### To Do List (Bugs & Improvements) 🐞:

- Apply refactoring to the code.
- Improve the accuracy of the blood detection classifier.
- For better results, adding additional classifiers (such as Sound Processor).
- Scan entire profile posts instead of just one.
- Build a sub-system that supports direct notifications to parents' smartphones.

_Will be edited further in the future if neccesary_

<br />

---

<br />

### Contact Us 💬:

GitHub Profile: [Ben Daniels](https://github.com/Ben55565) | [LinkedIn](https://www.linkedin.com/in/bendaniels-p/) Profile

GitHub Profile: [Yarin Bar](https://github.com/Yarin96) | [LinkedIn](https://www.linkedin.com/in/yarinb/) Profile

<br />
