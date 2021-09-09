import getDeviceType from './utils/getDevise'
import Swal from 'sweetalert2';
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

const askForSubscription = (user) => {
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/service-worker.js');
    askUserPermission().then(async (res) => {
      if (res === "granted") {
        const subscription = await createNotificationSubscription()
        // On check si le user a déjà une souscription qui correspond à ce qu'il demande actuellement (sub details + device)
        const userAlreadySubscribe = user.subscriptions.filter(sub => sub.detail.endpoint === subscription.endpoint && sub.device === getDeviceType()).length > 0
        if (userAlreadySubscribe) {
          // Si oui, pas d'action
          console.log('Deja souscrit')
        } else {
          // si non, création d'une nouvelle sub en bdd
          postSubscription(subscription)
          console.log('Nouvelle souscription')
        }
      } else {
          Swal.fire({
            title: 'Pleeeeeaaaassseee',
            confirmButtonColor: '#4c956c',
            confirmButtonText: "Ok, je vais le faire !",
            html: "Allez, active les notifs !<br> Valé te remerciera, tu verras !<br> Et en plus, on promet de pas trop t'emmerder.",
          })
      }
    })
  }
}

export { askForSubscription }