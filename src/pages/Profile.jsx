import { useState, useEffect } from 'react';

export default function Profile() {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulasi data user
        const fetchUserData = () => {
            setTimeout(() => {
                setUser({
                    id: 1,
                    name: 'Muhammad Harits',
                    email: 'harits@example.com',
                    role: 'Administrator',
                    joinDate: '2025-08-01',
                    avatar: '1.jpg',
                    phone: '+62 812-3456-7890',
                    location: 'Riau, Indonesia',
                    bio: 'Full-stack developer dengan passion dalam membangun aplikasi web yang scalable dan user-friendly.'
                });
                setLoading(false);
            }, 1000);
        };

        fetchUserData();
    }, []);

    const handleSave = (e) => {
        e.preventDefault();
        // Simpan perubahan
        setIsEditing(false);
        alert('Profil berhasil diperbarui!');
    };

    if (loading) {
        return (
            <div className="profile-container">
                <div className="loading">Memuat profil...</div>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1>Profil Saya</h1>
                <p>Kelola informasi profil Anda</p>
            </div>

            <div className="profile-content">
                <div className="profile-sidebar">
                    <div className="avatar-section">
                        <img 
                            src={user.avatar} 
                            alt={user.name}
                            className="profile-avatar"
                        />
                        <h2>{user.name}</h2>
                        <p className="user-role">{user.role}</p>
                        <p className="join-date">Bergabung sejak {new Date(user.joinDate).toLocaleDateString('id-ID')}</p>
                    </div>

                    <div className="profile-stats">
                        <div className="profile-stat">
                            <span className="stat-number">45</span>
                            <span className="stat-label">Pesanan</span>
                        </div>
                        <div className="profile-stat">
                            <span className="stat-number">12</span>
                            <span className="stat-label">Review</span>
                        </div>
                        <div className="profile-stat">
                            <span className="stat-number">3</span>
                            <span className="stat-label">Bulan</span>
                        </div>
                    </div>
                </div>

                <div className="profile-main">
                    {!isEditing ? (
                        <div className="profile-info">
                            <div className="info-section">
                                <h3>Informasi Pribadi</h3>
                                <div className="info-grid">
                                    <div className="info-item">
                                        <label>Nama Lengkap</label>
                                        <p>{user.name}</p>
                                    </div>
                                    <div className="info-item">
                                        <label>Email</label>
                                        <p>{user.email}</p>
                                    </div>
                                    <div className="info-item">
                                        <label>Telepon</label>
                                        <p>{user.phone}</p>
                                    </div>
                                    <div className="info-item">
                                        <label>Lokasi</label>
                                        <p>{user.location}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="info-section">
                                <h3>Tentang Saya</h3>
                                <p className="user-bio">{user.bio}</p>
                            </div>

                            <button 
                                className="edit-btn"
                                onClick={() => setIsEditing(true)}
                            >
                                Edit Profil
                            </button>
                        </div>
                    ) : (
                        <form className="profile-form" onSubmit={handleSave}>
                            <div className="form-section">
                                <h3>Edit Informasi Pribadi</h3>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Nama Lengkap</label>
                                        <input 
                                            type="text" 
                                            defaultValue={user.name}
                                            className="form-input"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input 
                                            type="email" 
                                            defaultValue={user.email}
                                            className="form-input"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Telepon</label>
                                        <input 
                                            type="tel" 
                                            defaultValue={user.phone}
                                            className="form-input"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Lokasi</label>
                                        <input 
                                            type="text" 
                                            defaultValue={user.location}
                                            className="form-input"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-section">
                                <h3>Tentang Saya</h3>
                                <div className="form-group">
                                    <label>Bio</label>
                                    <textarea 
                                        defaultValue={user.bio}
                                        className="form-textarea"
                                        rows="4"
                                    />
                                </div>
                            </div>

                            <div className="form-actions">
                                <button 
                                    type="button" 
                                    className="cancel-btn"
                                    onClick={() => setIsEditing(false)}
                                >
                                    Batal
                                </button>
                                <button type="submit" className="save-btn">
                                    Simpan Perubahan
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}