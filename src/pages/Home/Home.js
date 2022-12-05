import React, { useState, useEffect } from "react";
import "./Home.css";
function Home() {
  //get data from local storage
  const savedata = () => {
    const savelist = localStorage.getItem("mylist");
    if (savelist) {
      return JSON.parse(savelist);
    } else {
      return [];
    }
  };
  const [inputdata, setInputData] = useState("");
  const [item, setItem] = useState(savedata);
  const [editItem, setEditItem] = useState("");
  const [toggleBtn, SetToggleBtn] = useState(false);

  const addInputHandle = (event) => {
    setInputData(event.target.value);
  };

  //add items in our
  const Additem = () => {
    if (!inputdata) {
      alert("Enter your items..");
    } 
    else if(inputdata && toggleBtn){
    setItem(item.map((curele)=>{
     if(curele.id===editItem){
    return{...curele,name:inputdata};
      }
      return curele;
    }));
    setInputData("");
    setEditItem("");
    SetToggleBtn(false);
    }
    else {
      const newInputData = {
        // create unique id to delete items
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItem([...item, newInputData]);
      setInputData("");
    }
  };
  //delete items from checklist
  const deleteItems = (index) => {
    const updatedItemList = item.filter((ele) => {
      return ele.id !== index;
    });
    setItem(updatedItemList);
  };
  const removeAllItems = () => {
    setItem([]);
  };
  // save data in local storage
  useEffect(() => {
    localStorage.setItem("mylist", JSON.stringify(item));
  }, [item]);

  //Edit items in checklist
  const editItems = (elem) => {
    const editedItem = item.find((curelement) => {
      return curelement.id === elem;
    });
    setInputData(editedItem.name);
    setEditItem(elem);
    SetToggleBtn(true);
  };
  return (
    <>
      <div className="main-container">
        <div className="main-container-in">
          <figure>
            <img
              src="https://www.freeiconspng.com/thumbs/list-icon/to-do-list-icon-buy-this-icon-for--0-48-1.png"
              alt="todoimgage"
            />
            <figcaption>Add Your List Here</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍️Add Item"
              value={inputdata}
              onChange={addInputHandle}
            />
            {toggleBtn ? (
              <i
                className="fa-solid fa-pen-to-square plus success"
                onClick={Additem}
              ></i>
            ) : (
              <i className="fa-solid fa-plus plus" onClick={Additem}></i>
            )}
          </div>
          {item.map((curele) => {
            return (
              <div className="addItems" key={curele.id}>
                <div className="item">
                  <h3>{curele.name}</h3>
                  <div className="dobtn">
                    <i
                      className="fa-solid fa-pen-to-square mr success"
                      onClick={() => editItems(curele.id)}
                    ></i>
                    <i
                      className="fa-solid fa-trash danger"
                      onClick={() => deleteItems(curele.id)}
                    ></i>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="checkbtn">
            <button
              className="btn border-dark fw-bold"
              onClick={removeAllItems}
            >
              Remove All
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
