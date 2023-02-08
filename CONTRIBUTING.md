# Katkı Yapma Rehberi

## Katkı yapmadan önce dikkat edilmesi gerekenler

- İlgilendiğiniz konunun daha önce herhangi bir issue tarafından işlenilmediğine ve başkası tarafından yapılmadığından emin olun.
- Eğer bir problemle karşılaşırsanız, issue açın.
- Beklediğiniz, istediğiniz bir değişiklik için issue açın.
- Yeni bir özellik eklemek için issue açın.
- Bir hatayı düzeltmek için PR açın.
- Dökümantasyondaki bir hatayı düzeltmek için PR açın.

### [**PR Kuralları**](https://github.com/acikkaynak/deprem-yardim-frontend/blob/development/.github/PULL_REQUEST_TEMPLATE.md)

### [**Issue Kuralları**](https://github.com/acikkaynak/deprem-yardim-frontend/tree/development/.github/ISSUE_TEMPLATE)

## Başlamadan önce

### Projeyi kurmak

Gereksinimler:

- Node 17.0^
- Yarn 1.22^

```bash
# Projeyi klonlayın
git clone

# Proje dizinine girin
cd deprem-yardim-frontend

# Gereksinimleri yükleyin
yarn

# Geliştirme ortamını başlatın
yarn dev
```

### Kodu formatlama

Bu projede kod formatlama için [`prettier`](https://prettier.io/) kullanıyoruz. Linter konfigürasyonu [burada](https://github.com/acikkaynak/deprem-yardim-frontend/blob/main/.prettierrc) bulunabilir.

### Commit mesajları

Her commit mesajı bir **başlık**, bir **gövde** ve bir **altbilgi** içerir. Başlık, **tip**, bir **kapsam** ve bir **açıklama** içeren bir özel biçimde biçimlendirilir:

```plaintext
<type>(<scope>): <description>
<BOŞ SATIR>
<body>
<BOŞ SATIR>
<footer>
```

Her commit mesajı 72 karakterden uzun olmamalıdır.

### Mesaj Başlığı

Mesaj başlığı zorunludur ve bir tür, isteğe bağlı bir kapsam ve bir açıklama içeren kısa bir açıklama içermelidir. İdeal olarak, 50 karakterden uzun olmamalıdır.

Bu kurallara uymak, her sürüm için açık bir değişiklik günlüğü oluşturur.

PR başlığını da commit mesajları için izlemek iyi bir fikirdir. Bu şekilde, PR birleştirildiğinde, PR başlığı son commit mesajı olarak kullanılabilir ve geçmişin düzgün biçimlendirilmiş bir şekilde oluşturulmasını sağlar.

#### Tip

Tip, commit'in ne tür bir değişiklik olduğunu belirtir. İzin verilen türler:

- `feat`: Bir yeni özellik ekler
- `fix`: Bir hata düzeltir
- `docs`: Sadece dokümantasyonu etkileyen değişiklikler
- `style`: Sadece biçimlendirme, noktalama işaretleri, boşluklar, vb. Değişiklikler
- `refactor`: Kodun içeriğini değiştirmeyen bir değişiklik
- `perf`: Bir performans değişikliği
- `test`: Eksik testleri ekler veya mevcut testleri değiştirir
- `chore`: Geliştirme sürecini etkilemeyen diğer değişiklikler

#### Kapsam

Kapsam, commit'in etkilediği bölümü belirtir. Örneğin, `kafka` veya `login` gibi bir kapsam belirtilebilir.

#### Açıklama

Açıklama, commit'in amacını kısa bir şekilde belirtir. İlk harf büyük harfle yazılmalıdır. Açıklama, bir cümle olmalıdır. Bu, commit mesajının başlığı olarak kullanılabilir.

### Mesaj Gövdesi

Mesaj gövdesi, commit'in neden yapıldığını açıklayan bir açıklamadır. Gövde, bir veya daha fazla paragraf içerebilir. Her paragraf, 72 karakterden uzun olmamalıdır.

#### Daha fazla bilgi git commit mesajları yazmak için

- [Writing Git commit messages](http://365git.tumblr.com/post/3308646748/writing-git-commit-messages)

- [A Note About Git Commit Messages](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)

### Mesaj Alt Bilgisi

Tamamlanan, düzeltilen veya teslim edilen hikayeler, "Finishes", "Fixes" veya "Delivers" anahtar sözcüğüyle başlayan bir ayrı satırda altbilgiye eklenmelidir:

`[(Finishes|Fixes|Delivers) #ISSUE_ID]`

### Mesaj Örneği

```sh
feat(34): implement exactly once delivery
- ensure every event published to kafka
```
