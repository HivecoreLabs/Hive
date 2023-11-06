# Hive

## Project Description

Hive is a desktop resturant management application. Hive is made to solve disorganized and error prone data management for locally owned restaurants.

## Technologies/Frameworks Used

- [Electron](https://www.electronjs.org/)

- [React](https://reactjs.org/)

- [MatrialUI](https://mui.com/material-ui/)

- [Django](https://www.django-rest-framework.org/)

- [SQLite3](https://www.sqlite.org/index.html)

- [Google Developer Console and Sheets API](https://console.cloud.google.com/apis/)

## MVP Core Features

- Employee

  - Add employees with roles (admin/server/buser)

  - Read list of all employees and their roles

  - Edit employee details

- Checkouts

  - Log net sales and cash owed for specific day, shift, and server

  - View a list of all daily checkouts for specific day or shift

  - View list of all checkouts in a given pay period, organized by day and shift

  - Edit net sales and cash owed for a specific day, shift, and server

  - Delete a daily checkout for a specific day, shift, and server

- Daily Support Staff Time In/Out

  - Log the clock-in time for a support staff member for a specific day and shift

  - Log the clock-out time for a support staff for a specific day and shift

  - Edit the clock-in and clock-out times for a support staff member ofr a specific day and shift

  - Delete the clock-in and clock-out times for a support staff member for a specific day and shift

- Toggle View by Day/Shift

  - Toggle the view to display support staff for a specific day

  - Toggle the view to display support staff for a specific shift

## Screenshots


![hive_demo](https://github.com/aA-Hackathon-Team-9/hackathon_team9/assets/109548330/e435ba0f-fe13-4b03-a46c-791402758b31)


## Future Implementation Goals

- Tip-Out Formulas

  - Add new tip-out formula

  - View a list of all tip-out formulas

  - Edit the tip-out formula

  - Delete the tip-out formula

- Customizable dashboard

  - User will be able to customize their dashboard elements

- Add front end test using Jest

- Convert front end components into TypeScript

- Add a viewer client

  - Other clients will be able to read from the synched database simultaneously

## Getting Started

### Run Django API Locally

- Ensure you have Python version 3.9
- cd into the backend directory from the root of the application
- Install the required dependecies from requirements.txt
- Example using pipenv Python virtual environment management tool, learn more [here](https://pipenv.pypa.io/en/latest/)

```
pipenv install -r requirements.txt
```

- Run the following to initialize a local SQLite3 database:

```
python manage.py migrate
```

- To start the Django server, run the following command from within /backend/

```
python manage.py runserver
```

### Running Electron

- cd into frontend directory

- Install node dependencies

```
npm install
```

- Start application

```
npm start
```

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## Contact

- Nick Arakaki - [Github](https://github.com/NickArakaki)

- Brandon Choi - [Github](https://github.com/bchoi28)

- Steven Taylor Cornwall - [Github](https://github.com/taylorcornwall766)

- Nygil Nettles - [Github](https://github.com/NygilNet)

## Fonts/Themes

[Open Sans](https://fonts.google.com/specimen/Open+Sans)

[Work Sans](https://fonts.google.com/specimen/Work+Sans)

Helvetica
