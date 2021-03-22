import logo from "../img/famlyTreeLogo.png"
import { ReactComponent as Home} from "../img/home.svg"
import { ReactComponent as Bell} from "../img/bell.svg"
import { ReactComponent as User} from "../img/user.svg"


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

export const genderObj = [
    {
        'name': 'Male',
        'value': 'male'
    },
    {
        'name': 'Female',
        'value': 'female'
    },
    {
        'name': 'Other',
        'value': 'other'
    }
]

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

export const colors = {
    bgColor: "#292c35",
    primaryTextColor: "#f9f9fb",
    primaryColor: "#0654f4",
    secondaryColor: "#f63c3d",
    black: "#121212"
}

export const img = {
    logo: logo,
    home: Home,
    bell: Bell,
    user: User
}

export const localUserId = localStorage.getItem('userId');