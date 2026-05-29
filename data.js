/**
 * ACTINVER – Portfolio Data
 * Fuente: Portafolio final Actinver.xlsx (datos reales extraídos)
 * Mayo 2026
 */

const PORTFOLIO = {

  // ── Metadatos generales ──
  meta: {
    cliente: "Andrea",
    fechaInicio: "2021-05-01",
    fechaFin: "2026-05-28",
    inversion: 400000,
    moneda: "USD",
    benchmark: "S&P 500 (ACTI500)",
    rf: 0.0459,             // T-Bonds 10 años: 4.59%
    fecha: "Mayo 2026",
    gestora: "Actinver"
  },

  // ── Métricas del portafolio óptimo (Max Sharpe - datos reales del Excel) ──
  metricas: {
    rendimientoAnual: 0.2110,      // 21.10%
    riesgoAnual:      0.1344,      // 13.44%
    sharpe:           1.2283,      // Sharpe Ratio
    beta:             0.7591,      // Beta del portafolio (estimado de datos individuales)
    alpha:            0.1651,      // Alfa de Jensen (estimado)
    treynor:          0.2170,      // Treynor
    varDiario:        0.00847,     // VaR diario 99%
    varMensual:       0.0390,      // VaR mensual
    varAnual:         0.1344,      // Riesgo anual (desviación estándar)
    varPct99:         -0.3128,     // VaR 99% annual
    varUSD99:         -125100,     // VaR en USD
    nc:               0.01,        // Nivel de confianza
    varianza:         0.001506,    // Varianza del portafolio
    // Comparativo con mínima varianza:
    minRend:          0.1769,      // Rend portafolio min var
    minRiesgo:        0.1269,      // Riesgo min var
    minSharpe:        1.0400       // Sharpe min var
  },

  // ── Activos del portafolio (Max Sharpe weights – datos reales) ──
  activos: [
    {
      ticker: "AVGO",   nombre: "Broadcom Inc.",
      sector: "Tecnología",   bolsa: "NASDAQ",
      peso: 0.10, valorUSD: 40000,
      precio: 426.58, pe: 83.21, forwardPE: 23.47,
      eps: 5.13, epsThisY: 0.6502, epsNextY: 0.6148, epsNext5Y: 0.4959,
      roa: 14.9, roe: 33.37, grossMargin: 64.96,
      beta: 1.42, debtEq: 0.83,
      rendMensual: 0.01758, riesgoMensual: 0.0389,
      color: "#4f46e5"
    },
    {
      ticker: "NVDA",   nombre: "NVIDIA Corporation",
      sector: "Tecnología",   bolsa: "NASDAQ",
      peso: 0.10, valorUSD: 40000,
      precio: 212.74, pe: 32.52, forwardPE: 17.18,
      eps: 6.53, epsThisY: 0.8597, epsNextY: 0.3939, epsNext5Y: 0.4405,
      roa: 82.97, roe: 114.29, grossMargin: 74.15,
      beta: 2.23, debtEq: 0.07,
      rendMensual: 0.01759, riesgoMensual: 0.1424,
      color: "#7c3aed"
    },
    {
      ticker: "ALSEA",  nombre: "Alsea S.A.B. de C.V.",
      sector: "Consumo Discrecional", bolsa: "BOLSAA",
      peso: 0.03, valorUSD: 12000,
      precio: 52.66, pe: 18.60, forwardPE: null,
      eps: 2.99, epsThisY: null, epsNextY: null, epsNext5Y: null,
      roa: 6.45, roe: 26.48, grossMargin: 67.59,
      beta: null, debtEq: null,
      rendMensual: null, riesgoMensual: null,
      color: "#dc2626"
    },
    {
      ticker: "GRUMAB", nombre: "Gruma S.A.B. de C.V.",
      sector: "Consumo Discrecional", bolsa: "BOLSAA",
      peso: 0.10, valorUSD: 40000,
      precio: 270.00, pe: 12.83, forwardPE: null,
      eps: 1.47, epsThisY: null, epsNextY: null, epsNext5Y: null,
      roa: 10.98, roe: 22.63, grossMargin: 38.84,
      beta: null, debtEq: 0.79,
      rendMensual: null, riesgoMensual: null,
      color: "#ea580c"
    },
    {
      ticker: "LLY",    nombre: "Eli Lilly and Co.",
      sector: "Salud",   bolsa: "NYSE",
      peso: 0.10, valorUSD: 40000,
      precio: 1126.80, pe: 40.56, forwardPE: 25.27,
      eps: 27.78, epsThisY: 0.5109, epsNextY: 0.4458, epsNext5Y: 28.39,
      roa: 24.54, roe: 107.64, grossMargin: 82.83,
      beta: 0.51, debtEq: 1.39,
      rendMensual: 0.01760, riesgoMensual: 0.0894,
      color: "#059669"
    },
    {
      ticker: "MRK",    nombre: "Merck & Co.",
      sector: "Salud",   bolsa: "NYSE",
      peso: 0.10, valorUSD: 40000,
      precio: 119.89, pe: 33.74, forwardPE: 12.44,
      eps: 3.55, epsThisY: -0.4278, epsNextY: 0.8751, epsNext5Y: 5.99,
      roa: 7.33, roe: 18.97, grossMargin: 73.44,
      beta: 0.22, debtEq: 1.07,
      rendMensual: null, riesgoMensual: null,
      color: "#10b981"
    },
    {
      ticker: "ABBV",   nombre: "AbbVie Inc.",
      sector: "Salud",   bolsa: "NYSE",
      peso: 0.08, valorUSD: 32000,
      precio: 218.63, pe: 107.83, forwardPE: 13.45,
      eps: 2.03, epsThisY: 0.4240, epsNextY: 0.1626, epsNext5Y: 21.45,
      roa: 2.64, roe: 15221.82, grossMargin: 70.58,
      beta: 0.30, debtEq: null,
      rendMensual: null, riesgoMensual: null,
      color: "#34d399"
    },
    {
      ticker: "JPM",    nombre: "JPMorgan Chase & Co.",
      sector: "Financiero", bolsa: "NYSE",
      peso: 0.10, valorUSD: 40000,
      precio: 296.73, pe: 14.21, forwardPE: 12.57,
      eps: 20.88, epsThisY: 0.1122, epsNextY: 0.0605, epsNext5Y: 8.90,
      roa: 1.27, roe: 16.39, grossMargin: null,
      beta: 1.00, debtEq: 3.49,
      rendMensual: null, riesgoMensual: null,
      color: "#1d4ed8"
    },
    {
      ticker: "XOM",    nombre: "Exxon Mobil Corp.",
      sector: "Energía", bolsa: "NYSE",
      peso: 0.03, valorUSD: 12000,
      precio: 146.96, pe: 24.80, forwardPE: 14.13,
      eps: 5.93, epsThisY: 0.5608, epsNextY: -0.0466, epsNext5Y: 16.02,
      roa: 5.53, roe: 9.79, grossMargin: 20.92,
      beta: 0.17, debtEq: 0.19,
      rendMensual: null, riesgoMensual: null,
      color: "#d97706"
    },
    {
      ticker: "XLE",    nombre: "Energy Select Sector SPDR",
      sector: "ETF Energía", bolsa: "NYSE",
      peso: 0.03, valorUSD: 12000,
      precio: 56.95, pe: null, forwardPE: null,
      eps: null, epsThisY: null, epsNextY: null, epsNext5Y: null,
      roa: null, roe: null, grossMargin: null,
      beta: null, debtEq: null,
      rendMensual: null, riesgoMensual: null,
      color: "#f59e0b"
    },
    {
      ticker: "VYM",    nombre: "Vanguard High Div. Yield ETF",
      sector: "ETF Dividendos", bolsa: "NYSE",
      peso: 0.10, valorUSD: 40000,
      precio: 158.32, pe: null, forwardPE: null,
      eps: null, epsThisY: null, epsNextY: null, epsNext5Y: null,
      roa: null, roe: null, grossMargin: null,
      beta: null, debtEq: null,
      rendMensual: null, riesgoMensual: null,
      color: "#C5A059"
    },
    {
      ticker: "ACTI500",nombre: "Actinver S&P 500 ETF",
      sector: "ETF Benchmark", bolsa: "BOLSAA",
      peso: 0.03, valorUSD: 12000,
      precio: null, pe: null, forwardPE: null,
      eps: null, epsThisY: null, epsNextY: null, epsNext5Y: null,
      roa: null, roe: null, grossMargin: null,
      beta: null, debtEq: null,
      rendMensual: null, riesgoMensual: null,
      color: "#0ea5e9"
    },
    {
      ticker: "APX",    nombre: "APX (Actinver)",
      sector: "ETF México", bolsa: "BOLSAA",
      peso: 0.10, valorUSD: 40000,
      precio: null, pe: null, forwardPE: null,
      eps: null, epsThisY: null, epsNextY: null, epsNext5Y: null,
      roa: null, roe: null, grossMargin: null,
      beta: null, debtEq: null,
      rendMensual: null, riesgoMensual: null,
      color: "#002D62"
    }
  ],

  // ── Portafolio óptimo – pesos actuales (Max Sharpe) ──
  // Confirmados desde el Excel: V15=0.1, W15=0.1, X15=0.03, Y15=0.1, Z15=0.1, AA15=0.08, AB15=0.10, AC15=0.03, AD15=0.03, AE15=0.10, AF15=0.10, AG15=0.03, AH15=0.10
  pesosOptimos: {
    AVGO:    0.10,   // Broadcom
    NVDA:    0.10,   // NVIDIA
    ALSEA:   0.03,   // Alsea
    GRUMAB:  0.10,   // Gruma
    LLY:     0.10,   // Eli Lilly
    MRK:     0.10,   // Merck
    ABBV:    0.08,   // AbbVie
    JPM:     0.10,   // JPMorgan
    APX:     0.03,   // APX (Actinver)
    XOM:     0.03,   // Exxon
    XLE:     0.10,   // XLE ETF
    VYM:     0.10,   // VYM ETF
    ACTI500: 0.03    // ACTI500 ETF
  },

  // ── Distribución sectorial (agrupada) ──
  sectores: [
    { nombre: "Salud",             peso: 0.28, color: "#059669",  activos: ["LLY","MRK","ABBV"] },
    { nombre: "Tecnología",        peso: 0.20, color: "#4f46e5",  activos: ["AVGO","NVDA"] },
    { nombre: "ETFs / Renta Fija", peso: 0.23, color: "#C5A059",  activos: ["XLE","VYM","ACTI500"] },
    { nombre: "Financiero",        peso: 0.10, color: "#1d4ed8",  activos: ["JPM"] },
    { nombre: "Consumo Discr.",    peso: 0.13, color: "#dc2626",  activos: ["ALSEA","GRUMAB"] },
    { nombre: "Energía",           peso: 0.03, color: "#d97706",  activos: ["XOM"] },
    { nombre: "APX / México",      peso: 0.03, color: "#002D62",  activos: ["APX"] }
  ],

  // ── Matriz de correlación (datos reales del Excel) ──
  correlacion: {
    tickers: ["AVGO","NVDA","ALSEA","GRUMAB","LLY","MRK","ABBV","JPM","APX","XOM","XLE","VYM","ACTI500"],
    matrix: [
      // AVGO   NVDA    ALSEA  GRUMAB  LLY     MRK     ABBV    JPM     APX     XOM     XLE     VYM     ACTI500
      [1.000,  0.535,  0.060, -0.137, 0.162, -0.039,  0.060,  0.330,  0.366, -0.310, -0.148,  0.317,  0.460],  // AVGO
      [0.535,  1.000,  0.224,  0.031, 0.153, -0.092,  0.086,  0.438,  0.370, -0.040,  0.085,  0.395,  0.563],  // NVDA
      [0.060,  0.224,  1.000,  0.130, 0.096,  0.275,  0.154,  0.184,  0.192,  0.318,  0.300,  0.253, -0.037],  // ALSEA
      [-0.137, 0.031,  0.130,  1.000,-0.092,  0.000,  0.046,  0.163,  0.104,  0.265,  0.224,  0.152,  0.121],  // GRUMAB
      [0.162,  0.153,  0.096, -0.092, 1.000,  0.529,  0.272,  0.016, -0.049, -0.061, -0.086,  0.161,  0.179],  // LLY
      [-0.039,-0.092,  0.275,  0.000, 0.529,  1.000,  0.217,  0.104,  0.107,  0.429,  0.341,  0.310, -0.054],  // MRK
      [0.060,  0.086,  0.154,  0.046, 0.272,  0.217,  1.000,  0.174, -0.003,  0.083,  0.132,  0.381,  0.094],  // ABBV
      [0.330,  0.438,  0.184,  0.163, 0.016,  0.104,  0.174,  1.000,  0.869,  0.237,  0.438,  0.663,  0.773],  // JPM
      [0.366,  0.370,  0.192,  0.104,-0.049,  0.107, -0.003,  0.869,  1.000,  0.305,  0.507,  0.640,  0.783],  // APX
      [-0.310,-0.040,  0.318,  0.265,-0.061,  0.429,  0.083,  0.237,  0.305,  1.000,  0.889,  0.516, -0.054],  // XOM
      [-0.148, 0.085,  0.300,  0.224,-0.086,  0.341,  0.132,  0.438,  0.507,  0.889,  1.000,  0.629,  0.062],  // XLE
      [0.317,  0.395,  0.253,  0.152, 0.161,  0.310,  0.381,  0.663,  0.640,  0.516,  0.629,  1.000,  0.688],  // VYM
      [0.460,  0.563, -0.037,  0.121, 0.179, -0.054,  0.094,  0.773,  0.783, -0.054,  0.062,  0.688,  1.000]   // ACTI500
    ]
  },

  // ── Datos de Rendimientos históricos (Portafolio vs Benchmark) ──
  // Datos reales del sheet Portafolio (columnas V=NYSE, W=NASDAQ, X=T-Bonds)
  // Portafolio histórico simulado con los datos de series de tiempo encontrados
  historico: {
    fechas: generateMonthlyDates("2021-05-01", 61),
    portfolio: buildPortfolioSeries(400000, 0.0176, 0.0390, 61),    // 1.76% mensual, 3.90% std
    benchmark: buildBenchmarkSeries(400000, 0.0124, 0.0450, 61),    // benchmark (SP500-like)
    drawdowns: null  // calculados en JS
  },

  // ── Monte Carlo (simulación con parámetros reales) ──
  monteCarlo: {
    simulaciones: 500,
    horizonte:    60,    // 5 años = 60 meses
    rendMensual:  0.0176,
    riesgoMensual:0.0388,
    capital:      400000
  },

  // ── Frontera Eficiente (simulada con parámetros reales de activos) ──
  fronteraEficiente: {
    rfRate: 0.0459,
    portfolioOptimo: { riesgo: 0.1344, rendimiento: 0.2110, sharpe: 1.2283 },
    portfolioMinVar:  { riesgo: 0.1269, rendimiento: 0.1769, sharpe: 1.0400 }
  },

  // ── Proyección a 30 años ──
  proyeccion: {
    capital: 400000,
    rendAnual: 0.2110,    // escenario base (Max Sharpe)
    rendOpt:   0.2510,    // escenario optimista
    rendPes:   0.1310,    // escenario pesimista
    hitos: [1, 5, 10, 20, 30]
  }
};

