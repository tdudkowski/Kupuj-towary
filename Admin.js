import React, { Component } from "react";
import "./Admin.css";

const goodsArrayBackup = [
  { key: 0, name: "towar PIERWSZY", price: 0.01, numberAvailable: 110 },
  { key: 1, name: "good SECOND", price: 1, numberAvailable: 110 },
  { key: 2, name: "DRITTE Ware", price: 10, numberAvailable: 110 },
  { key: 3, name: "QUATRIÈME marchandise", price: 9.09, numberAvailable: 110 }
];

let goodsArray = [
  { key: 0, name: "towar PIERWSZY", price: 0.01, numberAvailable: 110 },
  { key: 1, name: "good SECOND", price: 1, numberAvailable: 109 },
  { key: 2, name: "DRITTE Ware", price: 10, numberAvailable: 108 },
  { key: 3, name: "QUATRIÈME marchandise", price: 9.09, numberAvailable: 107 }
];

let numberArray = new Array(goodsArray.length).fill(0);
let costArray = new Array(goodsArray.length).fill(0);

const GoodRemoveModify = props => {
  return (
    <li>
      Name: {props.data.name}; price: {props.data.price}; number available:{" "}
      {props.data.numberAvailable} -{" "}
      <button onClick={() => props.handleModify(props.data.key)}>Remove</button>
    </li>
  );
};

const AdminPage = props => {
  return (
    <>
      <div className="logged">
        <h3>Admin Page</h3>
        <p>You are logged in!</p>
        <hr />
        <h4>Rules for change or adding</h4>
        <p>Remember</p>
        <ul>
          <li>
            Name of good should be longer than 5 characters (letters or/and
            numbers included)
          </li>
          <li>Price and number must be more than zero</li>
          <li>Number must be natural</li>
        </ul>
        <hr />
        <h4>
          Remove or modify goods - modifying elements and update this list after
          adding new item is still TODO
        </h4>
        <ul className="listOfGoods" id="listOfGoods">
          {props.listOfGoods.map(t => (
            <GoodRemoveModify
              key={t.key}
              data={t}
              listOfGoods={props.listOfGoods}
              handleModify={props.handleModify}
            />
          ))}
        </ul>
        <hr />
        <h4>Add goods</h4>
        <form action="">
          <label htmlFor="">
            Name: <input type="text" name="" id="addName" />
          </label>
          <label htmlFor="">
            Price: <input type="number" name="" id="addPrice" />
          </label>
          <label htmlFor="">
            Number in stock: <input type="number" name="" id="addNumber" />
          </label>
          <input
            type="submit"
            value="ADD GOOD"
            onClick={e => props.handleAddGood(e)}
          />
        </form>
        <hr />
        <h4>Retrieve standard set of goods</h4>
        <p>
          Caution: All goods you've added, and changes you've made will be
          deleted!
        </p>
        <button
          onClick={() => {
            props.handleRetrieve();
          }}
        >
          RETRIEVE
        </button>
      </div>
    </>
  );
};

class Admin extends Component {
  state = {
    passwordOK: false,
    listOfGoods: goodsArray,
    listOfGoodsBackup: goodsArrayBackup
  };

  handleAddGood = e => {
    e.preventDefault();

    const nameAdded = document.getElementById("addName").value;
    let priceAdded = document.getElementById("addPrice").value;
    const numberAdded = document.getElementById("addNumber").value;

    document.getElementById("addName").value = "";
    document.getElementById("addPrice").value = "";
    document.getElementById("addNumber").value = "";

    if (nameAdded.length > 5 && priceAdded > 0 && numberAdded > 0) {
      if (priceAdded.toString().indexOf(".") !== -1) {
        let priceAddedBefore = Math.floor(priceAdded);
        let priceAddedAfter = priceAdded
          .toString()
          .substr(priceAdded.toString().indexOf(".") + 1, 2);
        priceAdded =
          parseInt(priceAddedBefore) + parseInt(priceAddedAfter) / 100;
        if (priceAdded === 0) {
          console.log("price cannot be zero");
          return;
        }
      }
      goodsArray.push({
        key: goodsArray.length,
        name: nameAdded,
        price: priceAdded * 1,
        numberAvailable: parseInt(numberAdded)
      });
      costArray.push(0);
    } else {
      console.log("data are not correct");
    }

    numberArray = new Array(goodsArray.length).fill(0);
  };

  handleRetrieve = () => {
    goodsArray = [...goodsArrayBackup];
    this.setState({
      listOfGoods: goodsArray
    });
  };

  makeThatListAgain = () => {
    for (let i = 0; i < goodsArray.length; i++) {
      goodsArray[i].key = i;
    }
  };

  handleModify = key => {
    const index = goodsArray.findIndex(good => good.key === key);
    goodsArray.splice(index, 1);
    costArray.splice(index, 1);
    numberArray.splice(index, 1);
    this.setState({
      listOfGoods: goodsArray
    });
    this.makeThatListAgain();
  };

  handlePassword = e => {
    e.preventDefault();
    let passwd = document.getElementById("inputPassword");
    let information = document.getElementById("information");
    if (passwd.value === "abc") {
      this.setState({ passwordOK: true });
      document.getElementById("login").className = "hidden";
    } else {
      information.textContent = "correct password is: abc";
    }
    passwd.value = "";
  };

  render() {
    return (
      <>
        <div className="login" id="login">
          {/* <div className="login hidden" id="login"> */}
          <h3>Admin</h3>
          <p>
            Login <br /> <span id="information"></span>
          </p>
          <form>
            <label htmlFor="">
              Password: abc
              <input type="password" id="inputPassword" placeholder="abc" />
              <button onClick={e => this.handlePassword(e)} type="submit">
                Send
              </button>
            </label>
          </form>
        </div>
        {this.state.passwordOK && (
          <AdminPage
            listOfGoods={this.state.listOfGoods}
            handleAddGood={this.handleAddGood}
            handleModify={this.handleModify}
            handleRetrieve={this.handleRetrieve}
          />
        )}
      </>
    );
  }
}

export { goodsArray, numberArray, costArray };
export default Admin;
