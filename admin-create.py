import pyodbc
from werkzeug.security import generate_password_hash

# Kullanıcı bilgilerini belirleyiniz
email = 'admin@gmail.com'
password = 'admin123'

# Parolayı hash'leyin
hashed_password = generate_password_hash(password, method='pbkdf2:sha256')

# MSSQL veritabanına bağlan
conn = pyodbc.connect(
    r'DRIVER={ODBC Driver 17 for SQL Server};'
    r'SERVER=MEI\SQLEXPRESS;'
    r'DATABASE=gentechdb;'
    r'TRUSTED_CONNECTION=yes;'
)

# Cursor oluşturma
cursor = conn.cursor()

# Kullanicilar tablosuna admin kullanıcısı ekleyin
cursor.execute("INSERT INTO Kullanicilar (eposta, sifre, isadmin) VALUES (?, ?, ?)", (email, hashed_password, 1))

# Değişiklikleri kaydedin
conn.commit()

# Bağlantıyı kapat
cursor.close()
conn.close()
