import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";
import Stripe from "stripe";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lazy Stripe Initialization
let stripeClient: Stripe | null = null;
function getStripe() {
  if (!stripeClient) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      console.warn("STRIPE_SECRET_KEY is not defined. Online payment will fail.");
      return null;
    }
    stripeClient = new Stripe(key);
  }
  return stripeClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Stripe Checkout Session Endpoint
  app.post("/api/create-checkout-session", express.json(), async (req, res) => {
    const { bookingData } = req.body;
    const stripe = getStripe();

    if (!stripe) {
      return res.status(500).json({ error: "Stripe is not configured on the server." });
    }

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "pkr",
              product_data: {
                name: `Catering: ${bookingData.packageName}`,
                description: `Event Date: ${bookingData.date} for ${bookingData.guests} guests`,
              },
              unit_amount: Math.round((bookingData.totalCost / bookingData.guests) * 100), // Stripe expects cents/paisa
            },
            quantity: bookingData.guests,
          },
        ],
        mode: "payment",
        success_url: `${req.headers.origin}/checkout?success=true`,
        cancel_url: `${req.headers.origin}/checkout?canceled=true`,
      });

      res.json({ id: session.id, url: session.url });
    } catch (error) {
      console.error("Stripe Session Error:", error);
      res.status(500).json({ error: "Failed to create checkout session" });
    }
  });

  // Mock API for Caterers
  app.get("/api/caterers", (req, res) => {
    res.json([
      {
        id: "1",
        name: "Kitchen Cuisine",
        rating: 4.8,
        reviews: 124,
        pricePerPerson: 1200,
        specialty: "Biryani & BBQ",
        area: "DHA Phase 6",
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=800&auto=format&fit=crop",
        verified: true
      },
      {
        id: "2",
        name: "Abid Caterers",
        rating: 4.9,
        reviews: 540,
        pricePerPerson: 1500,
        specialty: "Traditional Dawat",
        area: "Gulshan-e-Iqbal",
        image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=800&auto=format&fit=crop",
        verified: true
      }
    ]);
  });

  // Mock Email Confirmation
  app.post("/api/send-confirmation", express.json(), (req, res) => {
    const { email, bookingDetails } = req.body;
    console.log(`[EMAIL SIMULATION] Sending confirmation to: ${email}`);
    console.log(`[EMAIL SIMULATION] Details:`, JSON.stringify(bookingDetails, null, 2));
    
    // In a real production app, you would use nodemailer, SendGrid, etc.
    res.json({ success: true, message: "Confirmation email sent successfully (simulated)." });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Dastarrkhwan server running at http://localhost:${PORT}`);
  });
}

startServer();