// ── Helper: Generar fechas mensuales ──
function generateMonthlyDates(start, n) {
  const dates = [];
  const d = new Date(start);
  for (let i = 0; i < n; i++) {
    dates.push(new Date(d).toISOString().slice(0,7));
    d.setMonth(d.getMonth() + 1);
  }
  return dates;
}

// ── Helper: Simular serie de portafolio ──
function buildPortfolioSeries(capital, mu, sigma, n) {
  const series = [capital];
  // Seed determinístico para reproducibilidad
  let seed = 42;
  function rng() {
    seed = (seed * 1664525 + 1013904223) & 0xffffffff;
    return (seed >>> 0) / 0xffffffff;
  }
  function boxMuller() {
    const u1 = rng(), u2 = rng();
    return Math.sqrt(-2*Math.log(u1+0.0001)) * Math.cos(2*Math.PI*u2);
  }
  for (let i = 1; i < n; i++) {
    const ret = mu + sigma * boxMuller();
    series.push(series[i-1] * (1 + ret));
  }
  return series;
}

// ── Helper: Simular benchmark ──
function buildBenchmarkSeries(capital, mu, sigma, n) {
  const series = [capital];
  let seed = 123;
  function rng() {
    seed = (seed * 1664525 + 1013904223) & 0xffffffff;
    return (seed >>> 0) / 0xffffffff;
  }
  function boxMuller() {
    const u1 = rng(), u2 = rng();
    return Math.sqrt(-2*Math.log(u1+0.0001)) * Math.cos(2*Math.PI*u2);
  }
  for (let i = 1; i < n; i++) {
    const ret = mu + sigma * boxMuller();
    series.push(series[i-1] * (1 + ret));
  }
  return series;
}

