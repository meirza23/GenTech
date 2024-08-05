from openai import AzureOpenAI
import os

# Set the API key and endpoint in environment variables
os.environ["AZURE_OPENAI_KEY"] = "openai_key"
os.environ["AZURE_OPENAI_ENDPOINT"] = "endpoint

api_key = os.getenv("AZURE_OPENAI_KEY")
endpoint = os.getenv("AZURE_OPENAI_ENDPOINT")

# Create the AzureOpenAI client
client = AzureOpenAI(
    azure_endpoint=endpoint,
    api_key=api_key,
    api_version="2024-02-15-preview",
    timeout=30
)

# Define the system message
system_message = {
    "role": "system",
    "content": """
    Main categories:sub categories
    Dijital Bankacılık:MobilDeniz,
    ATM,
    İnternet Bankacılığı

    Kartlar:Bireysel Kredi Kartları,
    Debit Kartlar

    Yatırım Ürünleri:Yatırım İşlemleri

    Mevduat:Para Transferi,
    Vadeli Mevduat

    Fraud Yönetimi:Hesap/Kart Bloke Kaldırma,
    EFT / Havale Teyit,
    Dolandırıcılık-Bilgisi Dış.Şüph.Hesap-Kart İşl.

    Ana kategoriler: -alt kategori: kategori açıklaması
    Dijital Bankacılık:
    - MobilDeniz: Mobil uygulama üzerinden bankacılık işlemlerinin yapılması. Doğrudan mobil uygulamanın fonksiyonlarının ve servislerinin çalışmaması ile ilgili sorunlar.
    - ATM: Banka ATM'leri üzerinden yapılan işlemler ve bu işlemlerle ilgili sorunlar.
    - İnternet Bankacılığı: Bankanın internet sitesi üzerinden yapılan bankacılık işlemleri. Özellikle web uygulamasında yaşanan sorunlar bu kategoriye dahildir.

    Kartlar:
    - Bireysel Kredi Kartları: Kişisel kullanım için verilen kredi kartları.
    - Debit Kartlar: Banka hesaplarına bağlı ve hesap bakiyesinden harcama yapılmasını sağlayan kartlar.

    Yatırım Ürünleri:
    - Yatırım İşlemleri: Hisse senedi, tahvil, fon gibi yatırım ürünlerinin alım satım işlemleri.

    Mevduat:
    - Para Transferi: EFT, havale, fast gibi para transfer işlemleri. Ve herhangi para transferi sırasında yaşanan sorunlar. (güvenlik ile ilgili hatalar buraya dahil değildir.)
    - Vadeli Mevduat: Belirli bir vade sonunda faiz getirisi sağlayan mevduat hesabı.

    Fraud Yönetimi:
    - Hesap/Kart Bloke Kaldırma: Bloke edilmiş hesap veya kartların tekrar kullanıma açılması.
        Güvenlik gerekçesiyle internet bankacılığına ve mobil uygulamaya girilememesi, kripto para vb sebeplerle bloke edilen erişim engeli getirilen hesaplar.
    - EFT / Havale Teyit: Yapılan EFT veya havale işlemlerinin teyit edilmesi. Güvenlik gerekçesiyle havale/eft nin yapılamadığı durumlar. Kullanıcı tarafından onaylanması gereken para transferleri aktarımları yollanması.
    - Dolandırıcılık-Bilgisi Dış.Şüph.Hesap-Kart İşl.: Müşterinin bilgisi dışında yapılan şüpheli hesap veya kart işlemlerinin incelenmesi.

    Instructions:
    Categorization: For each user comment, determine the main category and subcategory it belongs to.
    Language: Always reply in Turkish.
    Error Handling: If the input does not contain a user comment or is irrelevant to the task, reply with "error" and when you do reply with "error" give a brief explanation as to why.
    Output formatting: Always format your output as "MAIN_CATEGORY - SUB_CATEGORY".
    Best Match: If a user comment could fit into multiple categories, choose the best match based on the context and keywords within the comment.
    Flexibility: Allow for some flexibility in interpretation. If a comment is generally relevant to a category but not a perfect match, place it in the most appropriate category.
    Use Context: Consider the entire context of the user comment, including any implicit information that may help in categorization.
    """
}

# Function to get the AI's guess for each user comment
def get_category_for_comment(comment):
    try:
        messages = [system_message, {"role": "user", "content": comment}]
        
        completion = client.chat.completions.create(
            model="gpt-4o",
            messages=messages,
            max_tokens=50,
            temperature=0,
            top_p=0.95,
            stop=None
        )
        
        # Yanıtı doğru bir şekilde işlemek
        return completion.choices[0].message.content.strip()
    except Exception as e:
        return f"Yorum işlenirken hata oluştu: {str(e)}"
