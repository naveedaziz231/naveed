# AURELIUS & CO. | HAUTE HORLOGERIE
### Luxury Swiss Watchmaking Atelier Web Experience (Supabase Integrated)

A luxurious, ultra-refined, responsive website engineered for high-end Haute Horlogerie brand storytelling, bespoke client commissions, private salon booking, and collector club registrations without typical retail/e-commerce product listings.

---

## 📁 Project Directory & Files

```
c:\Users\Admin\Desktop\naveed\
│
├── index.html                 # Flagship luxury homepage with live animated chronometer & tourbillon
├── about.html                 # Heritage, history from 1888, Valle de Joux manufacture & philosophy
├── experience.html            # Master complications, Metiers d'Art & Bespoke Commissioning Flow
├── contact.html               # Global Salons locator, VIP Private Appointment & Bespoke Dossier forms
│
├── css/
│   └── style.css              # Obsidian & gold foil luxury design system, typography & glassmorphism
│
├── js/
│   ├── supabase-config.js     # Supabase client initialization (official @supabase/supabase-js v2)
│   ├── main.js                # Live real-time watch kinematics, bespoke configurator & modal controller
│   └── forms.js               # Form validation, Supabase database dispatching & luxury toast feedback
│
├── sql/
│   └── schema.sql             # SQL schema ready to execute in your Supabase SQL Editor
│
└── README.md                  # Documentation and quickstart guide
```

---

## ⚡ Supabase Integration Details

Your Supabase project is already configured with your keys:
- **Project URL:** `https://xyqwuwayvwmhjeibdksk.supabase.co`
- **Anon Key:** (Pre-configured in `js/supabase-config.js`)
- **Publishable Key:** `sb_publishable_oYrM7YkHE4yNkyiP5y8_UQ_-IJxL5w7`

### 🗄️ Database Tables (`sql/schema.sql`):
1. **`appointments`**: Stores VIP Private viewing appointments, salon choices, preferred dates, and service types.
2. **`inquiries`**: Stores Bespoke Haute Horlogerie commissions, selected complications, metals, and client notes.
3. **`newsletter_subscribers`**: Stores emails of collectors subscribing to the private Gazette / Journal.

### 🚀 One-Click Database Setup:
1. Go to your **[Supabase Dashboard](https://supabase.com/dashboard/project/xyqwuwayvwmhjeibdksk/sql)**.
2. Open the **SQL Editor**.
3. Copy and paste the contents of `sql/schema.sql` and click **Run**.
4. All tables, constraints, and Row Level Security (RLS) public insert policies are instantly active.

---

## ✨ Features & Luxury Design Highlights

- **Real-Time Mechanical Chronometer:** Interactive dial with real-time synchronized hour, minute, and sub-second hands powered by trigonometric kinematics.
- **Flying Tourbillon Visualizer:** CSS kinetic animation simulating the 60-second rotation of a Haute Horlogerie gravity-defying tourbillon cage.
- **Interactive Bespoke Configurator:** Real-time preview allowing collectors to customize precious metals (18K Rose Gold, 950 Platinum, Tantalum), complications, and dial guilloché motifs.
- **Luxury Notification Toasts:** Custom gold-trimmed notification banners for feedback on submissions.
- **Supabase Diagnostics Modal:** Built-in connection tester and project latency checker in the navigation bar.
- **Fully Responsive & Pure Code:** Clean HTML5, CSS3 (no bulky heavy frameworks needed), and vanilla JavaScript.
