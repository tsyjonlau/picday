## Picday

Epitech promotion 2018 - Mobile Hybrid Project - Group 2

Members:
- [Benjamin Lépine](https://github.com/benjaminlepine): attented the course
- [Tsy-Jon Lau](https://github.com/tsyjonlau): did not attended the course

Picday needs to create an account to be used. This is possible from the home page.

`![alt-text](https://firebasestorage.googleapis.com/v0/b/picday-39afd.appspot.com/o/screenshots%2FScreenshot_20171104-205654.png?alt=media&token=d2a996d0-634d-4022-99f7-2db3a145a224)

`![alt-text](https://firebasestorage.googleapis.com/v0/b/picday-39afd.appspot.com/o/screenshots%2FScreenshot_20171104-205741.png?alt=media&token=177524d1-00a1-449b-8120-a72e46d16a9b)

Our application displays random images on the main page taken in a Picsum database.
A new set of random pictures is generated if you shake the phone.

`![alt-text](https://firebasestorage.googleapis.com/v0/b/picday-39afd.appspot.com/o/screenshots%2FScreenshot_20171104-210043.png?alt=media&token=7fcf9caf-1ffd-4c0f-980e-2c4d62ae0446)

The user can add them to his personal gallery with the add button.

`![alt-text](https://firebasestorage.googleapis.com/v0/b/picday-39afd.appspot.com/o/screenshots%2FScreenshot_20171104-210120.png?alt=media&token=87d2d6c2-d9ec-4209-94f9-554caf70aaf9)

He can also search for friends via the "search" page and add them. The search is done with the email address
(example : gitlord@epitech.eu)

`![alt-text](https://firebasestorage.googleapis.com/v0/b/picday-39afd.appspot.com/o/screenshots%2FScreenshot_20171104-210111.png?alt=media&token=cd52d991-be37-4358-a973-923023aa9f3f)

They will be visible in the "friends" page. The user can go to the pictures of his friends and add them on his own "gallery" page.

### Back-end

We chose to use Firebase because this suits all our requirements.

- Firebase Authentication: authentication with username and password

- Firebase Realtime Database:

```json
picday: {
  users: {
    user1_uid: {
      email: user1@email.com,
      following: {
        user36_uid: user36@email.com,
        user986_uid: user986@email.com,
        ...
      },
      gallery: {
        image1_id: image1_url,
        image2_id: image2_url,
        ...
      }
    },
    user2_uid: {
      email: user2@email.com,
      following: {
        user1_uid: user1@email.com,
      },
      gallery: {
        image42_id: image42_url,
      }
    },
    ...
  }
}
```

### Native functionalities

- Accelerometer: shake movement dectection which resets the random pictures displayed on the list of random pictures.

- Network: simple disconnection checking with alert window display

### Analytics

[Dashboard Google Analytics](https://analytics.google.com/analytics/web/template?uid=mhVB0u6uTSi4XdS0eNQ1jw)
