# Tzu-Chia Huang — Academic website

黃子嘉的中英文學術網站，2026 年 9 月重新設計。正式網站：https://tzuchia1009.github.io/academic/ ，英文版為 /academic/en/。

## 網站結構

兩種語言各有五個獨立頁面：探索（index.html）、研究（research.html）、著作（publications.html）、交流（engagement.html）、關於（about.html）。語言切換保留目前頁面。舊版首頁的研究、著作、教學與關於錨點會轉往對應新頁面。

首頁包含可切換主題、游標互動與播放／暫停的研究概念視覺；此視覺不是實驗數據。著作支援關鍵字、年份與類別篩選及引用複製；交流頁提供活動分類與照片放大。遵循系統減少動態偏好，支援鍵盤操作。主要文字直接儲存於 HTML。

## 維護與部署

不需安裝套件或建置，可用任意靜態伺服器預覽。新版樣式及程式位於 assets/v2/site.css 與 assets/v2/site.js。中文頁位於此目錄，英文頁位於 en/；更新時應同步維護兩種語言。著作的 data-kind 與年份供篩選使用。

僅更新 Tzuchia1009/Tzuchia1009.github.io 儲存庫中的 academic/ 目錄。既有根目錄網站、hospital/ 與 ppt/ 有其他用途。GitHub Pages 使用 main 分支根目錄發布。變更正式網址時需同步調整各頁 canonical、hreflang 與社群預覽網址。

## 內容與圖像

內容依本人提供的履歷、簡報及演講紀錄整理，截至 2026-09-12。16 篇精選著作包含 1 篇已接受待出版文章；12 場精選演講選自 83 場已完成紀錄。英文演講名稱與中文論文英譯為網站編譯，論文原題保留。學術身分依指定簡報及 CV。獎項明確標示共同作者、第一作者或指導老師角色。

聯絡 Email：tchuang1009@gmail.com。ORCID：https://orcid.org/0009-0001-7370-0046。依本人指示更新。

- assets/portrait.png：本人提供的頭貼原圖，以 CSS 控制顯示尺寸。
- assets/v2/teaching.jpg：本人資料夾中的高教深耕教學照片。
- assets/v2/ai-team.png、research-community.png：擷取自本人個人介紹簡報，分別為 2024 AI 應用鬥智賽及 2025 崇越行銷大賞團隊照片。
- assets/v2/ocean.jpg：NASA / Norman Kuring, MODIS Ocean Color Team。北海道附近海流與浮游植物的衛星影像，拍攝於 2009-05-21，僅作海洋脈絡圖像，非本人研究成果。來源：https://science.nasa.gov/earth/earth-observatory/spring-bloom-colors-the-pacific-near-hokkaido-38917/ 。使用規範：https://www.nasa.gov/nasa-brand-center/images-and-media/ 。頁面已附圖說與來源連結。

不含原始簡報、資格審查文件、證明文件或私人聯絡清單。Google Fonts 無法使用時會改用系統字型。
