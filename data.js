// ============================================================
//  考試日期資料 — 修改此檔案即可更新網頁
//
//  examType 欄位說明：
//    "written"  → 筆試，有固定考試日期
//    "computer" → 電腦應試，持續滾動開放報名
//
//  TABF 115年度筆試場次：
//    第3場 10/17（報名 9/1-9/29）
//    第4場 11/21（報名 10/6-11/2）
//
//  SFI 115年度筆試場次：
//    第2次 8/2（報名 5/11-6/26）
//    第3次 12/6（報名 9/7-10/23）
//
//  新增書：複製任一區塊，修改內容後存檔即可
// ============================================================

const SITE_CONFIG = {
  title: "金融證照考試日期",
  subtitle: "TABF ✦ SFI — 一鍵掌握報名時程",
  publisherName: "東展出版社",
  publisherUrl: "https://",       // ← 改成你的官方網站
  lastUpdated: "2026-06-01"
};

// ── 分組標籤（側欄篩選用）──────────────────────────
const GROUPS = [
  { id: "tabf", label: "TABF 金研院", color: "#1E40AF" },
  { id: "sfi",  label: "SFI 證基會",  color: "#7C3AED" },
];

// ── 考科清單 ────────────────────────────────────────
const BOOKS = [

  // ════════════════════════════════════════
  //  TABF 台灣金融研訓院
  // ════════════════════════════════════════

  // --- 月考（每月舉辦） ---
  {
    id: "jinrong-changshi",
    name: "金融市場常識與職業道德",
    shortName: "金融常識",
    group: "tabf",
    color: "#1D4ED8",
    icon: "📋",
    officialSite: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=121",
    exams: [
      {
        examType: "written",
        date: "2026-07-15",           // ← 待6/25公告後更新確切日期
        regStart: "2026-06-25",
        regEnd: "2026-07-01",
        location: "台北、台中、高雄",
        note: "每月舉辦，7月場次將於6/25(四)10:00起正式公告；花蓮場次見10/17年度筆試"
      }
    ]
  },

  // --- 電腦應試（本年度筆試已過，僅剩電腦應試）---
  {
    id: "fangzhi-xiqian",
    name: "防制洗錢與打擊資恐專業人員測驗",
    shortName: "防制洗錢",
    group: "tabf",
    color: "#0F766E",
    icon: "🔍",
    officialSite: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=271",
    exams: [
      {
        examType: "computer",
        location: "台北、台中、台南、高雄、花蓮",
        note: "電腦應試持續開放；本年度筆試已於3/14舉行"
      }
    ]
  },

  {
    id: "forex-trading",
    name: "外匯交易專業能力測驗",
    shortName: "外匯交易",
    group: "tabf",
    color: "#D97706",
    icon: "🌐",
    officialSite: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=081",
    exams: [
      {
        examType: "computer",
        location: "台北、台中、高雄",
        note: "電腦應試持續開放；本年度筆試已於3/14舉行"
      }
    ]
  },

  {
    id: "bank-control-consumer",
    name: "銀行內部控制與內部稽核測驗（消費金融）",
    shortName: "銀行內控（消費）",
    group: "tabf",
    color: "#0E7490",
    icon: "💳",
    officialSite: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=061",
    exams: [
      {
        examType: "computer",
        location: "台北、台中、台南、高雄、花蓮",
        note: "每週均有場次"
      }
    ]
  },

  {
    id: "debt-collection",
    name: "債權委外催收人員專業能力測驗",
    shortName: "委外催收",
    group: "tabf",
    color: "#6D28D9",
    icon: "📑",
    officialSite: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=091",
    exams: [
      {
        examType: "computer",
        location: "台北、台中、高雄",
        note: "電腦應試持續開放"
      }
    ]
  },

  {
    id: "property-insurance",
    name: "財產保險業務員資格測驗",
    shortName: "財產保險",
    group: "tabf",
    color: "#92400E",
    icon: "🏠",
    officialSite: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=191",
    exams: [
      {
        examType: "computer",
        location: "台北、台中、台南、高雄",
        note: "電腦應試，115/7/1起報名費調整"
      }
    ]
  },

  {
    id: "life-insurance",
    name: "人身保險業務員資格測驗",
    shortName: "人身保險",
    group: "tabf",
    color: "#78350F",
    icon: "❤️",
    officialSite: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=301",
    exams: [
      {
        examType: "computer",
        location: "台北、台中、台南、高雄",
        note: "電腦應試，115/7/1起報名費調整"
      }
    ]
  },

  // --- TABF 第3場 10/17（報名 9/1-9/29）+ 電腦應試 ---
  {
    id: "trust",
    name: "信託業業務人員信託業務專業測驗",
    shortName: "信託業務",
    group: "tabf",
    color: "#2563EB",
    icon: "🏦",
    officialSite: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=041",
    exams: [
      {
        examType: "written",
        date: "2026-10-17",
        regStart: "2026-09-01",
        regEnd: "2026-09-29",
        location: "台北、台中、高雄、花蓮",
        note: "115年第3場年度筆試（第63期）"
      },
      {
        examType: "computer",
        location: "台北、台中、台南、高雄、花蓮",
        note: "每週均有場次，號碼牌制，10:00起開放取號"
      }
    ]
  },

  {
    id: "credit-basic",
    name: "初階授信人員專業能力測驗",
    shortName: "初階授信",
    group: "tabf",
    color: "#15803D",
    icon: "💰",
    officialSite: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=011",
    exams: [
      {
        examType: "written",
        date: "2026-10-17",
        regStart: "2026-09-01",
        regEnd: "2026-09-29",
        location: "台北、台中、高雄、花蓮",
        note: "115年第3場年度筆試（第48屆）"
      },
      {
        examType: "computer",
        location: "台北、台中、台南、高雄",
        note: "電腦應試持續開放"
      }
    ]
  },

  {
    id: "family-trust",
    name: "家族信託規劃顧問師資格測驗",
    shortName: "家族信託",
    group: "tabf",
    color: "#1E40AF",
    icon: "👨‍👩‍👧",
    officialSite: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=151",
    exams: [
      {
        examType: "written",
        date: "2026-10-17",
        regStart: "2026-09-01",
        regEnd: "2026-09-29",
        location: "台北、台中、高雄、花蓮",
        note: "115年第3場年度筆試（第8期）"
      },
      {
        examType: "computer",
        location: "台北、台中、高雄",
        note: "電腦應試持續開放"
      }
    ]
  },

  {
    id: "esg-tabf",
    name: "永續發展基礎能力測驗",
    shortName: "永續發展",
    group: "tabf",
    color: "#065F46",
    icon: "🌱",
    officialSite: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=381",
    exams: [
      {
        examType: "written",
        date: "2026-10-17",
        regStart: "2026-09-01",
        regEnd: "2026-09-29",
        location: "台北、台中、高雄、花蓮",
        note: "115年第3場年度筆試（第5次）"
      },
      {
        examType: "computer",
        location: "台北、台中、台南、高雄、花蓮",
        note: "電腦應試持續開放"
      }
    ]
  },

  {
    id: "fintech",
    name: "金融科技力知識檢定測驗",
    shortName: "金融科技力",
    group: "tabf",
    color: "#7C3AED",
    icon: "💡",
    officialSite: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=261",
    exams: [
      {
        examType: "written",
        date: "2026-10-17",
        regStart: "2026-09-01",
        regEnd: "2026-09-29",
        location: "台北、台中、高雄、花蓮",
        note: "115年第3場年度筆試（第22屆）"
      },
      {
        examType: "computer",
        location: "台北、台中、台南、高雄",
        note: "電腦應試持續開放"
      }
    ]
  },

  // --- TABF 第4場 11/21（報名 10/6-11/2）+ 電腦應試 ---
  {
    id: "bank-control-general",
    name: "銀行內部控制與內部稽核測驗（一般金融）",
    shortName: "銀行內控（一般）",
    group: "tabf",
    color: "#0891B2",
    icon: "🏛️",
    officialSite: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=051",
    exams: [
      {
        examType: "written",
        date: "2026-11-21",
        regStart: "2026-10-06",
        regEnd: "2026-11-02",
        location: "台北、台中、高雄、花蓮",
        note: "115年第4場年度筆試（第50期）"
      },
      {
        examType: "computer",
        location: "台北、台中、台南、高雄、花蓮",
        note: "每週均有場次，號碼牌制"
      }
    ]
  },

  {
    id: "forex-basic",
    name: "初階外匯人員專業能力測驗",
    shortName: "初階外匯",
    group: "tabf",
    color: "#B45309",
    icon: "💱",
    officialSite: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=021",
    exams: [
      {
        examType: "written",
        date: "2026-11-21",
        regStart: "2026-10-06",
        regEnd: "2026-11-02",
        location: "台北、台中、高雄、花蓮",
        note: "115年第4場年度筆試（第48屆）"
      },
      {
        examType: "computer",
        location: "台北、台中、高雄",
        note: "電腦應試持續開放"
      }
    ]
  },

  {
    id: "credit-advanced",
    name: "進階授信人員專業能力測驗",
    shortName: "進階授信",
    group: "tabf",
    color: "#166534",
    icon: "💹",
    officialSite: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=012",
    exams: [
      {
        examType: "written",
        date: "2026-11-21",
        regStart: "2026-10-06",
        regEnd: "2026-11-02",
        location: "台北、台中、高雄、花蓮",
        note: "115年第4場年度筆試（第26屆）"
      },
      {
        examType: "computer",
        location: "台北、台中、台南、高雄",
        note: "電腦應試持續開放"
      }
    ]
  },

  {
    id: "elderly-finance",
    name: "高齡金融規劃顧問師資格測驗",
    shortName: "高齡金融",
    group: "tabf",
    color: "#9D174D",
    icon: "👴",
    officialSite: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=291",
    exams: [
      {
        examType: "written",
        date: "2026-11-21",
        regStart: "2026-10-06",
        regEnd: "2026-11-02",
        location: "台北、台中、高雄、花蓮",
        note: "115年第4場年度筆試（第11期）"
      },
      {
        examType: "computer",
        location: "台北、台中、台南、高雄",
        note: "電腦應試持續開放"
      }
    ]
  },

  {
    id: "financial-planning",
    name: "理財規劃人員專業能力測驗",
    shortName: "理財規劃",
    group: "tabf",
    color: "#0D9488",
    icon: "📈",
    officialSite: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=031",
    exams: [
      {
        examType: "written",
        date: "2026-11-21",
        regStart: "2026-10-06",
        regEnd: "2026-11-02",
        location: "台北、台中、高雄、花蓮",
        note: "115年第4場年度筆試（第49屆）"
      },
      {
        examType: "computer",
        location: "台北、台中、台南、高雄",
        note: "電腦應試持續開放"
      }
    ]
  },

  {
    id: "yanshen",
    name: "衍生性金融商品銷售人員資格測驗",
    shortName: "衍生性商品",
    group: "tabf",
    color: "#0369A1",
    icon: "📊",
    officialSite: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=251",
    exams: [
      {
        examType: "written",
        date: "2026-11-21",
        regStart: "2026-10-06",
        regEnd: "2026-11-02",
        location: "台北、台中、高雄、花蓮",
        note: "115年第4場年度筆試（第21期）"
      },
      {
        examType: "computer",
        location: "台北、台中、台南、高雄、花蓮",
        note: "電腦應試持續開放"
      }
    ]
  },

  {
    id: "risk-management",
    name: "風險管理基本能力測驗",
    shortName: "風險管理",
    group: "tabf",
    color: "#DC2626",
    icon: "⚡",
    officialSite: "https://www.tabf.org.tw/LicenseExamList.aspx?ExamCode=201",
    exams: [
      {
        examType: "written",
        date: "2026-11-21",
        regStart: "2026-10-06",
        regEnd: "2026-11-02",
        location: "台北、台中、高雄、花蓮",
        note: "115年第4場年度筆試（第23屆）"
      },
      {
        examType: "computer",
        location: "台北、台中、高雄",
        note: "電腦應試持續開放"
      }
    ]
  },


  // ════════════════════════════════════════
  //  SFI 證券暨期貨市場發展基金會
  //  第2次筆試：2026/08/02（日）報名 5/11～6/26
  //  第3次筆試：2026/12/06（日）報名 9/7～10/23
  // ════════════════════════════════════════

  {
    id: "securities-associate",
    name: "證券商業務員",
    shortName: "證券業務員",
    group: "sfi",
    color: "#6D28D9",
    icon: "📉",
    officialSite: "https://examweb.sfi.org.tw/regexam/index.aspx",
    exams: [
      {
        examType: "written",
        date: "2026-08-02",
        regStart: "2026-05-11",
        regEnd: "2026-06-26",
        location: "台北、台中、高雄",
        note: "115年第2次筆試，亦可選擇電腦應試"
      },
      {
        examType: "written",
        date: "2026-12-06",
        regStart: "2026-09-07",
        regEnd: "2026-10-23",
        location: "台北、台中、高雄",
        note: "115年第3次筆試，亦可選擇電腦應試"
      }
    ]
  },

  {
    id: "securities-senior",
    name: "證券商高級業務員",
    shortName: "高級業務員",
    group: "sfi",
    color: "#5B21B6",
    icon: "📈",
    officialSite: "https://examweb.sfi.org.tw/regexam/index.aspx",
    exams: [
      {
        examType: "written",
        date: "2026-08-02",
        regStart: "2026-05-11",
        regEnd: "2026-06-26",
        location: "台北、台中、高雄",
        note: "115年第2次筆試，亦可選擇電腦應試"
      },
      {
        examType: "written",
        date: "2026-12-06",
        regStart: "2026-09-07",
        regEnd: "2026-10-23",
        location: "台北、台中、高雄",
        note: "115年第3次筆試，亦可選擇電腦應試"
      }
    ]
  },

  {
    id: "investment-trust",
    name: "證券投資信託及顧問業務員（1/2/3科）",
    shortName: "投信投顧業務員",
    group: "sfi",
    color: "#4C1D95",
    icon: "💼",
    officialSite: "https://examweb.sfi.org.tw/regexam/index.aspx",
    exams: [
      {
        examType: "written",
        date: "2026-08-02",
        regStart: "2026-05-11",
        regEnd: "2026-06-26",
        location: "台北、台中、高雄",
        note: "115年第2次筆試，1/2/3科同日，亦可選擇電腦應試"
      },
      {
        examType: "written",
        date: "2026-12-06",
        regStart: "2026-09-07",
        regEnd: "2026-10-23",
        location: "台北、台中、高雄",
        note: "115年第3次筆試，亦可選擇電腦應試"
      }
    ]
  },

  {
    id: "futures-associate",
    name: "期貨商業務員",
    shortName: "期貨業務員",
    group: "sfi",
    color: "#7C2D12",
    icon: "🔮",
    officialSite: "https://examweb.sfi.org.tw/regexam/index.aspx",
    exams: [
      {
        examType: "written",
        date: "2026-08-02",
        regStart: "2026-05-11",
        regEnd: "2026-06-26",
        location: "台北、台中、高雄",
        note: "115年第2次筆試，亦可選擇電腦應試"
      },
      {
        examType: "written",
        date: "2026-12-06",
        regStart: "2026-09-07",
        regEnd: "2026-10-23",
        location: "台北、台中、高雄",
        note: "115年第3次筆試，亦可選擇電腦應試"
      }
    ]
  },

  {
    id: "futures-analyst",
    name: "期貨交易分析人員",
    shortName: "期貨分析師",
    group: "sfi",
    color: "#991B1B",
    icon: "🧮",
    officialSite: "https://examweb.sfi.org.tw/regexam/index.aspx",
    exams: [
      {
        examType: "written",
        date: "2026-08-02",
        regStart: "2026-05-11",
        regEnd: "2026-06-26",
        location: "台北、台中、高雄",
        note: "115年第2次筆試"
      },
      {
        examType: "written",
        date: "2026-12-06",
        regStart: "2026-09-07",
        regEnd: "2026-10-23",
        location: "台北、台中、高雄",
        note: "115年第3次筆試"
      }
    ]
  },

  {
    id: "enterprise-control",
    name: "企業內部控制",
    shortName: "企業內控",
    group: "sfi",
    color: "#1E293B",
    icon: "🔒",
    officialSite: "https://examweb.sfi.org.tw/regexam/index.aspx",
    exams: [
      {
        examType: "written",
        date: "2026-08-02",
        regStart: "2026-05-11",
        regEnd: "2026-06-26",
        location: "台北、台中、高雄",
        note: "115年第2次筆試，亦可選擇電腦應試"
      },
      {
        examType: "written",
        date: "2026-12-06",
        regStart: "2026-09-07",
        regEnd: "2026-10-23",
        location: "台北、台中、高雄",
        note: "115年第3次筆試，亦可選擇電腦應試"
      }
    ]
  },

  {
    id: "esg-sfi",
    name: "永續發展基礎能力測驗（SFI）",
    shortName: "永續發展(SFI)",
    group: "sfi",
    color: "#14532D",
    icon: "🌿",
    officialSite: "https://examweb.sfi.org.tw/regexam/index.aspx",
    exams: [
      {
        examType: "written",
        date: "2026-08-02",
        regStart: "2026-05-11",
        regEnd: "2026-06-26",
        location: "台北、新竹、台中、台南、嘉義、高雄",
        note: "115年第2次筆試，亦可選擇電腦應試"
      },
      {
        examType: "written",
        date: "2026-12-06",
        regStart: "2026-09-07",
        regEnd: "2026-10-23",
        location: "台北、新竹、台中、台南、嘉義、高雄",
        note: "115年第3次筆試，亦可選擇電腦應試"
      }
    ]
  },

  // --- SFI 電腦應試（無年度筆試）---
  {
    id: "bill-finance",
    name: "票券商業務人員",
    shortName: "票券商",
    group: "sfi",
    color: "#854D0E",
    icon: "🎫",
    officialSite: "https://examweb.sfi.org.tw/regexam/index.aspx",
    exams: [
      {
        examType: "computer",
        location: "台北、新竹、台中、台南、嘉義、高雄",
        note: "電腦應試持續開放"
      }
    ]
  },

  {
    id: "stock-affairs",
    name: "股務人員專業能力測驗",
    shortName: "股務人員",
    group: "sfi",
    color: "#3730A3",
    icon: "🗂️",
    officialSite: "https://examweb.sfi.org.tw/regexam/index.aspx",
    exams: [
      {
        examType: "computer",
        location: "台北、台中、高雄",
        note: "電腦應試持續開放"
      }
    ]
  },

  {
    id: "corporate-governance",
    name: "公司治理",
    shortName: "公司治理",
    group: "sfi",
    color: "#1E3A5F",
    icon: "🏢",
    officialSite: "https://examweb.sfi.org.tw/regexam/index.aspx",
    exams: [
      {
        examType: "computer",
        location: "台北、新竹、台中、台南、嘉義、高雄",
        note: "電腦應試持續開放"
      }
    ]
  },

  {
    id: "asset-securitization",
    name: "資產證券化",
    shortName: "資產證券化",
    group: "sfi",
    color: "#1E4D2B",
    icon: "🏗️",
    officialSite: "https://examweb.sfi.org.tw/regexam/index.aspx",
    exams: [
      {
        examType: "computer",
        location: "台北、台中、高雄",
        note: "電腦應試持續開放"
      }
    ]
  },

];
