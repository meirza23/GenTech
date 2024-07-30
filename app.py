from flask import Flask, render_template, request, redirect, url_for, session, jsonify, flash
from werkzeug.security import generate_password_hash, check_password_hash
from main import get_category_for_comment
import pyodbc

app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.secret_key = 'supersecretkey'

def get_db_connection():
    conn_str = (
        r'DRIVER={ODBC Driver 17 for SQL Server};'
        r'SERVER=MEI\SQLEXPRESS;'
        r'DATABASE=gentechdb;'
        r'TRUSTED_CONNECTION=yes;'
    )
    return pyodbc.connect(conn_str)

@app.route('/')
def index():
    if 'user_id' in session:
        return redirect(url_for('categorize'))
    if 'admin' in session:
        return redirect(url_for('admin_login'))
    return redirect(url_for('welcome'))

@app.route('/welcome')
def welcome():
    return render_template('welcome.html')

#Hakkimizda sayfasi
@app.route('/aboutUs')
def aboutUs():
    return render_template('aboutUs.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM Kullanicilar WHERE eposta = ?', (email,))
            user = cursor.fetchone()
            
            if user and check_password_hash(user[5], password):  # user[5] is the password field
                session['user_id'] = user[0]  # user[0] is the id field
                
                if user[6] == 1:  # user[6] is isadmin field
                    session['admin'] = email
                    return redirect(url_for('admin_login'))
                
                return redirect(url_for('categorize'))
            
            flash('Giriş başarısız, bilgilerinizi kontrol edin.', 'error')
        
        except Exception as e:
            flash('Giriş sırasında bir hata oluştu.', 'error')
        
        finally:
            conn.close()

    return render_template('login.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        first_name = request.form['first_name']
        last_name = request.form['last_name']
        email = request.form['email']
        phone = request.form['phone']
        password = request.form['password']

        # Boş alan kontrolü
        if not (first_name and last_name and email and password and phone):
            flash('Boş alanları doldurunuz.', 'error')
            return render_template('signup.html')

        hashed_password = generate_password_hash(password, method='pbkdf2:sha256')

        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            
            # Kullanıcıyı veritabanına ekle
            cursor.execute('''
                INSERT INTO Kullanicilar (ad, soyad, eposta, telefon, sifre)
                VALUES (?, ?, ?, ?, ?)
            ''', (first_name, last_name, email, phone, hashed_password))
            
            conn.commit()
        
        except Exception as e:
            conn.rollback()
            flash('Kayıt sırasında bir hata oluştu.', 'error')
            return render_template('signup.html')
        
        finally:
            conn.close()
        
        return redirect(url_for('login'))

    return render_template('signup.html')

@app.route('/categorize', methods=['GET', 'POST'])
def categorize():
    if 'user_id' not in session:
        return redirect(url_for('login'))
    
    if request.method == 'POST':
        data = request.get_json()
        comment = data.get('comment')

        if comment:
            category = get_category_for_comment(comment)

            try:
                conn = get_db_connection()
                cursor = conn.cursor()

                # Kullanıcı bilgilerini oturumdan al
                user_id = session['user_id']
                cursor.execute('SELECT ad, soyad, eposta, telefon FROM Kullanicilar WHERE id = ?', (user_id,))
                user_info = cursor.fetchone()

                if user_info:
                    ad, soyad, eposta, telefon = user_info

                    # Şikayeti veritabanına ekle
                    cursor.execute('''
                        INSERT INTO Sikayetler (ad, soyad, eposta, telefon, sikayet, kategori)
                        VALUES (?, ?, ?, ?, ?, ?)
                    ''', (ad, soyad, eposta, telefon, comment, category))
                    
                    conn.commit()
                    
                    return jsonify({'category': category})

            except Exception as e:
                return jsonify({'category': 'error', 'message': 'Veritabanına kayıt sırasında bir hata oluştu.'})
            
            finally:
                conn.close()

        return jsonify({'category': 'error', 'message': 'Yorum bulunamadı veya geçersiz.'})
    
    return render_template('categorize.html')

@app.route('/admin-login')
def admin_login():
    if 'admin' not in session:
        return redirect(url_for('login'))
    
    return render_template('admin-login.html')

@app.route('/admin-dashboard-users')
def admin_dashboard_users():
    if 'admin' not in session:
        return redirect(url_for('login'))
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Kullanıcıları çek
        cursor.execute('SELECT id, ad, soyad, eposta, telefon FROM Kullanicilar')
        users = cursor.fetchall()

    except Exception as e:
        flash('Veri çekme sırasında bir hata oluştu.', 'error')
        users = []
    
    finally:
        conn.close()
    
    return render_template('admin-dashboard-users.html', users=users)

@app.route('/admin-dashboard-complaints')
def admin_dashboard_complaints():
    if 'admin' not in session:
        return redirect(url_for('login'))
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Şikayetleri çek
        cursor.execute('SELECT id, ad, soyad, eposta, telefon, sikayet, kategori FROM Sikayetler')
        complaints = cursor.fetchall()

    except Exception as e:
        flash('Veri çekme sırasında bir hata oluştu.', 'error')
        complaints = []
    
    finally:
        conn.close()
    
    return render_template('admin-dashboard-complaints.html', complaints=complaints)

@app.route('/api/complaints')
def api_complaints():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Şikayetleri benzersiz olarak çek
        cursor.execute('SELECT DISTINCT id, ad, soyad, eposta, telefon, sikayet, kategori, iletildi, cozuldu FROM Sikayetler')
        complaints = cursor.fetchall()
        
        # JSON formatına dönüştür
        complaints_list = [
            {
                'id': row[0], 
                'ad': row[1], 
                'soyad': row[2], 
                'eposta': row[3], 
                'telefon': row[4], 
                'sikayet': row[5], 
                'kategori': row[6], 
                'iletildi': row[7], 
                'cozuldu': row[8]
            } 
            for row in complaints
        ]
        
        return jsonify(complaints_list)
    
    except Exception as e:
        # Hata mesajını loglama veya daha fazla bilgi ekleme
        print(f"Error fetching complaints: {e}")
        return jsonify({'error': 'Veri çekme sırasında bir hata oluştu.', 'details': str(e)}), 500
    
    finally:
        # Cursor'u ve bağlantıyı kapatma
        cursor.close()
        conn.close()

@app.route('/update-category/<int:complaint_id>', methods=['POST'])
def update_category(complaint_id):
    if 'admin' not in session:
        return jsonify({'success': False, 'message': 'Unauthorized'}), 401

    data = request.get_json()
    new_category = data.get('category')

    if not new_category:
        return jsonify({'success': False, 'message': 'Yeni kategori belirtilmedi.'}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('UPDATE Sikayetler SET kategori = ? WHERE id = ?', (new_category, complaint_id))
        conn.commit()
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500
    finally:
        conn.close()

@app.route('/admin-dashboard-change-complaint/<int:complaint_id>', methods=['GET', 'POST'])
def admin_dashboard_change_complaint(complaint_id):
    if 'admin' not in session:
        return redirect(url_for('login'))
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT id, ad, soyad, kategori FROM Sikayetler WHERE id = ?', (complaint_id,))
        complaint = cursor.fetchone()
        if not complaint:
            flash('Şikayet bulunamadı.', 'error')
            return redirect(url_for('admin_dashboard_complaints'))
    except Exception as e:
        flash('Veri çekme sırasında bir hata oluştu.', 'error')
        return redirect(url_for('admin_dashboard_complaints'))
    finally:
        conn.close()

    if request.method == 'POST':
        new_category = request.form['category']
        
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute('UPDATE Sikayetler SET kategori = ? WHERE id = ?', (new_category, complaint_id))
            conn.commit()
            flash('Kategori başarıyla güncellendi.', 'success')
            return redirect(url_for('admin_dashboard_complaints'))
        except Exception as e:
            flash('Kategori güncelleme sırasında bir hata oluştu.', 'error')
        finally:
            conn.close()
    
    return render_template('admin-dashboard-change-complaint.html', complaint=complaint)





@app.route('/update-iletilme-status/<int:complaint_id>/<int:new_status>', methods=['POST'])
def update_iletilme_status(complaint_id, new_status):
    if 'admin' not in session:
        return jsonify({'success': False, 'message': 'Unauthorized'}), 401

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('UPDATE Sikayetler SET iletildi = ? WHERE id = ?', (new_status, complaint_id))
        conn.commit()
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500
    finally:
        conn.close()

@app.route('/update-cozulme-status/<int:complaint_id>/<int:new_status>', methods=['POST'])
def update_cozulme_status(complaint_id, new_status):
    if 'admin' not in session:
        return jsonify({'success': False, 'message': 'Unauthorized'}), 401

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('UPDATE Sikayetler SET cozuldu = ? WHERE id = ?', (new_status, complaint_id))
        conn.commit()
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500
    finally:
        conn.close()


@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    session.pop('admin', None)
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)
