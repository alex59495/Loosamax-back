const app = require('./app');
const express = require('express');

// if(process.env.NODE_ENV === 'production') {
//   // Express will serve up production assets like main.css or main.js
//   app.use(express.static('client/build'));
//   // Express will serve up index.html file if it doesn't recognize the route
//   const path = require('path');
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }

const PORT = process.env.PORT || 5000
app.listen(PORT);