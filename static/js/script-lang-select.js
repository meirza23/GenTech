document.addEventListener("DOMContentLoaded", (event) => {
  let currentScreen = window.location.href;
  let isEnglish = localStorage.getItem("preferredLang") === "en";
  console.log(localStorage.getItem("preferredLang"));
  console.log(isEnglish);

  const translations = {
    aboutUs: {
      en: {
        hakkimizda: "ABOUT US",
        vision: "Vision",
        mission: "Mission",
        visionContent:
          "At GenTech, our vision is to provide an industry-leading \
and reliable solution that ensures high accuracy and efficiency \
in classifying user comments.",
        missionContent:
          "Our mission is to develop an innovative and user-friendly generative AI \
assistant that can classify bank customers' comments into sub and main categories.",
      },
      tr: {
        hakkimizda: "HAKKIMIZDA",
        vision: "Vizyon",
        mission: "Misyon",
        visionContent:
          "GenTech olarak vizyonumuz kullanıcı yorumlarını sınıflandırmada yüksek doğruluk ve verimlilik sağlayan, sektörde öncü ve güvenilir bir çözüm sunmaktır.",
        missionContent:
          "Misyonumuz banka müşterilerinin yorumlarını alt ve üst kategorilerde birlikte sınıflandırabilecek yenilikçi ve kullanıcı dostu bir generative AI asistanı geliştirmektir.",
      },
    },
    welcome: {
      en: {
        anaSayfa: "Home",
        bizeUlasin: "Contact Us",
        hakkimizda: "About Us",
        feedback:
          "Your feedback is very valuable to us! Whether it's your comments, complaints, requests, or wishes, we are here to communicate with you quickly and effectively. Every opinion contributes to our continuous development and improvement process. We are always by your side to provide you with the best service!",
        complaints: "WE ARE HERE FOR YOUR COMMENTS AND COMPLAINTS",
        start: "START",
      },
      tr: {
        anaSayfa: "Ana Sayfa",
        bizeUlasin: "Bize Ulaşın",
        hakkimizda: "Hakkımızda",
        feedback:
          "Sizden gelen geri bildirimler bizim için çok değerli! İster yorumlarınızı, ister şikayetlerinizi, isteklerinizi ya da dileklerinizi paylaşın; sizinle hızlı ve etkili bir şekilde iletişime geçmek için buradayız. Her türlü görüşünüz, bizim sürekli gelişim ve iyileştirme sürecimize katkı sağlar. Size en iyi hizmeti sunmak için her zaman yanınızdayız!",
        complaints: "YORUMLARINIZ VE ŞİKAYETLERİNİZ İÇİN BURADAYIZ",
        start: "BAŞLA",
      },
    },
    login: {
      en: {
        pageTitle: "Login",
        avatarAlt: "Avatar",
        dropdownHome: "Home",
        loginHeader: "Login",
        emailLabel: "Email:",
        passwordLabel: "Password:",
        loginButton: "Login",
        signupPrompt: "Don't have an account?",
        signupLink: "Sign Up",
      },
      tr: {
        pageTitle: "Giriş Yap",
        avatarAlt: "Avatar",
        dropdownHome: "Ana Sayfa",
        loginHeader: "Giriş Yap",
        emailLabel: "E-posta:",
        passwordLabel: "Şifre:",
        loginButton: "Giriş Yap",
        signupPrompt: "Hesabınız yok mu?",
        signupLink: "Kayıt Olun",
      },
    },
    signup: {
      en: {
        pageTitle: "Sign Up",
        avatarAlt: "Avatar",
        dropdownHome: "Home",
        signupHeader: "Sign Up",
        firstNameLabel: "First Name:",
        lastNameLabel: "Last Name:",
        emailLabel: "Email:",
        phoneLabel: "Phone:",
        passwordLabel: "Password:",
        signupButton: "Sign Up",
        loginPrompt: "Already have an account?",
        loginLink: "Log In",
        errorMessage: "Please correct the errors highlighted below.",
      },
      tr: {
        pageTitle: "Kayıt Ol",
        avatarAlt: "Avatar",
        dropdownHome: "Ana Sayfa",
        signupHeader: "Kayıt Ol",
        firstNameLabel: "Ad:",
        lastNameLabel: "Soyad:",
        emailLabel: "E-posta:",
        phoneLabel: "Telefon:",
        passwordLabel: "Şifre:",
        signupButton: "Kayıt Ol",
        loginPrompt: "Hesabınız var mı?",
        loginLink: "Giriş Yapın",
        errorMessage: "Lütfen aşağıdaki hataları düzeltin.",
      },
    },
    categorize: {
      en: {
        logoAlt: "Logo",
        intertechAlt: "Intertech Icon",
        patternAlt: "Pattern",
        vectorAlt: "Vector",
        brainIconAlt: "GenTech Brain Icon",
        menuBarAlt: "Menu",
        anaSayfa: "Home",
        cikisYap: "Log Out",
        gentechAsistan: "GenTech Assistant",
        onlineStatus: "Online",
        messagePlaceholder: "Enter your message.",
        sendButtonAlt: "Send",
      },
      tr: {
        logoAlt: "Logo",
        intertechAlt: "Intertech İkonu",
        patternAlt: "Desen",
        vectorAlt: "Vektör",
        brainIconAlt: "GenTech Beyin İkonu",
        menuBarAlt: "Menü",
        anaSayfa: "Ana Sayfa",
        cikisYap: "Çıkış Yap",
        gentechAsistan: "GenTech Asistan",
        onlineStatus: "Online",
        messagePlaceholder: "Mesajınızı giriniz.",
        sendButtonAlt: "Gönder",
      },
    },
  };

  function switchLanguage(language) {
    //check if the current language is different then what we are trying to change to, and if not terminate the function

    if (currentScreen.includes("aboutUs")) {
      document.querySelector(".hakkimizda").textContent =
        translations.aboutUs[language].hakkimizda;
      document.querySelector(".vizyon").textContent =
        translations.aboutUs[language].vision;
      document.querySelector(".misyon").textContent =
        translations.aboutUs[language].mission;
      document.querySelector(".gentech-olarak-vizyonumuz").textContent =
        translations.aboutUs[language].visionContent;
      document.querySelector(".misyonumuz-banka-mterilerini").textContent =
        translations.aboutUs[language].missionContent;
    } else if (currentScreen.includes("welcome")) {
      document.querySelector(".ana-sayfa").textContent =
        translations.welcome[language].anaSayfa;
      document.querySelector(".bize-ulan").textContent =
        translations.welcome[language].bizeUlasin;
      document.querySelector(".hakkmzda").textContent =
        translations.welcome[language].hakkimizda;
      document.querySelector(".sizden-gelen-geri").textContent =
        translations.welcome[language].feedback;
      document.querySelector(".yorumlariniz-ve-kayetlernz").textContent =
        translations.welcome[language].complaints;
      document.querySelector(".bala").textContent =
        translations.welcome[language].start;
    } else if (currentScreen.includes("login")) {
      document.title = translations.login[language].pageTitle;
      document.getElementById("avatar").alt =
        translations.login[language].avatarAlt;
      document.querySelector("#dropdown-menu a").textContent =
        translations.login[language].dropdownHome;
      document.querySelector(".box h2").textContent =
        translations.login[language].loginHeader;
      document.querySelector("label[for='email']").textContent =
        translations.login[language].emailLabel;
      document.querySelector("label[for='password']").textContent =
        translations.login[language].passwordLabel;
      document.querySelector(".button").textContent =
        translations.login[language].loginButton;
      document.querySelector(".signup-link").childNodes[0].textContent =
        translations.login[language].signupPrompt + " ";
      document.querySelector(".signup-link a").textContent =
        translations.login[language].signupLink;
    } else if (currentScreen.includes("signup")) {
      document.title = translations.signup[language].pageTitle;
      document.getElementById("avatar").alt =
        translations.signup[language].avatarAlt;
      document.querySelector("#dropdown-menu a").textContent =
        translations.signup[language].dropdownHome;
      document.querySelector(".box h2").textContent =
        translations.signup[language].signupHeader;
      document.querySelector("label[for='first_name']").textContent =
        translations.signup[language].firstNameLabel;
      document.querySelector("label[for='last_name']").textContent =
        translations.signup[language].lastNameLabel;
      document.querySelector("label[for='email']").textContent =
        translations.signup[language].emailLabel;
      document.querySelector("label[for='phone']").textContent =
        translations.signup[language].phoneLabel;
      document.querySelector("label[for='password']").textContent =
        translations.signup[language].passwordLabel;
      document.querySelector(".button").textContent =
        translations.signup[language].signupButton;
      document.querySelector(".login-link").childNodes[0].textContent =
        translations.signup[language].loginPrompt + " ";
      document.querySelector(".login-link a").textContent =
        translations.signup[language].loginLink;
    } else if (currentScreen.includes("categorize")) {
      document.querySelector(".logo-1-icon").alt =
        translations.categorize[language].logoAlt;
      document.querySelector(".intertech-1-icon").alt =
        translations.categorize[language].intertechAlt;
      document.querySelectorAll(".pattern-icon").forEach((el, index) => {
        el.alt = translations.categorize[language].patternAlt + (index + 1);
      });
      document.querySelector(".vector-icon").alt =
        translations.categorize[language].vectorAlt;
      document.querySelector(".frame-3-removebg-preview-1-icon").alt =
        translations.categorize[language].brainIconAlt;
      document.querySelector(".menu-bar").alt =
        translations.categorize[language].menuBarAlt;
      document.querySelector("#menu-dropdown a[href='/welcome']").textContent =
        translations.categorize[language].anaSayfa;
      document.querySelector("#menu-dropdown a#logout").textContent =
        translations.categorize[language].cikisYap;
      document.querySelector(
        ".gentech-asistan-wrapper .gentech-asistan"
      ).textContent = translations.categorize[language].gentechAsistan;
      document.querySelector(".online-wrapper .gentech-asistan").textContent =
        translations.categorize[language].onlineStatus;
      document.querySelector(".message-input").placeholder =
        translations.categorize[language].messagePlaceholder;
      document.querySelector("button[type='submit'] img").alt =
        translations.categorize[language].sendButtonAlt;
    }
    localStorage.setItem("preferredLang", language);
  }

  const buttonTR = document.querySelector(".turkey-icon");
  const buttonEN = document.querySelector(".united-kingdom-icon");

  buttonTR.addEventListener("click", () => {
    switchLanguage("tr");
  });

  buttonEN.addEventListener("click", () => {
    switchLanguage("en");
  });

  if (isEnglish) {
    switchLanguage("en");
    console.log("ens");
  } else {
    switchLanguage("tr");
    console.log("trs");
  }

  /*
    // Optionally, load the preferred language from localStorage
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    switchLanguage(savedLanguage); */
});
