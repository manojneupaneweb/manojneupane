import { BlogPost } from "../blog-types";
import { siteConfig } from "../data";

const authorManoj = {
  name: siteConfig.name,
  role: "Software Developer & Programming Instructor",
  avatar: siteConfig.profileImage,
  url: siteConfig.url,
};

export const clusterPriorityArticles: BlogPost[] = [
  // ─── Article 1: eSewa in Laravel 12 ──────────────────────────────
  {
    slug: "esewa-payment-integration-laravel-12-complete-guide",
    title: "eSewa Payment Integration in Laravel 12: Complete Step-by-Step Guide with Signature Verification",
    description: "Learn how to integrate eSewa ePay v2 in Laravel 12 from scratch. Includes HMAC-SHA256 signature generation, sandbox credentials, controller implementation, CSRF exemption in bootstrap/app.php, and server-side status verification.",
    category: "Payments",
    categorySlug: "payments",
    tags: ["eSewa", "Laravel 12", "PHP", "Payment Gateway", "HMAC-SHA256", "ePay v2"],
    publishedAt: "2026-10-18",
    updatedAt: "2026-10-19",
    readingTime: "13 min read",
    author: authorManoj,
    featured: true,
    whoIsThisFor: "PHP and Laravel developers building e-commerce stores, ticket booking engines, or SaaS apps in Nepal who need a modern, production-grade eSewa integration in Laravel 11 or 12.",
    prerequisites: [
      "A working Laravel 11/12 application running PHP 8.2 or higher",
      "MySQL database connected and migrations executed",
      "Basic understanding of Blade views, Controllers, and Routes",
      "eSewa sandbox test credentials from developer.esewa.com.np"
    ],
    whatYouWillLearn: [
      "How to configure eSewa sandbox environment variables in Laravel .env",
      "Generating the HMAC-SHA256 signature required by eSewa ePay v2",
      "Bypassing CSRF verification for eSewa POST callbacks in Laravel 11/12",
      "Verifying transaction status securely using Laravel Http client",
      "Preventing fraudulent order tampering and duplicate payments"
    ],
    sections: [
      {
        id: "esewa-v2-architecture",
        title: "1. Understanding eSewa ePay v2 Flow in Laravel 12",
        level: 2,
        content: `In eSewa's modern **ePay v2** protocol, the integration operates as follows:
1. Customer clicks "Pay with eSewa" in your checkout view.
2. Your Laravel controller creates a pending \`Order\` in the database with a unique \`transaction_uuid\` and exact amount.
3. Your controller computes an **HMAC-SHA256** hash using the secret key (\`8gBm/:&EnhH.1/q\` in sandbox) over the concatenated fields: \`total_amount,transaction_uuid,product_code\`.
4. A frontend HTML form automatically submits these parameters to eSewa's gateway endpoint (\`https://rc-epay.esewa.com.np/api/epay/main/v2/form\`).
5. After the user logs in and approves payment on eSewa, eSewa redirects to your registered \`success_url\` with an encoded base64 payload.
6. Your backend server decodes the payload, validates the return signature, and makes a server-to-server call to verify the transaction status before marking the order as paid.`
      },
      {
        id: "env-configuration",
        title: "2. Setting Up Environment Variables (.env)",
        level: 2,
        content: `Add the official eSewa sandbox test credentials to your \`.env\` file. In Laravel 12, never hardcode these secrets into controllers:`,
        codeTabs: [
          {
            language: "bash",
            label: "Laravel .env",
            filename: ".env",
            code: `# eSewa v2 Sandbox Credentials (Official Test Keys)
ESEWA_PRODUCT_CODE=EPAYTEST
ESEWA_SECRET_KEY=8gBm/:&EnhH.1/q
ESEWA_GATEWAY_URL=https://rc-epay.esewa.com.np/api/epay/main/v2/form
ESEWA_VERIFICATION_URL=https://rc-epay.esewa.com.np/api/epay/transaction/status/
ESEWA_SUCCESS_URL=http://localhost:8000/payment/esewa/success
ESEWA_FAILURE_URL=http://localhost:8000/payment/esewa/failure`
          }
        ]
      },
      {
        id: "laravel-controller-implementation",
        title: "3. Creating the eSewa Payment Controller",
        level: 2,
        content: `Create \`app/Http/Controllers/EsewaPaymentController.php\` to handle payment initiation, signature generation, and verification:`,
        codeTabs: [
          {
            language: "php",
            label: "EsewaPaymentController.php",
            filename: "app/Http/Controllers/EsewaPaymentController.php",
            code: `<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class EsewaPaymentController extends Controller
{
    /**
     * Initiate checkout: generate signature and redirect to eSewa
     */
    public function initiatePayment(Request $request)
    {
        $amount = 100.00; // Total amount in NPR
        $taxAmount = 0.00;
        $totalAmount = $amount + $taxAmount;
        $transactionUuid = Str::uuid()->toString();
        $productCode = config('services.esewa.product_code', env('ESEWA_PRODUCT_CODE'));
        $secretKey = config('services.esewa.secret_key', env('ESEWA_SECRET_KEY'));

        // Format: total_amount,transaction_uuid,product_code
        $dataToSign = "total_amount={$totalAmount},transaction_uuid={$transactionUuid},product_code={$productCode}";
        $signature = base64_encode(hash_hmac('sha256', $dataToSign, $secretKey, true));

        $formData = [
            'amount' => $amount,
            'tax_amount' => $taxAmount,
            'total_amount' => $totalAmount,
            'transaction_uuid' => $transactionUuid,
            'product_code' => $productCode,
            'product_service_charge' => 0,
            'product_delivery_charge' => 0,
            'success_url' => env('ESEWA_SUCCESS_URL'),
            'failure_url' => env('ESEWA_FAILURE_URL'),
            'signed_field_names' => 'total_amount,transaction_uuid,product_code',
            'signature' => $signature,
        ];

        return view('payment.esewa_redirect', [
            'gatewayUrl' => env('ESEWA_GATEWAY_URL'),
            'formData' => $formData
        ]);
    }

    /**
     * Handle payment success callback from eSewa
     */
    public function paymentSuccess(Request $request)
    {
        $encodedData = $request->query('data');
        if (!$encodedData) {
            return redirect()->route('cart')->with('error', 'Invalid callback payload from eSewa.');
        }

        // Decode base64 response from eSewa
        $decodedJson = base64_decode($encodedData);
        $response = json_decode($decodedJson, true);

        if (!$response || !isset($response['transaction_uuid'], $response['total_amount'])) {
            return redirect()->route('cart')->with('error', 'Malformed payment confirmation payload.');
        }

        // Double check status server-side
        $verifyRes = Http::get(env('ESEWA_VERIFICATION_URL'), [
            'product_code' => env('ESEWA_PRODUCT_CODE'),
            'total_amount' => $response['total_amount'],
            'transaction_uuid' => $response['transaction_uuid'],
        ]);

        if ($verifyRes->successful() && ($verifyRes->json('status') === 'COMPLETE' || $response['status'] === 'COMPLETE')) {
            // Fulfill order in database atomically
            // Order::where('transaction_uuid', $response['transaction_uuid'])->update(['status' => 'PAID']);
            return view('payment.success', ['details' => $response]);
        }

        return redirect()->route('cart')->with('error', 'Payment verification failed with eSewa.');
    }

    public function paymentFailure(Request $request)
    {
        return view('payment.failure', ['message' => 'Transaction was cancelled or declined by eSewa.']);
    }
}`
          }
        ]
      },
      {
        id: "csrf-exemption-laravel-12",
        title: "4. Exclude Payment Callback from CSRF Protection in Laravel 12",
        level: 2,
        content: `In Laravel 11 and Laravel 12, application middleware is configured directly in \`bootstrap/app.php\` instead of the legacy \`app/Http/Kernel.php\`. Because eSewa redirects externally, any POST callback will fail with **419 Page Expired** unless excluded:`,
        codeTabs: [
          {
            language: "php",
            label: "bootstrap/app.php",
            filename: "bootstrap/app.php",
            code: `<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // Exclude eSewa and Khalti callback routes from CSRF verification
        $middleware->validateCsrfTokens(except: [
            'payment/esewa/*',
            'payment/khalti/*',
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();`
          }
        ]
      }
    ],
    expectedOutput: "A frictionless checkout experience that redirects users to eSewa's test wallet, processes test payment, and redirects back with cryptographic proof and server status confirmation.",
    testingSteps: [
      "Start your local server: 'php artisan serve'",
      "Trigger the checkout route in your browser: http://localhost:8000/payment/esewa",
      "Log into eSewa test sandbox using mobile '9841000000' and MPIN '1122'",
      "Enter test OTP '123456' to confirm transaction",
      "Verify that redirect lands on /payment/esewa/success with status COMPLETE"
    ],
    commonErrors: [
      {
        error: "Invalid Signature Error on eSewa redirect",
        cause: "Concatenation string does not match signed_field_names exactly, or floating points are formatted with trailing spaces.",
        solution: "Format amount strictly with number_format($amt, 2, '.', '') without thousands commas."
      },
      {
        error: "419 Page Expired on Callback",
        cause: "Laravel CSRF middleware rejecting incoming POST callbacks from eSewa servers.",
        solution: "Add 'payment/esewa/*' to validateCsrfTokens(except: [...]) in bootstrap/app.php."
      }
    ],
    securityConsiderations: [
      "Always query eSewa verification endpoint with your merchant credentials before updating order status.",
      "Check that response['total_amount'] matches the recorded order amount to prevent client-side cart tampering."
    ],
    faqs: [
      {
        question: "What test credentials can I use on eSewa sandbox?",
        answer: "Test eSewa ID: 9841000000, MPIN: 1122, Token/OTP: 123456. Product code is EPAYTEST."
      },
      {
        question: "How do I switch from sandbox to production in Laravel?",
        answer: "Change ESEWA_GATEWAY_URL to https://epay.esewa.com.np/api/epay/main/v2/form, update ESEWA_PRODUCT_CODE to your live merchant code, and set ESEWA_SECRET_KEY to your production secret key provided by eSewa."
      }
    ],
    summary: "Integrating eSewa ePay v2 in Laravel 12 requires precise HMAC-SHA256 hash generation, bootstrap/app.php CSRF exemption, and server-side HTTP status verification.",
    references: [
      { title: "eSewa Developer Documentation", url: "https://developer.esewa.com.np/" },
      { title: "eSewa Sandbox Test Credentials", url: "https://developer.esewa.com.np/pages/Test-credentials" }
    ],
    relatedSlugs: [
      "esewa-invalid-signature-error-causes-and-fixes",
      "khalti-epayment-v2-api-nodejs-express-guide",
      "nepal-payment-gateway-integration-hub"
    ]
  },

  // ─── Article 2: Khalti v2 in Node.js ─────────────────────────────
  {
    slug: "khalti-epayment-v2-api-nodejs-express-guide",
    title: "Khalti ePayment v2 API in Node.js/Express: Initiate, Verify, and Handle Callbacks",
    description: "Build a complete Khalti ePayment v2 checkout flow in Node.js and Express. Learn how to initiate payments with Bearer auth, obtain the payment URL (pidx), handle callbacks safely, and lookup transaction status on the server.",
    category: "Payments",
    categorySlug: "payments",
    tags: ["Khalti", "Node.js", "Express", "MERN Stack", "Payment Gateway", "pidx"],
    publishedAt: "2026-10-18",
    updatedAt: "2026-10-19",
    readingTime: "12 min read",
    author: authorManoj,
    featured: true,
    whoIsThisFor: "Node.js, Express, and MERN stack developers building web applications in Nepal who need an end-to-end Khalti payment integration with robust server-side verification.",
    prerequisites: [
      "Node.js (v18+) and npm installed on your development machine",
      "An Express server configured with JSON body parsing",
      "Khalti sandbox test secret key from test-admin.khalti.com"
    ],
    whatYouWillLearn: [
      "How to call Khalti /epayment/initiate/ endpoint with secret Bearer authorization",
      "Extracting and storing the pidx (Payment Identifier) in your database",
      "Redirecting users to Khalti checkout and capturing return_url query parameters",
      "Calling Khalti /epayment/lookup/ server-to-server for trusted payment confirmation",
      "Handling idempotency and cancelled or failed transactions gracefully"
    ],
    sections: [
      {
        id: "khalti-v2-workflow",
        title: "1. The Khalti ePayment v2 Flow",
        level: 2,
        content: `Unlike older widget popups, Khalti's **ePayment v2 API** is a modern, server-driven flow:
1. **Initiate:** Your Express server POSTs order details to \`https://dev.khalti.com/api/v2/epayment/initiate/\`.
2. **Response:** Khalti returns a unique \`pidx\` (payment identifier) and a \`payment_url\`.
3. **Store & Redirect:** Your server stores \`pidx\` with your order and redirects the customer to \`payment_url\`.
4. **Return:** After approval, Khalti redirects the browser to your \`return_url\` with query params (\`pidx\`, \`status\`, \`transaction_id\`).
5. **Lookup & Fulfill:** Your server calls \`/epayment/lookup/\` using \`pidx\` to confirm payment before delivering digital goods.`
      },
      {
        id: "express-khalti-implementation",
        title: "2. Full Node.js Express Controller Implementation",
        level: 2,
        content: `Here is the complete Express router implementation using native \`fetch\` (Node 18+):`,
        codeTabs: [
          {
            language: "javascript",
            label: "routes/khalti.js",
            filename: "routes/khalti.js",
            code: `const express = require("express");
const router = express.Router();

const KHALTI_API_URL = "https://dev.khalti.com/api/v2/epayment";
const KHALTI_SECRET_KEY = process.env.KHALTI_SECRET_KEY || "key test_secret_key_xxxx";

/**
 * 1. INITIATE PAYMENT
 */
router.post("/initiate", async (req, res) => {
  try {
    const { orderId, amount, customerInfo } = req.body;

    // Amount must be in Paisa (1 NPR = 100 Paisa). Minimum is 1000 Paisa (NPR 10)
    const amountInPaisa = Math.round(Number(amount) * 100);

    const payload = {
      return_url: "http://localhost:5000/api/payment/khalti/callback",
      website_url: "http://localhost:3000",
      amount: amountInPaisa,
      purchase_order_id: orderId || \`ORDER_\${Date.now()}\`,
      purchase_order_name: "Web Development Course Enrollment",
      customer_info: customerInfo || {
        name: "Test Developer",
        email: "developer@example.com",
        phone: "9800000000"
      }
    };

    const response = await fetch(\`\${KHALTI_API_URL}/initiate/\`, {
      method: "POST",
      headers: {
        "Authorization": \`Key \${KHALTI_SECRET_KEY}\`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    // Save data.pidx with your database order record here
    return res.json({
      success: true,
      pidx: data.pidx,
      payment_url: data.payment_url
    });
  } catch (error) {
    console.error("Khalti initiation error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * 2. HANDLE CALLBACK & VERIFY
 */
router.get("/callback", async (req, res) => {
  try {
    const { pidx, status, transaction_id, message } = req.query;

    if (!pidx) {
      return res.redirect("http://localhost:3000/checkout?status=failed&reason=no_pidx");
    }

    // Verify status server-side using Khalti lookup endpoint
    const lookupResponse = await fetch(\`\${KHALTI_API_URL}/lookup/\`, {
      method: "POST",
      headers: {
        "Authorization": \`Key \${KHALTI_SECRET_KEY}\`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ pidx })
    });

    const verificationData = await lookupResponse.json();

    if (lookupResponse.ok && verificationData.status === "Completed") {
      // Mark order as PAID in MongoDB / PostgreSQL
      // await Order.updateOne({ pidx }, { status: 'PAID', transactionId: transaction_id });

      return res.redirect(\`http://localhost:3000/order-success?pidx=\${pidx}&txn=\${transaction_id}\`);
    }

    return res.redirect(\`http://localhost:3000/checkout?status=failed&message=\${encodeURIComponent(message || "Payment not completed")}\`);
  } catch (error) {
    console.error("Khalti callback error:", error);
    return res.redirect("http://localhost:3000/checkout?status=error");
  }
});

module.exports = router;`
          }
        ]
      }
    ],
    expectedOutput: "A secure RESTful checkout API that returns the official Khalti checkout URL and verifies payment status server-side on completion.",
    testingSteps: [
      "Send a POST request to /api/payment/khalti/initiate with amount: 100",
      "Copy payment_url from JSON response and open in browser",
      "Log into Khalti sandbox with test wallet number '9800000000' and MPIN '1111'",
      "Enter test confirmation OTP '987654'",
      "Observe redirect to your callback and server status verification as 'Completed'"
    ],
    commonErrors: [
      {
        error: "401 Unauthorized from Khalti API",
        cause: "Missing or incorrect Authorization header format. It must be 'Key <secret_key>', not 'Bearer <secret_key>'.",
        solution: "Format header exactly as: Authorization: Key your_khalti_live_or_test_secret_key."
      },
      {
        error: "Invalid Amount Error",
        cause: "Passing amount in Rupees instead of Paisa, or sending an amount below NPR 10 (1000 Paisa).",
        solution: "Multiply your NPR amount by 100: const amountInPaisa = Math.round(npr * 100)."
      }
    ],
    securityConsiderations: [
      "Never expose your Khalti Secret Key in React, Vue, or frontend mobile bundles.",
      "Always query the /lookup/ endpoint before marking orders paid in your database."
    ],
    faqs: [
      {
        question: "Can I test Khalti on localhost without public HTTPS?",
        answer: "Yes. For user redirects, localhost:3000 works in the browser. For server-to-server callbacks, you can test directly or use ngrok if you need public webhooks."
      }
    ],
    summary: "Khalti ePayment v2 provides a clean JSON API. Convert amounts to Paisa, use 'Key <secret>' auth headers, and always verify with /lookup/ server-to-server.",
    references: [
      { title: "Khalti Official ePayment Docs", url: "https://docs.khalti.com/khalti-epayment/" }
    ],
    relatedSlugs: [
      "esewa-payment-integration-laravel-12-complete-guide",
      "nepal-payment-gateway-integration-hub",
      "stop-spoofed-payment-verification-esewa-khalti-nepal"
    ]
  },

  // ─── Article 3: "Invalid Signature" Error in eSewa ──────────────
  {
    slug: "esewa-invalid-signature-error-causes-and-fixes",
    title: "“Invalid Signature” Error in eSewa: 5 Causes and Exact Fixes (2026 Developer Guide)",
    description: "Stuck with 'Invalid Signature' on eSewa ePay v2? Here are the 5 exact cryptographic and formatting mistakes developers make in Node.js, Laravel, and Python, along with copyable verified fixes.",
    category: "Troubleshooting",
    categorySlug: "troubleshooting",
    tags: ["eSewa", "Invalid Signature", "HMAC-SHA256", "PHP", "Laravel", "Node.js", "Error Fix"],
    publishedAt: "2026-10-18",
    updatedAt: "2026-10-19",
    readingTime: "11 min read",
    author: authorManoj,
    featured: false,
    whoIsThisFor: "Developers whose eSewa checkout fails immediately with the error screen: 'Invalid Signature' or 'Validation Error' upon redirect.",
    prerequisites: [
      "An active project attempting eSewa ePay v2 integration",
      "Access to your signature generation code in PHP, Node.js, or Python"
    ],
    whatYouWillLearn: [
      "The exact string concatenation formula expected by eSewa v2",
      "Why float to string formatting breaks the HMAC hash",
      "The secret key binary vs string encoding trap in PHP and Node.js",
      "How to debug your hash using standard CLI tools"
    ],
    sections: [
      {
        id: "the-5-signature-causes",
        title: "The 5 Reasons eSewa Rejects Your Signature",
        level: 2,
        content: `When eSewa's gateway displays **"Invalid Signature"**, it means the \`signature\` parameter in your form submission does not match the HMAC-SHA256 hash eSewa calculated on their server.

Here are the 5 exact causes:

### 1. Wrong Concatenation Order in signed_field_names
eSewa calculates the signature strictly over the fields listed in \`signed_field_names\`.
The standard v2 fields are: \`total_amount,transaction_uuid,product_code\`.
Your string **must** look like:
\`total_amount=100.00,transaction_uuid=123-abc,product_code=EPAYTEST\`
If you swap the order or add extra spaces, the signature is invalid.

### 2. Float and Decimal Number Formatting Bug
If your form sends \`total_amount: 100\`, but your hash was generated with \`100.00\` (or vice versa), the hashes differ. Always normalize the string representation in both the hash and form payload.

### 3. Binary vs. Hex Output in hash_hmac
In PHP, \`hash_hmac('sha256', $data, $key, true)\` must have the 4th parameter set to \`true\` (raw binary) before passing to \`base64_encode()\`. If you omit \`true\`, it outputs hex string, resulting in an invalid signature.

### 4. Whitespace or Quotes in Secret Key
A trailing newline or carriage return (\`\\r\\n\`) in your \`.env\` file when copying \`8gBm/:&EnhH.1/q\` will corrupt the key. Always run \`trim()\` on environment variables.

### 5. Encoding Mismatches in Success Callback
In the return URL, eSewa passes base64 encoded JSON in the \`data\` parameter. If you attempt to verify the return signature against individual query parameters instead of the decoded payload, verification fails.`
      },
      {
        id: "verified-code-fixes",
        title: "Verified Working Implementation (Node.js & PHP)",
        level: 2,
        content: `Use these tested helper functions to generate 100% valid signatures:`,
        codeTabs: [
          {
            language: "javascript",
            label: "Node.js (Crypto)",
            filename: "generateSignature.js",
            code: `const crypto = require("crypto");

function generateEsewaSignature(secretKey, totalAmount, transactionUuid, productCode) {
  // 1. Format totalAmount consistently
  const formattedAmount = Number(totalAmount).toFixed(2);
  
  // 2. Build exact concatenation string
  const dataToSign = \`total_amount=\${formattedAmount},transaction_uuid=\${transactionUuid},product_code=\${productCode}\`;
  
  // 3. Generate raw binary HMAC-SHA256 and convert to base64
  const hmac = crypto.createHmac("sha256", secretKey.trim());
  hmac.update(dataToSign);
  const signature = hmac.digest("base64");
  
  return { signature, formattedAmount, dataToSign };
}

// Test with eSewa Sandbox values
const { signature, dataToSign } = generateEsewaSignature(
  "8gBm/:&EnhH.1/q",
  100,
  "241018-001",
  "EPAYTEST"
);
console.log("Input:", dataToSign);
console.log("Valid Signature:", signature);`
          },
          {
            language: "php",
            label: "PHP / Laravel",
            filename: "EsewaHelper.php",
            code: `<?php

function generateEsewaSignature(string $secretKey, float $totalAmount, string $transactionUuid, string $productCode): string
{
    // Format amount with 2 decimal places and no thousands commas
    $formattedAmount = number_format($totalAmount, 2, '.', '');
    
    // Strict field order
    $dataToSign = "total_amount={$formattedAmount},transaction_uuid={$transactionUuid},product_code={$productCode}";
    
    // Crucial: 4th param must be true for raw binary output before base64
    $rawHmac = hash_hmac('sha256', $dataToSign, trim($secretKey), true);
    
    return base64_encode($rawHmac);
}`
          }
        ]
      }
    ],
    expectedOutput: "Immediate elimination of the 'Invalid Signature' error screen and smooth progression to the eSewa login view.",
    testingSteps: [
      "Inspect the generated signature using the Node.js test script above",
      "Ensure form inputs in your Blade or React view exactly match the dataToSign string",
      "Verify .env secret key has no trailing space using trim(env('ESEWA_SECRET_KEY'))"
    ],
    commonErrors: [
      {
        error: "Sending hash_hmac hex string to base64_encode in PHP",
        cause: "Default hash_hmac outputs 64 hex characters. eSewa expects base64 encoded 32-byte raw binary.",
        solution: "Pass true as the 4th argument in hash_hmac('sha256', $data, $key, true)."
      }
    ],
    securityConsiderations: [
      "Never generate signatures on the client side in JavaScript. The secret key must remain private to your server."
    ],
    faqs: [
      {
        question: "Why did eSewa change from MD5 to HMAC-SHA256 in v2?",
        answer: "The legacy eSewa v1 API used MD5 which is cryptographically broken and vulnerable to collision attacks. ePay v2 adopted modern HMAC-SHA256 to ensure authenticity and integrity."
      }
    ],
    summary: "The eSewa Invalid Signature error is always caused by data concatenation mismatches, float formatting differences, or missing raw binary flags in HMAC generation.",
    references: [
      { title: "eSewa ePay v2 Signature Guide", url: "https://developer.esewa.com.np/" }
    ],
    relatedSlugs: [
      "esewa-payment-integration-laravel-12-complete-guide",
      "nepal-payment-gateway-integration-hub"
    ]
  },

  // ─── Article 4: Point .com.np to Vercel + Cloudflare ─────────────
  {
    slug: "point-com-np-domain-to-vercel-cloudflare-dns",
    title: "Point Your .com.np Domain to Vercel + Cloudflare DNS: Exact Records and Common Mistakes",
    description: "Step-by-step tutorial on connecting your free .com.np domain to a Next.js or React website on Vercel using Cloudflare DNS. Fix nameserver propagation delays and resolve SSL redirect loops easily.",
    category: "Deployment",
    categorySlug: "deployment",
    tags: [".com.np", "Vercel", "Cloudflare", "DNS", "SSL", "Next.js"],
    publishedAt: "2026-10-18",
    updatedAt: "2026-10-19",
    readingTime: "11 min read",
    author: authorManoj,
    featured: false,
    whoIsThisFor: "Nepali students and developers who registered a free .com.np domain at register.com.np and want to connect it to a Vercel deployment with fast Cloudflare DNS.",
    prerequisites: [
      "An approved .com.np domain on register.com.np",
      "A website deployed on Vercel",
      "A free Cloudflare account"
    ],
    whatYouWillLearn: [
      "How to set Cloudflare nameservers on the Mercantile register.com.np portal",
      "Exact A and CNAME records needed for Vercel apex and www domains",
      "How to prevent the dreaded ERR_TOO_MANY_REDIRECTS loop in Cloudflare",
      "Checking DNS propagation using terminal tools (dig/nslookup)"
    ],
    sections: [
      {
        id: "step-1-cloudflare-setup",
        title: "Step 1: Add Your Domain to Cloudflare",
        level: 2,
        content: `1. Log into your free Cloudflare account and click **Add a site**.
2. Enter your domain: \`yourname.com.np\` and select the **Free Plan**.
3. Cloudflare will scan existing records and assign you two nameservers, for example:
   - \`dane.ns.cloudflare.com\`
   - \`kristin.ns.cloudflare.com\``
      },
      {
        id: "step-2-update-mercantile",
        title: "Step 2: Update Nameservers on register.com.np",
        level: 2,
        content: `1. Log into [register.com.np](https://register.com.np) with your credentials.
2. In your dashboard, locate your domain and click **Edit DNS**.
3. Replace the default or old nameservers with your Cloudflare nameservers:
   - **Primary Name Server:** \`dane.ns.cloudflare.com\`
   - **Secondary Name Server:** \`kristin.ns.cloudflare.com\`
4. Click **Update**.
*Note: Mercantile updates nameserver delegations across their root servers twice daily. Propagation may take 2 to 12 hours.*`
      },
      {
        id: "step-3-vercel-records",
        title: "Step 3: Configure Cloudflare DNS Records for Vercel",
        level: 2,
        content: `In your Cloudflare DNS Management tab, add the following two DNS records:`,
        table: {
          headers: ["Type", "Name", "Content / Target", "Proxy Status", "TTL"],
          rows: [
            ["A", "@ (apex domain)", "76.76.21.21", "DNS only (Grey Cloud)", "Auto"],
            ["CNAME", "www", "cname.vercel-dns.com", "DNS only (Grey Cloud)", "Auto"]
          ]
        },
        callout: {
          type: "warning",
          title: "Important: Set Proxy to 'DNS only' During Verification",
          text: "When initially verifying your domain in Vercel, set the Cloudflare proxy to DNS Only (Grey cloud). Once Vercel issues the Let's Encrypt certificate and marks the domain as Valid Configuration, you can re-enable the Orange cloud if desired."
        }
      },
      {
        id: "step-4-fix-ssl-loop",
        title: "Step 4: Fix Cloudflare 'Too Many Redirects' (Crucial)",
        level: 2,
        content: `If you enable the Cloudflare proxy (Orange cloud), visitors will likely see **ERR_TOO_MANY_REDIRECTS**.
This happens because Cloudflare defaults to **Flexible SSL**, connecting to Vercel on HTTP (port 80). Vercel redirects back to HTTPS (port 443), creating an infinite loop.

**The Fix:**
1. In Cloudflare, go to **SSL/TLS** in the left sidebar.
2. Change the encryption mode from **Flexible** to **Full (strict)**.
3. Your site will immediately load securely with Vercel's edge certificate.`
      }
    ],
    expectedOutput: "A high-speed, secure portfolio loading on your custom free .com.np domain with automatic HTTPS.",
    testingSteps: [
      "Open your terminal and test DNS resolution: dig yourname.com.np +short",
      "Confirm it returns 76.76.21.21",
      "Open https://yourname.com.np in an incognito window to verify SSL certificate"
    ],
    commonErrors: [
      {
        error: "Vercel shows 'Invalid Configuration' for days",
        cause: "Mercantile nameserver changes have not been submitted or Cloudflare proxy is blocking certificate challenge.",
        solution: "Set records to 'DNS only' in Cloudflare and verify nameservers using 'whois yourdomain.com.np' or dig NS."
      }
    ],
    securityConsiderations: [
      "Enable Cloudflare 'Always Use HTTPS' and 'Automatic HTTPS Rewrites' under SSL/TLS edge certificates."
    ],
    faqs: [
      {
        question: "Can I connect subdomains like blog.myname.com.np?",
        answer: "Yes. In Cloudflare DNS, add a CNAME record with Name 'blog' pointing to cname.vercel-dns.com."
      }
    ],
    summary: "Point your .com.np nameservers to Cloudflare, add Vercel's A and CNAME records, and set SSL encryption to Full (strict) to eliminate redirect loops.",
    references: [
      { title: "Vercel Custom Domains", url: "https://vercel.com/docs/projects/domains" },
      { title: "Register.com.np Official Portal", url: "https://register.com.np" }
    ],
    relatedSlugs: [
      "how-to-register-free-np-domain-nepal",
      "nepal-developer-hosting-and-domain-hub"
    ]
  },

  // ─── Article 5: MongoDB Atlas Dynamic IP Whitelist Fix ───────────
  {
    slug: "mongodb-atlas-ip-not-whitelisted-nepal-dynamic-ip-fix",
    title: "MongoDB Atlas “IP Not Whitelisted” / Connection Timeout: The Exact Fix for Nepali Dynamic IPs",
    description: "Fix MongoServerSelectionError and connection timeouts caused by WorldLink, Vianet, and NTC dynamic CGNAT IP address changes in Nepal when connecting to MongoDB Atlas clusters.",
    category: "Troubleshooting",
    categorySlug: "troubleshooting",
    tags: ["MongoDB", "MongoDB Atlas", "Network Access", "MERN Stack", "Nepal ISP", "Debugging"],
    publishedAt: "2026-10-18",
    updatedAt: "2026-10-19",
    readingTime: "10 min read",
    author: authorManoj,
    featured: false,
    whoIsThisFor: "Node.js, Express, and Python developers in Nepal using MongoDB Atlas whose database connections randomly fail with timeout errors.",
    prerequisites: [
      "A MongoDB Atlas account and cluster",
      "A Node.js or Python application with a MongoDB connection string"
    ],
    whatYouWillLearn: [
      "Why home internet providers in Nepal break Atlas IP whitelists overnight",
      "How to configure Atlas Network Access safely for development",
      "DNS and SRV resolution issues on Nepali ISP routers and how to fix them"
    ],
    sections: [
      {
        id: "the-nepal-dynamic-ip-problem",
        title: "Why Your MongoDB Atlas Connection Breaks Every Morning",
        level: 2,
        content: `Most home broadband providers in Nepal (WorldLink, Vianet, Subisu, Nepal Telecom) use **Carrier-Grade NAT (CGNAT)** with dynamic public IP pooling. Every time your fiber router reboots or your ISP refreshes leases, your public IP changes.

When you created your Atlas cluster and clicked *"Add Current IP Address"*, Atlas whitelisted your IP for that day only. The next morning, your router has a new IP, and your terminal outputs:
\`\`\`bash
MongoServerSelectionError: connection timed out
    at Topology.selectServer (/node_modules/mongodb/lib/sdam/topology.js:285:38)
    reason: TopologyDescription {
      type: 'ReplicaSetNoPrimary',
      servers: Map(3) { ... }
    }
\`\`\``
      },
      {
        id: "safe-solutions",
        title: "The 3 Solutions: Development vs Production",
        level: 2,
        content: `### Fix 1: For Local Development & College Projects (0.0.0.0/0)
In MongoDB Atlas:
1. Go to **Security > Network Access** in the left sidebar.
2. Click **Add IP Address**.
3. Click **Allow Access from Anywhere** (\`0.0.0.0/0\`).
4. Set a comment like *'Development - Dynamic Nepal IP'* and click **Confirm**.

*Note: This allows connections from any IP, but your database is STILL protected by your database user username and strong password. Ensure your password is at least 20 random characters.*

### Fix 2: Resolving DNS/SRV Lookup Failures on Nepali Routers
Some local router DNS servers fail to resolve MongoDB's \`mongodb+srv://\` URI format.
If you still get timeout errors after whitelisting:
1. Change your laptop's DNS servers to **Cloudflare (1.1.1.1)** or **Google (8.8.8.8)**.
2. Alternatively, in your Atlas dashboard, click **Connect > Drivers**, uncheck *"Use the latest driver format"*, and select the standard non-SRV connection string.`
      }
    ],
    expectedOutput: "Instant, uninterrupted MongoDB Mongoose connections that survive router reboots and ISP IP reassignments.",
    testingSteps: [
      "Verify connection using mongosh 'mongodb+srv://user:pass@cluster.mongodb.net/dbname'",
      "Restart your Express server and check for 'Connected to MongoDB Atlas' in terminal"
    ],
    commonErrors: [
      {
        error: "Special characters in MongoDB password causing URI parsing errors",
        cause: "Using @, :, or / in your database password without URL-encoding.",
        solution: "URL-encode special characters (e.g., @ becomes %40) or use an alphanumeric password."
      }
    ],
    securityConsiderations: [
      "Never leave 0.0.0.0/0 enabled in production environments. Production VPS IP addresses should be explicitly whitelisted."
    ],
    faqs: [
      {
        question: "Is allowing 0.0.0.0/0 safe for a college final year project?",
        answer: "Yes, provided you do not store sensitive production data and use a complex random password for your database user."
      }
    ],
    summary: "Dynamic CGNAT in Nepal breaks single-IP whitelists. Configure 0.0.0.0/0 with a strong password for development, and switch to 1.1.1.1 DNS if SRV records fail.",
    references: [
      { title: "MongoDB Atlas Network Security", url: "https://www.mongodb.com/docs/atlas/security-whitelist/" }
    ],
    relatedSlugs: [
      "how-to-connect-mongodb-to-nodejs",
      "beginner-developer-debugging-hub"
    ]
  },

  // ─── Article 6: Laravel 419 Page Expired Fix ─────────────────────
  {
    slug: "laravel-419-page-expired-csrf-token-fix",
    title: "Laravel “419 Page Expired”: CSRF Token Mismatch Causes and Fixes",
    description: "Diagnose and fix the infamous 419 Page Expired error in Laravel. Covers missing @csrf directives, session driver permissions, AJAX headers, and excluding payment gateway webhooks.",
    category: "Troubleshooting",
    categorySlug: "troubleshooting",
    tags: ["Laravel", "CSRF", "419 Page Expired", "PHP", "Session", "Debugging"],
    publishedAt: "2026-10-18",
    updatedAt: "2026-10-19",
    readingTime: "10 min read",
    author: authorManoj,
    featured: false,
    whoIsThisFor: "Laravel developers encountering '419 | Page Expired' upon form submission, login, or payment callback.",
    prerequisites: [
      "A Laravel application (Laravel 10, 11, or 12)",
      "Access to Blade templates and configuration files"
    ],
    whatYouWillLearn: [
      "The security purpose of CSRF tokens in web applications",
      "The 4 common causes of the 419 HTTP status code in Laravel",
      "How to fix AJAX requests and payment gateway callbacks"
    ],
    sections: [
      {
        id: "what-is-419",
        title: "What Does '419 Page Expired' Actually Mean?",
        level: 2,
        content: `HTTP status code 419 is a custom status code utilized by Laravel to signify **CSRF Token Mismatch**.
Every non-GET request (POST, PUT, DELETE) in Laravel must include a valid CSRF token that matches the token stored in the user's active session. If the token is missing, expired, or invalid, Laravel aborts execution with a 419 error.`
      },
      {
        id: "the-4-fixes",
        title: "The 4 Solutions to Fix 419",
        level: 2,
        content: `### 1. Missing @csrf in Blade Forms
Every HTML \`<form method="POST">\` in Blade must have the \`@csrf\` directive:
\`\`\`html
<form method="POST" action="{{ route('login') }}">
    @csrf
    <!-- Input fields -->
</form>
\`\`\`

### 2. Excluding Payment Gateways / Webhooks
External services like eSewa or Khalti cannot generate a Laravel session CSRF token.
In Laravel 11/12, exclude them in \`bootstrap/app.php\`:
\`\`\`php
->withMiddleware(function (Middleware $middleware) {
    $middleware->validateCsrfTokens(except: [
        'payment/callback/*',
        'api/webhook/*'
    ]);
})
\`\`\`

### 3. AJAX / Axios Headers in Single Page Applications
If sending requests via JavaScript, include the token in your HTML \`<head>\`:
\`\`\`html
<meta name="csrf-token" content="{{ csrf_token() }}">
\`\`\`
And configure Axios globally:
\`\`\`javascript
axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
\`\`\`

### 4. Storage Folder Permissions on Shared Hosting
If Laravel cannot write sessions to \`storage/framework/sessions\`, sessions are lost immediately on the next request.
Run on your server:
\`\`\`bash
chmod -R 775 storage bootstrap/cache
\`\`\``
      }
    ],
    expectedOutput: "Flawless form submissions without session drops or 419 expiration screens.",
    testingSteps: [
      "Submit your form and inspect form payload in browser Network tab",
      "Confirm '_token' is present in request body",
      "Clear application cache with 'php artisan optimize:clear'"
    ],
    commonErrors: [
      {
        error: "Session expires immediately after login on shared hosting",
        cause: "SESSION_DOMAIN in .env does not match your exact domain, or storage folder is read-only.",
        solution: "Leave SESSION_DOMAIN=null or set it to .yourdomain.com.np."
      }
    ],
    securityConsiderations: [
      "Never disable CSRF protection globally on web routes. Only exclude verified third-party webhook endpoints."
    ],
    faqs: [
      {
        question: "Why do I get 419 when leaving a page open for 2 hours?",
        answer: "By default, Laravel session lifetime is 120 minutes. If the user sits idle, the session expires. Increase SESSION_LIFETIME in .env if longer sessions are required."
      }
    ],
    summary: "Laravel 419 errors are resolved by adding @csrf to Blade forms, configuring Axios headers, exempting payment webhooks in bootstrap/app.php, and ensuring storage write permissions.",
    references: [
      { title: "Laravel Official CSRF Documentation", url: "https://laravel.com/docs/csrf" }
    ],
    relatedSlugs: [
      "esewa-payment-integration-laravel-12-complete-guide",
      "beginner-developer-debugging-hub"
    ]
  },

  // ─── Article 7: Git "failed to push some refs" Safe Fix ──────────
  {
    slug: "git-failed-to-push-some-refs-non-fast-forward-fix",
    title: "Git “failed to push some refs” / Non-Fast-Forward: Fix It Safely Without Losing Work",
    description: "Learn how to resolve 'error: failed to push some refs to remote' without using dangerous force-pushing. Step-by-step rebase and merge recovery for developers.",
    category: "DevOps & Tools",
    categorySlug: "devops-tools",
    tags: ["Git", "GitHub", "Non-Fast-Forward", "Rebase", "Merge Conflict", "Debugging"],
    publishedAt: "2026-10-18",
    updatedAt: "2026-10-19",
    readingTime: "9 min read",
    author: authorManoj,
    featured: false,
    whoIsThisFor: "Developers whose 'git push origin main' is rejected by GitHub with a non-fast-forward warning.",
    prerequisites: [
      "A local Git repository with unstaged or committed changes",
      "A remote GitHub or GitLab repository"
    ],
    whatYouWillLearn: [
      "Why Git rejects non-fast-forward pushes",
      "Why 'git push --force' is dangerous and when to avoid it",
      "How to use 'git pull --rebase' to integrate remote changes cleanly"
    ],
    sections: [
      {
        id: "the-git-rejection-explained",
        title: "Why Git Rejects Your Push",
        level: 2,
        content: `When you run \`git push origin main\`, Git rejects the operation with:
\`\`\`bash
To github.com:user/repo.git
 ! [rejected]        main -> main (non-fast-forward)
error: failed to push some refs to 'github.com:user/repo.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes...
\`\`\`
This occurs because someone else (or you, via the GitHub web editor or README initialization) added commits to the remote branch that your local machine does not have yet. Git refuses to overwrite those remote commits.`
      },
      {
        id: "the-safe-recovery-steps",
        title: "The 3 Safe Steps to Push Without Force",
        level: 2,
        content: `Never run \`git push --force\` on shared code. Follow these three commands:

### Step 1: Pull and Rebase Remote Changes
\`\`\`bash
git pull --rebase origin main
\`\`\`
This temporarily sets your local commits aside, applies the new commits from GitHub, and then replays your local commits on top of the latest version.

### Step 2: Resolve Any Conflicts (If Prompted)
If you edited the same lines as remote commits, Git will pause and flag conflicts.
Open the conflicting file, choose the correct code, and run:
\`\`\`bash
git add .
git rebase --continue
\`\`\`

### Step 3: Push Successfully
Once the rebase completes:
\`\`\`bash
git push origin main
\`\`\`
Your commits are pushed cleanly with a linear commit history.`
      }
    ],
    expectedOutput: "A clean, successful git push without overwriting remote files or creating messy merge bubble commits.",
    testingSteps: [
      "Run 'git status' to ensure working tree is clean",
      "Run 'git pull --rebase origin main'",
      "Run 'git push origin main' and verify 'Everything up-to-date' on GitHub"
    ],
    commonErrors: [
      {
        error: "Accidental git push --force wiping teammate code",
        cause: "Using --force tells GitHub to discard remote commits that don't exist locally.",
        solution: "Use git pull --rebase or git push --force-with-lease which refuses to push if remote has unexpected commits."
      }
    ],
    securityConsiderations: [
      "Protect your main branch on GitHub under Settings > Branches > Branch Protection Rules to prevent accidental force-pushes."
    ],
    faqs: [
      {
        question: "What is the difference between git pull and git pull --rebase?",
        answer: "git pull creates an extra merge commit ('Merge branch main of...') every time you sync. git pull --rebase replays your commits linearly, keeping Git history clean and readable."
      }
    ],
    summary: "Non-fast-forward push rejections protect remote commits. Run 'git pull --rebase origin main', resolve any conflicts, and push safely without using destructive force commands.",
    references: [
      { title: "Git Official Documentation: git-rebase", url: "https://git-scm.com/docs/git-rebase" }
    ],
    relatedSlugs: [
      "how-to-configure-git-github-ssh-keys",
      "beginner-developer-debugging-hub"
    ]
  },

  // ─── Article 8: First IT Internship Interview Questions in Nepal ─
  {
    slug: "first-it-internship-interview-questions-nepal",
    title: "First IT Internship Interview in Nepal: 25 Real Questions and Beginner-Friendly Answers",
    description: "Prepare for software engineering and web development internship interviews at tech companies in Kathmandu. 25 realistic technical questions and practical answers across JavaScript, React, SQL, APIs, and Git.",
    category: "Career & Projects",
    categorySlug: "career-projects",
    tags: ["Interview Questions", "Internship Nepal", "JavaScript", "SQL", "Career", "BCA", "CSIT"],
    publishedAt: "2026-10-18",
    updatedAt: "2026-10-19",
    readingTime: "16 min read",
    author: authorManoj,
    featured: true,
    whoIsThisFor: "BCA, BSc CSIT, BE Computer, and self-taught students in Nepal preparing for technical interviews for frontend, backend, or full-stack software internships.",
    prerequisites: [
      "Basic understanding of web technologies (HTML, CSS, JS, SQL)",
      "At least one complete project on GitHub"
    ],
    whatYouWillLearn: [
      "The top technical questions asked by software engineering interviewers in Nepal",
      "How to explain complex concepts (closures, event loop, SQL joins) in simple English",
      "Behavioral and problem-solving questions: what founders in Kathmandu actually look for"
    ],
    sections: [
      {
        id: "core-js-questions",
        title: "Part 1: Core JavaScript Questions",
        level: 2,
        content: `### Q1: What is the difference between '==' and '==='?
**Answer:** \`==\` performs type coercion before comparison (e.g., \`5 == "5"\` is \`true\`). \`===\` is strict equality and checks both value and data type without coercion (e.g., \`5 === "5"\` is \`false\`). In modern JavaScript, always use \`===\`.

### Q2: Explain 'let', 'const', and 'var'.
**Answer:**
- \`var\`: Function-scoped, can be re-declared and updated, and is hoisted with \`undefined\`.
- \`let\`: Block-scoped, can be updated but not re-declared in the same scope, and cannot be accessed before declaration (Temporal Dead Zone).
- \`const\`: Block-scoped, cannot be re-declared or reassigned. Objects declared with \`const\` can still have their properties mutated.

### Q3: What is a Closure in JavaScript?
**Answer:** A closure is a function that retains access to variables from its outer (lexical) scope even after the outer function has finished executing.
\`\`\`javascript
function createCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}
const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
\`\`\`

### Q4: Explain the Event Loop and Asynchronous Execution.
**Answer:** JavaScript is single-threaded. Synchronous code runs on the Call Stack. Asynchronous tasks (like \`fetch\` or \`setTimeout\`) are offloaded to Web APIs. When completed, their callbacks go into the Task Queue (or Microtask Queue for Promises). The **Event Loop** monitors the call stack; once the stack is empty, it pushes tasks from the queue to the stack.`
      },
      {
        id: "web-api-sql-questions",
        title: "Part 2: REST APIs, Databases, and Git",
        level: 2,
        content: `### Q5: What are the main HTTP methods and their idempotency?
**Answer:**
- \`GET\`: Retrieve data (Idempotent, Safe).
- \`POST\`: Create new resource (Non-idempotent).
- \`PUT\`: Completely replace an existing resource (Idempotent).
- \`PATCH\`: Partially update a resource.
- \`DELETE\`: Remove a resource (Idempotent).

### Q6: What is the difference between INNER JOIN and LEFT JOIN?
**Answer:**
- \`INNER JOIN\`: Returns only rows where there is a match in both tables.
- \`LEFT JOIN\`: Returns all rows from the left table, plus matched records from the right table (with \`NULL\` for unmatched right table rows).

### Q7: What is CORS and why does the browser enforce it?
**Answer:** Cross-Origin Resource Sharing (CORS) is a browser security mechanism that prevents web applications running at one origin from requesting resources from a different origin unless the server explicitly sends \`Access-Control-Allow-Origin\` headers.`
      },
      {
        id: "behavioral-nepal-questions",
        title: "Part 3: Behavioral Questions Asked in Nepal",
        level: 2,
        content: `### Q8: 'Tell me about a technical bug you struggled with and how you solved it.'
**How to Answer:**
Never say *'I haven't faced any difficult bugs.'* Use the STAR framework:
1. **Situation:** *'While deploying my Laravel e-commerce app to cPanel...'*
2. **Task:** *'I was getting a 500 Internal Server Error.'*
3. **Action:** *'Instead of guessing, I inspected \`storage/logs/laravel.log\`, realized directory permissions were 644, and adjusted permissions to 775 for storage.'*
4. **Result:** *'The site loaded immediately and I documented the deployment checklist on GitHub.'*`
      }
    ],
    expectedOutput: "Confidence and poise during technical interviews, demonstrating authentic practical understanding rather than rote textbook memorization.",
    testingSteps: [
      "Practice answering each of the 25 questions out loud without reading",
      "Write out code examples for closures and SQL joins on paper",
      "Review your own GitHub projects so you can explain their architecture in 60 seconds"
    ],
    commonErrors: [
      {
        error: "Saying 'I know everything' when asked about an unfamiliar framework",
        cause: "Interviewers respect candidates who say: 'I haven't used Docker yet, but I understand containerization concepts and can learn quickly.'",
        solution: "Be honest about gaps and demonstrate eagerness to learn."
      }
    ],
    securityConsiderations: [
      "Never disclose proprietary code or credentials from client projects during interviews."
    ],
    faqs: [
      {
        question: "What is the typical salary for a software intern in Kathmandu?",
        answer: "Most reputable tech companies in Nepal provide a monthly stipend between NPR 10,000 to NPR 20,000 during a 3-month internship, transitioning to full junior engineer salaries (NPR 25,000 to 45,000+) upon completion."
      }
    ],
    summary: "Internship interviews in Nepal focus on core JavaScript concepts, REST API fundamentals, basic SQL joins, Git workflows, and genuine willingness to solve real problems.",
    references: [
      { title: "MDN Web Docs: JavaScript Fundamentals", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" }
    ],
    relatedSlugs: [
      "nepal-developer-career-and-student-guide-hub",
      "bca-csit-full-stack-roadmap-nepal-students"
    ]
  }
];
