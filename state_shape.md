# (Hackathon Team 9 Project name) State Shape

```js

state = {

  employees: [ // this is an array
    {
      'id': 1,
      'firstName': 'John',
      'lastName': 'Doe',
      'restaurantEmployeeId': '004536',
      'isUploaded': false,
      'foodPermitExp': 'Sun Dec 17 1995 03:24:00 GMT...',
      'alcoholPermitExp': 'Sun Dec 17 1995 03:24:00 GMT...',
      'roles': [ // this is an array
        {
          'role': 'server'
        },
        ...
      ]
    },
    ...
  ],

  roles: [
    {
      'id': 1,
      'role': 'server',
      'description': 'Brings food to tables'
    },
    ...
  ],

  checkouts: [
    {
      'id': 1,
      'netSales': 234.35,
      'cashOwed': 75.60,
      'employeeId': 1,
      'totalTipout': 35,
      'isAMShift': true,
      'isPatio': false, 
      'tipOutDay': 'Sun Jul 16 1995'
    },
    ...
  ],

  employeeClockIns: [
    {
      'id': 1,
      'employeeId": 1,
      'timeIn': 'Mon July 17 1995 07:45:00 GMT...',
      'timeOut': null,
      'activeRole': 'server',
      'isUploaded': false
    },
    ...
  ],

  tipoutFormulas: [
    {
      'id': 1,
      'isAMFormula': true,
      'formulaName': 'example',
      'formula': 'mx + b',
      'role': 'server',
      'isUploaded': false,
      'tipoutVariables': [
        {
          'id': 1
          'variable': 'm'
        },
        ...
      ]
    },
    ...
  ],

  theme: {
     'currentTheme': 'day'
  },

}

```
