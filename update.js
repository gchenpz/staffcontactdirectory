import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-web";

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [bkId, setBkId] = useState("");

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

  const onChangeBkID = (value) => {
    setBkId(value);
  };

  const clsBkTxtBoxes = () => {
    //setBk({ ...bk, name: "", category: "", author: "" });
    bk.name = "";
    bk.category = "";
    bk.author = "";
  };

  const updateBook = () => {
    let bkInfo = `id=${bkId}&name=${bk.name}&category=${bk.category}&author=${bk.author}`;

    fetch("http://localhost:44350/helloworldWebService1.asmx/UpdateBook", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: bkInfo,
    })
      .then((responseData) => {
        setIsUpdated(true);
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
        placeholder="Id"
        value={bkId}
        onChangeText={(value) => onChangeBkID(value)}
      />
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
      <TouchableOpacity onPress={updateBook}>
        <Text>Update a book</Text>
      </TouchableOpacity>
      <Text>{setIsUpdated ? "The book is updated" : ""}</Text>
    </View>
  );
};

export default App;
