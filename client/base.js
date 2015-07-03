import Firebase from 'firebase';

export var root = new Firebase("https://amber-heat-5551.firebaseio.com/");
export var users = root.child('users');
