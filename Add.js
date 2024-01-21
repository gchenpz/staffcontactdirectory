import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  View,
} from "react-native";
import { Button } from "react-native-web";

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isAdded, setIsAdded] = useState(false);

  const [bk, setBk] = useState({
    name: "",
    category: "",
    author: "",
  });

  const onChangeName = (value) => {
    setBk({ ...bk, name: value });
  };

  const onChangeCategory = (value) => {
    setBk({ ...bk, category: value });
  };

  const onChangeAuthor = (value) => {
    setBk({ ...bk, author: value });
  };

  const clsBkTxtBoxes = () => {
    //setBk({ ...bk, name: "", category: "", author: "" });
    bk.name = "";
    bk.category = "";
    bk.author = "";
  };

  const addBook = () => {
    let bkInfo = `name=${bk.name}&category=${bk.category}&author=${bk.author}`;

    fetch("http://10.0.0.5:44350/helloworldWebService1.asmx/AddBook", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: bkInfo,
    })
      .then((responseData) => {
        setIsAdded(true);
        clsBkTxtBoxes();
        console.log("Done");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <TextInput
        placeholder="Name"
        value={bk.name}
        onChangeText={(value) => onChangeName(value)}
      />
      <TextInput
        placeholder="Category"
        value={bk.category}
        onChangeText={(value) => onChangeCategory(value)}
      />
      <TextInput
        placeholder="Author"
        value={bk.author}
        onChangeText={(value) => onChangeAuthor(value)}
      />
      <Button title="Add a book" onPress={addBook}></Button>
      <Text>{isAdded ? "The book is added" : ""}</Text>
    </View>
  );
};

export default App;
