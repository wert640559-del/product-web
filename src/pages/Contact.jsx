import { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Format pesan untuk WhatsApp
        const whatsappMessage = `
Halo, saya ${formData.name}!

*Subjek:* ${formData.subject}
*Email:* ${formData.email}

*Pesan:*
${formData.message}

Saya mengharapkan balasan dari Anda. Terima kasih!
        `.trim();

        // Encode message untuk URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const phoneNumber = '6283132212944'; // Ganti dengan nomor WhatsApp bisnis Anda
        
        // Redirect ke WhatsApp
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        // Simulasi loading sebentar sebelum redirect
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            setIsSubmitting(false);
            
            // Reset form
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
        }, 1000);
    };

    const contactMethods = [
        {
            icon: '📧',
            title: 'Email',
            detail: 'support@perusahaan.com',
            description: 'Kirim kami email kapan saja',
            link: 'mailto:support@perusahaan.com'
        },
        {
            icon: '📞',
            title: 'Telepon',
            detail: '+62 831-3221-2944',
            description: 'Senin - Jumat, 08:00 - 17:00',
            link: 'tel:+6283132212944'
        },
        {
            icon: '💬',
            title: 'WhatsApp',
            detail: '+62 831-3221-2944',
            description: 'Respon cepat via WhatsApp',
            link: 'https://wa.me/6283132212944?text=Assalamualaikum%20warahmatullahi%20wabarakatuh'
        },
        {
            icon: '🏢',
            title: 'Kantor',
            detail: 'Jl. Jalan No. 123',
            description: 'Kota, Indonesia',
            link: 'https://maps.google.com'
        }
    ];

    const faqs = [
        {
            question: 'Bagaimana cara memesan produk?',
            answer: 'Anda dapat memesan produk langsung melalui website kami dengan memilih produk dan mengikuti proses checkout.'
        },
        {
            question: 'Apa metode pembayaran yang tersedia?',
            answer: 'Kami menerima berbagai metode pembayaran termasuk transfer bank, kartu kredit, dan e-wallet.'
        },
        {
            question: 'Berapa lama waktu pengiriman?',
            answer: 'Waktu pengiriman bervariasi tergantung lokasi, biasanya 2-5 hari kerja untuk pengiriman dalam negeri.'
        },
        {
            question: 'Apakah tersedia pengembalian produk?',
            answer: 'Ya, kami memiliki kebijakan pengembalian 30 hari untuk produk yang belum digunakan dengan tagihan lengkap.'
        }
    ];

    return (
        <div className="contact-container">
            {/* Hero Section */}
            <section className="contact-hero">
                <div className="container">
                    <h1 className="contact-hero-title">Hubungi Kami</h1>
                    <p className="contact-hero-subtitle">
                        Kami siap membantu Anda. Hubungi kami melalui berbagai cara yang tersedia.
                    </p>
                </div>
            </section>

            {/* Contact Methods */}
            <section className="contact-methods">
                <div className="container">
                    <div className="methods-grid">
                        {contactMethods.map((method, index) => (
                            <a 
                                key={index}
                                href={method.link}
                                className="method-card"
                                target={method.link.startsWith('http') ? '_blank' : '_self'}
                                rel={method.link.startsWith('http') ? 'noopener noreferrer' : ''}
                            >
                                <div className="method-icon">{method.icon}</div>
                                <div className="method-content">
                                    <h3>{method.title}</h3>
                                    <p className="method-detail">{method.detail}</p>
                                    <p className="method-description">{method.description}</p>
                                </div>
                                <div className="method-arrow">→</div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form & Info */}
            <section className="contact-main">
                <div className="container">
                    <div className="contact-content">
                        {/* Contact Form */}
                        <div className="contact-form-section">
                            <h2>Kirim Pesan via WhatsApp</h2>
                            <p className="whatsapp-notice">
                                📱 Form ini akan langsung mengarahkan Anda ke WhatsApp dengan pesan yang sudah terisi otomatis
                            </p>
                            
                            <form className="contact-form" onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="name">Nama Lengkap *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="form-input"
                                            placeholder="Masukkan nama lengkap"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="form-input"
                                            placeholder="Masukkan alamat email"
                                        />
                                    </div>
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="subject">Subjek *</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="form-input"
                                        placeholder="Masukkan subjek pesan"
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="message">Pesan *</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        className="form-textarea"
                                        rows="6"
                                        placeholder="Tulis pesan Anda di sini..."
                                    ></textarea>
                                </div>
                                
                                <button 
                                    type="submit" 
                                    className="submit-btn whatsapp-btn"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="loading-spinner"></div>
                                            Membuka WhatsApp...
                                        </>
                                    ) : (
                                        <>
                                            <span className="whatsapp-icon">💬</span>
                                            Kirim via WhatsApp
                                        </>
                                    )}
                                </button>

                                <div className="form-note">
                                    <p>📝 Pastikan Anda sudah menginstal WhatsApp di perangkat Anda</p>
                                </div>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div className="contact-info-section">
                            <div className="info-card">
                                <h3>Informasi Kontak</h3>
                                
                                <div className="info-item">
                                    <div className="info-icon">📍</div>
                                    <div className="info-content">
                                        <h4>Alamat Kantor</h4>
                                        <p>Jl. Jalan No. 123<br />Kota, Province 28131<br />Indonesia</p>
                                    </div>
                                </div>
                                
                                <div className="info-item">
                                    <div className="info-icon">📞</div>
                                    <div className="info-content">
                                        <h4>Telepon</h4>
                                        <p>+62 831-3221-2944<br />Senin - Jumat: 08:00 - 17:00</p>
                                    </div>
                                </div>
                                
                                <div className="info-item">
                                    <div className="info-icon">📧</div>
                                    <div className="info-content">
                                        <h4>Email</h4>
                                        <p>support@perusahaan.com<br />info@perusahaan.com</p>
                                    </div>
                                </div>
                                
                                <div className="info-item">
                                    <div className="info-icon">🌐</div>
                                    <div className="info-content">
                                        <h4>Sosial Media</h4>
                                        <div className="social-links">
                                            <a href="https://web.facebook.com/" className="social-link">Facebook</a>
                                            <a href="https://www.instagram.com/muharits_/" className="social-link">Instagram</a>
                                            <a href="https://x.com/" className="social-link">Twitter</a>
                                            <a href="https://www.linkedin.com/" className="social-link">LinkedIn</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* FAQ Section */}
                            <div className="faq-section">
                                <h3>Pertanyaan Umum</h3>
                                <div className="faq-list">
                                    {faqs.map((faq, index) => (
                                        <div key={index} className="faq-item">
                                            <h4>{faq.question}</h4>
                                            <p>{faq.answer}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="map-section">
                <div className="container">
                    <h2>Lokasi Kami 🗺️</h2>                    
                    <div className="map-placeholder">
                        <iframe 
                            className="map-content"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d724.0261218669477!2d110.29541442083355!3d-7.996405218665216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a57d3554e3c31%3A0xf12f0cd502f34b39!2sPondok%20IT%20Indonesia!5e0!3m2!1sid!2sid!4v1760779971036!5m2!1sid!2sid"
                            width="100%"
                            height="600px"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Google Maps Pondok IT Indonesia"
                        ></iframe>
                    </div>
                </div>
            </section>
        </div>
    );
}