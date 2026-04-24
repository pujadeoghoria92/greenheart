// js/stripe.js
// Your publishable key — this is SAFE to be in frontend code
const STRIPE_PUBLIC_KEY = 'pk_test_51TPhnvLkdiN03vix7R3CMTzRLrcISoWNiD3odiLDxqUfHGbJEjylkdIZfvpl85BXQePv8SXQXzViv5sZJlKOGuHi00sdRgvWLg'

// Your Price IDs from Stripe dashboard
const PRICES = {
  monthly: 'price_YOUR_MONTHLY_PRICE_ID',
  yearly:  'price_YOUR_YEARLY_PRICE_ID'
}

// Load Stripe
const stripe = Stripe(STRIPE_PUBLIC_KEY)

// This function runs when user clicks Subscribe
export async function startCheckout(plan) {
  try {
    // Call your Vercel serverless function (we create this next)
    const response = await fetch('/api/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId: PRICES[plan] })
    })

    const { sessionId } = await response.json()

    // Redirect user to Stripe's hosted payment page
    await stripe.redirectToCheckout({ sessionId })

  } catch (err) {
    alert('Payment error: ' + err.message)
  }
}