import { useState } from 'react';

export default function Settings() {
    const [settings, setSettings] = useState({
        notifications: {
            email: true,
            push: false,
            sms: true
        },
        privacy: {
            profileVisibility: 'public',
            searchVisibility: true,
            dataSharing: false
        },
        preferences: {
            language: 'id',
            theme: 'light',
            timezone: 'Asia/Jakarta'
        }
    });

    const handleNotificationChange = (key) => {
        setSettings(prev => ({
            ...prev,
            notifications: {
                ...prev.notifications,
                [key]: !prev.notifications[key]
            }
        }));
    };

    const handlePrivacyChange = (key, value) => {
        setSettings(prev => ({
            ...prev,
            privacy: {
                ...prev.privacy,
                [key]: value
            }
        }));
    };

    const handlePreferenceChange = (key, value) => {
        setSettings(prev => ({
            ...prev,
            preferences: {
                ...prev.preferences,
                [key]: value
            }
        }));
    };

    const handleSaveSettings = (e) => {
        e.preventDefault();
        alert('Pengaturan berhasil disimpan!');
    };



    return (
        <div className="settings-container">
            <div className="settings-header">
                <h1>Pengaturan</h1>
                <p>Kelola preferensi dan pengaturan akun Anda</p>
            </div>

            <form className="settings-form" onSubmit={handleSaveSettings}>
                {/* Notifications Section */}
                <div className="settings-section">
                    <h2>Notifikasi</h2>
                    <p>Kelola bagaimana Anda menerima notifikasi</p>
                    
                    <div className="settings-options">
                        <div className="option-item">
                            <label className="option-label">
                                <input 
                                    type="checkbox"
                                    checked={settings.notifications.email}
                                    onChange={() => handleNotificationChange('email')}
                                    className="option-checkbox"
                                />
                                <span className="option-text">
                                    <strong>Email Notifications</strong>
                                    <span>Terima pemberitahuan melalui email</span>
                                </span>
                            </label>
                        </div>

                        <div className="option-item">
                            <label className="option-label">
                                <input 
                                    type="checkbox"
                                    checked={settings.notifications.push}
                                    onChange={() => handleNotificationChange('push')}
                                    className="option-checkbox"
                                />
                                <span className="option-text">
                                    <strong>Push Notifications</strong>
                                    <span>Terima pemberitahuan di browser</span>
                                </span>
                            </label>
                        </div>

                        <div className="option-item">
                            <label className="option-label">
                                <input 
                                    type="checkbox"
                                    checked={settings.notifications.sms}
                                    onChange={() => handleNotificationChange('sms')}
                                    className="option-checkbox"
                                />
                                <span className="option-text">
                                    <strong>SMS Notifications</strong>
                                    <span>Terima pemberitahuan melalui SMS</span>
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Privacy Section */}
                <div className="settings-section">
                    <h2>Privasi & Keamanan</h2>
                    <p>Kontrol visibilitas dan data sharing</p>
                    
                    <div className="settings-options">
                        <div className="option-item">
                            <label className="option-label">
                                <span className="option-text">
                                    <strong>Visibilitas Profil</strong>
                                    <span>Siapa yang dapat melihat profil Anda</span>
                                </span>
                                <select 
                                    value={settings.privacy.profileVisibility}
                                    onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                                    className="option-select"
                                >
                                    <option value="public">Publik</option>
                                    <option value="private">Privat</option>
                                    <option value="friends">Hanya Teman</option>
                                </select>
                            </label>
                        </div>

                        <div className="option-item">
                            <label className="option-label">
                                <input 
                                    type="checkbox"
                                    checked={settings.privacy.searchVisibility}
                                    onChange={(e) => handlePrivacyChange('searchVisibility', e.target.checked)}
                                    className="option-checkbox"
                                />
                                <span className="option-text">
                                    <strong>Tampilkan di Pencarian</strong>
                                    <span>Izinkan profil muncul di hasil pencarian</span>
                                </span>
                            </label>
                        </div>

                        <div className="option-item">
                            <label className="option-label">
                                <input 
                                    type="checkbox"
                                    checked={settings.privacy.dataSharing}
                                    onChange={(e) => handlePrivacyChange('dataSharing', e.target.checked)}
                                    className="option-checkbox"
                                />
                                <span className="option-text">
                                    <strong>Data Sharing</strong>
                                    <span>Izinkan berbagi data untuk analitik</span>
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Preferences Section */}
                <div className="settings-section">
                    <h2>Preferensi</h2>
                    <p>Personalisasi pengalaman Anda</p>
                    
                    <div className="settings-options">
                        <div className="option-item">
                            <label className="option-label">
                                <span className="option-text">
                                    <strong>Bahasa</strong>
                                    <span>Pilih bahasa yang diinginkan</span>
                                </span>
                                <select 
                                    value={settings.preferences.language}
                                    onChange={(e) => handlePreferenceChange('language', e.target.value)}
                                    className="option-select"
                                >
                                    <option value="id">Bahasa Indonesia</option>
                                    <option value="en">English</option>
                                    <option value="ja">日本語</option>
                                </select>
                            </label>
                        </div>

                        <div className="option-item">
                            <label className="option-label">
                                <span className="option-text">
                                    <strong>Tema</strong>
                                    <span>Pilih tema tampilan</span>
                                </span>
                                <select 
                                    value={settings.preferences.theme}
                                    onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                                    className="option-select"
                                >
                                    <option value="light">Terang</option>
                                    <option value="dark">Gelap</option>
                                    <option value="auto">Sesuai Sistem</option>
                                </select>
                            </label>
                        </div>

                        <div className="option-item">
                            <label className="option-label">
                                <span className="option-text">
                                    <strong>Zona Waktu</strong>
                                    <span>Pilih zona waktu lokal Anda</span>
                                </span>
                                <select 
                                    value={settings.preferences.timezone}
                                    onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                                    className="option-select"
                                >
                                    <option value="Asia/Jakarta">WIB (Jakarta)</option>
                                    <option value="Asia/Makassar">WITA (Makassar)</option>
                                    <option value="Asia/Jayapura">WIT (Jayapura)</option>
                                </select>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="settings-actions">
                    <button type="submit" className="save-settings-btn">
                        Simpan Pengaturan
                    </button>
                    <button type="button" className="reset-settings-btn">
                        Reset ke Default
                    </button>
                </div>
            </form>
        </div>
    );
}