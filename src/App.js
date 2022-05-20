import AddItem from "./components/AddItemForm/AddItem";
import ListItems from "./components/ListItems/ListItems";
import ItemsContext from "./ItemsContext";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/items")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const fetchData = () => {
    fetch("http://localhost:5000/items")
      .then((response) => response.json())
      .then((data) => setData(data));
    console.log(data);
  };

  const addData = (data) => {
    fetch("http://localhost:5000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: uuidv4(),
        name: data.name,
        email: data.email,
        age: data.age,
      }),
    }).then(() => fetchData());
  };

  const removeData = (item) => {
    fetch(`http://localhost:5000/items/${item.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => fetchData());
  };

  const editData = (item) => {
    fetch(`http://localhost:5000/items/${item.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: item.name,
        email: item.email,
        age: item.age,
      }),
    }).then(() => fetchData());
  };

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data, setData]);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data, setData]);

  return (
    <ItemsContext.Provider value={{ data, addData, removeData, editData }}>
      <AddItem onSubmit={addData} />
      <ListItems />
    </ItemsContext.Provider>
  );
}

export default App;
