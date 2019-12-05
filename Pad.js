import React from "react";
// import App from "./App.js";
import langjson from "./lang.json";

let txt = new Array(26).fill("");

const handleLanguage = (lang = "en") => {
  txt = [];
  for (let i = 0; i < 27; i++) {
    let thisnumber;
    if (i < 9) {
      thisnumber = "0" + (i + 1);
    } else {
      thisnumber = i + 1;
    }
    txt.push(langjson[lang][thisnumber]);
  }
};

handleLanguage();

const Exchange = props => {
  return (
    <div>
      <h3>{txt[17]}</h3>
      <p>{txt[18]}</p>
      <form action="">
        <label htmlFor="">
          PLN{" "}
          <input
            type="radio"
            name="currency"
            checked={props.checked && "checked"}
            onChange={() => props.handleExchange("pln")}
          />{" "}
          <br />
        </label>
        <label htmlFor="">
          Euro{" "}
          <input
            type="radio"
            name="currency"
            onChange={() => props.handleExchange("euro")}
          />{" "}
          <br />
        </label>
        <label htmlFor="">
          US Dollar{" "}
          <input
            type="radio"
            name="currency"
            onChange={() => props.handleExchange("dolar")}
          />
        </label>
      </form>
    </div>
  );
};

const Language = props => {
  return (
    <div>
      <h3>{txt[19]}</h3>
      <p>{txt[20]}</p>
      <form action="">
        <label htmlFor="">
          Polski
          <input
            type="radio"
            name="language"
            onChange={() => {
              props.handleLanguage("pl");
              handleLanguage("pl");
            }}
          />
        </label>
        <label htmlFor="">
          English
          <input
            type="radio"
            name="language"
            onChange={() => {
              props.handleLanguage("en");
              handleLanguage("en");
            }}
          />
        </label>
        <label htmlFor="">
          Deutsch
          <input
            type="radio"
            name="language"
            onChange={() => {
              props.handleLanguage("de");
              handleLanguage("de");
            }}
          />
        </label>
        <label htmlFor="">
          Francais
          <input
            type="radio"
            name="language"
            onChange={() => {
              props.handleLanguage("fr");
              handleLanguage("fr");
            }}
          />
        </label>
      </form>
    </div>
  );
};

const Style = props => {
  return (
    <div>
      <h3>{txt[21]}</h3>
      <p>{txt[22]}</p>
      <form action="">
        <label htmlFor="">
          {txt[23]}
          <input
            name="style"
            type="radio"
            onChange={() => props.handleStyle("light")}
          />
        </label>
        <label htmlFor="">
          {txt[24]}
          <input
            name="style"
            type="radio"
            onChange={() => props.handleStyle("dark")}
          />
        </label>
        <label htmlFor="">
          {txt[25]}
          <input
            name="style"
            type="radio"
            onChange={() => props.handleStyle("contrast")}
          />
        </label>
      </form>
    </div>
  );
};

const Pad = props => {
  return (
    <div className="pad">
      <Exchange checked={props.checked} handleExchange={props.handleExchange} />
      <Language handleLanguage={props.handleLanguage} />
      <Style handleStyle={props.handleStyle} />
    </div>
  );
};

export default Pad;
