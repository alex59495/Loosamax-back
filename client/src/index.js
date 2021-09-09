import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// CSS
import './scss/index.scss'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

// Internal imports
import App from './components/App';
import reducers from './reducers';

const publicVapidKey = 'BJc1xneLB_KUaF3xNek8v37xk1Fp7n7cbZWh5QOwrR-D1luIQ9UmXbYIyJ60HINpqgdVg8E1EfZZyk8ZXqKi8Lw'; 

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

async function askUserPermission() {
  return await Notification.requestPermission();
}

async function createNotificationSubscription() {
  const serviceWorker = await navigator.serviceWorker.ready;

  return await serviceWorker.pushManager.subscribe({
    userVisibleOnly: true,
    //public vapid key
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
  });
}

async function postSubscription(subscription) {
  console.log(subscription)
  await fetch("/api/subscription", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json"
    }
});
}

if('serviceWorker' in navigator){
  navigator.serviceWorker.register('/service-worker.js');
  askUserPermission().then(async (res) => {
    if (res === "granted") {
      const subscription = await createNotificationSubscription()

      postSubscription(subscription)
    } else {
      alert('Active les notfis, on promet de pas trop temmerder')
    }
  })
}

// Useful to use the Redux extension debugger
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers, 
  composeEnhancers(applyMiddleware(thunk))
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
