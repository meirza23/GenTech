Gentech Generative AI Projesi
Bu proje, Python Flask ve MSSQL kullanılarak geliştirilmiştir. SQL Server Management Studio (SSMS) 20 kullanılmaktadır.

Kurulum ve Başlangıç
Yapılandırma

app.py ve main.py dosyalarında gerekli yapılandırma bilgilerini (OpenAI anahtarı, endpoint, veritabanı adı, sunucu adı) girin.
sql.py ve admin-create.py dosyalarında da veritabanı ve sunucu adlarını güncelleyin.
Gerekli Paketleri Yükleyin

Proje gereksinimlerini yüklemek için requirements.txt dosyasını kullanın. Terminale aşağıdaki komutu girerek gerekli paketleri yükleyin:

bash
Kodu kopyala
pip install -r requirements.txt
Veritabanı Tablolarını Oluşturun

Proje dosyalarınız arasında bulunan sql.py dosyasını çalıştırarak veritabanında gerekli tabloları oluşturun:

bash
Kodu kopyala
python sql.py
Admin Hesabını Oluşturun

Admin hesabını oluşturmak için admin-create.py dosyasını çalıştırın:

bash
Kodu kopyala
python admin-create.py
Uygulamayı Çalıştırın

Projeyi başlatmak için app.py dosyasını çalıştırın:

bash
Kodu kopyala
python app.py
Bu komutla birlikte uygulamanız başlatılacak ve site erişilebilir olacaktır.

Gereksinimler
requirements.txt dosyasında belirtilen tüm gerekli paketleri yüklemeniz gerekmektedir.
