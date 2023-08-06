# 2223T3-S12-G09
<h1>Epic Laboratory Reservation Slot banana</h1>
<p><i>We're here to blow minds that haven't blown before.</i></p>
<br>

Specs checklist
<pre>
w - work in progress
x - done
[x] View Slot Availability
[x] Register
[x] Login
[x] Logout
[x] Reserve
[x] Reserve for a student
[x] Remove reservation
[x] Edit reservation
[x] See reservation
[x] View / Edit user profile
[x] Delete user account
[x] Search for users / free slots
[ ] General
  [ ] Good UI and UX
</pre>

<h2>Prerequisites</h2>
<p>
NodeJS must be installed. It provides npm to install necessary modules. If NodeJS isn't installed yet go to its <a href='https://nodejs.org/en/download'>download</a> site.
</p>

<h2>Installation and Running the Project Locally</h2>
<ol>
  <li>
    Either download the code in .ZIP file, or clone the repository with <code>git clone https://github.com/DLSU-CCAPDEV/2223T3-S12-G09/</code>
  </li>
  <li>
    Open the command prompt (Windows), or terminal (Mac, Linux) on the project folder where the files were downloaded or cloned.<br>
    Install the necessary npm modules with the command below:<br>
    <code>npm install</code>
  </li>
  <li>
    After installing the necessary modules input the following code to run the project.<br>
    <code>node index.js</code>
  </li>
  <li>
    The command line or terminal will provide you with the URL address of the server.<br>
    Once the the web browser has rendered it should display the Home page, wherein the larger text Computer Laboratories should be seen accompanied by an image.<br>
  </li>
  <li>
    Go to the Sign-up page by clicking the Sign Up button located on the navigation bar or on the top part of the page. Once all the required details are inputted click on 'SIGN UP'. For reference register this two account:<br>

    First Name:     John
    Last Name:      Doe
    Username:       JohnDoe
    Email:          JohnDoe@email.com
    Password        12345678

    First Name:     Jane
    Last Name:      Doe
    Username:       JaneDoe
    Email:          JaneDoe@email.com
    Password        12345678
  </li>
  <li>
    Once the you have finished signing up the page will redirect you to the Login page. Then try logging JohnDoe by inputting all the necesary details to login the account you have created. After that you will be redirected to the Home page.<br>
  </li>
  <li>
    Try clicking the Home button, this should not display another page since the home page will be rendered in when you open the website or after you login. In the home page you should see details about the computer lab and a reservation button.<br>
  </li> 
  <li>
    Now try clicking on the Make A Reservation button in the home page or the Reservation button located in the nav bar. Select a date, laboratory, time slot and a seat. Then, you should see a pop-up and click on reserve. Your reservation should be set now.<br>
  </li> 
  <li>
    Now try clicking on the Search button. To search all accounts input "all". To search a specific account input the username, in our case let's input JaneDoe then search. JaneDoe's information for the username, first name, last name, and description should appear.<br>
  </li> 
  <li>
    Now try clicking on the About button. This should display all the npm packages used in creating this website.<br>
  </li> 
  <li>
    Now try clicking on your username in the nav bar, in our case it would be JohnDoe. It should display the profile page containing your profile picture, username, first name and last name concatenated together, bio, reservations made with options to edit or delete it, and options to edit or delete your profile. Try clicking on the Edit Profile, it should display the edit-profile page wherein a textfield for the profile picture and bio is seen. For the profile picture search an image in the internet then right-click and copy the image address and paste. Try inputting this link 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/De_La_Salle_University_Seal.svg/1200px-De_La_Salle_University_Seal.svg.png'. As for the bio try inputting 'hello'. After clicking the save button it should redirect you back to the profile page with the updated profile.
    Now try clicking on the Delete Profile. This should delete your profile from the website database. Refresh the page and you are back to the Home page.<br>
  </li>
  <li>
    This time try logging in JaneDoe. After you have logged in click on the logout. This should log you out from the website and redirect you to the home page.<br>
  </li> 
  <li>
    That is all of the functions possible and available in the website.<br>
  </li>
</ol>

<h2>Project Files and Folder Information</h2>
<ol>
  <li>
    controllers - This folder contains files which defines callback functions for client requests.<br>
  </li>
  <li>
    helpers - This folder contains files which contains helper functions.<br>
  </li>
  <li>
    models - This folder contains files for database modeling and access.<br>
  </li>
  <li>
    node_modules - This folder contains files for the various npm module/packages necessary for the project to run.<br>
  </li>
  <li>
    public - This folder contains static assets such as css, js, and image files.<br>
  </li>
  <li>
    routes - This folder contains files which describes the response of the server for each HTTP method request to a specific path in the server.<br>
  </li>
  <li>
    views - This folder contains all hbs files to be rendered when requested from the server.<br>
  </li>
  <li>
    index.js - The main entry point of the web application.<br>
  </li>
</ol>

