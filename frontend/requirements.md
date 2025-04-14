Aşağıda detaylarını paylaştığımız bu çalışma, Finsuretex platformunda geliştireceğimiz “Teklif Yönetim Paneli”nin MVP versiyonunu düşünerek hazırlanmıştır. Proje kapsamında özellikle UI/UX yaklaşımın, bileşen yapın, veri ile etkileşimlerin ve kod organizasyonun bizim için önemli.

Mini Case: “Sigorta Teklifi Yönetim Dashboard’u”

Senaryo:
Finsuretex’in admin paneli üzerinden iş ortakları, müşterilerine sundukları sigorta tekliflerini yönetebiliyor. Bu panelin temel bir versiyonunu geliştirmeni rica ediyoruz.

Beklenen Özellikler:

Teklif Listesi Tablosu

Teklif adı, fiyatı, ürün tipi, oluşturulma tarihi gibi alanlar

Sayfalama, filtreleme ve sıralama desteği

Yeni Teklif Oluştur Modal’ı

Ürün tipi, sigorta tipi, teklif bedeli gibi alanları içeren bir form

Form doğrulama (örneğin fiyat > 0)

UI: Tailwind CSS ve component-based bir UI kütüphanesi (örneğin Shadcn/UI, Material UI vs.)

Opsiyonel Backend:

GET /api/offers → teklifleri getir

POST /api/offers → yeni teklif ekle

(Gerçek DB şart değil, mock JSON veya memory state kullanılabilir)

Bonus (isteğe bağlı):

Recharts vb. ile dinamik grafik

JWT bazlı token kontrolü (login gerekmez)

Teslim: Projeni GitHub’a yükleyip bizimle paylaşabilirsin. Readme dosyasında şu bilgilere yer verirsen memnun oluruz:

Kurulum / çalıştırma talimatı

Kullandığın teknolojilerin kısa açıklaması

Daha fazla vaktin olsaydı neleri geliştirirdin

Herhangi bir sorunda ya da teknik destek ihtiyacında çekinmeden yazabilirsin. Bu çalışmayı 5-6 gün içinde tamamlayabilirsen süreci hızlıca ilerletmek isteriz.

İlgin ve emeğin için şimdiden teşekkürler.

İyi çalışmalar,



# ZAMAN KALIRSA YAPACAKLARIM

çok önemli bir dashboard olduğu için 2fa tarzı authenticator ile ilgili bir geliştirme yapardım, ilk başta e mail ya da telefon. Sonra da 2fa appleri ile.

frontend tarafındaki öncelikle pagination backend tarafında yapardım, sonra filter ve sort işlemleride backend tarafında yapardım.

bu filter ve sort işlemlerini query parametreleri ile yapardım ki url shareable olsun.