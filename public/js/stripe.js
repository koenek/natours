/* eslint-disable */
import Axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe('pk_test_z5kBE6v2RC8QSkaIpVUDvRbV00PSh364jX');

export const bookTour = async tourId => {
  try {
    // 1) Get checout session from API
    const session = await Axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);
    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
