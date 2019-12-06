# Kupuj-towary

My first React application. Shop simulacra. Add and remove goods to your shopping cart, follow cost of purchase, and stock available, see budget overruns. Beware. Black Friday is coming.

In this version, removed funny math errors, added the currency calculator, removed funny math errors, added translations (much simpler than i18n), removed funny math errors, add changing stylesheets, and of course removed funny math errors (again, many of them). Here we are.

Finally I've made SPA with React Router, and now it's nice page instead of simple document. And added fetch of data for currency values

In every progress code is becoming harder to understand, time to make modules, and some comments.

## Features

For now main features are:

- Shop simulation, in real time one can see all expenses for one good, and expenses in total, numbers stuff bought, and how many is still available at the moment (and total in stock), limit is presented in original and actual numbers.
- After buying complete information on order done is presented. List of goods bought, their number and cost, at the end of receipt of course total cost.
- User can see actual limit updated after every purchase, the information is explicitly on overdrawn if limit is exceeded.
- Number of stuff in stock is updated after every purchase done.
- There're other currencies to choose than PLN (Polish złoty): Euro and US Dollar, the ratio is fetched directly form API delivered by NBP (National Bank of Poland). In any time when currency is changed information of price, and all cost is updated in real time, while buying. When other than PLN currency is chosen on the receipt there are two currencies presented.
- There're four languages available for user, text strips taken by function from JSON, so it's easy to modify text, or add a new language.
- User can change theme: light, dark, and high contrast are available.
- Additionally there is an Admin Page with pseudologin: admin can delete any good, add (giving three values: name, price and number in stock), or restore all goods in original form. Any change done by admin is applied to user page. Reload deletes all changes.
- Admin's list is updated after any change (modify or even purchase), this is actual data.

## TODO

So, the stages to do are:

- refine pseudologin at admin page
- make an engine to change of existing goods for admin mode (maybe keep state of login in a cookie?)
- comments in code
- modules (to some extent this is done)
- remove funny math errors (stopped finding them some time ago)

## Errors found

Known errors - only two, but both are worrying and hard to solve:

- reload at eny other point than / collapsed page into 404, no index.html here.
- no preview in social media (Facebook or Twitter), seems related to CRA inability to serve og meta tags in a way readable for fb and tt crawlers. If so, this is ridiculous.

- [How to add dynamic meta data using React Helmet #1261](https://github.com/facebook/create-react-app/issues/1261)
- [Unable to share react web page on facebook after implement react-helmet #442](https://github.com/nfl/react-helmet/issues/442)
- [facebook/create-react-app - Adding <meta> Tags](https://github.com/facebook/create-react-app/blob/9d9d31eccc1912670d841747b207ca56deb8cbdc/template/README.md#adding-meta-tags)
- [How do I add route-specific <meta> tags to an app generated with Create React App?](https://twitter.com/dan_abramov/status/770966308162863104)
- [How to implement server-side rendering in your React app in three simple steps](https://www.freecodecamp.org/news/server-side-rendering-your-react-app-in-three-simple-steps-7a82b95db82e/)
