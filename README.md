# EZO PRINT STUDIO — Mini Printing Workstation

Professional browser-based thermal printing workstation designed specifically for the **eZo 58D** (and compatible 58 mm / 80 mm POS thermal receipt printers). Fully responsive across **Windows**, **Android**, and **iOS** mobile devices.

---

## 📱 Mobile & Touch Compatible Features
- **Slide-Over Navigation Drawer**: Smooth off-canvas sidebar triggered by the hamburger button `☰` with a touch backdrop dismiss.
- **Bottom Navigation Bar**: Instant 1-tap switching between **Home**, **Bill POS**, **Live Preview**, **Arcade**, and **All Tools**.
- **Segmented Editor / Live Preview Switcher**: On mobile phones, toggle between editing inputs (`📝 Editor`) and checking the thermal output (`👁️ Live Preview`).
- **Touch-Friendly Controls**: 44px minimum tap targets on all buttons, selectors, and sliders.
- **Responsive 58 mm Canvas**: Previews scale to fit mobile screens without horizontal scrolling or accidental zoom.

---

## 🌟 What's New in this Upgrade

### 🧾 Enhanced Bill / Hotel Receipt Mode (User Requested)
- **⚡ Touch POS Quick Menu (1-Tap Billing)**: Fast item buttons (`➕ Vadapav ₹20`, `➕ Samosa ₹25`, `➕ Chai ₹10`, `➕ Misal ₹40`, etc.) to instantly add items without typing.
- **📲 WhatsApp Digital Bill Sharing**: Enter customer phone number to send formatted bill summary + UPI payment link directly to WhatsApp with 1 tap.
- **📊 Daily Sales Z-Report**: Print an end-of-day register summary with total bills, cash vs. UPI breakdown, and top-selling items.
- **☕ Customer Loyalty Stamp Card**: Print 6-stamp punch cards ("Buy 5 Get 1 FREE!") for repeat customers.
- **Hotel / Store Logo Upload**: Upload any logo image with live threshold & inversion controls for crisp 1-bit thermal output.
- **Vertical Stretch (Double-Height Thermal Typography)**: Selectable **1.0x (Normal)**, **1.2x (Tall/Clear)**, or **1.35x (Double Height)** so printed text is prominently readable and never looks squished.
- **Bold Item Names**: Item names are rendered in bold typeface with automatic word wrapping, keeping quantities, rates, and amounts cleanly aligned in distinct columns.
- **Dynamic GPay / PhonePe / Paytm Payment QR Code**: Enter your merchant UPI ID (e.g. `patilvadapav@okhdfcbank`) and shop name. It dynamically computes a scannable UPI URI with the exact Grand Total (`upi://pay?pa=...&pn=...&am=...&cu=INR`).
- **Custom Text Size Sliders**: Choose any font size from **11px to 24px** for items and **14px to 32px** for shop name.
- **Marathi & Devanagari Support**: Center-aligned footer supports Marathi text like `Thank you for shopping! पुन्हा या!`.

---

## 🛠️ Complete Suite of 15 Printing Modules

1. **🧾 Bill / Hotel Receipt**: Restaurant billing with logo, bold items, GPay QR, and Marathi footer.
2. **📄 Text & Notes**: Standard text memos, centered titles, and Devanagari text prints with font slider.
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
15. **🎮 Arcade & Game Studio**: Complete paper games suite for waiting times:
    - **Sudoku Generator**: Classic 9×9 and Kids 4×4 with randomized seeds and optional tear-off solution key.
    - **Maze Runner (Labyrinth)**: Algorithmic Depth-First Search random maze with Start 🏁 and Goal 🏆.
    - **Battleship (Sea Battle Duel)**: Dual 5×5 grids (My Fleet & Radar) for naval coordinate warfare.
    - **Wordle Paper Challenge**: 6 rows of 5 square letter boxes with alphabet cross-off keyboard and inverted solution.
    - **Connect 4 (Four-in-a-Row)**: 6×7 circular gravity grid for 2 players.
    - **Tic-Tac-Toe Showdown**: Multi-round tournament slips with Player 1 (X) & Player 2 (O) scoreboard and Champion box.
    - **Dots & Boxes Challenge**: 4×4, 5×5, 6×6 dot grids for 2 players claiming boxes.
    - **Word Search Puzzle**: 10×10 grid with themes (Fast Food / Snacks, Indian Cities, or custom words) and `[ ]` checklist.

---

## 🚀 How to Run

1. Open **`index.html`** in **Google Chrome**, **Microsoft Edge**, or **Brave** (on Windows or Android).
2. The workstation runs completely in your browser without requiring a Node.js server.
3. On phones, use the bottom navigation bar or the `☰` menu to jump between tools.

---

## 🖨️ Printing & Hardware Options

### 1. Android Phone Bluetooth Printing (eZo 58D)
- **Why browsers can't connect directly:** Thermal printers use **Bluetooth Classic (SPP)**. Web browsers (Chrome, Edge, Samsung Internet) do not have OS permission to open Bluetooth Classic serial ports directly.
- **Easy 2-Minute Solution for Android Phones:**
  1. Turn on your printer. Open phone **Settings > Bluetooth**, scan and pair with your printer (PIN is usually `0000` or `1234`).
  2. Install the free **[RawBT Print Service](https://play.google.com/store/apps/details?id=ru.a402d.rawbtprinter)** from Google Play Store.
  3. Open RawBT once, select **Bluetooth**, and tap your paired printer.
  4. Now in Ezo Print Studio on your phone:
     - Tap **"📱 Android Bluetooth"** for instant 1-tap print!
     - Or tap **"🖨️ Print Receipt"**, select **RawBT** as the printer, and print!

### 2. Web Serial API (Direct USB / COM Port)
- Click the **⚙️ Settings** badge in the top navigation bar.
- Click **Connect COM Port** to choose your printer's serial port (e.g. `COM3`, `COM5`).

### 3. Windows Python Bluetooth SPP Bridge
If your eZo printer is paired via Bluetooth Classic SPP to a COM port (e.g. `COM5`):
```powershell
py -m pip install pyserial
py windows/print_text.py COM5 "TEST PRINT FROM EZO PRINT STUDIO"
```