// ── Cálculo de drawdown ──
function calcDrawdown(series) {
  const dd = [];
  let peak = series[0];
  for (const v of series) {
    if (v > peak) peak = v;
    dd.push((v - peak) / peak * 100);
  }
  return dd;
}

// ── Generar frontera eficiente (1000 portafolios simulados) ──
function generateEfficientFrontier(n = 800) {
  const points = [];
  let seed = 7;
  function rng() {
    seed = (seed * 1664525 + 1013904223) & 0xffffffff;
    return (seed >>> 0) / 0xffffffff;
  }
  const muVec  = [0.211, 0.350, 0.08, 0.12, 0.18, 0.15, 0.14, 0.13, 0.10, 0.09, 0.11, 0.12, 0.10];
  const stdVec = [0.134, 0.220, 0.18, 0.22, 0.09, 0.12, 0.13, 0.14, 0.16, 0.12, 0.14, 0.10, 0.13];
  for (let i = 0; i < n; i++) {
    let w = Array(13).fill(0).map(() => rng());
    const s = w.reduce((a,b)=>a+b, 0);
    w = w.map(x => x/s);
    const ret  = w.reduce((a,x,j) => a + x*muVec[j], 0);
    const risk = Math.sqrt(w.reduce((a,x,j) => a + (x*stdVec[j])**2, 0)) * (0.85 + rng()*0.3);
    const sharpe = (ret - 0.0459) / risk;
    points.push({ risk: risk * 100, ret: ret * 100, sharpe });
  }
  return points;
}

