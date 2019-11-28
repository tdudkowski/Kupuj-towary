import React, { Component } from "react";
import "./App.css";

let goodsArray = [
  { key: 0, name: "towar PIERWSZY", price: 3.99, numberAvailable: 111 },
  { key: 1, name: "good SECOND", price: 6.66, numberAvailable: 131 },
  { key: 2, name: "DRITTEN Ware", price: 8.2, numberAvailable: 100 },
  { key: 3, name: "QUATRIÈME marchandise", price: 9.99, numberAvailable: 9 }
];

let numberArray = new Array(goodsArray.length).fill(0);
let costArray = new Array(goodsArray.length).fill(0);
let receiptArray = [];
let limitActualValue = 0;

const Cashier = props => {
  return (
    <>
      <h3>Cashier</h3>
      <ul>
        {goodsArray.map(t =>
          props.numberInCart[t.key] > 0 ? (
            <li key={t.key}>
              {t.name}: {props.numberInCart[t.key]} pcs, for {props.bill[t.key]}
            </li>
          ) : null
        )}
      </ul>
      <p>Sum total: {props.sumTotal}</p>
      <button onClick={() => props.handleBuy()}>
        Kupuj / Buy / Kaufen / Acheter
      </button>
    </>
  );
};

const Wallet = props => {
  return (
    <>
      <hr />
      <h3>Wallet</h3>
      <p>
        {props.limit > 0
          ? `Limit in wallet: ${props.limit}`
          : `Limit already exceeded by: ${Math.abs(props.limit)}`}
      </p>
      <p>
        {props.limitActual > 0
          ? `Currently in the wallet: ${props.limitActual}`
          : `Currently over budget: ${Math.abs(props.limitActual)}`}
      </p>
    </>
  );
};

const Order = props => {
  return (
    <>
      <hr />
      <h3>Your order:</h3>
      <ul>
        {receiptArray.map(t => (
          <li key={t.key}>
            {t.name}; {t.number} pcs, for {t.cost}
          </li>
        ))}
      </ul>
      <p>Sum total: {props.orderValue}</p>
      <strong>Thank you!</strong>
    </>
  );
};

const Header = () => {
  return (
    <header>
      <h3>Black Friday application - what it does?</h3>
      <ul>
        <li>
          Stimulate your happiness by simulacring ecstasy of getting new better
          and best goods. Buying makes people happy.
        </li>
        <li>
          One can add (and remove if wants) more new goods. Every good is good.
        </li>
        <li>
          Stock info is updated immediately after purchase. Additionally
          information about current capacity of purchase is provided
        </li>
        <li>
          Budget limit is displayed, current and total. You can track overruns,
          no warnings just info.
        </li>
        <li>
          Prices, prices everywhere. Of a good, for one piece, all you are
          buyimg, total sum of purchase, actual and the previous one.
        </li>
        <li>
          Complete list of good: being purchased now, and in the previous
          purchase.
        </li>
        <li>
          Application is in progress, new functions, and features are on the way
          - this is my very first React application, so it's gonna grow till be
          useful in learning this framework.
        </li>
      </ul>
      <h1>Kupuj towary! Waren kaufen! Buy Goods! Acheter des biens !</h1>
    </header>
  );
};

const CartWidget = props => {
  const { numberAvailable } = props.numberAvailable;
  const key = props.props;
  return (
    <div className="cartwidget">
      <div>
        <h4>Availability</h4>
        <p>Yet to buy: {numberAvailable - props.numberInCart[key]} pcs</p>
        <p>In stock: {numberAvailable} pcs</p>
      </div>
      <div>
        <div>
          <h4>Widget nr {key}</h4>
          <p>
            Pcs in the cart: {props.numberInCart[key]},
            <br />
            for total: {props.bill[key]}
          </p>
        </div>
        <div>
          <button onClick={() => props.handleGood(key, "minus")}> - </button>
          <button onClick={() => props.handleGood(key, "plus")}> + </button>
        </div>
      </div>
    </div>
  );
};

const Good = props => {
  const { key, name, price, numberAvailable } = props.data;
  return (
    <div className="good">
      <h3>{name}</h3>
      <div className="price">Price: {price}</div>
      <CartWidget
        props={key}
        numberAvailable={{ numberAvailable }}
        numberInCart={props.numberInCart}
        bill={props.bill}
        handleGood={props.handleGood}
      />
    </div>
  );
};

