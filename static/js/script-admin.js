document.addEventListener('DOMContentLoaded', function() {
    // İkonların URL'lerini belirle
    var checkIconUrl = '/static/images/check.png';
    var deleteIconUrl = '/static/images/delete.png';

    // HTML elementlerini kontrol et
    const complaintsTable = document.getElementById('complaints-table');
    const profileAvatar = document.querySelector('.profile-avatar');
    const dropdownMenu = document.getElementById('dropdown-menu');

    if (complaintsTable) {
        fetch('/api/complaints')
            .then(response => response.json())
            .then(complaints => {
                const complaintsTableBody = complaintsTable.getElementsByTagName('tbody')[0];
                complaintsTableBody.innerHTML = ''; // Önceki verileri temizle

                complaints.forEach(complaint => {
                    const row = complaintsTableBody.insertRow();

                    row.innerHTML = `
                        <td>${complaint.id}</td>
                        <td>${complaint.ad}</td>
                        <td>${complaint.soyad}</td>
                        <td>${complaint.eposta}</td>
                        <td>${complaint.telefon}</td>
                        <td>${complaint.sikayet}</td>
                        <td class="category-cell">
                            <div>${complaint.kategori}</div>
                            <button class="change-category-button" data-complaint-id="${complaint.id}">
                                Kategoriyi Değiş
                            </button>
                        </td>
                        <td>
                            <img src="${complaint.iletildi == 1 ? checkIconUrl : deleteIconUrl}" 
                                 class="status-icon ${complaint.iletildi == 1 ? 'status-icon-iletilme-check' : 'status-icon-iletilme-delete'}"
                                 data-complaint-id="${complaint.id}"
                                 data-status="${complaint.iletildi}"
                                 data-type="iletilme">
                        </td>
                        <td>
                            <img src="${complaint.cozuldu == 1 ? checkIconUrl : deleteIconUrl}" 
                                 class="status-icon ${complaint.cozuldu == 1 ? 'status-icon-cozulme-check' : 'status-icon-cozulme-delete'}"
                                 data-complaint-id="${complaint.id}"
                                 data-status="${complaint.cozuldu}"
                                 data-type="cozulme">
                        </td>`;
                });

                updateStatusIcons();
                addChangeCategoryEventListeners();
            })
            .catch(error => console.error('Error fetching complaints:', error));
    }

    // Profil menüsünü açma ve kapama işlevi
    if (profileAvatar && dropdownMenu) {
        profileAvatar.addEventListener('click', function() {
            dropdownMenu.classList.toggle('show');
        });

        window.onclick = function(event) {
            if (!event.target.matches('.profile-avatar')) {
                if (dropdownMenu.classList.contains('show')) {
                    dropdownMenu.classList.remove('show');
                }
            }
        }
    }

    // Çıkış yapma işlemi
    if (dropdownMenu) {
        dropdownMenu.addEventListener('click', function(event) {
            if (event.target.id === 'logout') {
                fetch('/logout', {
                    method: 'POST'
                }).then(() => window.location.href = '/login');
            }
        });
    }

    // Status ikonlarını güncelleme işlevi
    function updateStatusIcons() {
        document.querySelectorAll('.status-icon').forEach(icon => {
            icon.addEventListener('click', function() {
                const statusType = this.getAttribute('data-type');
                const complaintId = this.getAttribute('data-complaint-id');
                const currentStatus = this.getAttribute('data-status');
                const newStatus = currentStatus == 1 ? 0 : 1;

                fetch(`/update-${statusType}-status/${complaintId}/${newStatus}`, {
                    method: 'POST'
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.success) {
                        this.src = newStatus == 1 ? checkIconUrl : deleteIconUrl;
                        this.classList.toggle(`status-icon-${statusType}-check`);
                        this.classList.toggle(`status-icon-${statusType}-delete`);
                        this.setAttribute('data-status', newStatus);
                    } else {
                        alert('Bir hata oluştu.');
                    }
                })
                .catch(error => {
                    console.error('Hata:', error);
                });
            });
        });
    }

    function addChangeCategoryEventListeners() {
        document.querySelectorAll('.change-category-button').forEach(button => {
            button.addEventListener('click', function() {
                const complaintId = this.getAttribute('data-complaint-id');
                window.location.href = `/admin-dashboard-change-complaint/${complaintId}`;
            });
        });
    }    
});
