import React from "react";
import "./Info.css";

const Imgsrc = () => {
  return (
    <img
      src={require("./kupujtowary.jpg")}
      width="420"
      alt="preview"
      className="preview"
    />
  );
};

const Info = () => {
  return (
    <div className="info">
      <div>
        <h3>Info</h3>
        <ul>
          <li>React App</li>
          <li>React Router</li>
          <li>
            Shop application, one can add goods to the cart, and see expenses.
          </li>
          <li>Easy to track limit, and overdraw in real time.</li>
          <li>
            Many currencies, one can change on the spot, if other than default
            (PLN) is chosen, on the receipt there're two currencies.
          </li>
          <li>RWD</li>
          <li>
            Many languages versions, better (easier) than standard i18n.
            There're text strings got by function from JSON file.
          </li>
          <li>Change styling</li>
          <li>Fetch - exchange ratios JSON from NBP</li>
        </ul>
        <h3>Libs used</h3>
        <ul>
          <li>gh-pages</li>
          <li>Helmet</li>
          <li>React Router</li>
        </ul>
        <h3>Errors known</h3>
        <ul>
          <li>
            Reload at eny other point than / collapsed page into 404, no
            index.html here.
          </li>
          <li>
            No preview in social media (Facebook or Twitter), seems related to
            CRA inability to serve og meta tags in a way readable for fb and tt
            crawlers.
          </li>
        </ul>
        <h3>Faults</h3>
        <ul>
          <li>
            It was built from bottom to the top, without any specific design at
            the beginning, mostly by just adding next features and functions.
          </li>
          <li>This is exercise draft at the process of learning React</li>
          <li>Code is dirty, hard to optimise, or even change</li>
        </ul>
      </div>
      <div>
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
            buying, total sum of purchase, actual and the previous one.
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
        <Imgsrc />
      </div>
    </div>
  );
};

export default Info;