const Main = props => {
  return (
    <main>
      <div className="list">
        {goodsArray.map(t => (
          <Good
            key={t.key}
            data={t}
            numberInCart={props.numberInCart}
            bill={props.bill}
            handleGood={props.handleGood}
          />
        ))}
      </div>
      <div className="cart">
        <Cashier
          numberInCart={props.numberInCart}
          bill={props.bill}
          sumTotal={props.sumTotal}
          handleBuy={props.handleBuy}
        />
        <Wallet
          limit={props.limit}
          sumTotal={props.sumTotal}
          limitActual={props.limitActual}
        />
        {props.order && (
          <Order bill={props.bill} orderValue={props.orderValue} />
        )}
      </div>
    </main>
  );
};

class App extends Component {
  state = {
    limit: 100,
    limitActual: limitActualValue,
    numberInCart: numberArray,
    bill: costArray,
    sumTotal: 0,
    order: false,
    orderValue: 0
  };

  mathMachine = (x, y, operator) => {
    let xBefore = Math.floor(x);
    let xAfter =
      x.toString().indexOf(".") > 0
        ? x.toString().substr(x.toString().indexOf(".") + 1, 2)
        : "0";
    let yBefore = Math.floor(y);
    let yAfter =
      y.toString().indexOf(".") > 0
        ? y.toString().substr(y.toString().indexOf(".") + 1, 2)
        : "0";

    if (operator === "plus") {
      let sumBefore = xBefore + yBefore;
      if (xAfter.length === 1) {
        xAfter *= 10;
      }
      let sumAfter = (parseInt(xAfter) + parseInt(yAfter)) / 100;
      let sumInArticle = sumBefore + sumAfter;
      return sumInArticle;
    }

    if (operator === "minus") {
      let sumBefore = xBefore - yBefore;
      if (xAfter.length === 1) {
        xAfter *= 10;
      }
      let sumAfter = (parseInt(xAfter) - parseInt(yAfter)) / 100;
      let sumInArticle = sumBefore + sumAfter;
      return sumInArticle;
    }
  };

  makeNewLimit = () => {
    this.setState(prevState => ({
      limitActual: this.mathMachine(
        prevState.limit,
        prevState.sumTotal,
        "minus"
      ).toFixed(2)
    }));
  };

  handleGood = (key, operator) => {
    if (
      operator === "plus" &&
      this.state.numberInCart[key] < goodsArray[key].numberAvailable
    ) {
      this.state.numberInCart[key] += 1;
    } else if (operator === "minus" && this.state.numberInCart[key] > 0) {
      this.state.numberInCart[key] -= 1;
    } else {
      return;
    }

    costArray[key] = this.mathMachine(
      costArray[key],
      goodsArray[key].price,
      operator
    );

    const sumTotal = this.state.bill.reduce((total, num) => {
      return total + num;
    });

    this.setState({
      numberInCart: this.state.numberInCart,
      bill: costArray,
      sumTotal: sumTotal.toFixed(2)
    });
    this.makeNewLimit();
  };

  makeReceipt = () => {
    receiptArray = [];
    for (let i = 0; i < goodsArray.length; i++) {
      if (this.state.numberInCart[i] > 0) {
        receiptArray.push({
          key: i,
          name: goodsArray[i].name,
          number: this.state.numberInCart[i],
          cost: this.state.bill[i]
        });
      }
      this.setState({
        orderValue: this.state.sumTotal
      });
    }
  };

  handleBuy = () => {
    if (this.state.sumTotal > 0) {
      goodsArray.map(t => {
        goodsArray[t.key].numberAvailable -= numberArray[t.key];
      });
      costArray = new Array(goodsArray.length).fill(0);
      numberArray = new Array(goodsArray.length).fill(0);

      let newLimit = this.mathMachine(
        this.state.limit,
        this.state.sumTotal,
        "minus"
      );

      this.setState({
        limit: newLimit,
        newLimit: this.state.limit,
        order: true,
        numberInCart: numberArray,
        bill: costArray,
        sumTotal: 0
      });
      this.makeReceipt();
    } else {
      return;
    }
  };

  render() {
    return (
      <div className="container">
        <Header />
        <Main
          numberInCart={this.state.numberInCart}
          bill={this.state.bill}
          sumTotal={this.state.sumTotal}
          limit={this.state.limit}
          limitActual={this.state.limitActual}
          order={this.state.order}
          orderValue={this.state.orderValue}
          handleGood={this.handleGood}
          handleBuy={this.handleBuy}
        />
      </div>
    );
  }
}

export default App;
