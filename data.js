// ============================================================
//  考照日期資料檔 — 更新考期只改這個檔案，index.html 不用動
//
//  三個區塊：
//    SITE_CONFIG  網站標題、資料核對日
//    SUBJECTS     考科清單（32 科）：名稱、簡稱、辦理單位、別名、官方連結
//    SESSIONS     場次清單：每筆一場（同一科不同日期＝不同筆）
//
//  SESSIONS 欄位說明：
//    id        對應 SUBJECTS 的 id（必填）
//    mode      "written" 筆試 ／ "fixed-computer" 固定梯次電腦測驗（iPAS）
//    date      考試日 "YYYY-MM-DD"（必填）
//    start     報名開始 "YYYY-MM-DD" 或 "YYYY-MM-DDTHH:mm"（只核對到日期就只寫日期）
//    end       報名截止，同上；官方寫 24:00 就寫 "T24:00"，程式會當隔天 00:00 計算
//    source    官方來源網址（必填，卡片上的「查看官方資料」）
//    link      報名期間要導去的官方報名頁（沒寫就用 SUBJECTS.official）
//    city      已核對的考區
//    time      已核對的考試時段
//    label     場次標籤，例如「初級第 3 梯」「花蓮場」
//    title     覆蓋顯示名稱（例如銀行內控筆試不分一般／消金）
//    group     覆蓋辦理單位（例如金融常識 12/6 是證基會辦）
//    tentative true＝官方「預定」時程，卡片加註「預定」
//    cancelled true＝官方取消，網頁自動移出
//    checked   這筆的核對日（卡片會顯示「核對 YYYY/MM/DD」）；沒寫就用 SITE_CONFIG.checked
//              ⚠️ SITE_CONFIG.checked 代表「全站資料最後更新日」；只重核對部分場次時，請在那幾筆填 checked，別改全站日期
//
//  報名狀態、近一個月快捷、歷史場次都由 index.html 依臺灣時間自動算，
//  維護者只要把官方公告的日期填進來即可。
// ============================================================

const SITE_CONFIG = {
  title: "考照日期",
  brand: "東展＆廣懋｜考照書店",
  checked: "2026/11/17",          // 資料核對日（每次更新改這裡）
  publisherName: "東展出版社",
  publisherUrl: "https://www.dongjaan.com/",
  timeZone: "Asia/Taipei"
};

// ── 辦理單位 ─────────────────────────────────────────────
const ORGANIZERS = {
  tabf: { label: "金研院",   full: "台灣金融研訓院" },
  sfi:  { label: "證基會",   full: "證券暨期貨市場發展基金會" },
  ipas: { label: "iPAS",     full: "經濟部產業人才能力鑑定" },
  tii:  { label: "保發中心", full: "保險事業發展中心" }
};

