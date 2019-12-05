# Kupuj-towary

my first React application.

Add and remove goods to your shopping cart, follow cost of purchase, and stock available, see budget overruns.\
Beware. Black Friday is coming.

In this version, removed funny math errors, added the currency calculator, removed funny math errors, added translations (much simpler than i18n), removed funny math errors, add changing stylesheets, and of course removed funny math errors (again, many of them). Here we are.

Finally I've made SPA with React Router, and now it's nice page instead of simple document. 

In every progress code is becoming harder to understand, time to make modules, and some comments.

Next stage will be real fetch of data for currency values.

So, the stages to do are:

- fetch currency values from NBP API
- refine pseudologin at admin page
- make an engine to change of existing wares for admin mode (keep state of login in cookie?)
- comments in code
- modules (to some extend this is done)
- remove funny math errors (stopped finding them some time ago)

Known errors:

- after adding a new item, list on admin page is not updated
- added item when bought is not present on the order list, only in sum total
