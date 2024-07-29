document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');

    // Menü işlevselliği
    var menuBar = document.getElementById('menu-bar');
    if (menuBar) {
        menuBar.addEventListener('click', function() {
            var dropdown = document.getElementById('menu-dropdown');
            dropdown.classList.toggle('show');
            console.log('Menu clicked');
        });
    } else {
        console.log('menu-bar element not found');
    }

    window.onclick = function(event) {
        if (!event.target.matches('#menu-bar')) {
            var dropdowns = document.getElementsByClassName('menu-dropdown');
            for (var i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }

    // Başlangıçta sistem mesajını ekle
    const initialMessage = document.createElement('div');
    initialMessage.className = 'assistant-message'; // Stil eklemek için sınıf
    initialMessage.innerText = 'Ben GenTech asistanınız. Size yardımcı olmam için mesajınızı benimle paylaşır mısınız?';

    document.getElementById('message-container').appendChild(initialMessage);

    // Comment form submit handler
    document.getElementById('comment-form')?.addEventListener('submit', function(event) {
        event.preventDefault(); // Formun varsayılan davranışını engelle
        var comment = event.target.comment.value;

        if (comment.trim() === '') {
            return;
        }

        // Kullanıcı mesajını oluştur
        const userMessage = document.createElement('div');
        userMessage.className = 'user-message'; // Stil eklemek için sınıf
        userMessage.innerText = comment;

        // Kullanıcı mesajını sağ tarafa ekleyin
        document.getElementById('message-container').appendChild(userMessage);

        // AI yanıtını oluştur
        const aiMessage = document.createElement('div');
        aiMessage.className = 'assistant-message';
        aiMessage.innerText = 'Yorumunuz alınmıştır. En kısa sürede size geri dönüş yapılacaktır.';

        // Mesajları göstermek için AI yanıtını bir süre sonra ekleyin
        setTimeout(() => {
            // AI mesajını kullanıcı mesajının altına ekleyin
            document.getElementById('message-container').appendChild(aiMessage);
            document.getElementById('message-container').scrollTop = document.getElementById('message-container').scrollHeight; // Mesajların görünümünü kaydır
        }, 500); // Geri dönüş mesajı 500ms sonra eklenir

        event.target.comment.value = ''; // Formu temizle

        fetch('/categorize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ comment: comment }),
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });

    document.getElementById('logout')?.addEventListener('click', function() {
        fetch('/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(() => window.location.href = '/login')
        .catch((error) => console.error('Error:', error));
    });

    // Enter tuşuna basıldığında formu gönder
    document.querySelector('textarea[name="comment"]')?.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); // Satır atlamayı engelle
            document.getElementById('comment-form').dispatchEvent(new Event('submit')); // Formu manuel olarak gönder
        }
    });
});