// ── 考科清單 ─────────────────────────────────────────────
//  alias  搜尋別名（空白分隔），讀者常用的講法都放這裡
//  computer 有官方電腦應試場次時填官方頁；讀者搜尋會看到「查官方電腦場次」
//  merge  多機構辦理同一考科時填同一個 key，搜尋會合併顯示
//  related 搜尋時一併帶出的相關考科 id
const SUBJECTS = [
  // ── 金研院 ──
  { id: "jinrong-changshi", name: "金融市場常識與職業道德", short: "金融常識", group: "tabf",
    official: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=121",
    alias: "共同科目 金融市場常識 金融道德 職業道德 金融常識與職業道德 金融市場常識與職業道德測驗" },
  { id: "fangzhi-xiqian", name: "防制洗錢與打擊資恐專業人員測驗", short: "防制洗錢", group: "tabf",
    official: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=271",
    alias: "洗錢 防洗錢 打擊資恐 AML 洗錢防制 證基會 SFI" },
  { id: "forex-trading", name: "外匯交易專業能力測驗", short: "外匯交易", group: "tabf",
    official: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=081",
    alias: "外匯 外匯交易員" },
  { id: "bank-control-consumer", name: "銀行內部控制與內部稽核測驗（消費金融）", short: "銀行內控（消費）", group: "tabf",
    official: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=061",
    computer: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=061",
    alias: "銀行內控 銀行內稽 銀行內部控制 內控 內稽 消費金融 消金", related: "bank-control-general" },
  { id: "debt-collection", name: "債權委外催收人員專業能力測驗", short: "委外催收", group: "tabf",
    official: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=091",
    computer: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=091",
    alias: "催收 債權催收 委外" },
  { id: "property-insurance", name: "財產保險業務員資格測驗", short: "財產保險", group: "tabf",
    official: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=191",
    computer: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=191",
    alias: "產險 財險 保險業務員" },
  { id: "life-insurance", name: "人身保險業務員資格測驗", short: "人身保險", group: "tabf",
    official: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=301",
    computer: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=301",
    alias: "壽險 人壽 保險業務員" },
  { id: "trust", name: "信託業業務人員信託業務專業測驗", short: "信託業務", group: "tabf",
    official: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=041",
    computer: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=041",
    alias: "信託 信託證照 信託業務 信託業業務人員 信託法規" },
  { id: "credit-basic", name: "初階授信人員專業能力測驗", short: "初階授信", group: "tabf",
    official: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=011",
    computer: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=011",
    alias: "授信 初授 授信人員" },
  { id: "family-trust", name: "家族信託規劃顧問師資格測驗", short: "家族信託", group: "tabf",
    official: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=151",
    alias: "家族信託 家信 信託規劃顧問" },
  { id: "esg-tabf", name: "永續發展基礎能力測驗", short: "永續發展", group: "tabf",
    official: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=381",
    computer: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=381",
    alias: "永續 ESG 永續發展 保發中心 永續基礎", merge: "esg" },
  { id: "fintech", name: "金融科技力知識檢定測驗", short: "金融科技力", group: "tabf",
    official: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=261",
    computer: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=261",
    alias: "科技力 金融科技 科技金融 FinTech 金科" },
  { id: "bank-control-general", name: "銀行內部控制與內部稽核測驗（一般金融）", short: "銀行內控（一般）", group: "tabf",
    official: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=051",
    computer: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=051",
    alias: "銀行內控 銀行內稽 銀行內部控制 內控 內稽 一般金融" },
  { id: "forex-basic", name: "初階外匯人員專業能力測驗", short: "初階外匯", group: "tabf",
    official: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=021",
    computer: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=021",
    alias: "外匯 初外 外匯人員" },
  { id: "credit-advanced", name: "進階授信人員專業能力測驗", short: "進階授信", group: "tabf",
    official: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=012",
    alias: "授信 進授 授信人員" },
  { id: "elderly-finance", name: "高齡金融規劃顧問師資格測驗", short: "高齡金融", group: "tabf",
    official: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=291",
    alias: "高齡 高齡金融 高齡顧問 銀髮" },
  { id: "financial-planning", name: "理財規劃人員專業能力測驗", short: "理財規劃", group: "tabf",
    official: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=031",
    computer: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=031",
    alias: "理財 理專 理財規劃人員" },
  { id: "yanshen", name: "衍生性金融商品銷售人員資格測驗", short: "衍生性商品", group: "tabf",
    official: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=251",
    computer: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=251",
    alias: "衍生性 衍商 衍生性金融商品" },
  { id: "risk-management", name: "風險管理基本能力測驗", short: "風險管理", group: "tabf",
    official: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=201",
    computer: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=201",
    alias: "風管 風險 風險管理" },

  // ── 證基會 ──
  { id: "securities-associate", name: "證券商業務員", short: "證券業務員", group: "sfi",
    official: "https://examweb.sfi.org.tw/regEXAM/index.aspx",
    computer: "https://examweb.sfi.org.tw/regEXAM/index.aspx",
    alias: "證券普業 普業 證券商業務人員 證券 證券業務" },
  { id: "securities-senior", name: "證券商高級業務員", short: "高級業務員", group: "sfi",
    official: "https://examweb.sfi.org.tw/regEXAM/index.aspx",
    computer: "https://examweb.sfi.org.tw/regEXAM/index.aspx",
    alias: "證券高業 高業 證券商高級業務人員 證券" },
  { id: "investment-trust", name: "證券投資信託及顧問業務員（1/2/3科）", short: "投信投顧業務員", group: "sfi",
    official: "https://examweb.sfi.org.tw/regEXAM/index.aspx",
    computer: "https://examweb.sfi.org.tw/regEXAM/index.aspx",
    alias: "投信投顧 投信 投顧 基金業務員 投信投顧業務員" },
  { id: "futures-associate", name: "期貨商業務員", short: "期貨業務員", group: "sfi",
    official: "https://examweb.sfi.org.tw/regEXAM/index.aspx",
    computer: "https://examweb.sfi.org.tw/regEXAM/index.aspx",
    alias: "期貨 期貨業務 期貨商" },
  { id: "futures-analyst", name: "期貨交易分析人員", short: "期貨分析師", group: "sfi",
    official: "https://examweb.sfi.org.tw/regEXAM/index.aspx",
    alias: "期貨分析師 期貨交易分析 期分" },
  { id: "enterprise-control", name: "企業內部控制", short: "企業內控", group: "sfi",
    official: "https://examweb.sfi.org.tw/regEXAM/index.aspx",
    computer: "https://examweb.sfi.org.tw/regEXAM/index.aspx",
    alias: "企業內控 公司內控 內控 企業內部控制基本能力測驗" },
  { id: "esg-sfi", name: "永續發展基礎能力測驗", short: "永續發展", group: "sfi",
    official: "https://www.sfi.org.tw/Node?id=270",
    computer: "https://examweb.sfi.org.tw/regEXAM/index.aspx",
    alias: "永續 ESG 永續發展 保發中心 永續基礎", merge: "esg" },
  { id: "bill-finance", name: "票券商業務人員", short: "票券商", group: "sfi",
    official: "https://examweb.sfi.org.tw/regEXAM/index.aspx",
    computer: "https://examweb.sfi.org.tw/regEXAM/index.aspx",
    alias: "票券 票券商" },
  { id: "stock-affairs", name: "股務人員專業能力測驗", short: "股務人員", group: "sfi",
    official: "https://examweb.sfi.org.tw/regEXAM/index.aspx",
    computer: "https://examweb.sfi.org.tw/regEXAM/index.aspx",
    alias: "股務 股務人員" },
  { id: "corporate-governance", name: "公司治理", short: "公司治理", group: "sfi",
    official: "https://examweb.sfi.org.tw/regEXAM/index.aspx",
    computer: "https://examweb.sfi.org.tw/regEXAM/index.aspx",
    alias: "公司治理 治理" },
  { id: "asset-securitization", name: "資產證券化", short: "資產證券化", group: "sfi",
    official: "https://examweb.sfi.org.tw/regEXAM/index.aspx",
    computer: "https://examweb.sfi.org.tw/regEXAM/index.aspx",
    alias: "資產證券化 證券化" },

  // ── iPAS（固定梯次電腦測驗）──
  { id: "ipas-netzero", name: "淨零碳規劃管理師能力鑑定", short: "淨零碳", group: "ipas",
    official: "https://ipd.nat.gov.tw/ipas/certification/NZ/exam-info",
    alias: "iPAS 淨零 淨零碳 淨零碳管理 淨零碳規劃管理師 碳管理 ESG" },
  { id: "ipas-ai", name: "AI應用規劃師能力鑑定", short: "AI應用規劃師", group: "ipas",
    official: "https://ipd.nat.gov.tw/ipas/certification/AIAP/exam-info",
    alias: "iPAS AI AI應用規劃師 AI規劃師 人工智慧 AI 規劃師" }
];

