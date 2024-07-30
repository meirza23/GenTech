import json
import pyodbc

# JSON dosyasını oku
with open('comments.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# MSSQL veritabanına bağlan
conn = pyodbc.connect(
    r'DRIVER={ODBC Driver 17 for SQL Server};'
    r'SERVER=MEI\SQLEXPRESS;'
    r'DATABASE=gentechdb;'
    r'TRUSTED_CONNECTION=yes;'
)

# Cursor oluştur
cursor = conn.cursor()

# Kullanıcılar tablosunu oluştur (eğer yoksa) ve isadmin sütununu ekle
cursor.execute('''
    IF OBJECT_ID('dbo.Kullanicilar', 'U') IS NULL
    CREATE TABLE Kullanicilar (
        id INT IDENTITY(1,1) PRIMARY KEY,
        ad NVARCHAR(50),
        soyad NVARCHAR(50),
        eposta NVARCHAR(100),
        telefon NVARCHAR(15),
        sifre NVARCHAR(255),
        isadmin BIT DEFAULT 0
    )
    ELSE
    BEGIN
        IF COL_LENGTH('dbo.Kullanicilar', 'isadmin') IS NULL
        BEGIN
            ALTER TABLE Kullanicilar
            ADD isadmin BIT DEFAULT 0;
        END
    END
''')
conn.commit()

# Yorumlar tablosunu oluştur (eğer yoksa)
cursor.execute('''
    IF OBJECT_ID('dbo.Yorumlar', 'U') IS NULL
    CREATE TABLE Yorumlar (
        id INT IDENTITY(1,1) PRIMARY KEY,
        rol NVARCHAR(50),
        icerik NVARCHAR(MAX)
    )
''')
conn.commit()

# Şikayetler tablosunu oluştur (eğer yoksa) ve durum sütunlarını ekle
cursor.execute('''
    IF OBJECT_ID('dbo.Sikayetler', 'U') IS NULL
    CREATE TABLE Sikayetler (
        id INT IDENTITY(1,1) PRIMARY KEY,
        ad NVARCHAR(50),
        soyad NVARCHAR(50),
        eposta NVARCHAR(100),
        telefon NVARCHAR(15),
        sikayet NVARCHAR(MAX),
        kategori NVARCHAR(100),
        iletildi BIT DEFAULT 0,
        cozuldu BIT DEFAULT 0
    )
''')
conn.commit()

# JSON verilerini MSSQL'e ekle
for item in data:
    rol = item.get('role')  # JSON anahtarlarını kontrol edin
    icerik = item.get('content')
    cursor.execute("INSERT INTO Yorumlar (rol, icerik) VALUES (?, ?)", rol, icerik)

conn.commit()

# Bağlantıyı kapat
cursor.close()
conn.close()