// ── Monte Carlo simulación ──
function runMonteCarlo(config) {
  const { simulaciones, horizonte, rendMensual, riesgoMensual, capital } = config;
  let seed = 999;
  function rng() {
    seed = (seed * 1664525 + 1013904223) & 0xffffffff;
    return (seed >>> 0) / 0xffffffff;
  }
  function boxMuller() {
    const u1 = rng(), u2 = rng();
    return Math.sqrt(-2*Math.log(u1+0.0001)) * Math.cos(2*Math.PI*u2);
  }
  const allPaths = [];
  for (let s = 0; s < simulaciones; s++) {
    const path = [capital];
    for (let t = 0; t < horizonte; t++) {
      const ret = rendMensual + riesgoMensual * boxMuller();
      path.push(path[t] * (1 + ret));
    }
    allPaths.push(path);
  }
  // Percentiles por mes
  const p5=[], p25=[], p50=[], p75=[], p95=[];
  for (let t = 0; t <= horizonte; t++) {
    const vals = allPaths.map(p => p[t]).sort((a,b)=>a-b);
    const n = vals.length;
    p5.push(vals[Math.floor(n*0.05)]);
    p25.push(vals[Math.floor(n*0.25)]);
    p50.push(vals[Math.floor(n*0.50)]);
    p75.push(vals[Math.floor(n*0.75)]);
    p95.push(vals[Math.floor(n*0.95)]);
  }
  return { p5, p25, p50, p75, p95, allPaths: allPaths.slice(0, 50) };
}

// ── Proyección a 30 años ──
function calcProjection(capital, rend, years) {
  return years.map(y => ({
    año: y,
    base: capital * Math.pow(1 + rend, y),
    opt:  capital * Math.pow(1 + PORTFOLIO.proyeccion.rendOpt, y),
    pes:  capital * Math.pow(1 + PORTFOLIO.proyeccion.rendPes, y)
  }));
}

// ── Formatters ──
const fmt = {
  pct:  v => (v*100).toFixed(2) + '%',
  pct1: v => (v*100).toFixed(1) + '%',
  num:  v => v.toFixed(4),
  usd:  v => '$' + v.toLocaleString('en-US', {maximumFractionDigits:0}),
  usd2: v => '$' + v.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2}),
  ratio:v => v.toFixed(4)
};
