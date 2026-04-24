// api/create-checkout.js
// This runs on Vercel's servers — NOT in the browser
// So your secret key is safe here

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

module.exports = async (req, res) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { priceId } = req.body

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: 'https://v0-greenheart.vercel.app/dashboard.html?payment=success',
      cancel_url:  'https://v0-greenheart.vercel.app/index.html?payment=cancelled',
    })

    res.status(200).json({ sessionId: session.id })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}