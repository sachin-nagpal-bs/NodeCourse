const fs = require('fs');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const readLineAsync = msg => {
  return new Promise(resolve => {
    readline.question(msg, userRes => {
      resolve(userRes);
    });
  });
}

function readFileData(err, json) {
  if (err) {
    console.log("Error :", err);
    return;
  }
  try {
    const dataJson = JSON.parse(json);
    console.log(dataJson);
  } catch (err) {
    return err;
  }
};

function writeFileData(id,name,age, email) {
    const users = require("./test.json");
    let user = {
      id : id,
      name: name,
      age: parseInt(age),
      email: email
    };
    users.push(user);
    fs.writeFile("./test.json", JSON.stringify(users), err => {
      if (err) throw err; 
    console.log("User created !!");
    });
};

function updateFileData(id,name){
  fs.readFile("./test.json", "utf-8", (err, data) => {
    if (err) throw err;
    let arr = JSON.parse(data);
    arr.forEach((element) => {
      if (element.id === id) {
        element.name = name;
      }else{
        console.log('Please enter valid id !!')
      }
    });
    fs.writeFile("./test.json", JSON.stringify(arr), (err) => {
      if (err) throw err;
      console.log('Data updated')
    });
  });
}

function deleteFileData(id){
  fs.readFile("./test.json", "utf-8", (err, data) => {
    if (err) throw err;
    let arr = JSON.parse(data);
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === id) {
        index = i;
        break;
      }
    }
    arr.splice(index, 1);
    fs.writeFile("./test.json", JSON.stringify(arr), (err) => {
      if (err) throw err;
      console.log('Data Deleted')
    });
  });
}

const startApp = async() => {
  const operation = await readLineAsync('Operations : 1.Read 2.Write 3.Update 4.Delete ');
  if(operation == 1){
    fs.readFile("./test.json", "utf8", readFileData);
  }else if(operation == 2){
    const id = await readLineAsync('Please enter ID : ');
    const name = await readLineAsync('Please enter name : ');
    const age = await readLineAsync('Please enter age : ');
    const email = await readLineAsync('Please enter email : ');
    writeFileData(id,name,age,email)
  }else if(operation == 3){
    const id = await readLineAsync('Please enter ID : ');
    const name = await readLineAsync('Please enter name : ');
    updateFileData(id,name)
  }else if(operation == 4){
    const id = await readLineAsync('Please enter ID you want to delete : ');
    deleteFileData(id);
  }else{
    console.log('You have selected wrong operation !!')
  }
}

startApp();