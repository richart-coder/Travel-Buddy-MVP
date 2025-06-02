# Travel Buddy MVP 🌍

## 📍 專案概述

一個 side project，想驗證「陌生人真的會想一起旅遊嗎？」這個核心問題。

## 🎯 要驗證的假設

**真的有人願意和陌生人一起出遊嗎？**

在什麼情況下會願意？什麼族群最有這個需求？

## 🛠️ 技術選擇

- **Next.js 14** + TypeScript + Tailwind CSS
- **Google Sheets API** 當資料庫
- **Google Analytics** 追蹤用戶行為

### 為什麼用 Google Sheets？

- 不用設定複雜的資料庫 schema
- 可以直接在試算表看到所有資料
- 需求變更時隨時加欄位
- 對 MVP 來說夠用了

## 🚀 開發設定

### 前置需求

- Node.js 18.17+
- Google 帳號

### 安裝步驟

```bash
# 複製專案
git clone https://github.com/your-username/travel-buddy-mvp.git
cd travel-buddy-mvp

# 安裝依賴
npm install

# 設定環境變數
cp .env.example .env.local
```

### Google Sheets API 設定

1. 前往 [Google Cloud Console](https://console.cloud.google.com/)
2. 建立新專案，啟用 Google Sheets API
3. 建立服務帳號，下載 JSON 金鑰
4. 建立 Google 試算表，將服務帳號 email 加入共享權限
5. 在 `.env.local` 填入相關資訊：

```env
GOOGLE_SHEETS_PRIVATE_KEY=你的私鑰
GOOGLE_SHEETS_CLIENT_EMAIL=你的服務帳號email
GOOGLE_SPREADSHEET_ID=你的試算表ID
NEXT_PUBLIC_GA_ID=你的Google Analytics ID
```

### 啟動開發

```bash
npm run dev
```

開啟 http://localhost:3000

## 📊 資料結構

### Google Sheets 工作表

**Groups (旅遊群組)**
| Title | Destination | Date | Budget | Creator_Email | Created_At | Status |
|-------|-------------|------|--------|---------------|------------|--------|
| 日本賞櫻 | 東京 | 2024-04-01 | 50000 | creator@email.com | 2024-01-01 | recruiting |

**Interests (有興趣的人)**
| Group_Title | User_Email | User_Name | Contact_Info | Submitted_At |
|-------------|------------|-----------|--------------|--------------|
| 日本賞櫻 | user@email.com | 王小明 | LINE: wang123 | 2024-01-02 |

## 💡 MVP 功能設計

### 核心流程（無需註冊）

1. **首頁** - 說明概念，觀察興趣度
2. **瀏覽群組** - 看現有的旅遊群組，追蹤點擊
3. **群組詳細頁** - 觀察停留時間和參與意願
4. **表達興趣** - 只在最後才收集聯絡資訊

### 追蹤的關鍵行為

- **需求驗證**：多少人點擊「建立群組」？
- **參與意願**：多少人點擊進入群組詳細頁？
- **實際意願**：多少人願意留下聯絡資訊？

## 📱 頁面結構

```
/                    # 首頁 - 概念說明
/groups              # 群組列表 - 觀察瀏覽行為
/groups/[id]         # 群組詳細 - 觀察停留時間
/groups/create       # 建立群組 - 收集群組資訊
/interest/[groupId]  # 表達興趣 - 收集聯絡資訊
/analytics           # 行為數據統計
```

## 🧪 實驗設計

### 用戶行為漏斗

```
首頁瀏覽 → 群組列表 → 群組詳細 → 表達興趣 → 留下聯絡方式
```

### 想觀察的數據

1. **點擊率**：多少人對建立/加入群組有興趣？
2. **轉換率**：從瀏覽到實際留聯絡方式的比例
3. **群組類型**：什麼類型的旅遊最受歡迎？
4. **用戶特徵**：什麼樣的人最願意和陌生人旅遊？

### 數據收集方式

- **Google Analytics**：頁面瀏覽、點擊、停留時間
- **Google Sheets**：群組資料、使用者聯絡資訊
- **手動追蹤**：最終是否真的一起出遊

## 🤔 預期會遇到的問題

- **信任問題**：怎麼讓人相信陌生人？
- **安全疑慮**：特別是單獨旅行的女性
- **期待落差**：旅遊風格、預算、時間安排不合
- **虛假需求**：點擊很多但實際行動很少

## 📈 成功指標

**第一階段：需求存在**

- 首頁到群組列表的點擊率 > 20%
- 群組詳細頁面平均停留時間 > 2 分鐘

**第二階段：參與意願**

- 瀏覽到表達興趣的轉換率 > 5%
- 持續有新群組被建立

**第三階段：實際成果**

- 至少有 1 組透過平台配對成功出遊
- 出遊後的滿意度調查

## 🔮 如果驗證成功...

可能的發展方向：

- 加入使用者註冊和個人檔案
- 身份驗證和信譽系統
- 即時聊天功能
- 行程規劃整合
- 探索商業模式

## 🚫 如果驗證失敗...

可能的原因和調整：

- 信任門檻太高 → 考慮加入社群驗證
- 安全疑慮太大 → 專注特定族群（如退休族群）
- 需求不夠強烈 → 轉向其他旅遊相關服務

---

**這是個實驗，重點是用最少的功能驗證最核心的假設。** 🧪
