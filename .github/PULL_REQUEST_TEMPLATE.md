
# Açıklama

 **prefix(#issue)**

Lütfen değişikliklerinizi açıklayın. Aynı zamanda amacınızı ve içeriği açıklayın. Bu değişikliklerin gerektirdiği bağımlılıkları da listelemeyi unutmayın.


## PR açmadan önce dikkat edilmesi gerekenler
- [ ] Kendi kodumu inceledim, review ettim.
- [ ] Eğer core bir feature ise, detaylı testler yaptım.

## PR açma kuralları
- [ ] Approved tagine sahip bir issue için PR açılmalıdır. Aksi takdirde PR reddedilecektir.
- [ ] İlgili issue numarası: PR ile ilgili issue numarası, PR başlığının başına, prefix sonrası parantez içinde # ile eklenmelidir. "prefix(#issue_number): PR başlığı" şeklinde bir başlık kullanılabilir.
- [ ] Açıklayıcı ve anlaşılır bir başlık: PR başlığı, değişikliklerin niteliklerini ve amaçlarını açık bir şekilde tanımlamalıdır. Pr başlığı, PR açıldığında görüntülenen ilk şey olmalıdır. Ve semantik commit kurallarını takip etmelidir. Örneğin "docs(#issueId): Add README.md" şeklinde bir başlık kullanılabilir. 
- [ ] İlgili dosya seçimi: Sadece ilgili dosyalara dokunulmalı ve başka dosyaların etkilenmemesi sağlanmalıdır.
- [ ] Format ve Lint uygunluğu: Kod, belirli bir format standardına uygun hale getirilmeli ve lint kurallarına göre incelenmelidir.
- [ ] Temiz commit geçmişi: Değişikliklerin yapıldığı commitler, anlaşılır ve düzenli olmalıdır.
- [ ] İş tamamlandığında PR açılması: PR, iş tamamlandığında açılmalı ve diğer takım üyeleri tarafından incelenmesi için gönderilmelidir.



## Değişiklikler

- [ ] Yeni bir özellik (breaking change olmayan, yeni bir özellik ekleyen bir değişiklik)
- [ ] Yeni bir refactor (breaking change olmayan, kodun okunabilirliğini veya performansını artıran bir değişiklik)
- [ ] Breaking bir değişiklik 
- [ ] Dokümantasyon değişikliği


# Bu değişiklikler nasıl test edildi?

Lütfen yaptığınız değişiklikleri test etmek için yaptığınız testleri açıklayın. Lütfen aynı zamanda test konfigürasyonunuzu da belirtin.


**Test Konfigürasyonu**:

* Firmware versiyonu:
* Donanım:
* Toolchain:
* SDK:

