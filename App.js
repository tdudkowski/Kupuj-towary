let goodsArray = [
  { key: 0, name: "towar PIERWSZY", price: 1, numberAvailable: 11 },
  { key: 1, name: "good SECOND", price: 11, numberAvailable: 13 },
  { key: 2, name: "DRITTEN Ware", price: 8.5, numberAvailable: 100 },
  { key: 3, name: "QUATRIÈME marchandise", price: 9.99, numberAvailable: 9 }
];

let numberArray = new Array(goodsArray.length).fill(0);
let costArray = new Array(goodsArray.length).fill(0);
let receiptArray = [];

const Order = props => {
  return (
    <>
      <hr />
      <h3>Your order:</h3>
      <ul>
        {receiptArray.map(t => (
          <li key={t.key}>
            {t.name}; number {t.number}, cost of {t.cost}
          </li>
        ))}
      </ul>
      <p>Sum total {props.sumTotal}</p>
      <strong>Thank you!</strong>
    </>
  );
};

const Cashier = props => {
  return (
    <>
      <h3>Cashier</h3>
      <h4>Order: </h4>

      <ul>
        {goodsArray.map(t =>
          props.numberInCart[t.key] > 0 ? (
            <li key={t.key}>
              {t.name} - {props.numberInCart[t.key]} pcs, for:{" "}
              {props.bill[t.key]}
            </li>
          ) : null
        )}
      </ul>

      <p>Sum Total: {props.sumTotal}</p>
      <button onClick={() => props.handleBuy()}>
        Kupuj / Buy / Kaufen / Acheter
      </button>
    </>
  );
};

const Wallet = props => {
  return (
    <div className="wallet">
      <h3>Wallet</h3>
      <p>
        {props.limit > 0
          ? `Limit in wallet: ${props.limit}`
          : `Limit already exceeded by: ${Math.abs(props.limit)}`}
      </p>
      <p>
        {props.limit - props.sumTotal > 0
          ? `Currently in the wallet: ${Math.round(
              (props.limit - props.sumTotal) * 100
            ) / 100}`
          : `Currently over budget: ${Math.round(
              (Math.abs(props.limit - props.sumTotal) * 100) / 100
            )}`}
      </p>
    </div>
  );
};

const CartWidget = props => {
  const { numberAvailable } = props.numberAvailable;
  const key = props.props;
  return (
    <>
      <div>
        <h4>Availability</h4>
        <p>Yet to buy: {numberAvailable - props.numberInCart[key]} sztuk</p>
        <p>In stock: {numberAvailable} sztuk</p>
      </div>
      <div>
        <h4>Widget nr {props.props}</h4>
        <p>
          Pcs in the cart: {props.numberInCart[key]},<br />
          for total: {props.numberInCart[key] * props.price.price}
        </p>
        <button onClick={() => props.handleGoodLess(key)}> - </button>
        <button onClick={() => props.handleGoodMore(key)}> + </button>
      </div>
    </>
  );
};

const Good = props => {
  const { key, name, price, numberAvailable } = props.data;
  return (
    <div className="good">
      <h3>{name}</h3>
      <div>Price: {price}</div>
      <CartWidget
        numberAvailable={{ numberAvailable }}
        props={key}
        price={{ price }}
        numberInCart={props.numberInCart}
        handleGoodMore={props.handleGoodMore}
        handleGoodLess={props.handleGoodLess}
      />
    </div>
  );
};

class Zero extends React.Component {
  state = {
    limit: 100,
    numberInCart: numberArray,
    bill: costArray,
    sumTotal: 0,
    order: false,
    receiptSum: 0
  };

  handleGoodMore = key => {
    if (
      this.state.numberInCart[key] < goodsArray[key].numberAvailable &&
      goodsArray[key].numberAvailable > 0
    ) {
      this.state.numberInCart[key] += 1;
      this.setState({ numberInCart: this.state.numberInCart });
      this.handleNumberPlus(key);
    }
  };

  handleGoodLess = key => {
    if (this.state.numberInCart[key] > 0) {
      this.state.numberInCart[key] -= 1;
      this.setState({ numberInCart: this.state.numberInCart });
      this.handleNumberMinus(key);
    }
  };

  handleNumberPlus = key => {
    goodsArray.map(t => {
      if (key === t.key) {
        costArray[key] = costArray[key] + goodsArray[key].price;
        costArray[key] = Math.round(costArray[key] * 100) / 100;
      }
    });
    this.makeSum();
  };

  // https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary

  handleNumberMinus = key => {
    goodsArray.map(t => {
      if (key === t.key) {
        costArray[key] -= goodsArray[key].price;
        costArray[key] = Math.round(costArray[key] * 100) / 100;
      }
    });
    this.makeSum();
  };

  updateStorage = () => {
    return goodsArray.map(t => {
      goodsArray[t.key].numberAvailable -= numberArray[t.key];
    });
  };

  makeSum = () => {
    const sumTotal = this.state.bill.reduce((total, num) => {
      return total + num;
    });
    this.sumTotal = Math.round((sumTotal + 0.00001) * 100) / 100;
    this.setState({
      sumTotal: sumTotal.toFixed(2)
    });
    // return sumTotal; (num + 0.00001)
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
    }

    this.setState({
      order: true,
      receiptSum: this.state.sumTotal
    });
  };

  handleBuy = () => {
    if (this.state.sumTotal > 0) {
      // uaktualnic stany magazynowe
      this.updateStorage();
      // wyzerowac widżety
      costArray = new Array(goodsArray.length).fill(0);
      numberArray = new Array(goodsArray.length).fill(0);
      let newLimit =
        Math.round((this.state.limit - this.state.sumTotal) * 100) / 100;
      this.setState({
        order: true,
        numberInCart: numberArray,
        bill: costArray,
        sumTotal: 0,
        // uaktualnic budzet
        limit: newLimit
      });
      // stworzyć rachunek
      this.makeReceipt();
    } else {
      null;
    }
  };

  render() {
    return (
      <div className="container">
        <h3>Black Friday application - what it does?</h3>
        <ul>
          <li>
            Stimulate your happiness by simulacring ecstasy of getting new
            better and best goods. Buying makes people happy.
          </li>
          <li>
            One can add (and remove if wants) more new goods. Every good is
            good.
          </li>
          <li>
            Stock info is updated immediately after purchase. Additionally
            information about current capacity of purchase is provided
          </li>
          <li>
            Budget limit is displayed, current and total. You can track
            overruns, no warnings just info.
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
            Application is in progress, new functions, and features are on the
            way - this is my very first React application, so it's gonna grow
            till be useful in learning this framework.
          </li>
        </ul>
        <h1>Kupuj towary! Waren kaufen! Buy Goods! Acheter des biens !</h1>
        <div className="list">
          {goodsArray.map(t => (
            <Good
              key={t.key}
              data={t}
              numberInCart={this.state.numberInCart}
              handleGoodMore={this.handleGoodMore}
              handleGoodLess={this.handleGoodLess}
            />
          ))}
        </div>
        <div className="cart">
          <Cashier
            handleBuy={this.handleBuy}
            bill={this.state.bill}
            numberInCart={this.state.numberInCart}
            sumTotal={this.state.sumTotal}
          />
          <hr />
          <Wallet limit={this.state.limit} sumTotal={this.state.sumTotal} />
          {this.state.order && <Order sumTotal={this.state.receiptSum} />}
        </div>
      </div>
    );
  }
}
