"use client";

import React from 'react';
import { Copy, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

const Documentation = () => {
  const [copiedCode, setCopiedCode] = React.useState('');

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-100 mb-2">Accept Crypto Payments</h1>
        <p className="text-neutral-400">Start accepting crypto and receive USD payouts in minutes</p>
      </div>

      <Card className="bg-neutral-900 border-neutral-800">
        <div className="p-8">
          <div className="prose prose-invert max-w-none">
            {/* How it Works */}
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-neutral-100 mb-4">How it Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-neutral-800 p-4 rounded-lg">
                  <h3 className="text-blue-400 font-medium mb-2">1. Create Button</h3>
                  <p className="text-neutral-400 text-sm">Add checkout button to your site</p>
                </div>
                <div className="bg-neutral-800 p-4 rounded-lg">
                  <h3 className="text-blue-400 font-medium mb-2">2. Customer Pays</h3>
                  <p className="text-neutral-400 text-sm">Customer pays in their preferred crypto</p>
                </div>
                <div className="bg-neutral-800 p-4 rounded-lg">
                  <h3 className="text-blue-400 font-medium mb-2">3. We Convert</h3>
                  <p className="text-neutral-400 text-sm">We handle the crypto-to-USD conversion</p>
                </div>
                <div className="bg-neutral-800 p-4 rounded-lg">
                  <h3 className="text-blue-400 font-medium mb-2">4. You Get USD</h3>
                  <p className="text-neutral-400 text-sm">Receive USD via Stripe Connect</p>
                </div>
              </div>
            </div>

            {/* Integration Steps */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-blue-400 mb-4">Quick Integration</h3>
              <p className="text-neutral-300 mb-6">
                Add this payment button code to your checkout page:
              </p>
              <div className="bg-neutral-950 rounded-lg p-6 mb-6 relative">
                <button 
                  onClick={() => handleCopyCode(`<button onclick="handleCryptoPayment()">Pay with Crypto</button>

<script>
async function handleCryptoPayment() {
  try {
    const response = await fetch('https://myquikflip.com/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': 'YOUR_API_KEY'  // Get this from your API Keys page
      },
      body: JSON.stringify({
        amount: "99.99",    // Your order amount
        currency: "USD"     // Currency code
      })
    });

    const data = await response.json();
    
    // Redirect customer to hosted payment page
    if (data.charge && data.charge.hosted_url) {
      window.location.href = data.charge.hosted_url;
    }
  } catch (error) {
    console.error('Error:', error);
  }
}</script>`)}
                  className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-300"
                >
                  {copiedCode.includes('handleCryptoPayment') ? (
                    <CheckCircle size={18} className="text-green-400" />
                  ) : (
                    <Copy size={18} />
                  )}
                </button>
                <pre className="text-blue-300 font-mono text-sm overflow-x-auto">
{`<button onclick="handleCryptoPayment()">Pay with Crypto</button>

<script>
async function handleCryptoPayment() {
  try {
    const response = await fetch('https://myquikflip.com/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': 'YOUR_API_KEY'  // Get this from your API Keys page
      },
      body: JSON.stringify({
        amount: "99.99",    // Your order amount
        currency: "USD"     // Currency code
      })
    });

    const data = await response.json();
    
    // Redirect customer to hosted payment page
    if (data.charge && data.charge.hosted_url) {
      window.location.href = data.charge.hosted_url;
    }
  } catch (error) {
    console.error('Error:', error);
  }
}</script>`}
                </pre>
              </div>
            </div>

            {/* Webhook Handling */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-blue-400 mb-4">Handle Payment Confirmation</h3>
              <p className="text-neutral-300 mb-4">
                We'll notify you when the payment is confirmed. Set up a webhook endpoint to receive these notifications:
              </p>
              <div className="bg-neutral-950 rounded-lg p-6 mb-6 relative">
                <button 
                  onClick={() => handleCopyCode(`app.post("/your-webhook-endpoint", async (req, res) => {
  // Verify webhook signature
  const signature = req.headers['x-cc-webhook-signature'];
  
  try {
    // Process the webhook
    if (req.body.event.type === "charge:confirmed") {
      // Payment confirmed - fulfill the order
      const chargeId = req.body.event.data.id;
      
      // Update your database
      await updateOrderStatus(chargeId, 'paid');
      
      // Fulfill the order
      await fulfillOrder(chargeId);
    }
    
    res.sendStatus(200);
  } catch (error) {
    console.error('Webhook Error:', error);
    res.status(400).send('Webhook Error');
  }
});`)}
                  className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-300"
                >
                  {copiedCode.includes('webhook') ? (
                    <CheckCircle size={18} className="text-green-400" />
                  ) : (
                    <Copy size={18} />
                  )}
                </button>
                <pre className="text-blue-300 font-mono text-sm overflow-x-auto">
{`app.post("/your-webhook-endpoint", async (req, res) => {
  // Verify webhook signature
  const signature = req.headers['x-cc-webhook-signature'];
  
  try {
    // Process the webhook
    if (req.body.event.type === "charge:confirmed") {
      // Payment confirmed - fulfill the order
      const chargeId = req.body.event.data.id;
      
      // Update your database
      await updateOrderStatus(chargeId, 'paid');
      
      // Fulfill the order
      await fulfillOrder(chargeId);
    }
    
    res.sendStatus(200);
  } catch (error) {
    console.error('Webhook Error:', error);
    res.status(400).send('Webhook Error');
  }
});`}
                </pre>
              </div>
            </div>

            {/* That's It! */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-neutral-100 mb-4">That's It!</h3>
              <div className="bg-blue-950 rounded-lg p-6">
                <p className="text-blue-200 mb-4">
                  We handle everything else:
                </p>
                <ul className="space-y-2 text-blue-200">
                  <li>• Crypto payment processing</li>
                  <li>• Currency conversion</li>
                  <li>• USD payouts to your Stripe account</li>
                  <li>• Transaction tracking</li>
                </ul>
              </div>
            </div>

            {/* Support Section */}
            <div className="mt-12 border-t border-neutral-800 pt-8">
              <h3 className="text-xl font-semibold text-neutral-100 mb-4">Questions?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a href="#" className="block p-4 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors">
                  <h4 className="text-blue-400 font-medium mb-2">Technical Support</h4>
                  <p className="text-neutral-400">Contact our developer team</p>
                </a>
                <a href="#" className="block p-4 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors">
                  <h4 className="text-blue-400 font-medium mb-2">API Reference</h4>
                  <p className="text-neutral-400">View detailed API documentation</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Documentation;