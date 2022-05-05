import AddItem from "./components/AddItemForm/AddItem";
import ListItems from "./components/ListItems/ListItems";
import ItemsContext from "./ItemsContext";
import {useState, useEffect} from 'react';


function App() {
  const [data, setData] = useState(JSON.parse(localStorage.getItem('data')) ?? []);

  const addData = (data) => {
    setData(old => [
      ...old,
      data
    ])
  }

  const removeData = (item) => {
    setData(old => old.filter(e => e !== item))
  }

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(data));
  },[data, setData]);

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(data));
  },[data, setData]);

  return (
    <ItemsContext.Provider value={{data, addData, removeData}}>
    <AddItem className="container"/>
    <ListItems className="container"/>
    </ItemsContext.Provider>
  );
}

export default App;
