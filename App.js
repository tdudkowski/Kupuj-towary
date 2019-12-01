import React, { Component } from "react";
import { Helmet } from "react-helmet";
import "./App.css";

let goodsArray = [
  { key: 0, name: "towar PIERWSZY", price: 0.01, numberAvailable: 111 },
  { key: 1, name: "good SECOND", price: 1, numberAvailable: 131 },
  { key: 2, name: "DRITTEN Ware", price: 10, numberAvailable: 100 },
  { key: 3, name: "QUATRIÈME marchandise", price: 9.99, numberAvailable: 90 }
];

let exchangeRates = [
  { key: 0, name: "pln", ratio: 1 },
  { key: 1, name: "euro", ratio: 0.23 },
  { key: 2, name: "dolar", ratio: 0.26 }
];

let numberArray = new Array(goodsArray.length).fill(0);
let costArray = new Array(goodsArray.length).fill(0);
// let costArrayExchange = new Array(goodsArray.length).fill(1);
let receiptArray = [];
let limitActualValue = 0;
let ratio = 1;
let prices2ShowArray = [];
for (let i = 0; i < goodsArray.length; i++) {
  prices2ShowArray.push(goodsArray[i].price);
}
// let cost2ShowArray = [];
let cost2ShowArray = new Array(goodsArray.length).fill(0);

const Exchange = props => {
  console.log(props);
  return (
    <>
      <h3>Exchange</h3>
      <p>Choose corrency</p>
      <form action="">
        <label htmlFor="">
          PLN{" "}
          <input
            type="radio"
            name="currency"
            checked={props.checked && "checked"}
            //
            onChange={() => props.handleExchange("pln")}
          />{" "}
          <br />
        </label>
        <label htmlFor="">
          Euro{" "}
          <input
            type="radio"
            name="currency"
            // checked={props.checked}
            onChange={() => props.handleExchange("euro")}
          />{" "}
          <br />
        </label>
        <label htmlFor="">
          US Dollar{" "}
          <input
            type="radio"
            name="currency"
            // checked={props.checked}
            onChange={() => props.handleExchange("dolar")}
          />
        </label>
      </form>
    </>
  );
};

const Cashier = props => {
  return (
    <>
      <h3>Cashier</h3>
      <ul>
        {goodsArray.map(t =>
          props.numberInCart[t.key] > 0 ? (
            <li key={t.key}>
              {t.name}: {props.numberInCart[t.key]} pcs, for {props.cost[t.key]}
            </li>
          ) : null
        )}
      </ul>
      <p>Sum total: {props.sumTotal}</p>
      <button
        onClick={() => props.handleBuy()}
        className={!props.sumTotal ? "disabled" : undefined}
      >
        Kupuj / Buy / Kaufen / Acheter
      </button>
    </>
  );
};

