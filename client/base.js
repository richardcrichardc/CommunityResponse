import Firebase from 'firebase';

export var root = new Firebase("https://amber-heat-5551.firebaseio.com/");
export var users = root.child('users');
export var streets = root.child('streets');
export var things = root.child('things');