import { useState, useEffect } from 'react';

export default function About() {
    const [companyStats, setCompanyStats] = useState(null);
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch data untuk stats perusahaan (simulasi)
        const fetchCompanyData = async () => {
            try {
                // Simulasi data perusahaan
                setCompanyStats({
                    totalProducts: 1000,
                    happyCustomers: 50000,
                    yearsExperience: 5,
                    countriesServed: 15
                });

                // Fetch beberapa user dari API sebagai team members
                const usersResponse = await fetch('https://api.escuelajs.co/api/v1/users?limit=4');
                const usersData = await usersResponse.json();
                
                setTeamMembers(usersData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching company data:', error);
                setLoading(false);
            }
        };

        fetchCompanyData();
    }, []);

    if (loading) {
        return (
            <div className="page-container">
                <div className="loading">Memuat informasi perusahaan...</div>
            </div>
        );
    }

    return (
        <div className="about-container">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="container">
                    <h1 className="about-hero-title">Tentang Perusahaan Kami</h1>
                    <p className="about-hero-subtitle">
                        Menghadirkan Solusi Digital Terdepan untuk Masa Depan yang Lebih Baik
                    </p>
                </div>
            </section>

            {/* Company Overview */}
            <section className="company-overview">
                <div className="container">
                    <div className="overview-grid">
                        <div className="overview-content">
                            <h2>Visi dan Misi Kami</h2>
                            <p>
                                Sejak berdiri pada tahun 2019, kami berkomitmen untuk memberikan 
                                pengalaman berbelanja online terbaik dengan produk berkualitas tinggi 
                                dan layanan pelanggan yang luar biasa.
                            </p>
                            <div className="mission-values">
                                <div className="value-item">
                                    <h4>🛍️ Inovasi</h4>
                                    <p>Terus berinovasi dalam menyajikan produk-produk terbaik</p>
                                </div>
                                <div className="value-item">
                                    <h4>🤝 Kepercayaan</h4>
                                    <p>Membangun hubungan jangka panjang berdasarkan kepercayaan</p>
                                </div>
                                <div className="value-item">
                                    <h4>⭐ Kualitas</h4>
                                    <p>Tidak pernah berkompromi dengan kualitas produk dan layanan</p>
                                </div>
                            </div>
                        </div>
                        <div className="overview-stats">
                            <div className="stat-card">
                                <div className="stat-number">{companyStats?.totalProducts}+</div>
                                <div className="stat-label">Produk Tersedia</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-number">{companyStats?.happyCustomers}+</div>
                                <div className="stat-label">Pelanggan Puas</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-number">{companyStats?.yearsExperience}+</div>
                                <div className="stat-label">Tahun Pengalaman</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-number">{companyStats?.countriesServed}+</div>
                                <div className="stat-label">Negara Terlayani</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="team-section">
                <div className="container">
                    <h2 className="section-title">Tim Profesional Kami</h2>
                    <p className="section-subtitle">
                        Dikelola oleh tim yang berpengalaman dan berdedikasi untuk memberikan yang terbaik
                    </p>
                    
                    <div className="team-grid">
                        {teamMembers.map((member, index) => (
                            <div key={member.id} className="team-card">
                                <div className="team-avatar">
                                    <img 
                                        src={member.avatar || `https://i.pravatar.cc/150?img=${index + 1}`} 
                                        alt={member.name}
                                        className="avatar-image"
                                    />
                                </div>
                                <div className="team-info">
                                    <h3 className="team-name">{member.name}</h3>
                                    <p className="team-role">{member.role || 'Professional Team Member'}</p>
                                    <p className="team-email">{member.email}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Founder Section */}
            <section className="founder-section">
                <div className="container">
                    <div className="founder-content">
                        <div className="founder-info">
                            <h2>Pendiri Perusahaan</h2>
                            <h3>Muhammad Harits</h3>
                            <p className="founder-title">CEO & Founder</p>
                            <p className="founder-bio">
                                Seorang programmer berpengalaman dari Riau dengan visi untuk 
                                menciptakan platform e-commerce yang dapat diakses oleh semua orang. 
                                Dengan latar belakang yang kuat dalam pengembangan software, 
                                beliau memimpin tim untuk menghadirkan solusi terbaik bagi pelanggan.
                            </p>
                            <div className="founder-details">
                                <div className="detail-item">
                                    <strong>Asal:</strong> Riau, Indonesia
                                </div>
                                <div className="detail-item">
                                    <strong>Spesialisasi:</strong> Web Development
                                </div>
                                <div className="detail-item">
                                    <strong>Pengalaman:</strong> 2+ Bulan 🗿
                                </div>
                            </div>
                        </div>
                        <div className="founder-image">
                            <img 
                                src="Harits.JPG"
                                alt="Muhammad Harits - Founder"
                                className="founder-img"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="values-section">
                <div className="container">
                    <h2 className="section-title">Nilai-Nilai Perusahaan</h2>
                    <div className="values-grid">
                        <div className="value-card">
                            <div className="value-icon">🚀</div>
                            <h3>Inovasi Terus Menerus</h3>
                            <p>Kami selalu mencari cara baru untuk meningkatkan pengalaman pengguna dan menghadirkan produk terbaik</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon">💎</div>
                            <h3>Kualitas Terjamin</h3>
                            <p>Setiap produk melalui proses kurasi ketat untuk memastikan kualitas terbaik bagi pelanggan</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon">🤝</div>
                            <h3>Komitmen pada Pelanggan</h3>
                            <p>Kepuasan pelanggan adalah prioritas utama kami dalam setiap aspek bisnis</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon">🌍</div>
                            <h3>Jangkauan Global</h3>
                            <p>Kami berkomitmen untuk menjangkau pelanggan di seluruh dunia dengan layanan terbaik</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}