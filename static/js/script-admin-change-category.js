document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded event fired');

    const changeCategoryTable = document.getElementById('change-category-table');

    // URL'den complaintId değerini çekme
    const pathArray = window.location.pathname.split('/');
    const complaintId = pathArray[pathArray.length - 1];  // URL'nin son kısmını alırız

    if (changeCategoryTable && complaintId) {
        console.log('Table and complaintId found', changeCategoryTable, complaintId);

        fetch(`/api/complaints`)
            .then(response => {
                console.log('Fetch response:', response);
                return response.json();
            })
            .then(complaints => {
                console.log('Complaints fetched:', complaints); // Verilerin doğru çekilip çekilmediğini kontrol et

                const complaint = complaints.find(c => c.id == complaintId);
                if (!complaint) {
                    console.error('Şikayet bulunamadı.');
                    return;
                }

                const changeCategoryTableBody = changeCategoryTable.getElementsByTagName('tbody')[0];
                changeCategoryTableBody.innerHTML = ''; // Önceki verileri temizle

                const row = changeCategoryTableBody.insertRow();

                // Kategori seçeneklerini tanımla
                const categories = [
                    "Dijital Bankacılık - MobilDeniz",
                    "Dijital Bankacılık - ATM",
                    "Dijital Bankacılık - İnternet Bankacılığı",
                    "Kartlar - Bireysel Kredi Kartları",
                    "Kartlar - Debit Kartlar",
                    "Yatırım Ürünleri - Yatırım İşlemleri",
                    "Mevduat - Para Transferi",
                    "Mevduat - Vadeli Mevduat",
                    "Fraud Yönetimi - Hesap/Kart Bloke Kaldırma",
                    "Fraud Yönetimi - EFT / Havale Teyit",
                    "Fraud Yönetimi - Dolandırıcılık-Bilgisi Dış.Şüph.Hesap-Kart İşl."
                ];

                // Kategori seçeneklerini oluştur
                const categoryOptions = categories.map(category => `
                    <option value="${category}" ${category === complaint.kategori ? 'selected' : ''}>${category}</option>
                `).join('');

                row.innerHTML = `
                    <td>${complaint.id}</td>
                    <td>${complaint.sikayet}</td>
                    <td>${complaint.kategori}</td>
                    <td>
                        <select class="category-dropdown" data-complaint-id="${complaint.id}">
                            ${categoryOptions}
                        </select>
                    </td>`;

                updateCategoryDropdown();
            })
            .catch(error => console.error('Error fetching complaints:', error));
    } else {
        console.log('Table or complaintId not found', changeCategoryTable, complaintId);
    }

    // Kategori dropdownlarını güncelleme işlevi
    function updateCategoryDropdown() {
        document.querySelectorAll('.category-dropdown').forEach(dropdown => {
            dropdown.addEventListener('change', function() {
                const complaintId = this.getAttribute('data-complaint-id');
                const newCategory = this.value;

                fetch(`/update-category/${complaintId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ category: newCategory })
                })
                .then(response => response.json())
                .catch(error => {
                    console.error('Hata:', error);
                });
            });
        });
    }
});
