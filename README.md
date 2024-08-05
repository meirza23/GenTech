# Gentech Generative AI Projesi

Bu proje, Python Flask ve MSSQL kullanılarak geliştirilmiştir. SQL Server Management Studio (SSMS) 20 kullanılmaktadır.

## Kurulum ve Başlangıç

1. **Yapılandırma ve Paketleri Yükleme**

   - `app.py` ve `main.py` dosyalarında gerekli yapılandırma bilgilerini (OpenAI anahtarı, endpoint, veritabanı adı, sunucu adı) girin.
   - `sql.py` ve `admin-create.py` dosyalarında da veritabanı ve sunucu adlarını güncelleyin.
   - Proje gereksinimlerini yüklemek için `requirements.txt` dosyasını kullanın. Terminale aşağıdaki komutu girerek gerekli paketleri yükleyin:

     ```bash
     pip install -r requirements.txt
     ```

2. **Veritabanı ve Admin Hesabını Oluşturma**

   - Proje dosyalarınız arasında bulunan `sql.py` dosyasını çalıştırarak veritabanında gerekli tabloları oluşturun:

     ```bash
     python sql.py
     ```

   - Admin hesabını oluşturmak için `admin-create.py` dosyasını çalıştırın:

     ```bash
     python admin-create.py
     ```

3. **Uygulamayı Çalıştırma**

   Projeyi başlatmak için `app.py` dosyasını çalıştırın:

   ```bash
   python app.py
