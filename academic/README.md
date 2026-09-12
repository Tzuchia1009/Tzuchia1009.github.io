# Tzu-Chia Huang — Academic website

中英文靜態學術網站。中文首頁為 `index.html`，英文首頁為 `en/index.html`。不需安裝套件或建置，即可部署至 GitHub Pages；亦支援儲存庫子路徑。

## 本機預覽

在此目錄啟動任意靜態網頁伺服器；也可直接開啟 index.html。中英文內容已寫入 HTML，停用 JavaScript 時仍可閱讀全部內容。JavaScript 僅負責著作與演講分類篩選。

## GitHub Pages

將此目錄的檔案（包含 assets、en 與 .nojekyll）提交到指定儲存庫。於 Settings → Pages 選擇 Deploy from a branch、main 與 / (root)。若使用個人首頁，儲存庫可命名為 Tzuchia1009.github.io。GitHub Pages 啟用需要該儲存庫管理權限。

## 更新

中英文 HTML 應同步維護。樣式位於 assets/style.css，篩選位於 assets/app.js。新增著作需保留 data-kind 分類；新增演講需保留日期、單位與主題。所有檔案皆使用相對路徑。

內容依截至 2026-09-12 的本人提供資料整理。16 篇精選著作含一篇已接受待出版文章；12 場演講選自 83 場已完成紀錄。英文演講名稱及中文論文英譯為網站編譯，論文原題保留。候選人身分依指定簡報及 CV。公開聯絡 Email 依既有 GitHub Pages 網站與論文署名聯絡資料。

本版發布於 `https://tzuchia1009.github.io/academic/`；英文版為 `/academic/en/`。既有海報工坊、hospital 與 ppt 目錄保留。Canonical 與社群預覽網址已採用此位置；改網址時需同步更新兩份 HTML 的相關 meta 與 link。

未包含原始簡報、資格審查文件、證明文件、聯絡資料清單及私人資料。肖像使用本人提供之原圖，以 CSS 調整顯示範圍。Google Fonts 不可用時自動改用系統字型。
