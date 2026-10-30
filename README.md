# EZO PRINT STUDIO — Mini Printing Workstation

Professional browser-based thermal printing workstation designed specifically for the **eZo 58D** (and compatible 58 mm / 80 mm POS thermal receipt printers).

---

## 🌟 What's New in this Upgrade

### 🧾 Enhanced Bill / Hotel Receipt Mode (User Requested)
- **Hotel / Store Logo Upload**: Upload any logo image with live threshold & inversion controls for crisp 1-bit thermal output.
- **Vertical Stretch (Double-Height Thermal Typography)**: Selectable **1.0x (Normal)**, **1.2x (Tall/Clear)**, or **1.35x (Double Height)** so printed text is prominently readable and never looks squished.
- **Bold Item Names**: Item names are rendered in bold typeface with automatic word wrapping, keeping quantities, rates, and amounts cleanly aligned in distinct columns.
- **Dynamic GPay / PhonePe / Paytm Payment QR Code**: Enter your merchant UPI ID (e.g. `patilvadapav@okhdfcbank`) and shop name. It dynamically computes a scannable UPI URI with the exact Grand Total (`upi://pay?pa=...&pn=...&am=...&cu=INR`).
- **Marathi & Devanagari Support**: Center-aligned footer supports Marathi text like `Thank you for shopping! पुन्हा या!`.

---

## 🛠️ Complete Suite of 14 Printing Modules

1. **🧾 Bill / Hotel Receipt**: Restaurant billing with logo, bold items, GPay QR, and Marathi footer.
2. **📄 Text & Notes**: Standard text memos, centered titles, and Devanagari text prints.
3. **📱 QR Code Studio**: High-contrast QR codes for Websites, UPI Payments, Wi-Fi credentials, WhatsApp direct chats, and plain text.
4. **🖼️ Photo & Dithering Studio**: Image-to-thermal converter with **Floyd-Steinberg** and **Atkinson** error diffusion dithering, 90°/180°/270° rotation, brightness, and contrast controls.
5. **🏷️ Sticker Maker**: Sticky label presets (Fragile, Handle With Care, Thank You, Homemade) for 30×20, 40×30, and 50×30 mm adhesive rolls.
6. **📊 Barcode & Price Label**: Code-128 and verified EAN-13 barcodes with MRP, discount, and product name.
7. **📑 Bookmark Designer**: Custom quotes, reading tracker checkboxes, and tassel punch guide.
8. **🍳 Kitchen Order Ticket (KOT)**: Token #, Table #, highlighted special instructions (`[NO ONION]`, `[EXTRA SPICY]`), and kitchen expediting tags.
9. **🎟️ Ticket & Token Generator**: Event passes, cinema tickets, and queue tokens with Code-128 barcodes and tear-off stubs.
10. **📅 Daily Planner**: To-do checklist with printable checkboxes `[ ]`, hourly schedule, and habit tracker.
11. **📚 Study Notes Maker**: Revision sheets with markdown-like syntax (`#` header, `*` bullet, formula boxes).
12. **👾 Pixel Art Creator**: Interactive 16×16, 24×24, 32×32 grid editor with pen, eraser, and bucket fill.
13. **💬 Quote Generator**: Pre-loaded Marathi, Hindi, and English quotes with flourish frames.
14. **🎁 Random Surprise**: Instant jokes, fun facts, riddles, fortune cookies, and compliments.

---

## 🚀 How to Run

1. Simply double-click **`index.html`** to open it in **Google Chrome**, **Microsoft Edge**, or **Brave** (Windows or Android).
2. The workstation runs completely in your browser without requiring a Node.js server.
3. Pick any module from the sidebar, customize your text or logo, and see the live thermal preview update instantly.

---

## 🖨️ Printing & Hardware Options

### 1. Standard Browser Printing (Recommended for USB / Windows Driver)
- Click **🖨️ Print Receipt** (or press `Ctrl + P`).
- Select your 58 mm thermal receipt printer driver.
- Set Paper Size to **58mm Roll** or **Roll Paper**.
- Under Margins, choose **None**. The built-in `@page { size: 58mm auto; margin: 0; }` CSS ensures zero scaling or cut-offs.

### 2. Web Serial API (Direct USB / COM Port)
- Click the **Printer Status** badge in the top navigation bar.
- Click **Connect COM Port** to choose your printer's serial port (e.g. `COM3`, `COM5`).
- Send raw ESC/POS commands or test text directly from Chrome/Edge!

### 3. Windows Python Bluetooth SPP Bridge
If your eZo printer is paired via Bluetooth Classic SPP to a COM port (e.g. `COM5`):
```powershell
py -m pip install pyserial
py windows/print_text.py COM5 "TEST PRINT FROM EZO PRINT STUDIO"
```

---

## 📁 Project Structure

```
ezo_print_studio/
├── index.html            # Main self-contained application (Dashboard, Universal Engine, 14 Modules)
├── build_app.js          # Generator script
├── generate_app.js       # Production compiler script
├── README.md             # Workstation documentation
└── windows/
    └── print_text.py     # Python COM-port ESC/POS text print helper
```