const Wallet = props => {
  return (
    <>
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
  console.log("Order " + props.orderValue, props.orderValueIC);
  return (
    <>
      <h3>Your order:</h3>
      <ul>
        {receiptArray.map(t => (
          <li key={t.key}>
            {t.name}; {t.number} pcs, for {t.cost}{" "}
            {t.cost !== t.costIC ? "(" + t.costIC + ")" : null}
          </li>
        ))}
      </ul>
      <p>
        Sum total: {props.orderValue}{" "}
        {props.orderValue == props.orderValueIC
          ? null
          : "(" + props.orderValueIC + ")"}
      </p>
      <strong>Thank you!</strong>
    </>
  );
};

// const Helmet = () => {
//   return (
//     <>
//     </>
//   );
// };

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
            for total: {props.cost[key]}
          </p>
        </div>
        <div>
          <button
            onClick={() => props.handleGood(key, "minus")}
            className={props.numberInCart[key] === 0 ? "disabled" : undefined}
          >
            {" "}
            -{" "}
          </button>
          <button
            onClick={() => props.handleGood(key, "plus")}
            className={
              numberAvailable - props.numberInCart[key] === 0
                ? "disabled"
                : undefined
            }
          >
            {" "}
            +{" "}
          </button>
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
      <div className="price">
        <p>Price: {price}</p>
        <p>Price for currency of choice: {props.price[key]}</p>
      </div>
      {/* <div className="price">Price: {costArrayExchange[key]}</div> */}
      <CartWidget
        props={key}
        numberAvailable={{ numberAvailable }}
        numberInCart={props.numberInCart}
        cost={props.cost}
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
            price={props.price}
            numberInCart={props.numberInCart}
            cost={props.cost}
            handleGood={props.handleGood}
          />
        ))}
      </div>
      <div className="cart">
        <div>
          <Exchange
            checked={props.checked}
            handleExchange={props.handleExchange}
          />
        </div>
        <hr />
        <div>
          <Cashier
            numberInCart={props.numberInCart}
            cost={props.cost}
            sumTotal={props.sumTotal}
            handleBuy={props.handleBuy}
          />
        </div>{" "}
        <hr />
        <div>
          <Wallet
            limit={props.limit}
            sumTotal={props.sumTotal}
            limitActual={props.limitActual}
          />
        </div>
        {props.order && (
          <>
            <hr />
            <div>
              <Order
                bill={props.bill}
                orderValue={props.orderValue}
                orderValueIC={props.orderValueIC}
              />
            </div>
          </>
        )}
      </div>
    </main>
  );
};

class App extends Component {
  state = {
    limit: 100,
    limitActual: limitActualValue,
    limit2Show: 0,
    limitActual2Show: 0,
    numberInCart: numberArray,
    bill: costArray,
    prices2Show: prices2ShowArray,
    cost2Show: cost2ShowArray,
    sumTotal: 0,
    dumTotal2Show: 0,
    order: false,
    orderValue: 0,
    orderValueIC: 0,
    checked: true,
    currency: "pln"
  };

  handleExchange = currency => {
    let c = exchangeRates.filter(c => c.name === currency);
    ratio = c[0].ratio;
    this.updateCost2ShowArray();
    this.makeSumTotal();
    this.makeArray2Show();
    prices2ShowArray = [];
    for (let i = 0; i < goodsArray.length; i++) {
      let currencyPrice = parseFloat((goodsArray[i].price * ratio).toFixed(4));
      prices2ShowArray.push(currencyPrice);
    }
    this.setState({
      prices2Show: prices2ShowArray,
      cost2Show: cost2ShowArray,
      checked: false
    });
    if (currency === "pln") this.setState({ checked: true });
    console.log("w funkcji handleExchange " + ratio);
    return ratio;
  };

  cutTail = number => {
    if (number.toString().indexOf(".") > 0) {
      return number.toString().substr(number.toString().indexOf(".") + 1, 4);
    } else {
      return "0";
    }
  };

  mathMachine = (x, y, operator) => {
    let xBefore = Math.floor(x);
    let xAfter = this.cutTail(x);
    let yBefore = Math.floor(y);
    let yAfter = this.cutTail(y);

    let sumBefore;
    let sumAfter;
    let sumInArticle;

    switch (operator) {
      case "plus":
        sumBefore = xBefore + yBefore;
        if (xAfter.length === 1) {
          xAfter *= 10;
        }
        sumAfter = (parseInt(xAfter) + parseInt(yAfter)) / 100;
        sumInArticle = sumBefore + sumAfter;
        console.log("w mathMachinie PLUS " + xAfter, yAfter, sumAfter);
        return sumInArticle;
      case "minus":
        sumBefore = xBefore - yBefore;
        if (xAfter.length === 1) {
          xAfter *= 10;
        }
        sumAfter = (parseInt(xAfter) - parseInt(yAfter)) / 100;
        console.log("w mathmachinie MINUS " + xAfter, yAfter, sumAfter);
        sumInArticle = sumBefore + sumAfter;
        return sumInArticle;
      case "multiplication":
        console.log(
          "w mathmachinie MULTIPLICATION " + xBefore,
          xAfter,
          yBefore,
          yAfter,
          x,
          y,
          operator,
          ratio
        );
        sumBefore = xBefore * y;
        sumAfter = (xAfter * y) / 10;
        console.log("INTER " + sumBefore, sumAfter);
        // sumInArticle = this.mathMachine(sumBefore, sumAfter, "plus");
        sumInArticle = sumBefore + sumAfter;
        // sumInArticle = (x * y).toFixed(3);
        return sumInArticle;
      default:
        console.log("WTF " + x, y, operator);
    }
  };

