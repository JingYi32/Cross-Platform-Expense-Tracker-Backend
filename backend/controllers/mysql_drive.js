import { createConnection } from 'mysql';

var con = createConnection({
  host: "localhost",
  user: "root",
  password: "Venus-08042"
});


function ConnectTodatabase() {
    con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    });
}

export default {
    ConnectTodatabase,
}