import { useState, useEffect } from 'react';

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

    // Effect untuk mengubah tema
    useEffect(() => {
        const root = document.documentElement;
        
        if (settings.preferences.theme === 'dark') {
            root.style.setProperty('--bg-primary', '#1a1a1a');
            root.style.setProperty('--bg-secondary', '#2d2d2d');
            root.style.setProperty('--text-primary', '#ffffff');
            root.style.setProperty('--text-secondary', '#cccccc');
            root.style.setProperty('--border-color', '#404040');
            document.body.style.backgroundColor = '#1a1a1a';
            document.body.style.color = '#ffffff';
        } else if (settings.preferences.theme === 'auto') {
            // Deteksi preferensi sistem
            const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (isDarkMode) {
                root.style.setProperty('--bg-primary', '#1a1a1a');
                root.style.setProperty('--bg-secondary', '#2d2d2d');
                root.style.setProperty('--text-primary', '#ffffff');
                root.style.setProperty('--text-secondary', '#cccccc');
                root.style.setProperty('--border-color', '#404040');
                document.body.style.backgroundColor = '#1a1a1a';
                document.body.style.color = '#ffffff';
            } else {
                resetToLightTheme();
            }
        } else {
            resetToLightTheme();
        }

        function resetToLightTheme() {
            root.style.setProperty('--bg-primary', '#F6F1E9');
            root.style.setProperty('--bg-secondary', '#ffffff');
            root.style.setProperty('--text-primary', '#4F200D');
            root.style.setProperty('--text-secondary', '#666666');
            root.style.setProperty('--border-color', '#FFD93D');
            document.body.style.backgroundColor = '#F6F1E9';
            document.body.style.color = '#4F200D';
        }
    }, [settings.preferences.theme]);

    // Effect untuk mendeteksi perubahan tema sistem
    useEffect(() => {
        if (settings.preferences.theme === 'auto') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleChange = (e) => {
                // Trigger re-render ketika preferensi sistem berubah
                setSettings(prev => ({ ...prev }));
            };

            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }
    }, [settings.preferences.theme]);

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
        // Simpan ke localStorage
        localStorage.setItem('userSettings', JSON.stringify(settings));
        alert('Pengaturan berhasil disimpan!');
    };

    const handleResetSettings = () => {
        const defaultSettings = {
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
        };
        setSettings(defaultSettings);
        localStorage.removeItem('userSettings');
        alert('Pengaturan direset ke default!');
    };

    // Load settings from localStorage on component mount
    useEffect(() => {
        const savedSettings = localStorage.getItem('userSettings');
        if (savedSettings) {
            setSettings(JSON.parse(savedSettings));
        }
    }, []);

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
                    <button type="button" className="reset-settings-btn" onClick={handleResetSettings}>
                        Reset ke Default
                    </button>
                </div>
            </form>
        </div>
    );
}