  updateCost2ShowArray = () => {
    cost2ShowArray = [];
    for (let i = 0; i < goodsArray.length; i++) {
      let newCost = parseFloat((this.state.bill[i] * ratio).toFixed(4));
      cost2ShowArray.push(newCost);
    }
  };

  makeArray2Show = () => {
    this.updateCost2ShowArray();

    this.setState(prevState => ({
      sumTotal2Show: parseFloat((prevState.sumTotal * ratio).toFixed(4)),
      limit2Show: parseFloat((prevState.limit * ratio).toFixed(4)),
      limitActual2Show: parseFloat((prevState.limitActual * ratio).toFixed(4)),
      prices2Show: prices2ShowArray,
      cost2Show: cost2ShowArray
    }));
    console.log(this.state.sumTotal2Show);
    // this.makeSumTotal();
  };

  makeSumTotal = () => {
    this.updateCost2ShowArray();
    let sumTotal = this.state.bill.reduce((total, num) => {
      return total + num;
    });
    sumTotal = sumTotal.toFixed(2);
    if (sumTotal == 0.0) {
      sumTotal = parseInt(0);
    }
    this.setState({
      sumTotal: sumTotal
    });
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

    this.setState({
      numberInCart: this.state.numberInCart,
      bill: costArray
    });
    this.makeSumTotal();
    this.makeArray2Show();
    this.makeNewLimit();
  };

  makeReceipt = () => {
    console.log("cost2ShowArray " + cost2ShowArray);
    receiptArray = [];
    for (let i = 0; i < goodsArray.length; i++) {
      if (this.state.numberInCart[i] > 0) {
        receiptArray.push({
          key: i,
          name: goodsArray[i].name,
          number: this.state.numberInCart[i],
          cost: this.state.bill[i],
          // costIC: this.state.bill[i]
          costIC: this.state.cost2Show[i]
        });
      }
      this.setState({
        orderValue: this.state.sumTotal,
        orderValueIC: this.state.sumTotal2Show
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
        sumTotal: 0,
        sumTotal2Show: 0
      });
      this.makeReceipt();
    } else {
      return;
    }
  };

  render() {
    return (
      <>
        <Helmet>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <meta
            property="og:url"
            content="https://tdudkowski.github.io/Kupuj-towary/"
          />
          <meta property="og:type" content="application" />
          <meta
            property="og:title"
            content="Kupuj towary try your Black Friday experience"
          />
          <meta
            property="og:description"
            content="my first React app - data flow and structuring components"
          />
          <meta
            property="og:image"
            content="https://tdudkowski.github.io/Kupuj-towary/kupujtowary.jpg"
          />
          <meta name="twitter:card" content="app" />
          <meta name="twitter:site" content="@tdudkowski" />
          <meta name="twitter:creator" content="@tdudkowski" />
          <title>Kupuj towary try your Black Friday experience</title>
        </Helmet>
        <div className="container">
          <Header />
          <Main
            numberInCart={this.state.numberInCart}
            price={this.state.prices2Show}
            cost={this.state.cost2Show}
            sumTotal={this.state.sumTotal2Show}
            limit={this.state.limit2Show}
            limitActual={this.state.limitActual2Show}
            // limit={parseFloat((this.state.limit * ratio).toFixed(2))}
            // limitActual={parseFloat(
            //   (this.state.limitActual * ratio).toFixed(2)
            // )}
            order={this.state.order}
            orderValue={this.state.orderValue}
            orderValueIC={this.state.orderValueIC}
            checked={this.state.checked}
            handleExchange={this.handleExchange}
            handleGood={this.handleGood}
            handleBuy={this.handleBuy}
          />
        </div>
      </>
    );
  }
}

export default App;