// ── 場次清單 ─────────────────────────────────────────────
//  來源縮寫
const TABF_SCHEDULE = "https://www.tabf.org.tw/StaticPage.aspx?id=18";            // 金研院年度筆試時程
const SFI_116 = "https://webline.sfi.org.tw/download/test_ftp/%E5%B9%B4%E5%BA%A6%E7%AD%86%E8%A9%A6%E6%B8%AC%E9%A9%97%E6%99%82%E7%A8%8B%E8%A1%A8.pdf"; // 證基會116年度筆試測驗時程表（PDF）
const SFI_ESG = "https://www.sfi.org.tw/Node?id=270";                                // 永續發展筆試時程（六場）
const IPAS_NZ = "https://ipd.nat.gov.tw/ipas/certification/NZ/exam-info";
const IPAS_AI = "https://ipd.nat.gov.tw/ipas/certification/AIAP/exam-info";
const TABF4 = "臺北、臺中、高雄、花蓮";
const CITY3 = "臺北、臺中、高雄";   // 臺北、臺中、高雄三考區（金研院月考、證基會、保發中心共用）

const SESSIONS = [

  // ════════ 金研院 115 年度（2026）四場，已考完 ════════
  // 第1場 3/14（報名 1/20 10:00–2/23 17:00）
  { id: "bank-control-general", title: "銀行內控", mode: "written", date: "2026-03-14", start: "2026-01-20T10:00", end: "2026-02-23T17:00", source: TABF_SCHEDULE, city: TABF4 },
  { id: "credit-basic",       mode: "written", date: "2026-03-14", start: "2026-01-20T10:00", end: "2026-02-23T17:00", source: TABF_SCHEDULE, city: TABF4 },
  { id: "forex-trading",      mode: "written", date: "2026-03-14", start: "2026-01-20T10:00", end: "2026-02-23T17:00", source: TABF_SCHEDULE, city: TABF4 },
  { id: "family-trust",       mode: "written", date: "2026-03-14", start: "2026-01-20T10:00", end: "2026-02-23T17:00", source: TABF_SCHEDULE, city: TABF4 },
  { id: "financial-planning", mode: "written", date: "2026-03-14", start: "2026-01-20T10:00", end: "2026-02-23T17:00", source: TABF_SCHEDULE, city: TABF4 },
  { id: "fangzhi-xiqian",     mode: "written", date: "2026-03-14", start: "2026-01-20T10:00", end: "2026-02-23T17:00", source: TABF_SCHEDULE, city: TABF4 },
  { id: "fintech",            mode: "written", date: "2026-03-14", start: "2026-01-20T10:00", end: "2026-02-23T17:00", source: TABF_SCHEDULE, city: TABF4 },
  // 第2場 4/11（報名 2/24 10:00–3/23 17:00）
  { id: "trust",              mode: "written", date: "2026-04-11", start: "2026-02-24T10:00", end: "2026-03-23T17:00", source: TABF_SCHEDULE, city: TABF4 },
  { id: "forex-basic",        mode: "written", date: "2026-04-11", start: "2026-02-24T10:00", end: "2026-03-23T17:00", source: TABF_SCHEDULE, city: TABF4 },
  { id: "elderly-finance",    mode: "written", date: "2026-04-11", start: "2026-02-24T10:00", end: "2026-03-23T17:00", source: TABF_SCHEDULE, city: TABF4 },
  { id: "esg-tabf",           mode: "written", date: "2026-04-11", start: "2026-02-24T10:00", end: "2026-03-23T17:00", source: TABF_SCHEDULE, city: TABF4 },
  { id: "yanshen",            mode: "written", date: "2026-04-11", start: "2026-02-24T10:00", end: "2026-03-23T17:00", source: TABF_SCHEDULE, city: TABF4 },
  { id: "risk-management",    mode: "written", date: "2026-04-11", start: "2026-02-24T10:00", end: "2026-03-23T17:00", source: TABF_SCHEDULE, city: TABF4 },
  { id: "jinrong-changshi",   mode: "written", date: "2026-04-11", start: "2026-02-24T10:00", end: "2026-03-23T17:00", source: TABF_SCHEDULE, city: "花蓮", label: "花蓮場" },
  // 第3場 10/17（報名 9/1 10:00–9/29 17:00）
  { id: "trust",              mode: "written", date: "2026-10-17", start: "2026-09-01T10:00", end: "2026-09-29T17:00", source: TABF_SCHEDULE, city: TABF4 },
  { id: "credit-basic",       mode: "written", date: "2026-10-17", start: "2026-09-01T10:00", end: "2026-09-29T17:00", source: TABF_SCHEDULE, city: TABF4 },
  { id: "family-trust",       mode: "written", date: "2026-10-17", start: "2026-09-01T10:00", end: "2026-09-29T17:00", source: TABF_SCHEDULE, city: TABF4 },
  { id: "esg-tabf",           mode: "written", date: "2026-10-17", start: "2026-09-01T10:00", end: "2026-09-29T17:00", source: TABF_SCHEDULE, city: TABF4 },
  { id: "fintech",            mode: "written", date: "2026-10-17", start: "2026-09-01T10:00", end: "2026-09-29T17:00", source: TABF_SCHEDULE, city: TABF4 },
  { id: "jinrong-changshi",   mode: "written", date: "2026-10-17", start: "2026-09-01T10:00", end: "2026-09-29T17:00", source: TABF_SCHEDULE, city: "花蓮", label: "花蓮場" },
  // 第4場 11/21（報名 10/6 10:00–11/2 17:00）
  { id: "bank-control-general", title: "銀行內控", mode: "written", date: "2026-11-21", start: "2026-10-06T10:00", end: "2026-11-02T17:00", source: TABF_SCHEDULE, city: TABF4 },
  { id: "forex-basic",        mode: "written", date: "2026-11-21", start: "2026-10-06T10:00", end: "2026-11-02T17:00", source: TABF_SCHEDULE, city: TABF4 },
  { id: "credit-advanced",    mode: "written", date: "2026-11-21", start: "2026-10-06T10:00", end: "2026-11-02T17:00", source: TABF_SCHEDULE, city: TABF4 },
  { id: "elderly-finance",    mode: "written", date: "2026-11-21", start: "2026-10-06T10:00", end: "2026-11-02T17:00", source: TABF_SCHEDULE, city: TABF4 },
  { id: "financial-planning", mode: "written", date: "2026-11-21", start: "2026-10-06T10:00", end: "2026-11-02T17:00", source: TABF_SCHEDULE, city: TABF4 },
  { id: "yanshen",            mode: "written", date: "2026-11-21", start: "2026-10-06T10:00", end: "2026-11-02T17:00", source: TABF_SCHEDULE, city: TABF4 },
  { id: "risk-management",    mode: "written", date: "2026-11-21", start: "2026-10-06T10:00", end: "2026-11-02T17:00", source: TABF_SCHEDULE, city: TABF4 },

  // ════════ 金研院 金融常識 月考（每月公告，逐場核對）════════
  { id: "jinrong-changshi", mode: "written", date: "2026-07-29", start: "2026-06-25T10:00", end: "2026-07-15T17:00", source: "https://www.tabf.org.tw/LicenseExamDetail.aspx?PID=682951", city: CITY3 },
  { id: "jinrong-changshi", mode: "written", date: "2026-11-25", start: "2026-10-22T10:00", end: "2026-11-11T17:00", source: "https://www.tabf.org.tw/LicenseExamDetail.aspx?PID=699784", city: CITY3, time: "18:50 或 20:30 開考（60 分鐘）" },
  { id: "jinrong-changshi", mode: "written", date: "2026-12-16", start: "2026-11-12T10:00", end: "2026-12-02T17:00", source: "https://www.tabf.org.tw/LicenseExamDetail.aspx?PID=703442", link: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=121", city: CITY3, time: "18:50–19:50 或 20:30–21:30（名額依官方報名頁）" },

  // ════════ 證基會 115 年度（2026）— 僅收已核對的第 2、3 次（第 1 次未另行核對，不列）════════
  //  範圍說明：本站只收一般中文筆試；證基會另辦的「外國人資格認可／英文資格測驗」（116 年 3/12、5/7、8/13、11/12）不收錄
  // 第2次 8/2（報名 5/11–6/26 24:00）
  { id: "securities-associate", mode: "written", date: "2026-08-02", start: "2026-05-11", end: "2026-06-26T24:00", source: "https://www.sfi.org.tw/News?id=2596", city: CITY3 },
  { id: "securities-senior",    mode: "written", date: "2026-08-02", start: "2026-05-11", end: "2026-06-26T24:00", source: "https://www.sfi.org.tw/News?id=2596", city: CITY3 },
  { id: "investment-trust",     mode: "written", date: "2026-08-02", start: "2026-05-11", end: "2026-06-26T24:00", source: "https://www.sfi.org.tw/News?id=2596", city: CITY3 },
  { id: "futures-associate",    mode: "written", date: "2026-08-02", start: "2026-05-11", end: "2026-06-26T24:00", source: "https://www.sfi.org.tw/News?id=2596", city: CITY3 },
  { id: "futures-analyst",      mode: "written", date: "2026-08-02", start: "2026-05-11", end: "2026-06-26T24:00", source: "https://www.sfi.org.tw/News?id=2596", city: CITY3 },
  { id: "enterprise-control",   mode: "written", date: "2026-08-02", start: "2026-05-11", end: "2026-06-26T24:00", source: "https://www.sfi.org.tw/News?id=2596", city: CITY3 },
  { id: "esg-sfi",              mode: "written", date: "2026-08-02", start: "2026-05-11T09:00", end: "2026-06-26T24:00", source: "https://www.sfi.org.tw/News?id=2597", city: CITY3 },
  // 第3次 12/6（報名 9/7–10/23 24:00）
  { id: "securities-associate", mode: "written", date: "2026-12-06", start: "2026-09-07", end: "2026-10-23T24:00", source: "https://www.sfi.org.tw/News?id=2654", city: CITY3 },
  { id: "securities-senior",    mode: "written", date: "2026-12-06", start: "2026-09-07", end: "2026-10-23T24:00", source: "https://www.sfi.org.tw/News?id=2654", city: CITY3 },
  { id: "investment-trust",     mode: "written", date: "2026-12-06", start: "2026-09-07", end: "2026-10-23T24:00", source: "https://www.sfi.org.tw/News?id=2654", city: CITY3 },
  { id: "futures-associate",    mode: "written", date: "2026-12-06", start: "2026-09-07", end: "2026-10-23T24:00", source: "https://www.sfi.org.tw/News?id=2654", city: CITY3 },
  { id: "futures-analyst",      mode: "written", date: "2026-12-06", start: "2026-09-07", end: "2026-10-23T24:00", source: "https://www.sfi.org.tw/News?id=2654", city: CITY3 },
  { id: "enterprise-control",   mode: "written", date: "2026-12-06", start: "2026-09-07", end: "2026-10-23T24:00", source: "https://www.sfi.org.tw/News?id=2654", city: CITY3 },
  { id: "esg-sfi",              mode: "written", date: "2026-12-06", start: "2026-09-07T09:00", end: "2026-10-23T24:00", source: "https://www.sfi.org.tw/News?id=2655", city: CITY3 },
  { id: "fangzhi-xiqian", group: "sfi", mode: "written", date: "2026-12-06", start: "2026-09-07T09:00", end: "2026-10-23T24:00", source: "https://www.sfi.org.tw/News?id=2656", city: CITY3 },
  { id: "jinrong-changshi", group: "sfi", mode: "written", date: "2026-12-06", start: "2026-09-07", end: "2026-10-23T24:00", source: "https://www.sfi.org.tw/News?id=2654", city: "臺中、高雄", time: "13:30" },

  // ════════ iPAS 115 年度（固定梯次電腦測驗，已考完）════════
  { id: "ipas-netzero", mode: "fixed-computer", date: "2026-08-15", start: "2026-04-11", end: "2026-07-08T12:00", source: IPAS_NZ, label: "初級第 2 梯", city: "臺北、新北一、雙北不分、桃園、新竹、臺中、雲林、臺南、高雄、花蓮" },
  { id: "ipas-netzero", mode: "fixed-computer", date: "2026-08-22", start: "2026-04-11", end: "2026-07-08T12:00", source: IPAS_NZ, label: "中級第 2 梯", city: "臺北、新北一、雙北不分、臺中、雲林、高雄、金門、澎湖" },
  { id: "ipas-netzero", mode: "fixed-computer", date: "2026-11-07", start: "2026-07-09", end: "2026-09-22T12:00", source: IPAS_NZ, label: "初級第 3 梯", city: "臺北、新北一、新北二、雙北不分、桃園、新竹、臺中、雲林、臺南、高雄、金門、澎湖" },
  { id: "ipas-ai", mode: "fixed-computer", date: "2026-08-15", start: "2026-04-11", end: "2026-07-08T12:00", source: IPAS_AI, label: "初級第 3 梯", city: "臺北、新北一、雙北不分、桃園、新竹、臺中、雲林、臺南、高雄、花蓮" },
  { id: "ipas-ai", mode: "fixed-computer", date: "2026-11-07", start: "2026-07-09", end: "2026-09-22T12:00", source: IPAS_AI, label: "初級第 4 梯", city: "臺北、新北一、新北二、雙北不分、桃園、新竹、臺中、雲林、臺南、高雄、金門、澎湖" },
  { id: "ipas-ai", mode: "fixed-computer", date: "2026-11-14", start: "2026-05-22", end: "2026-09-22T12:00", source: IPAS_AI, label: "中級第 2 梯", city: "臺北、新北一、新北二、雙北不分、桃園、臺中、高雄、屏東、金門" },
  // iPAS 116 年度梯次：2026/11/17 官網尚未公告，公告後在這裡新增

  // ════════ 保發中心 永續發展 116 年第 1 次 1/24（報名 11/2–12/23）════════
  { id: "esg-tabf", group: "tii", mode: "written", date: "2027-01-24", start: "2026-11-02", end: "2026-12-23", source: "https://edu.tii.org.tw/exam/users/exam_show/1164", link: "https://edu.tii.org.tw/exam/users/exam_show/1164", city: CITY3, time: "10:00–11:30" },
  // 116 年第 3 次 5/30 由保發中心辦，日期來自證基會永續筆試年度表（六場共用）；保發中心尚未公告該場明細，公告後改 source/link 並拿掉 tentative
  { id: "esg-tabf", group: "tii", mode: "written", date: "2027-05-30", start: "2027-03-08", end: "2027-04-28", source: SFI_ESG, link: "https://edu.tii.org.tw/", tentative: true },

  // ════════ 金研院 116 年度（2027）四場 — 官網年度時程已公告（2026/11/17 核對）════════
  // 第1場 3/14（日）（報名 1/19 10:00–2/22 17:00）
  { id: "bank-control-general", title: "銀行內控", mode: "written", date: "2027-03-14", start: "2027-01-19T10:00", end: "2027-02-22T17:00", source: TABF_SCHEDULE, city: TABF4 },
  { id: "credit-basic",       mode: "written", date: "2027-03-14", start: "2027-01-19T10:00", end: "2027-02-22T17:00", source: TABF_SCHEDULE, city: TABF4 },
  { id: "forex-trading",      mode: "written", date: "2027-03-14", start: "2027-01-19T10:00", end: "2027-02-22T17:00", source: TABF_SCHEDULE, city: TABF4 },
  { id: "family-trust",       mode: "written", date: "2027-03-14", start: "2027-01-19T10:00", end: "2027-02-22T17:00", source: TABF_SCHEDULE, city: TABF4 },
  { id: "financial-planning", mode: "written", date: "2027-03-14", start: "2027-01-19T10:00", end: "2027-02-22T17:00", source: TABF_SCHEDULE, city: TABF4 },
  { id: "esg-tabf",           mode: "written", date: "2027-03-14", start: "2027-01-19T10:00", end: "2027-02-22T17:00", source: TABF_SCHEDULE, city: TABF4 },
  { id: "fintech",            mode: "written", date: "2027-03-14", start: "2027-01-19T10:00", end: "2027-02-22T17:00", source: TABF_SCHEDULE, city: TABF4 },
  // 第2場 4/11（日）（報名 2/23 10:00–3/22 17:00）
  { id: "trust",              mode: "written", date: "2027-04-11", start: "2027-02-23T10:00", end: "2027-03-22T17:00", source: TABF_SCHEDULE, city: TABF4 },
  { id: "forex-basic",        mode: "written", date: "2027-04-11", start: "2027-02-23T10:00", end: "2027-03-22T17:00", source: TABF_SCHEDULE, city: TABF4 },
  { id: "elderly-finance",    mode: "written", date: "2027-04-11", start: "2027-02-23T10:00", end: "2027-03-22T17:00", source: TABF_SCHEDULE, city: TABF4 },
  { id: "fangzhi-xiqian",     mode: "written", date: "2027-04-11", start: "2027-02-23T10:00", end: "2027-03-22T17:00", source: TABF_SCHEDULE, city: TABF4 },
  { id: "yanshen",            mode: "written", date: "2027-04-11", start: "2027-02-23T10:00", end: "2027-03-22T17:00", source: TABF_SCHEDULE, city: TABF4 },
  { id: "risk-management",    mode: "written", date: "2027-04-11", start: "2027-02-23T10:00", end: "2027-03-22T17:00", source: TABF_SCHEDULE, city: TABF4 },
  { id: "jinrong-changshi",   mode: "written", date: "2027-04-11", start: "2027-02-23T10:00", end: "2027-03-22T17:00", source: TABF_SCHEDULE, city: "花蓮", label: "花蓮場" },
  // 第3場 10/16（六）（報名 8/24 10:00–9/20 17:00）
  { id: "trust",              mode: "written", date: "2027-10-16", start: "2027-08-24T10:00", end: "2027-09-20T17:00", source: TABF_SCHEDULE, city: TABF4 },
  { id: "credit-basic",       mode: "written", date: "2027-10-16", start: "2027-08-24T10:00", end: "2027-09-20T17:00", source: TABF_SCHEDULE, city: TABF4 },
  { id: "family-trust",       mode: "written", date: "2027-10-16", start: "2027-08-24T10:00", end: "2027-09-20T17:00", source: TABF_SCHEDULE, city: TABF4 },
  { id: "esg-tabf",           mode: "written", date: "2027-10-16", start: "2027-08-24T10:00", end: "2027-09-20T17:00", source: TABF_SCHEDULE, city: TABF4 },
  { id: "fintech",            mode: "written", date: "2027-10-16", start: "2027-08-24T10:00", end: "2027-09-20T17:00", source: TABF_SCHEDULE, city: TABF4 },
  { id: "jinrong-changshi",   mode: "written", date: "2027-10-16", start: "2027-08-24T10:00", end: "2027-09-20T17:00", source: TABF_SCHEDULE, city: "花蓮", label: "花蓮場" },
  // 第4場 11/20（六）（報名 10/5 10:00–11/1 17:00）
  { id: "bank-control-general", title: "銀行內控", mode: "written", date: "2027-11-20", start: "2027-10-05T10:00", end: "2027-11-01T17:00", source: TABF_SCHEDULE, city: TABF4 },
  { id: "forex-basic",        mode: "written", date: "2027-11-20", start: "2027-10-05T10:00", end: "2027-11-01T17:00", source: TABF_SCHEDULE, city: TABF4 },
  { id: "credit-advanced",    mode: "written", date: "2027-11-20", start: "2027-10-05T10:00", end: "2027-11-01T17:00", source: TABF_SCHEDULE, city: TABF4 },
  { id: "elderly-finance",    mode: "written", date: "2027-11-20", start: "2027-10-05T10:00", end: "2027-11-01T17:00", source: TABF_SCHEDULE, city: TABF4 },
  { id: "financial-planning", mode: "written", date: "2027-11-20", start: "2027-10-05T10:00", end: "2027-11-01T17:00", source: TABF_SCHEDULE, city: TABF4 },
  { id: "yanshen",            mode: "written", date: "2027-11-20", start: "2027-10-05T10:00", end: "2027-11-01T17:00", source: TABF_SCHEDULE, city: TABF4 },
  { id: "risk-management",    mode: "written", date: "2027-11-20", start: "2027-10-05T10:00", end: "2027-11-01T17:00", source: TABF_SCHEDULE, city: TABF4 },

  // ════════ 證基會 116 年度（2027）三場 — 官方「116年度筆試測驗時程表」PDF（2026/11/17 核對）════════
  //  只核對到日期，報名時刻與考區待各次簡章公告；先標「預定」
  // 第1次 4/18（報名 1/18–3/12）
  { id: "securities-associate", mode: "written", date: "2027-04-18", start: "2027-01-18", end: "2027-03-12", source: SFI_116, tentative: true },
  { id: "securities-senior",    mode: "written", date: "2027-04-18", start: "2027-01-18", end: "2027-03-12", source: SFI_116, tentative: true },
  { id: "investment-trust",     mode: "written", date: "2027-04-18", start: "2027-01-18", end: "2027-03-12", source: SFI_116, tentative: true },
  { id: "futures-associate",    mode: "written", date: "2027-04-18", start: "2027-01-18", end: "2027-03-12", source: SFI_116, tentative: true },
  { id: "futures-analyst",      mode: "written", date: "2027-04-18", start: "2027-01-18", end: "2027-03-12", source: SFI_116, tentative: true },
  { id: "enterprise-control",   mode: "written", date: "2027-04-18", start: "2027-01-18", end: "2027-03-12", source: SFI_116, tentative: true },
  { id: "jinrong-changshi", group: "sfi", mode: "written", date: "2027-04-18", start: "2027-01-18", end: "2027-03-12", source: SFI_116, city: "臺中、高雄", tentative: true },
  // 第2次 8/1（報名 5/5–6/25）
  { id: "securities-associate", mode: "written", date: "2027-08-01", start: "2027-05-05", end: "2027-06-25", source: SFI_116, tentative: true },
  { id: "securities-senior",    mode: "written", date: "2027-08-01", start: "2027-05-05", end: "2027-06-25", source: SFI_116, tentative: true },
  { id: "investment-trust",     mode: "written", date: "2027-08-01", start: "2027-05-05", end: "2027-06-25", source: SFI_116, tentative: true },
  { id: "futures-associate",    mode: "written", date: "2027-08-01", start: "2027-05-05", end: "2027-06-25", source: SFI_116, tentative: true },
  { id: "futures-analyst",      mode: "written", date: "2027-08-01", start: "2027-05-05", end: "2027-06-25", source: SFI_116, tentative: true },
  { id: "enterprise-control",   mode: "written", date: "2027-08-01", start: "2027-05-05", end: "2027-06-25", source: SFI_116, tentative: true },
  { id: "esg-sfi",              mode: "written", date: "2027-08-01", start: "2027-05-05", end: "2027-06-25", source: SFI_ESG, tentative: true },
  { id: "jinrong-changshi", group: "sfi", mode: "written", date: "2027-08-01", start: "2027-05-05", end: "2027-06-25", source: SFI_116, city: "臺中、高雄", tentative: true },
  // 第3次 12/5（報名 9/1–10/29）
  { id: "securities-associate", mode: "written", date: "2027-12-05", start: "2027-09-01", end: "2027-10-29", source: SFI_116, tentative: true },
  { id: "securities-senior",    mode: "written", date: "2027-12-05", start: "2027-09-01", end: "2027-10-29", source: SFI_116, tentative: true },
  { id: "investment-trust",     mode: "written", date: "2027-12-05", start: "2027-09-01", end: "2027-10-29", source: SFI_116, tentative: true },
  { id: "futures-associate",    mode: "written", date: "2027-12-05", start: "2027-09-01", end: "2027-10-29", source: SFI_116, tentative: true },
  { id: "futures-analyst",      mode: "written", date: "2027-12-05", start: "2027-09-01", end: "2027-10-29", source: SFI_116, tentative: true },
  { id: "enterprise-control",   mode: "written", date: "2027-12-05", start: "2027-09-01", end: "2027-10-29", source: SFI_116, tentative: true },
  { id: "esg-sfi",              mode: "written", date: "2027-12-05", start: "2027-09-01", end: "2027-10-29", source: SFI_ESG, tentative: true },
  { id: "fangzhi-xiqian", group: "sfi", mode: "written", date: "2027-12-05", start: "2027-09-01", end: "2027-10-29", source: SFI_116, tentative: true },
  { id: "jinrong-changshi", group: "sfi", mode: "written", date: "2027-12-05", start: "2027-09-01", end: "2027-10-29", source: SFI_116, city: "臺中、高雄", tentative: true }
];
