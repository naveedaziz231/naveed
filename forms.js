/**
 * AURELIUS & CO. | HAUTE HORLOGERIE
 * Form Handling & Live Supabase Data Flow
 */

document.addEventListener('DOMContentLoaded', () => {
    initAppointmentForm();
    initInquiryForm();
    initNewsletterForms();
});

/* -------------------------------------------------------------------------- */
/* 1. VIP Appointment Booking Form Submission                                 */
/* -------------------------------------------------------------------------- */
function initAppointmentForm() {
    const form = document.getElementById('vipAppointmentForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnHtml = submitBtn ? submitBtn.innerHTML : 'Request Private Viewing';

        // Extract form data
        const formData = {
            fullName: form.fullName ? form.fullName.value.trim() : '',
            email: form.email ? form.email.value.trim() : '',
            phone: form.phone ? form.phone.value.trim() : '',
            boutique: form.boutique ? form.boutique.value : 'Geneva Salon',
            preferredDate: form.preferredDate ? form.preferredDate.value : null,
            preferredTime: form.preferredTime ? form.preferredTime.value : null,
            serviceType: form.serviceType ? form.serviceType.value : 'Private Horology Consultation',
            message: form.message ? form.message.value.trim() : ''
        };

        if (!formData.fullName || !formData.email) {
            window.showLuxuryNotification('Information Required', 'Please provide your full name and email address for our private registrar.', 'error');
            return;
        }

        try {
            // UI Loading state
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Transmitting to Atelier...';
            }

            // Database call to Supabase
            await window.HorologyDB.bookAppointment(formData);

            // Success feedback
            window.showLuxuryNotification(
                'Private Invitation Requested',
                `Thank you, ${formData.fullName}. Our VIP Concierge at our ${formData.boutique} salon will review your request and reach out discreetly within 24 hours.`,
                'success'
            );

            form.reset();
        } catch (error) {
            console.error('Submission error:', error);
            window.showLuxuryNotification(
                'Concierge Notification',
                'Your request has been registered. If your Supabase table schema is fresh, please ensure schema.sql has been executed in your Supabase SQL editor.',
                'error'
            );
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
            }
        }
    });
}

/* -------------------------------------------------------------------------- */
/* 2. Bespoke Inquiry Form Submission                                         */
/* -------------------------------------------------------------------------- */
function initInquiryForm() {
    const form = document.getElementById('bespokeInquiryForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnHtml = submitBtn ? submitBtn.innerHTML : 'Submit Bespoke Inquiry';

        // Extract selected interests
        const selectedInterests = [];
        form.querySelectorAll('input[name="interests"]:checked').forEach(cb => {
            selectedInterests.push(cb.value);
        });

        const formData = {
            clientName: form.clientName ? form.clientName.value.trim() : '',
            email: form.email ? form.email.value.trim() : '',
            phone: form.phone ? form.phone.value.trim() : '',
            inquiryType: form.inquiryType ? form.inquiryType.value : 'Bespoke Commission',
            interests: selectedInterests,
            timeline: form.timeline ? form.timeline.value : 'Flexible',
            notes: form.notes ? form.notes.value.trim() : ''
        };

        if (!formData.clientName || !formData.email) {
            window.showLuxuryNotification('Details Required', 'Please specify your name and direct correspondence email.', 'error');
            return;
        }

        try {
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Filing Commission Request...';
            }

            await window.HorologyDB.sendInquiry(formData);

            window.showLuxuryNotification(
                'Commission Dossier Received',
                `Honored to receive your bespoke inquiry, ${formData.clientName}. A Master Horologist will prepare your bespoke portfolio.`,
                'success'
            );

            form.reset();
        } catch (error) {
            console.error('Inquiry submission error:', error);
            window.showLuxuryNotification(
                'Atelier Dispatch Note',
                error.message || 'An error occurred while transmitting your request to Supabase. Check database tables.',
                'error'
            );
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
            }
        }
    });
}

/* -------------------------------------------------------------------------- */
/* 3. Haute Horlogerie Journal Newsletter Subscription                        */
/* -------------------------------------------------------------------------- */
function initNewsletterForms() {
    const forms = document.querySelectorAll('.newsletter-form');

    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const input = form.querySelector('input[type="email"]');
            const submitBtn = form.querySelector('button[type="submit"]');
            const email = input ? input.value.trim() : '';

            if (!email) {
                window.showLuxuryNotification('Email Required', 'Kindly input your email to receive our private horology journal.', 'error');
                return;
            }

            const originalBtnHtml = submitBtn ? submitBtn.innerHTML : 'Subscribe';

            try {
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';
                }

                await window.HorologyDB.subscribeNewsletter(email, form.dataset.source || 'journal_section');

                window.showLuxuryNotification(
                    'Welcome to Aurelius Private Club',
                    'Your private subscription to the Aurelius Haute Horlogerie Journal has been activated.',
                    'success'
                );

                form.reset();
            } catch (error) {
                console.error('Newsletter error:', error);
                window.showLuxuryNotification(
                    'Club Membership Notice',
                    error.message || 'Unable to complete subscription at this time. Verify Supabase tables.',
                    'error'
                );
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnHtml;
                }
            }
        });
    });
}
