var connect = new Mongo("localhost:27017");

var db = connect.getDB("graphichat");
db.dropDatabase();
