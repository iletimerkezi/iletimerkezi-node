# İleti Merkezi Node.js SDK

İleti Merkezi SMS API'sini Node.js uygulamalarınızda kolayca kullanmanızı sağlayan resmi SDK.

## Gereksinimler

- Node.js >= 14.x
- TypeScript >= 4.x

## Kurulum

```bash
npm i @iletimerkezi/iletimerkezi-node
```

## Hızlı Başlangıç

```typescript
import { IletiMerkeziClient } from 'iletimerkezi-node';

// Client oluşturma
const client = new IletiMerkeziClient(
    'API_KEY',
    'API_HASH',
    'SENDER' // Opsiyonel
);

// SMS Gönderme
const smsService = client.sms();

// Tek numaraya SMS gönderme
const response = await smsService
    .disableIysConsent()
    .send('5051234567', 'Merhaba!');

if (response.ok()) {
    console.log('SMS gönderildi:', response.getOrderId());
} else {
    console.log('Hata:', response.getMessage());
}
```

## Özellikler

- TypeScript desteği
- Promise tabanlı API
- Hata yönetimi
- Detaylı raporlama
- Webhook desteği

## Servisler

### SMS Servisi

```typescript
// Tek numaraya SMS gönderme
await client.sms().send('5051234567', 'Mesaj');

// Birden fazla numaraya aynı mesajı gönderme
await client.sms().send(['5051234567', '5051234568'], 'Mesaj');

// Farklı numaralara farklı mesajlar gönderme
await client.sms().send({
    '5051234567': 'Mesaj 1',
    '5051234568': 'Mesaj 2'
});

// İleri tarihli gönderim
await client.sms()
    .disableIysConsent()
    .schedule('2024-12-25 10:00:00')
    .send('5051234567', 'Mesaj');
```


### Rapor Servisi

```typescript
// Sipariş detaylarını alma
const report = await client.reports().get(orderId);
if (report.ok()) {
    console.log('Toplam:', report.getTotal());
    console.log('İletilen:', report.getDelivered());
    console.log('İletilemeyen:', report.getUndelivered());
}
```

### Özet Servisi

```typescript
// Tarih aralığındaki siparişleri listeleme
const summary = await client.summary().list('2024-01-01', '2024-01-31');
if (summary.ok()) {
    console.log('Sipariş sayısı:', summary.getCount());
    for (const order of summary.getOrders()) {
        console.log('Sipariş ID:', order.getId());
    }
}
```

### Gönderici Adı Servisi

```typescript
// Gönderici adlarını listeleme
const senders = await client.senders().list();
if (senders.ok()) {
    console.log('Gönderici adları:', senders.getSenders());
}
```


### Kara Liste Servisi

```typescript
// Kara listeye numara ekleme
await client.blacklist().add(['5051234567']);

// Kara listeden numara çıkarma
await client.blacklist().remove(['5051234567']);

// Kara listedeki numaraları listeleme
const blacklist = await client.blacklist().list();
```

### Hesap Servisi

```typescript
// Bakiye sorgulama
const balance = await client.account().balance();
if (balance.ok()) {
    console.log('Bakiye:', balance.getAmount());
    console.log('SMS Kredisi:', balance.getCredits());
}
```


### Webhook Servisi

```typescript
// Webhook verilerini işleme
const webhook = client.webhook();
const report = await webhook.handle();
console.log('Sipariş ID:', report.getOrderId());
console.log('Numara:', report.getNumber());
console.log('Durum:', report.getStatus());
```

## Debug

```typescript
// Son istek ve yanıt bilgilerini görüntüleme
console.log(client.debug());
```


## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakınız.

## Destek
Herhangi bir sorunuz veya öneriniz varsa, lütfen [GitHub Issues](https://github.com/iletimerkezi/iletimerkezi-node/issues) üzerinden bizimle iletişime geçin.
