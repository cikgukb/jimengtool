# PRD: UKB Seedance Prompt Generator
**Versi:** 1.0  
**Tarikh:** April 2026  
**Pemilik:** Elias @CikguKB (Penggunaan Peribadi)

---

## 1. OVERVIEW

Tool peribadi untuk auto-generate 3 batch prompt video UGC yang siap paste terus ke dalam Jimeng/Dreamina (Seedance 2.0). Output terus boleh digunakan tanpa edit tambahan.

---

## 2. OBJEKTIF

- Input: Topik + Tone + CTA
- Output: 3 batch prompt Seedance-ready secara serentak
- Karakter: Fixed → Elias @CikguKB
- Tujuan akhir: Video 30 saat yang di-merge dalam CapCut

---

## 3. FORMULA PROMPT (STANDARD)

Setiap batch menggunakan formula ini:

> **[Karakter] + [Action/Expression] + [Dialog] + [Camera] + [Mood]**

**Rules wajib:**
- 30–70 patah perkataan per batch
- Dialog dalam quotation mark " "
- Sebut camera angle (medium shot / close-up / eye-level)
- Satu batch = satu scene sahaja
- Tiada label, tiada heading dalam output prompt

---

## 4. INPUT YANG DIPERLUKAN

| Field | Keterangan | Contoh |
|-------|-----------|--------|
| Topik | Apa yang nak disampaikan | "Kit Jimat Cermat untuk SME" |
| Tone | Mood video | Casual / Serius / Motivasi |
| Tempat | Latar belakang babak | Dalam ofis moden / studio |
| CTA | Arahan akhir kepada penonton | "Klik link bawah ni" |

---

## 5. STRUKTUR OUTPUT (3 BATCH SERENTAK)

### BATCH 1 — Hook (Pain Point)
**Masa:** 0:00–0:10  
**Tujuan:** Tarik perhatian, buat penonton rasa relate  
**Tone:** Penat, empati, sincere  
**Formula:**
> @cikgukb, [Expression penat/relate]. Says: "[Dialog pain point berkaitan topik]." Medium shot, eye-level. Warm natural light, sincere tone.

---

### BATCH 2 — Solution
**Masa:** 0:11–0:20  
**Tujuan:** Perkenalkan penyelesaian (Kit/Produk)  
**Tone:** Relief, confident, genuine  
**Formula:**
> @cikgukb, expression brightens. Says: "[Dialog perkenalkan solusi berkaitan topik]." Medium shot, slight lean forward. Warm light, hopeful mood.

---

### BATCH 3 — CTA
**Masa:** 0:21–0:30  
**Tujuan:** Gerak penonton ambil tindakan  
**Tone:** Direct, warm, bukan hard sell  
**Formula:**
> @cikgukb, confident smile, points directly at camera. Says: "[Dialog CTA yang diberikan user]." Close-up shot, eye-level. Bright warm light, energetic finish.

---

## 6. CONTOH OUTPUT LENGKAP

**Input:**
- Topik: Kit Jimat Cermat untuk SME
- Tone: Casual
- CTA: Klik link bawah ni

**Output Batch 1:**
> @cikgukb, tired expression, nods slowly. Says: "Kos naik, jualan tak naik, cash flow tunggang-langgang... korang rasa tak?" Medium shot, eye-level. Warm natural light, sincere tone.

**Output Batch 2:**
> @cikgukb, expression brightens, nods confident. Says: "Lepas aku jumpa Kit Jimat Cermat ni — e-book, tips kewangan, audio, video — semua dalam satu tempat. Terus nampak jalan." Medium shot, slight lean forward. Warm light, hopeful mood.

**Output Batch 3:**
> @cikgukb, confident smile, points directly at camera. Says: "Korang usahawan mikro kecil — ni untuk korang. Klik link bawah ni sekarang." Close-up shot, eye-level. Bright warm light, energetic finish.

---

## 7. WORKFLOW PENGGUNA

```
1. Buka tool
2. Isi: Topik | Tone | CTA
3. Klik "Generate"
4. Salin Batch 1 → Paste dalam Jimeng → Generate → Download
5. Salin Batch 2 → Repeat
6. Salin Batch 3 → Repeat
7. Import semua 3 video ke CapCut → Merge → Export 30 saat
```

---

## 8. CONSTRAINTS & RULES

- Karakter sentiasa: @cikgukb (FIXED — memanggil direct model karakter yang telah ditrain)
- Bahasa output prompt: English (untuk Seedance baca lebih baik)
- Dialog karakter: Bahasa Melayu (dalam quotation mark)
- Panjang prompt: 30–70 patah perkataan (HARD LIMIT)
- Tiada muzik instruction dalam prompt
- Tiada label "Batch 1 / Hook" dalam output — terus prompt sahaja

---

## 9. OUT OF SCOPE (Versi 1.0)

- Multi-karakter
- Bahasa lain selain Melayu untuk dialog
- Video lebih 30 saat
- Auto-upload ke Jimeng

---

## 10. SUCCESS CRITERIA

- Output 3 batch boleh terus di-paste ke Jimeng tanpa edit
- Video yang dihasilkan consistent dari segi karakter dan tone
- Masa dari input ke output: < 30 saat
