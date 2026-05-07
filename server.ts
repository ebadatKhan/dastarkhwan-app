import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

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
