export const gender = {
    'male': {
        'name': 'Male',
        'color': 'purple'
    },
    'female': {
        'name': 'Female',
        'color': 'deeppink'
    },
    'other': {
        'name': 'Other',
        'color': 'gold'
    }
}

export const defaultUser = {
    "firstName": "loading...",
    "userId": 0,
    "lastName": "loading...",
    "countryCode": 0,
    "mobileNumber": 0,
    "birthDate": 0,
    "age": 0,
    "gender": "male",
    "created": false,
    "added": false,
    "married": false,
    "parent": false
}

export const defaultFamTree = {
    "children": {
    },
    "partner": {
        "id" : 0,
        "mobile": 0 
    },
    "father": {
        "id" : 0,
        "mobile": 0 
    },
    "mother": {
        "id" : 0,
        "mobile": 0 
    }
}

export const userId = localStorage.getItem('userId');