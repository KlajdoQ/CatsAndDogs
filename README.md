# PawBook 

## Description

This is a social media app for all pet lovers that want to post pictures of their own pets. They can like or comment on other posts too. 
It is very easy to use since it doesnt require any sign in (already working on that)


## Installation

In order to start the app after opening up the code on your favorite editor , you need to start two servers. 
- After getting to the rails-backend folder - run rails:db migrate db:seed and rails s to start the server 
- The second command would be npm start after getting to the react-frontend folder


## Usage

- First component we see is the Header. The header is made out of 4 different components. 
The first one is the Cats and Dogs logo. When clicked it takes you to the home page. 
The second component is the search bar. You can search by animal name or breed just to make the search easier.
The third component is made out of two different pages. In one page there are random cute pictures of cats and the other one - random cute pictures of dogs
The fourth component is the New Pet button. When clicked it opens a pop up where you can enter the details of the new cat you want to post.

 On the main page there are 3 components:
 1. Dog Facts - were you can read about random dog facts
 2. Cat Facts - were you can read about random cat facts
 3. The animal posts where you can see the image, name, breed, and a short description of the animal.

 The animal post consists of the the pet details and the interactive - like - comment - share section. 
 The Like button turns red when you like the pat and has a white background when you havent liked the pet yet.
 The comments section shows up when you click on the comments button. This section allows you to:
 - post a new comment
 - like the previous comments
 - reply to the previous comments


## Credits

Klajdo Qasolli - https://github.com/KlajdoQ/PawBook

