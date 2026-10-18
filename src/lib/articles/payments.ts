import { BlogPost } from "../blog-types";

export const paymentArticles: BlogPost[] = [
  // ─── Article 1: eSewa Integration ──────────────────────────────────────────
  {
    slug: "how-to-integrate-esewa-payment-gateway",
    title: "How to Integrate eSewa Payment Gateway in Node.js and Laravel (Official v2 ePay API)",
    description: "A complete production-ready guide to integrating Nepal's eSewa payment gateway. Learn HMAC-SHA256 signature generation, sandbox testing, callbacks, and server-side transaction verification.",
    category: "Payments",
    categorySlug: "payments",
    tags: ["eSewa", "Payments", "Laravel", "Node.js", "Express", "Nepal"],
    publishedAt: "2025-01-10",
    updatedAt: "2025-02-15",
    readingTime: "15 min read",
    featured: true,
    author: {
      name: "Manoj Neupane",
      role: "Software Developer & Programming Instructor",
      url: "https://manoj-neupane.com.np",
    },
    whoThisIsFor: "Web developers and students in Nepal building ecommerce sites, event booking, or SaaS apps that need to accept digital wallet payments securely.",
    prerequisites: [
      "Basic understanding of REST APIs and HTTP redirects",
      "Node.js (v18+) or PHP 8.1+ with Laravel 10/11",
      "Familiarity with environment variables (.env)",
    ],
    whatYouWillLearn: [
      "How eSewa's v2 ePay payment lifecycle works",
      "Generating the HMAC-SHA256 signature required by eSewa",
      "Constructing and submitting the checkout payment request",
      "Safely parsing the base64-encoded response payload",
      "Server-side verification with eSewa's Status Check API",
      "Preventing duplicate order processing and handling retries",
    ],
    sections: [
      {
        id: "understanding-esewa-lifecycle",
        title: "1. Understanding eSewa's Payment Lifecycle",
        content: `eSewa is Nepal's pioneer digital payment wallet. In late 2023, eSewa updated its protocol to the **v2 ePay API**, replacing the older form-based \`epay_payment.action\` with an **HMAC-SHA256 signed form submission**.

The payment process follows these critical stages:
1. **User Checkout:** The user chooses to pay Rs. 100 on your website. Your server generates a unique \`transaction_uuid\` and signs the payload using HMAC-SHA256 with your merchant secret key.
2. **Redirect to eSewa:** The user is redirected to eSewa's hosted payment gateway with the signed payload.
3. **Authentication:** The user logs into eSewa via MPIN / OTP and confirms the payment.
4. **Browser Return:** eSewa redirects the user back to your \`success_url\` with a base64-encoded query string containing transaction details.
5. **Server-Side Verification (Crucial):** Never trust the browser redirect alone! Your backend calls eSewa's server-to-server transaction status API to confirm the funds actually arrived before delivering any product.`,
        callout: {
          type: "warning",
          title: "Never Skip Server Verification",
          text: "A malicious user can manually craft a redirect to your success URL. You MUST verify the transaction with eSewa's status API from your server before updating order status.",
        },
      },
      {
        id: "credentials-and-env",
        title: "2. Test Credentials and Environment Configuration",
        content: `eSewa provides a public sandbox merchant for developers. You do not need an approved business account to begin developing and testing locally.

Official Test Credentials:
- **Product Code:** \`EPAYTEST\`
- **Secret Key:** \`8gBm/:&EnhH.1/q\`
- **Sandbox Action URL:** \`https://rc-epay.esewa.com.np/api/epay/main/v2/form\`
- **Sandbox Status Verification:** \`https://rc-epay.esewa.com.np/api/epay/transaction/status/\``,
        codeTabs: [
          {
            language: "bash",
            filename: ".env",
            label: "Environment (.env)",
            code: `# eSewa Sandbox Credentials
ESEWA_PRODUCT_CODE=EPAYTEST
ESEWA_SECRET_KEY=8gBm/:&EnhH.1/q
ESEWA_GATEWAY_URL=https://rc-epay.esewa.com.np/api/epay/main/v2/form
ESEWA_STATUS_CHECK_URL=https://rc-epay.esewa.com.np/api/epay/transaction/status/
APP_URL=http://localhost:3000`,
          },
        ],
      },
      {
        id: "signature-generation",
        title: "3. Generating the HMAC-SHA256 Signature",
        content: `eSewa requires an HMAC-SHA256 signature calculated from a comma-separated key-value string:
\`total_amount=100,transaction_uuid=11-201-20,product_code=EPAYTEST\`

Notice that the fields must be in the exact order declared in \`signed_field_names\`. Any deviation or whitespace discrepancy will cause eSewa to reject the request with a **"Signature Mismatch"** error.`,
        codeTabs: [
          {
            language: "javascript",
            filename: "esewaSignature.js",
            label: "Node.js (crypto)",
            code: `const crypto = require('crypto');

function generateEsewaSignature(secretKey, totalAmount, transactionUuid, productCode) {
  // Format must strictly match: total_amount=X,transaction_uuid=Y,product_code=Z
  const message = \`total_amount=\${totalAmount},transaction_uuid=\${transactionUuid},product_code=\${productCode}\`;
  
  const hash = crypto
    .createHmac('sha256', secretKey)
    .update(message)
    .digest('base64');
    
  return hash;
}

module.exports = { generateEsewaSignature };`,
          },
          {
            language: "php",
            filename: "EsewaService.php",
            label: "Laravel (PHP)",
            code: `<?php

namespace App\\Services;

class EsewaService
{
    public static function generateSignature(string $secretKey, string $totalAmount, string $transactionUuid, string $productCode): string
    {
        $message = "total_amount={$totalAmount},transaction_uuid={$transactionUuid},product_code={$productCode}";
        
        $hash = hash_hmac('sha256', $message, $secretKey, true);
        
        return base64_encode($hash);
    }
}`,
          },
        ],
      },
      {
        id: "initiating-payment",
        title: "4. Creating the Payment Initiation Endpoint",
        content: `When the customer clicks "Pay with eSewa", your server calculates the order amount, stores a pending order record with a unique UUID, generates the signature, and sends the form parameters to the client (or renders an auto-submitting form).`,
        codeTabs: [
          {
            language: "javascript",
            filename: "routes/payment.js",
            label: "Node.js (Express)",
            code: `const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { generateEsewaSignature } = require('../esewaSignature');

router.post('/initiate-esewa', async (req, res) => {
  const { amount, productId } = req.body;
  const totalAmount = Number(amount).toFixed(2);
  const transactionUuid = \`ORD-\${Date.now()}-\${uuidv4().substring(0, 8)}\`;
  const productCode = process.env.ESEWA_PRODUCT_CODE;
  const secretKey = process.env.ESEWA_SECRET_KEY;

  const signature = generateEsewaSignature(secretKey, totalAmount, transactionUuid, productCode);

  const esewaPayload = {
    amount: totalAmount,
    tax_amount: "0",
    total_amount: totalAmount,
    transaction_uuid: transactionUuid,
    product_code: productCode,
    product_service_charge: "0",
    product_delivery_charge: "0",
    success_url: \`\${process.env.APP_URL}/api/payment/esewa/success\`,
    failure_url: \`\${process.env.APP_URL}/api/payment/esewa/failure\`,
    signed_field_names: "total_amount,transaction_uuid,product_code",
    signature: signature
  };

  // Return payload to frontend to submit to eSewa
  res.json({
    gatewayUrl: process.env.ESEWA_GATEWAY_URL,
    params: esewaPayload
  });
});

module.exports = router;`,
          },
          {
            language: "php",
            filename: "app/Http/Controllers/PaymentController.php",
            label: "Laravel Controller",
            code: `<?php

namespace App\\Http\\Controllers;

use Illuminate\\Http\\Request;
use Illuminate\\Support\\Str;
use App\\Services\\EsewaService;

class PaymentController extends Controller
{
    public function initiateEsewa(Request $request)
    {
        $amount = number_format($request->amount, 2, '.', '');
        $transactionUuid = 'ORD-' . time() . '-' . Str::random(6);
        $productCode = config('services.esewa.product_code');
        $secretKey = config('services.esewa.secret_key');

        $signature = EsewaService::generateSignature(
            $secretKey,
            $amount,
            $transactionUuid,
            $productCode
        );

        $params = [
            'amount' => $amount,
            'tax_amount' => '0',
            'total_amount' => $amount,
            'transaction_uuid' => $transactionUuid,
            'product_code' => $productCode,
            'product_service_charge' => '0',
            'product_delivery_charge' => '0',
            'success_url' => route('esewa.success'),
            'failure_url' => route('esewa.failure'),
            'signed_field_names' => 'total_amount,transaction_uuid,product_code',
            'signature' => $signature,
        ];

        return view('checkout.esewa_redirect', [
            'gatewayUrl' => config('services.esewa.gateway_url'),
            'params' => $params,
        ]);
    }
}`,
          },
          {
            language: "html",
            filename: "esewa_redirect.html",
            label: "Auto-submit HTML Form",
            code: `<!-- Automatically submits form to eSewa -->
<form id="esewaForm" method="POST" action="https://rc-epay.esewa.com.np/api/epay/main/v2/form">
  <input type="hidden" name="amount" value="100.00" />
  <input type="hidden" name="tax_amount" value="0" />
  <input type="hidden" name="total_amount" value="100.00" />
  <input type="hidden" name="transaction_uuid" value="ORD-1715420101-abc12" />
  <input type="hidden" name="product_code" value="EPAYTEST" />
  <input type="hidden" name="product_service_charge" value="0" />
  <input type="hidden" name="product_delivery_charge" value="0" />
  <input type="hidden" name="success_url" value="http://localhost:3000/payment/success" />
  <input type="hidden" name="failure_url" value="http://localhost:3000/payment/failure" />
  <input type="hidden" name="signed_field_names" value="total_amount,transaction_uuid,product_code" />
  <input type="hidden" name="signature" value="4hJqL...base64..." />
</form>
<script>
  document.getElementById('esewaForm').submit();
</script>`,
          },
        ],
      },
      {
        id: "handling-success-callback",
        title: "5. Handling Success Callback & Server-Side Verification",
        content: `Upon successful payment, eSewa redirects to your \`success_url\` with a query parameter named \`data\`. This string is base64-encoded JSON containing:
\`\`\`json
{
  "transaction_code": "0008544",
  "status": "COMPLETE",
  "total_amount": "100.00",
  "transaction_uuid": "ORD-1715420101-abc12",
  "product_code": "EPAYTEST",
  "signature": "..."
}
\`\`\`

You must parse this data, verify the transaction status directly with eSewa's HTTP endpoint, check that the amount matches your database record, and then fulfill the order.`,
        codeTabs: [
          {
            language: "javascript",
            filename: "routes/callback.js",
            label: "Node.js (Verification)",
            code: `const axios = require('axios');

router.get('/esewa/success', async (req, res) => {
  try {
    const { data } = req.query;
    if (!data) return res.status(400).send('Missing eSewa callback payload');

    // Decode base64 payload
    const decodedBuffer = Buffer.from(data, 'base64');
    const callbackData = JSON.parse(decodedBuffer.toString('utf-8'));

    const { total_amount, transaction_uuid, product_code } = callbackData;

    // Verify with eSewa Server-to-Server Status API
    const verifyUrl = \`\${process.env.ESEWA_STATUS_CHECK_URL}?product_code=\${product_code}&total_amount=\${total_amount}&transaction_uuid=\${transaction_uuid}\`;
    
    const verifyRes = await axios.get(verifyUrl);

    if (verifyRes.data.status === 'COMPLETE') {
      // 1. Check if order was already marked completed (Idempotency)
      // 2. Verify total_amount matches the amount in your database
      // 3. Update order status to PAID
      console.log('Payment verified successfully:', verifyRes.data);
      return res.redirect(\`/order-success?uuid=\${transaction_uuid}\`);
    } else {
      return res.redirect('/order-failed?reason=verification_failed');
    }
  } catch (err) {
    console.error('eSewa verification error:', err.message);
    return res.status(500).send('Transaction verification failed');
  }
});`,
          },
          {
            language: "php",
            filename: "app/Http/Controllers/EsewaCallbackController.php",
            label: "Laravel (Verification)",
            code: `<?php

namespace App\\Http\\Controllers;

use Illuminate\\Http\\Request;
use Illuminate\\Support\\Facades\\Http;

class EsewaCallbackController extends Controller
{
    public function handleSuccess(Request $request)
    {
        $encodedData = $request->query('data');
        if (!$encodedData) {
            abort(400, 'Invalid eSewa response payload');
        }

        $decodedData = json_decode(base64_decode($encodedData), true);
        $totalAmount = $decodedData['total_amount'] ?? null;
        $transactionUuid = $decodedData['transaction_uuid'] ?? null;
        $productCode = $decodedData['product_code'] ?? null;

        // Query eSewa Status Check API
        $response = Http::get(config('services.esewa.status_check_url'), [
            'product_code' => $productCode,
            'total_amount' => $totalAmount,
            'transaction_uuid' => $transactionUuid,
        ]);

        if ($response->successful() && $response->json('status') === 'COMPLETE') {
            // Find order in database
            // $order = Order::where('uuid', $transactionUuid)->firstOrFail();
            // $order->update(['status' => 'paid', 'ref_id' => $response->json('ref_id')]);

            return redirect()->route('order.success', ['uuid' => $transactionUuid]);
        }

        return redirect()->route('order.failed')->with('error', 'Payment verification failed');
    }
}`,
          },
        ],
      },
    ],
    expectedOutput: `When the test transaction is complete:
- eSewa redirects to: http://localhost:3000/api/payment/esewa/success?data=eyJ0cmFuc2FjdGlvbl9jb2Rl...
- Server verifies with https://rc-epay.esewa.com.np/api/epay/transaction/status/
- Response returns HTTP 200 with JSON:
  {
    "product_code": "EPAYTEST",
    "total_amount": 100.0,
    "status": "COMPLETE",
    "ref_id": "0008544",
    "transaction_uuid": "ORD-1715420101-abc12"
  }`,
    testingSteps: [
      "Use test eSewa ID: 9806800001 / 9806800002 / 9806800003",
      "Password/MPIN: 1122",
      "OTP Code sent in sandbox: 123456",
      "Confirm amount deduction in test wallet and redirect to success URL",
      "Inspect server terminal logs to ensure HTTP GET status check returns COMPLETE",
    ],
    commonErrors: [
      {
        error: "Signature Mismatch / Invalid Signature",
        cause: "Field ordering in string is incorrect, or amount formatted with differing decimals (e.g. 100 vs 100.00).",
        solution: "Format amount strictly to 2 decimal places and verify field sequence: total_amount,transaction_uuid,product_code.",
      },
      {
        error: "Transaction Not Found in Status Check",
        cause: "Querying status check URL before the customer finished entering MPIN, or using mismatched transaction_uuid.",
        solution: "Ensure transaction_uuid is stored in session/DB and exactly matches the value returned in the decoded data query parameter.",
      },
      {
        error: "CORS error when redirecting to eSewa",
        cause: "Attempting to perform fetch() or axios.post() directly to eSewa form URL from JavaScript frontend.",
        solution: "eSewa v2 requires a standard browser navigation / form POST submission, not an AJAX request.",
      },
    ],
    securityNotes: [
      "Never store the ESEWA_SECRET_KEY in frontend React or Next.js client bundles.",
      "Always verify the total_amount in callback matches the original database order amount (avoids tampering).",
      "Implement database locking (e.g. SELECT FOR UPDATE in MySQL) to avoid double crediting if callbacks fire multiple times.",
    ],
    faqs: [
      {
        question: "How do I switch from eSewa Sandbox to Live Production?",
        answer: "Sign a merchant agreement with eSewa at merchant.esewa.com.np. They will issue your live Product Code and Secret Key. In your production .env, update ESEWA_PRODUCT_CODE, ESEWA_SECRET_KEY, and change the URLs from rc-epay to epay.esewa.com.np.",
      },
      {
        question: "Can I use eSewa for recurring monthly subscriptions?",
        answer: "Standard ePay v2 is for one-time checkout transactions. For recurring auto-debit, you need to apply for eSewa Direct Debit API which requires special banking clearance.",
      },
      {
        question: "What happens if the user closes the tab before returning to the success URL?",
        answer: "Implement a background reconciliation worker (cron job) that queries eSewa's transaction status API for any orders still in PENDING status after 15 minutes.",
      },
    ],
    summary: [
      "eSewa v2 uses HMAC-SHA256 signatures with base64 encoding.",
      "Required signature format: total_amount=X,transaction_uuid=Y,product_code=Z.",
      "Always verify transaction status server-side using eSewa status check API.",
      "Store merchant secrets securely in server environment variables.",
    ],
    references: [
      {
        title: "Official eSewa Developer Portal",
        url: "https://developer.esewa.com.np/",
        description: "Official API guides, parameter definitions, and test credentials.",
      },
      {
        title: "eSewa Test Credentials Documentation",
        url: "https://developer.esewa.com.np/pages/Test-credentials",
        description: "Official sandbox wallet numbers, MPIN, and OTP rules.",
      },
    ],
    relatedSlugs: [
      "how-to-integrate-khalti-payment-gateway",
      "how-to-configure-environment-variables-securely",
      "how-to-fix-cors-errors-react-nodejs",
    ],
  },

  // ─── Article 2: Khalti Integration ─────────────────────────────────────────
  {
    slug: "how-to-integrate-khalti-payment-gateway",
    title: "How to Integrate Khalti Payment Gateway in Node.js and Laravel (ePayment API v2)",
    description: "Step-by-step tutorial on integrating Khalti ePayment v2 in your web applications. Learn payment initiation, pidx token handling, checkout redirect, and server-side transaction lookup.",
    category: "Payments",
    categorySlug: "payments",
    tags: ["Khalti", "Payments", "Node.js", "Laravel", "React", "Nepal"],
    publishedAt: "2025-01-12",
    updatedAt: "2025-02-18",
    readingTime: "14 min read",
    featured: true,
    author: {
      name: "Manoj Neupane",
      role: "Software Developer & Programming Instructor",
      url: "https://manoj-neupane.com.np",
    },
    whoThisIsFor: "Developers in Nepal integrating digital payment processing with Khalti's modern REST ePayment API.",
    prerequisites: [
      "Node.js or Laravel environment",
      "Understanding of Bearer / Key authorization headers",
      "Khalti merchant account or test sandbox keys",
    ],
    whatYouWillLearn: [
      "How Khalti's modern ePayment v2 workflow functions",
      "Initiating payments using the /epayment/initiate/ endpoint",
      "Understanding the payment identifier (pidx)",
      "Redirecting users to payment_url securely",
      "Verifying payment status using /epayment/lookup/",
      "Handling edge cases like canceled payments and duplicate callbacks",
    ],
    sections: [
      {
        id: "khalti-architecture",
        title: "1. Understanding Khalti ePayment v2 Architecture",
        content: `Khalti's v2 ePayment API is developer-friendly, utilizing standard JSON requests and authorization keys.

The workflow is:
1. **Initiate:** Your backend sends a JSON payload (\`amount\` in Paisa, \`return_url\`, \`purchase_order_id\`) to \`https://a.khalti.com/api/v2/epayment/initiate/\`.
2. **PIDX & Payment URL:** Khalti returns a unique payment identifier \`pidx\` and a hosted \`payment_url\`.
3. **Redirect:** You redirect the user to the provided \`payment_url\`.
4. **Callback:** Once paid or canceled, Khalti redirects back to your \`return_url\` with query parameters (\`pidx\`, \`status\`, \`transaction_id\`).
5. **Lookup & Verification:** Your server calls \`https://a.khalti.com/api/v2/epayment/lookup/\` with the \`pidx\` to confirm the status is \`Completed\` before fulfilling the order.`,
      },
      {
        id: "khalti-sandbox-keys",
        title: "2. Khalti Sandbox Credentials & Configuration",
        content: `Khalti sandbox requires a test secret key. Test mode operates on \`https://a.khalti.com/api/v2/\`, while production uses \`https://khalti.com/api/v2/\`.

**Important Unit Warning:** Khalti expects all amounts in **Paisa** (1 NPR = 100 Paisa). If your item is Rs. 150, you must submit \`15000\`.`,
        codeTabs: [
          {
            language: "bash",
            filename: ".env",
            label: "Environment (.env)",
            code: `# Khalti Credentials
KHALTI_SECRET_KEY=live_secret_key_68791341fdd94846a146f0457f9b6e1b # Replace with your test/live key
KHALTI_API_BASE=https://a.khalti.com/api/v2
APP_URL=http://localhost:3000`,
          },
        ],
      },
      {
        id: "khalti-initiate",
        title: "3. Initiating the Payment (Server-Side)",
        content: `Never call Khalti's initiate API directly from client-side JavaScript because doing so exposes your secret authorization key. Always invoke it from your backend.`,
        codeTabs: [
          {
            language: "javascript",
            filename: "services/khalti.js",
            label: "Node.js (Axios)",
            code: `const axios = require('axios');

async function initiateKhaltiPayment({ returnUrl, websiteUrl, amountNpr, purchaseOrderId, purchaseOrderName, customerInfo }) {
  const url = \`\${process.env.KHALTI_API_BASE}/epayment/initiate/\`;
  
  // Convert NPR to Paisa (Rs 10 = 1000 Paisa)
  const amountInPaisa = Math.round(Number(amountNpr) * 100);

  const payload = {
    return_url: returnUrl,
    website_url: websiteUrl,
    amount: amountInPaisa,
    purchase_order_id: purchaseOrderId,
    purchase_order_name: purchaseOrderName,
    customer_info: customerInfo || {
      name: "Test Customer",
      email: "test@example.com",
      phone: "9800000000"
    }
  };

  const response = await axios.post(url, payload, {
    headers: {
      Authorization: \`Key \${process.env.KHALTI_SECRET_KEY}\`,
      'Content-Type': 'application/json'
    }
  });

  // response.data contains: { pidx: "...", payment_url: "https://...", expires_at: "..." }
  return response.data;
}

module.exports = { initiateKhaltiPayment };`,
          },
          {
            language: "php",
            filename: "app/Services/KhaltiService.php",
            label: "Laravel (HTTP Client)",
            code: `<?php

namespace App\\Services;

use Illuminate\\Support\\Facades\\Http;

class KhaltiService
{
    public function initiatePayment(string $orderId, float $amountNpr, string $orderName, array $customer): array
    {
        $amountInPaisa = (int) round($amountNpr * 100);

        $response = Http::withHeaders([
            'Authorization' => 'Key ' . config('services.khalti.secret_key'),
            'Content-Type' => 'application/json',
        ])->post(config('services.khalti.base_url') . '/epayment/initiate/', [
            'return_url' => route('khalti.callback'),
            'website_url' => config('app.url'),
            'amount' => $amountInPaisa,
            'purchase_order_id' => $orderId,
            'purchase_order_name' => $orderName,
            'customer_info' => $customer,
        ]);

        if ($response->successful()) {
            return $response->json();
        }

        throw new \\Exception('Khalti initiation failed: ' . $response->body());
    }
}`,
          },
        ],
      },
      {
        id: "khalti-verification",
        title: "4. Verifying Payment with the Lookup API",
        content: `When the payment completes, Khalti sends the user back to your \`return_url\` with parameters:
\`?pidx=bF8...&status=Completed&transaction_id=123...&amount=1000\`

Never trust the query parameters alone. Use your secret key to query the lookup endpoint to verify the transaction status.`,
        codeTabs: [
          {
            language: "javascript",
            filename: "routes/khaltiCallback.js",
            label: "Node.js Verification",
            code: `router.get('/khalti/callback', async (req, res) => {
  const { pidx, status, transaction_id } = req.query;

  if (!pidx) return res.status(400).send('Missing pidx in callback');

  try {
    const lookupRes = await axios.post(
      \`\${process.env.KHALTI_API_BASE}/epayment/lookup/\`,
      { pidx },
      {
        headers: {
          Authorization: \`Key \${process.env.KHALTI_SECRET_KEY}\`,
          'Content-Type': 'application/json'
        }
      }
    );

    const data = lookupRes.data;

    if (data.status === 'Completed') {
      // 1. Verify data.total_amount matches expected order amount
      // 2. Mark order as Paid in database
      // 3. Prevent duplicate fulfillment
      return res.redirect(\`/order-success?pidx=\${pidx}\`);
    } else {
      return res.redirect(\`/order-failed?status=\${data.status}\`);
    }
  } catch (error) {
    console.error('Khalti lookup error:', error.response?.data || error.message);
    return res.status(500).send('Payment verification failed');
  }
});`,
          },
          {
            language: "php",
            filename: "app/Http/Controllers/KhaltiController.php",
            label: "Laravel Verification",
            code: `<?php

namespace App\\Http\\Controllers;

use Illuminate\\Http\\Request;
use Illuminate\\Support\\Facades\\Http;

class KhaltiController extends Controller
{
    public function handleCallback(Request $request)
    {
        $pidx = $request->query('pidx');

        $response = Http::withHeaders([
            'Authorization' => 'Key ' . config('services.khalti.secret_key'),
            'Content-Type' => 'application/json',
        ])->post(config('services.khalti.base_url') . '/epayment/lookup/', [
            'pidx' => $pidx,
        ]);

        if ($response->successful() && $response->json('status') === 'Completed') {
            // Update order status in DB
            return redirect()->route('checkout.success')->with('pidx', $pidx);
        }

        return redirect()->route('checkout.failed')->with('error', 'Payment not completed');
    }
}`,
          },
        ],
      },
    ],
    expectedOutput: `Successful initiation returns:
{
  "pidx": "bF8t25Xq937gM",
  "payment_url": "https://test-pay.khalti.com/?pidx=bF8t25Xq937gM",
  "expires_at": "2025-01-12T10:15:30Z",
  "expires_in": 1800
}

Successful lookup returns:
{
  "pidx": "bF8t25Xq937gM",
  "total_amount": 1000,
  "status": "Completed",
  "transaction_id": "T1234567890",
  "fee": 0,
  "refunded": false
}`,
    testingSteps: [
      "Use Khalti test wallet credentials provided in Khalti docs (Mobile: 9800000000 to 9800000005, MPIN: 1111, OTP: 987654)",
      "Initiate payment and verify browser redirects to https://test-pay.khalti.com",
      "Enter credentials and confirm checkout",
      "Verify that return_url receives pidx and server completes lookup successfully",
    ],
    commonErrors: [
      {
        error: "HTTP 401 Unauthorized",
        cause: "Missing or incorrect 'Key <secret_key>' header in authorization request.",
        solution: "Format the header as 'Authorization: Key your_secret_key_here' with a space after 'Key'.",
      },
      {
        error: "Invalid amount or amount too low",
        cause: "Submitting rupees instead of paisa (e.g. submitting 10 instead of 1000).",
        solution: "Multiply rupee amounts by 100 and cast to an integer before sending payload.",
      },
      {
        error: "Expired PIDX",
        cause: "User stayed on checkout screen longer than 30 minutes.",
        solution: "Handle Expired status by generating a fresh payment session.",
      },
    ],
    securityNotes: [
      "Never put the Khalti secret key inside client-side JS or HTML.",
      "Verify the transaction amount returned by /lookup/ matches your database order value in Paisa.",
      "Implement idempotent database operations to prevent crediting orders twice.",
    ],
    faqs: [
      {
        question: "Does Khalti support credit/debit cards or SCT?",
        answer: "Yes, Khalti's hosted payment page allows users to pay via Khalti Wallet, ConnectIPS, Mobile Banking (all major Nepali banks), and SCT / Visa cards.",
      },
      {
        question: "Can I embed Khalti in a mobile app?",
        answer: "Yes, you can either open the payment_url in an in-app WebView or use the official Khalti Android / iOS / Flutter SDKs.",
      },
    ],
    summary: [
      "Khalti v2 uses simple JSON REST endpoints: /initiate/ and /lookup/.",
      "Always supply amounts in Paisa (NPR * 100).",
      "Perform server-to-server verification with the pidx before marking orders as paid.",
    ],
    references: [
      {
        title: "Official Khalti Documentation",
        url: "https://docs.khalti.com/",
        description: "Official developer docs and API references.",
      },
      {
        title: "Khalti ePayment API v2 Reference",
        url: "https://docs.khalti.com/khalti-epayment/",
        description: "Initiate and lookup API parameters and response specifications.",
      },
    ],
    relatedSlugs: [
      "how-to-integrate-esewa-payment-gateway",
      "how-to-configure-environment-variables-securely",
    ],
  },

  // ─── Article 3: Free .np Domain Registration ───────────────────────────────
  {
    slug: "how-to-register-free-np-domain-nepal",
    title: "How to Register a Free .np Domain in Nepal (Complete Step-by-Step Guide with Cover Letter Template)",
    description: "Learn how citizens and organizations in Nepal can register a 100% free .com.np or .org.np domain through Mercantile Communications (register.com.np). Includes editable cover letter template, DNS setup, and common rejection fixes.",
    category: "DevOps & Tools",
    categorySlug: "devops-and-tools",
    tags: [".np Domain", "DNS", "Cloudflare", "Nepal", "Web Development"],
    publishedAt: "2025-01-14",
    updatedAt: "2025-02-10",
    readingTime: "12 min read",
    featured: true,
    author: {
      name: "Manoj Neupane",
      role: "Software Developer & Programming Instructor",
      url: "https://manoj-neupane.com.np",
    },
    whoThisIsFor: "Nepali students, freelance developers, and registered companies looking to secure an official, free national country code top-level domain (.np) for personal portfolios or commercial websites.",
    prerequisites: [
      "Nepali Citizenship Certificate (Nagarikta), Passport, or Driving License (for personal domains)",
      "Company Registration / PAN Certificate (for business/organization domains)",
      "Two valid DNS nameservers (e.g. from Cloudflare or your web host)",
    ],
    whatYouWillLearn: [
      "Rules governing .np domain name eligibility and naming conventions",
      "Differences between .com.np, .org.np, .edu.np, and other sub-domains",
      "Step-by-step account creation and domain application submission",
      "Writing an acceptable Cover Letter / Request Letter (with template)",
      "Configuring DNS nameservers for Cloudflare or hosting",
      "Solving application rejections and tracking status",
    ],
    sections: [
      {
        id: "what-is-np-domain",
        title: "1. What is a .np Domain and Why is it Free?",
        content: `The \`.np\` country code top-level domain (ccTLD) is managed by **Mercantile Communication Pvt. Ltd.** under authorization from the Government of Nepal. 

Unlike global domains like \`.com\` which require an annual fee of \$10-\$15, \`.np\` domains are provided **completely free of charge** for lifetime usage to Nepali citizens and registered organizations.

Available extensions:
- **.com.np:** For personal use (citizens) or commercial businesses.
- **.org.np:** For non-profit organizations, NGOs, and INGOs.
- **.edu.np:** For educational institutions, schools, and colleges.
- **.gov.np:** Reserved strictly for Government of Nepal ministries and departments.`,
      },
      {
        id: "naming-rules",
        title: "2. Crucial Naming Rules (Avoid Instant Rejection)",
        content: `The #1 reason applications get rejected is naming rule violations.

**For Personal Domains:**
- The domain name **must strictly match or derive from your full legal name** as printed on your Nepali citizenship certificate.
- Example for applicant *Manoj Neupane*:
  - ✅ \`manojneupane.com.np\`
  - ✅ \`neupanemanoj.com.np\`
  - ✅ \`manoj-neupane.com.np\`
  - ✅ \`mneupane.com.np\`
  - ❌ \`nepaltech.com.np\` (Rejected! Generic terms require company registration)
  - ❌ \`superdeveloper.com.np\` (Rejected! Not your legal name)

**For Companies / Organizations:**
- The domain name must match the registered company name or brand name on your official registration certificate.`,
        callout: {
          type: "warning",
          title: "Zero Tolerance on Name Mismatches",
          text: "Never apply for a personal domain that does not directly correspond to the name on your citizenship certificate. It will be rejected automatically.",
        },
      },
      {
        id: "required-documents",
        title: "3. Required Documents to Prepare",
        content: `Before filling out the form on [register.com.np](https://register.com.np/), prepare clean, legible image scans (JPG, PNG, or PDF under 200 KB each):

1. **Citizenship Card (Front & Back):** Clear scan or high-res photo.
2. **Cover Letter / Request Letter:** Signed written or printed letter formally requesting the domain name.
3. **Primary & Secondary Nameservers:** e.g., Cloudflare nameservers (\`ns1.cloudflare.com\`, \`ns2.cloudflare.com\`).`,
      },
      {
        id: "cover-letter-template",
        title: "4. Editable Cover Letter Template (Copy & Customize)",
        content: `You can type this letter, print it, sign it, and upload a clear photo or scan. Alternatively, you can digitally sign a PDF.`,
        codeTabs: [
          {
            language: "html",
            filename: "CoverLetter.txt",
            label: "Personal Domain Cover Letter Template",
            code: `Date: [Date, e.g., October 18, 2026]

To,
The Domain Registration Administrator,
Mercantile Communication Pvt. Ltd.,
Durbar Marg, Kathmandu, Nepal.

Subject: Request for personal .com.np domain registration

Dear Sir/Madam,

I am writing this letter to formally request the registration of the domain name "[yourname.com.np]" under my name.

I am a citizen of Nepal holding Citizenship Certificate Number [Your Citizenship No.], issued by the District Administration Office of [Your District Name]. The requested domain name directly reflects my legal name and will be used strictly for personal portfolio, educational blogging, and non-commercial professional showcase purposes.

I have attached clear scanned copies of my Citizenship Certificate (both front and back) along with this letter for verification.

Requested Domain Name: [yourname.com.np]
Applicant Full Name: [Your Full Name]
Citizenship Number: [Your Citizenship Number]
Primary Nameserver: [e.g., pam.ns.cloudflare.com]
Secondary Nameserver: [e.g., ray.ns.cloudflare.com]

I kindly request you to approve my application. Thank you for your time and cooperation.

Sincerely,

_________________________
[Your Full Name]
Contact Phone: [Your Mobile Number]
Email: [Your Email Address]
Address: [Your City/District, Nepal]`,
          },
        ],
      },
      {
        id: "submission-steps",
        title: "5. Step-by-Step Submission on register.com.np",
        content: `1. Visit [register.com.np](https://register.com.np/) and click **User Login** → **Create User**.
2. Fill in your name, email, and password. Confirm your account via the activation link sent to your email.
3. Once logged in, enter your requested domain in the search box (e.g., \`manojneupane.com.np\`) and click **Register Now**.
4. **Primary & Secondary Nameservers:** Enter your hosting or Cloudflare DNS nameservers.
5. **Administrative Contact:** Enter your personal information accurately.
6. **Upload Documents:** Upload your Citizenship front and back in the identification field, and upload your signed cover letter in the cover letter field.
7. Click **Submit**. The review typically takes **1 to 3 business days**.`,
      },
      {
        id: "connecting-cloudflare",
        title: "6. Connecting Your Approved .np Domain to Cloudflare & Vercel",
        content: `Because register.com.np only allows updating **Nameservers** (not individual A or CNAME records directly in the portal), the best practice in Nepal is to point your .np domain to **Cloudflare** for free DNS management:

1. Create a free account at [Cloudflare.com](https://www.cloudflare.com/).
2. Add your domain: \`manojneupane.com.np\`.
3. Cloudflare will assign you two nameservers (e.g. \`amber.ns.cloudflare.com\` and \`jake.ns.cloudflare.com\`).
4. Enter these nameservers in register.com.np.
5. In Cloudflare, add your CNAME or A records pointing to Vercel, cPanel, or VPS.`,
      },
    ],
    expectedOutput: `Upon successful review by Mercantile:
- You will receive an approval email from hostmaster@mercantile.com.np stating:
  "Your domain [yourname.com.np] has been approved and activated."
- WHOIS query on register.com.np will show:
  Status: Active
  Registrant: [Your Name]`,
    testingSteps: [
      "Check application status under 'Active Domains' in register.com.np dashboard",
      "Run terminal command: `dig NS yourname.com.np +short` to confirm nameservers resolved",
      "Verify Cloudflare reports 'Active' status for your domain",
    ],
    commonErrors: [
      {
        error: "Application Rejected: Name does not match identification",
        cause: "Applying for nicknames or generic terms without matching citizenship documents.",
        solution: "Re-apply using your exact first and last name as spelled on your citizenship card.",
      },
      {
        error: "File upload size exceeded",
        cause: "Image files are larger than 200 KB.",
        solution: "Compress your JPG/PNG files using an image optimizer like TinyPNG before uploading.",
      },
      {
        error: "Invalid Nameserver",
        cause: "Typo in nameserver address or using nonexistent nameserver hosts.",
        solution: "Double-check nameserver hostnames from your hosting provider or Cloudflare.",
      },
    ],
    securityNotes: [
      "Enable Two-Factor Authentication (2FA) on your register.com.np account to prevent unauthorized nameserver hijacking.",
      "Keep your registered email active; renewal verification requests are sent to this address.",
    ],
    faqs: [
      {
        question: "Is the .np domain really free forever?",
        answer: "Yes, Mercantile Communications provides .np domains free of charge with no annual renewal fees for legitimate Nepali citizens and registered businesses.",
      },
      {
        question: "Can I register multiple personal .com.np domains?",
        answer: "Generally, only one personal domain is allowed per citizen based on variations of your legal name.",
      },
      {
        question: "How long does approval take?",
        answer: "Approval usually takes 24 to 72 business hours on regular government workdays (Sunday through Thursday).",
      },
    ],
    summary: [
      "Personal .np domains require matching citizenship certificates and a signed cover letter.",
      "Mercantile offers lifetime free registration on register.com.np.",
      "Point nameservers to Cloudflare for flexible DNS record management.",
    ],
    references: [
      {
        title: "Official .NP Domain Registrar (Mercantile)",
        url: "https://register.com.np/",
        description: "Official registration and user portal for .np domains.",
      },
      {
        title: "Himalayan Host Knowledgebase Reference",
        url: "https://www.himalayanhost.com/knowledgebase/2/How-to-register-free-.np-domain-in-Nepal-with-Cover-Letter.html",
        description: "Community documentation and historical requirements overview.",
      },
    ],
    relatedSlugs: [
      "how-to-connect-custom-domain-to-vercel",
      "how-to-configure-dns-records-fix-common-errors",
    ],
  },
];
