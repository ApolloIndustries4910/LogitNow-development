


<h1 align="center">LogitNow - Logging Made Easier</h1>

<p align="center">LogitNow is a cross platform application that was created to make the lives of forest Loggers easy! The simplicity of the app makes it it user friendly for all ages.</p>


## Built With

- JavaScript
- React Native
- Yarn


Click [here](https://reactnative.dev/docs/environment-setup) to set up your react-native environment


<h1 align="center">Follow the steps below to run the project after you've set up your react-native development</h1>




1. Clone Master Branch
2. Open terminal in project's root directory.
3. Run the command


Yarn

4. Run the project


**Android**

npx react-native run-android

(This is in the project's root directory in terminal)

**IOS**

- Cd ios/


- Pod install


- cd ..


- npx react-native run-ios

<h1 align="center">Application Structure </h1>

<p align="center">The admin user of a specific Project is able to” sign up as an Admin” on the login page consisting of their name, city, Email, password, City of Operation and their Company Name. After this process, the admin is now redirected to the admin view of their specific company which allows them to:

**Manage Machines**
This tab allows the admin to create machines for the general users of their project to use. For example, the admin is able to create shovels, lawnmowers, or any equipment needed to complete a specific task.

**Manage Projects**
This Allows the admin user to create Projects that have sub projects to indicate where the general user of this company is going to be working. Here is where you can also link the machines you’ve created to the project you’ve created.


**Manage Users**
This is where the admin user is able to invite general users to their project via email. The user will receive a unique company ID which will allow them to register under a specific admin project. The admin is also able to deactivate and delete users through the ”manage user” view. Admins are only able to see their Admin view. This is validated through the company ID in which the users are going to be invited.


**General User**
Upon receiving the Unique company ID, the General user is now able to “Register as a user” on the login page. The user is able to enter their Name, City, Password, Email, and the Company ID to sign up. The general user is now able to login and see the specific projects their Admin has created so they can choose which to get started on.
The general user is also able to clock in, clock out after selecting a specific project, if there is a project. Additionally, the general user is able to select which machine they have used and which sub project they are working on.</p>




