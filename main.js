/**
 * AURELIUS & CO. | HAUTE HORLOGERIE
 * Main Interactive Mechanics & UI Controller
 */

document.addEventListener('DOMContentLoaded', () => {
    initRealtimeChronometer();
    initHeaderScroll();
    initMobileNav();
    initBespokeConfigurator();
    initSupabaseModal();
});

/* -------------------------------------------------------------------------- */
/* 1. Real-Time Haute Horlogerie Chronometer (Live Watch Hands Animation)    */
/* -------------------------------------------------------------------------- */
function initRealtimeChronometer() {
    const hourHand = document.getElementById('watchHourHand');
    const minuteHand = document.getElementById('watchMinuteHand');
    const secondHand = document.getElementById('watchSecondHand');

    if (!hourHand || !minuteHand || !secondHand) return;

    function updateTime() {
        const now = new Date();
        const milliseconds = now.getMilliseconds();
        const seconds = now.getSeconds() + milliseconds / 1000;
        const minutes = now.getMinutes() + seconds / 60;
        const hours = (now.getHours() % 12) + minutes / 60;

        const secondDeg = seconds * 6; // 360 / 60
        const minuteDeg = minutes * 6; // 360 / 60
        const hourDeg = hours * 30;    // 360 / 12

        secondHand.style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;
        minuteHand.style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
        hourHand.style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;

        requestAnimationFrame(updateTime);
    }

    requestAnimationFrame(updateTime);
}

/* -------------------------------------------------------------------------- */
/* 2. Header Scroll Effect                                                    */
/* -------------------------------------------------------------------------- */
function initHeaderScroll() {
    const header = document.querySelector('.luxury-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/* -------------------------------------------------------------------------- */
/* 3. Mobile Navigation Drawer                                                */
/* -------------------------------------------------------------------------- */
function initMobileNav() {
    const toggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = toggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // Close on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = toggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });
    }
}

/* -------------------------------------------------------------------------- */
/* 4. Bespoke Atelier Configurator Preview                                    */
/* -------------------------------------------------------------------------- */
function initBespokeConfigurator() {
    const configButtons = document.querySelectorAll('.config-btn');
    const previewSummary = document.getElementById('bespokeSummaryText');
    const bespokeMetalPreview = document.getElementById('previewMetal');
    const bespokeCompPreview = document.getElementById('previewComplication');
    const bespokeDialPreview = document.getElementById('previewDial');

    if (!configButtons.length) return;

    let selectedConfig = {
        metal: '18K Rose Gold',
        complication: 'Flying Tourbillon',
        dial: 'Obsidian Guilloché'
    };

    configButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const group = this.closest('.config-group');
            const groupType = group.dataset.configType;
            const value = this.dataset.value;

            // Remove active from siblings
            group.querySelectorAll('.config-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Update configuration
            selectedConfig[groupType] = value;

            // Update live summary
            if (previewSummary) {
                previewSummary.textContent = `A unique haute horlogerie creation forged in ${selectedConfig.metal}, featuring a master-crafted ${selectedConfig.complication} with hand-engraved ${selectedConfig.dial}.`;
            }
            if (bespokeMetalPreview) bespokeMetalPreview.textContent = selectedConfig.metal;
            if (bespokeCompPreview) bespokeCompPreview.textContent = selectedConfig.complication;
            if (bespokeDialPreview) bespokeDialPreview.textContent = selectedConfig.dial;

            // Auto-fill into the inquiry form if present
            const messageInput = document.getElementById('inquiryNotes') || document.getElementById('appointmentMessage');
            if (messageInput && messageInput.value.includes('Bespoke Specification:')) {
                messageInput.value = `Bespoke Specification:\n- Metallurgy: ${selectedConfig.metal}\n- Complication: ${selectedConfig.complication}\n- Dial: ${selectedConfig.dial}`;
            }
        });
    });
}

/* -------------------------------------------------------------------------- */
/* 5. Supabase Diagnostic Modal Controller                                    */
/* -------------------------------------------------------------------------- */
function initSupabaseModal() {
    const modal = document.getElementById('supabaseStatusModal');
    const statusPill = document.getElementById('supabaseStatusBtn');
    const closeBtn = document.getElementById('closeSupabaseModal');
    const refreshBtn = document.getElementById('checkConnectionBtn');

    if (statusPill && modal) {
        statusPill.addEventListener('click', () => {
            modal.classList.add('active');
            testConnectionStatus();
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    }

    if (refreshBtn) {
        refreshBtn.addEventListener('click', testConnectionStatus);
    }
}

async function testConnectionStatus() {
    const statusVal = document.getElementById('modalSupabaseStatus');
    const pingVal = document.getElementById('modalSupabasePing');
    if (!statusVal) return;

    statusVal.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Checking handshake...';
    
    const startTime = performance.now();
    try {
        if (window.HorologyDB) {
            const check = await window.HorologyDB.checkConnection();
            const latency = Math.round(performance.now() - startTime);
            statusVal.innerHTML = '<span style="color:#10b981;"><i class="fas fa-check-circle"></i> Connected & Ready</span>';
            if (pingVal) pingVal.textContent = `${latency}ms`;
        } else {
            statusVal.innerHTML = '<span style="color:#f59e0b;"><i class="fas fa-exclamation-triangle"></i> Supabase initializing...</span>';
        }
    } catch (err) {
        statusVal.innerHTML = `<span style="color:#ef4444;"><i class="fas fa-times-circle"></i> Error: ${err.message}</span>`;
    }
}
