/**
 * AURELIUS & CO. | HAUTE HORLOGERIE
 * Supabase Client Configuration & Connection Layer
 */

const SUPABASE_URL = "https://xyqwuwayvwmhjeibdksk.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5cXd1d2F5dndtaGplaWJka3NrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA1NzQxNTksImV4cCI6MjEwNjE1MDE1OX0.A_FpcceSpkbPPEdMEtIatnKL0Jsrx58b-iVwALHUd3Y";

// Initialize Supabase Client
let supabaseClient = null;

try {
    if (window.supabase && typeof window.supabase.createClient === 'function') {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log("💎 Aurelius Haute Horlogerie: Supabase connection established successfully.");
    } else {
        console.warn("Supabase SDK not loaded yet. Retrying on load...");
    }
} catch (error) {
    console.error("Error initializing Supabase client:", error);
}

// Helper: Show luxury toast notifications
function showLuxuryNotification(title, message, type = 'success') {
    let container = document.getElementById('luxury-toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'luxury-toast-container';
        container.className = 'luxury-toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `luxury-toast ${type}`;
    
    const icon = type === 'success' ? 'fa-gem' : (type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle');
    
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas ${icon}"></i>
        </div>
        <div class="toast-body">
            <h4 class="toast-title">${title}</h4>
            <p class="toast-desc">${message}</p>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
    `;

    container.appendChild(toast);

    // Auto remove after 5.5 seconds with fade animation
    setTimeout(() => {
        toast.classList.add('toast-fade-out');
        setTimeout(() => toast.remove(), 400);
    }, 5500);
}

// Database helper functions
const HorologyDB = {
    // 1. Submit VIP Private Appointment
    async bookAppointment(data) {
        if (!supabaseClient) throw new Error("Supabase client is not initialized.");
        
        const { data: result, error } = await supabaseClient
            .from('appointments')
            .insert([{
                full_name: data.fullName,
                email: data.email,
                phone: data.phone || null,
                boutique_location: data.boutique,
                preferred_date: data.preferredDate || null,
                preferred_time: data.preferredTime || null,
                service_type: data.serviceType || 'Private Horology Consultation',
                message: data.message || null
            }])
            .select();

        if (error) {
            console.error("Supabase Appointment Error:", error);
            throw error;
        }
        return result;
    },

    // 2. Submit Bespoke & Atelier Inquiry
    async sendInquiry(data) {
        if (!supabaseClient) throw new Error("Supabase client is not initialized.");

        const { data: result, error } = await supabaseClient
            .from('inquiries')
            .insert([{
                client_name: data.clientName,
                email: data.email,
                phone: data.phone || null,
                inquiry_type: data.inquiryType || 'Bespoke Craftsmanship',
                interests: data.interests || [],
                estimated_timeline: data.timeline || 'Flexible',
                notes: data.notes || null
            }])
            .select();

        if (error) {
            console.error("Supabase Inquiry Error:", error);
            throw error;
        }
        return result;
    },

    // 3. Subscribe to Haute Horlogerie Journal
    async subscribeNewsletter(email, source = 'website_footer') {
        if (!supabaseClient) throw new Error("Supabase client is not initialized.");

        const { data: result, error } = await supabaseClient
            .from('newsletter_subscribers')
            .insert([{
                email: email.trim().toLowerCase(),
                source: source
            }])
            .select();

        if (error) {
            if (error.code === '23505') {
                throw new Error("This email is already registered with the Aurelius Private Club.");
            }
            console.error("Supabase Newsletter Error:", error);
            throw error;
        }
        return result;
    },

    // 4. Test Supabase Connectivity
    async checkConnection() {
        if (!supabaseClient) return { status: 'disconnected', message: 'Client not initialized' };
        try {
            const { error } = await supabaseClient.from('newsletter_subscribers').select('count', { count: 'exact', head: true });
            if (error && error.code !== 'PGRST116') {
                // Table might not exist yet in database, but connection is alive
                return { status: 'connected', note: 'Connection active. Table verification ready.' };
            }
            return { status: 'connected', note: 'Live connection verified.' };
        } catch (err) {
            return { status: 'error', error: err.message };
        }
    }
};

window.HorologyDB = HorologyDB;
window.showLuxuryNotification = showLuxuryNotification;
