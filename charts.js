/**
 * ACTINVER – Charts Module
 * Visualizaciones con ECharts (interactivas, profesionales)
 */

const COLORS = {
  blue:      '#002D62',
  blueLight: '#0a4d96',
  gold:      '#C5A059',
  goldDark:  '#a8843e',
  white:     '#FFFFFF',
  gray:      '#6b7280',
  grayLight: '#e8eaee',
  success:   '#10b981',
  warning:   '#f59e0b',
  danger:    '#ef4444',
  tech:      '#4f46e5',
  health:    '#059669',
  finance:   '#1d4ed8',
  energy:    '#d97706',
  cons:      '#dc2626',
  etf:       '#C5A059'
};

const TOOLTIP_STYLE = {
  backgroundColor: 'rgba(0,29,64,0.95)',
  borderColor: 'rgba(197,160,89,0.35)',
  borderWidth: 1,
  textStyle: { color: '#fff', fontFamily: 'Inter, sans-serif', fontSize: 12 },
  extraCssText: 'border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.3);'
};

const TEXTCOLOR = { color: COLORS.blue, fontFamily: 'Inter, sans-serif' };

// ─────────────────────────────────────────────
//  CHART 1: Donut Distribución Sectorial
// ─────────────────────────────────────────────
function initChartSectorDonut(domId) {
  const el = document.getElementById(domId);
  if (!el) return;
  const chart = echarts.init(el, null, { renderer: 'canvas' });

  const data = PORTFOLIO.sectores.map(s => ({
    name: s.nombre,
    value: +(s.peso * 100).toFixed(1),
    itemStyle: { color: s.color }
  }));

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      ...TOOLTIP_STYLE,
      trigger: 'item',
      formatter: p => `<b>${p.name}</b><br/>Peso: <b style="color:${COLORS.gold}">${p.value}%</b>`
    },
    legend: {
      show: false
    },
    series: [{
      type: 'pie',
      radius: ['52%', '78%'],
      center: ['50%', '50%'],
      avoidLabelOverlap: true,
      itemStyle: { borderRadius: 4, borderColor: '#fff', borderWidth: 2 },
      label: {
        show: true,
        position: 'outside',
        formatter: p => `${p.name}\n${p.value}%`,
        fontSize: 10,
        fontFamily: 'Inter, sans-serif',
        color: COLORS.blue,
        fontWeight: 600
      },
      labelLine: { length: 8, length2: 12 },
      emphasis: {
        scale: true,
        scaleSize: 6,
        itemStyle: { shadowBlur: 20, shadowColor: 'rgba(0,45,98,0.3)' }
      },
      data,
      animationType: 'expansion',
      animationDuration: 900
    }]
  };
  chart.setOption(option);
  window.addEventListener('resize', () => chart.resize());
  return chart;
}

// ─────────────────────────────────────────────
//  CHART 2: Bar – Pesos de activos
// ─────────────────────────────────────────────
function initChartWeights(domId) {
  const el = document.getElementById(domId);
  if (!el) return;
  const chart = echarts.init(el, null, { renderer: 'canvas' });

  const sorted = [...PORTFOLIO.activos].sort((a,b) => b.peso - a.peso);
  const names  = sorted.map(a => a.ticker);
  const pesos  = sorted.map(a => +(a.peso*100).toFixed(1));
  const colors = sorted.map(a => a.color);

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      ...TOOLTIP_STYLE,
      trigger: 'axis',
      formatter: p => `<b>${p[0].name}</b><br/>Peso: <b style="color:${COLORS.gold}">${p[0].value}%</b>`
    },
    grid: { top: 12, right: 12, bottom: 28, left: 44, containLabel: false },
    xAxis: {
      type: 'value',
      max: 14,
      axisLabel: { formatter: v => v+'%', ...TEXTCOLOR, fontSize: 10 },
      splitLine: { lineStyle: { color: COLORS.grayLight } },
      axisLine: { show: false }
    },
    yAxis: {
      type: 'category',
      data: names,
      axisLabel: { ...TEXTCOLOR, fontSize: 10.5, fontWeight: 700 },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: [{
      type: 'bar',
      data: pesos.map((v, i) => ({ value: v, itemStyle: { color: colors[i], borderRadius: [0,4,4,0] } })),
      barMaxWidth: 14,
      label: {
        show: true,
        position: 'right',
        formatter: p => p.value + '%',
        fontSize: 10,
        fontWeight: 700,
        color: COLORS.blue
      },
      emphasis: { focus: 'self', itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,45,98,0.25)' } },
      animationDelay: i => i * 60
    }]
  };
  chart.setOption(option);
  window.addEventListener('resize', () => chart.resize());
  return chart;
}

// ─────────────────────────────────────────────
//  CHART 3: Frontera Eficiente (Scatter)
// ─────────────────────────────────────────────
function initChartFrontera(domId) {
  const el = document.getElementById(domId);
  if (!el) return;
  const chart = echarts.init(el, null, { renderer: 'canvas' });

  const pts = generateEfficientFrontier(900);

  // Ordenar por riesgo y construir la frontera
  const sorted = [...pts].sort((a,b) => a.risk - b.risk);
  const frontierX = [], frontierY = [];
  let maxRetSoFar = -Infinity;
  for (const p of sorted) {
    if (p.ret > maxRetSoFar) {
      maxRetSoFar = p.ret;
      frontierX.push(p.risk);
      frontierY.push(p.ret);
    }
  }

  const optimal = PORTFOLIO.fronteraEficiente.portfolioOptimo;
  const minvar  = PORTFOLIO.fronteraEficiente.portfolioMinVar;

  // Línea Capital Market
  const cml = [];
  for (let r = 0; r <= 35; r += 1) {
    const ret = 4.59 + (optimal.rendimiento*100 - 4.59) / (optimal.riesgo*100) * r;
    cml.push([r, ret]);
  }

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      ...TOOLTIP_STYLE,
      trigger: 'item',
      formatter: p => {
        if (p.seriesName === 'Portafolios') {
          return `Riesgo: <b>${p.data[0].toFixed(1)}%</b><br/>Rendimiento: <b>${p.data[1].toFixed(1)}%</b><br/>Sharpe: <b style="color:${COLORS.gold}">${((p.data[1]/100-0.0459)/(p.data[0]/100)).toFixed(2)}</b>`;
        }
        if (p.seriesName === 'Portafolio Óptimo') {
          return `<b style="color:${COLORS.gold}">★ Portafolio Seleccionado</b><br/>Rend: <b>${(optimal.rendimiento*100).toFixed(2)}%</b><br/>Riesgo: <b>${(optimal.riesgo*100).toFixed(2)}%</b><br/>Sharpe: <b style="color:${COLORS.gold}">${optimal.sharpe.toFixed(4)}</b>`;
        }
        return p.name;
      }
    },
    legend: {
      show: true,
      bottom: 6,
      textStyle: { ...TEXTCOLOR, fontSize: 10 },
      icon: 'circle',
      itemWidth: 8
    },
    grid: { top: 16, right: 20, bottom: 50, left: 52, containLabel: false },
    xAxis: {
      type: 'value',
      name: 'Riesgo Anual (%)',
      nameLocation: 'middle',
      nameGap: 30,
      nameTextStyle: { ...TEXTCOLOR, fontSize: 10, fontWeight: 600 },
      min: 0, max: 40,
      axisLabel: { formatter: v => v+'%', ...TEXTCOLOR, fontSize: 9 },
      splitLine: { lineStyle: { color: COLORS.grayLight, type: 'dashed' } },
      axisLine: { lineStyle: { color: COLORS.grayLight } }
    },
    yAxis: {
      type: 'value',
      name: 'Rendimiento Anual (%)',
      nameLocation: 'middle',
      nameGap: 38,
      nameTextStyle: { ...TEXTCOLOR, fontSize: 10, fontWeight: 600 },
      min: 0, max: 50,
      axisLabel: { formatter: v => v+'%', ...TEXTCOLOR, fontSize: 9 },
      splitLine: { lineStyle: { color: COLORS.grayLight, type: 'dashed' } },
      axisLine: { lineStyle: { color: COLORS.grayLight } }
    },
    series: [
      {
        name: 'Portafolios',
        type: 'scatter',
        data: pts.map(p => [+p.risk.toFixed(2), +p.ret.toFixed(2)]),
        symbolSize: 5,
        itemStyle: {
          color: p => {
            const s = p.data[1] < 15 ? 0 : Math.min(1, (p.data[1] - 15) / 25);
            const r = Math.round(0 + s*197);
            const g = Math.round(45 + s*115);
            const b = Math.round(98);
            return `rgba(${r},${g},${b},0.35)`;
          }
        },
        z: 1,
        emphasis: { disabled: false }
      },
      {
        name: 'CML',
        type: 'line',
        data: cml,
        lineStyle: { color: COLORS.gold, width: 1.5, type: 'dashed' },
        symbol: 'none',
        z: 2,
        tooltip: { show: false }
      },
      {
        name: 'Min. Varianza',
        type: 'scatter',
        data: [[+(minvar.riesgo*100).toFixed(2), +(minvar.rendimiento*100).toFixed(2)]],
        symbol: 'diamond',
        symbolSize: 14,
        itemStyle: { color: COLORS.success, borderColor: '#fff', borderWidth: 2 },
        z: 4,
        label: {
          show: true,
          position: 'right',
          formatter: 'Min. Var',
          fontSize: 9,
          fontWeight: 700,
          color: COLORS.success
        }
      },
      {
        name: 'Portafolio Óptimo',
        type: 'scatter',
        data: [[+(optimal.riesgo*100).toFixed(2), +(optimal.rendimiento*100).toFixed(2)]],
        symbol: 'star',
        symbolSize: 26,
        itemStyle: { color: COLORS.gold, borderColor: '#fff', borderWidth: 2 },
        z: 5,
        label: {
          show: true,
          position: 'right',
          formatter: '★ Máx. Sharpe\n1.2283',
          fontSize: 10,
          fontWeight: 800,
          color: COLORS.goldDark
        }
      }
    ],
    animation: true,
    animationDuration: 1200
  };
  chart.setOption(option);
  window.addEventListener('resize', () => chart.resize());
  return chart;
}

// ─────────────────────────────────────────────
//  CHART 4: Monte Carlo
// ─────────────────────────────────────────────
function initChartMonteCarlo(domId) {
  const el = document.getElementById(domId);
  if (!el) return;
  const chart = echarts.init(el, null, { renderer: 'canvas' });

  const mc = runMonteCarlo(PORTFOLIO.monteCarlo);
  const meses = Array.from({length: 61}, (_,i) => i === 0 ? 'Hoy' : `M${i}`);

  const fmtUSD = v => '$' + (v/1000).toFixed(0)+'K';

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      ...TOOLTIP_STYLE,
      trigger: 'axis',
      axisPointer: { type: 'cross', lineStyle: { color: COLORS.gold, opacity: 0.5 } },
      formatter: params => {
        const m = params[0].dataIndex;
        return `<b>Mes ${m}</b><br/>
          <span style="color:#86efac">P95:</span> ${fmtUSD(mc.p95[m])}<br/>
          <span style="color:#6ee7b7">P75:</span> ${fmtUSD(mc.p75[m])}<br/>
          <span style="color:${COLORS.gold}"><b>Mediana:</b></span> <b>${fmtUSD(mc.p50[m])}</b><br/>
          <span style="color:#fca5a5">P25:</span> ${fmtUSD(mc.p25[m])}<br/>
          <span style="color:#f87171">P5:</span> ${fmtUSD(mc.p5[m])}`;
      }
    },
    legend: {
      show: true,
      bottom: 4,
      textStyle: { ...TEXTCOLOR, fontSize: 10 },
      icon: 'roundRect',
      itemWidth: 12
    },
    grid: { top: 14, right: 20, bottom: 48, left: 62, containLabel: false },
    xAxis: {
      type: 'category',
      data: meses,
      axisLabel: { ...TEXTCOLOR, fontSize: 9, interval: 11 },
      axisLine: { lineStyle: { color: COLORS.grayLight } },
      splitLine: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLabel: { formatter: v => fmtUSD(v), ...TEXTCOLOR, fontSize: 9 },
      splitLine: { lineStyle: { color: COLORS.grayLight, type: 'dashed' } },
      axisLine: { show: false }
    },
    series: [
      {
        name: 'Escenario Optimista (P95)',
        type: 'line',
        data: mc.p95,
        lineStyle: { color: COLORS.success, width: 1.5, opacity: 0.7 },
        symbol: 'none',
        areaStyle: { color: { type:'linear', x:0,y:0,x2:0,y2:1, colorStops: [{offset:0,color:'rgba(16,185,129,0.15)'},{offset:1,color:'rgba(16,185,129,0.0)'}] } },
        smooth: true
      },
      {
        name: 'Percentil 75',
        type: 'line',
        data: mc.p75,
        lineStyle: { color: 'rgba(16,185,129,0.5)', width: 1, type: 'dashed' },
        symbol: 'none',
        areaStyle: { color: 'rgba(16,185,129,0.06)' },
        smooth: true
      },
      {
        name: 'Mediana (P50)',
        type: 'line',
        data: mc.p50,
        lineStyle: { color: COLORS.gold, width: 2.5 },
        symbol: 'none',
        smooth: true,
        z: 10,
        label: { show: false }
      },
      {
        name: 'Percentil 25',
        type: 'line',
        data: mc.p25,
        lineStyle: { color: 'rgba(239,68,68,0.5)', width: 1, type: 'dashed' },
        symbol: 'none',
        areaStyle: { color: 'rgba(239,68,68,0.04)' },
        smooth: true
      },
      {
        name: 'Escenario Pesimista (P5)',
        type: 'line',
        data: mc.p5,
        lineStyle: { color: COLORS.danger, width: 1.5, opacity: 0.6 },
        symbol: 'none',
        smooth: true
      }
    ],
    animationDuration: 1200
  };
  chart.setOption(option);
  window.addEventListener('resize', () => chart.resize());
  return chart;
}

// ─────────────────────────────────────────────
//  CHART 5: Backtesting (líneas portafolio vs benchmark)
// ─────────────────────────────────────────────
function initChartBacktesting(domId) {
  const el = document.getElementById(domId);
  if (!el) return;
  const chart = echarts.init(el, null, { renderer: 'canvas' });

  const dates = PORTFOLIO.historico.fechas;
  const port  = PORTFOLIO.historico.portfolio;
  const bench = PORTFOLIO.historico.benchmark;
  const ddPort = calcDrawdown(port);

  const fmtUSD = v => '$' + (v/1000).toFixed(0)+'K';

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      ...TOOLTIP_STYLE,
      trigger: 'axis',
      axisPointer: { type: 'cross', lineStyle: { color: COLORS.gold, opacity: 0.4 } },
      formatter: params => {
        const i = params[0].dataIndex;
        const portRet = ((port[i] - 400000)/400000*100).toFixed(1);
        const benchRet = ((bench[i] - 400000)/400000*100).toFixed(1);
        const alpha = (portRet - benchRet).toFixed(1);
        return `<b>${dates[i]}</b><br/>
          <span style="color:${COLORS.gold}">■</span> Portafolio: <b>${fmtUSD(port[i])}</b> (${portRet>0?'+':''}${portRet}%)<br/>
          <span style="color:${COLORS.gray}">■</span> Benchmark: <b>${fmtUSD(bench[i])}</b> (${benchRet>0?'+':''}${benchRet}%)<br/>
          <span style="color:${COLORS.success}">α</span> Alpha: <b style="color:${alpha>0?COLORS.success:COLORS.danger}">${alpha>0?'+':''}${alpha}%</b>`;
      }
    },
    legend: {
      show: true,
      bottom: 4,
      textStyle: { ...TEXTCOLOR, fontSize: 10 },
      icon: 'roundRect',
      itemWidth: 12
    },
    grid: [
      { top: 10, right: 16, bottom: '38%', left: 60 },
      { top: '67%', right: 16, bottom: 44, left: 60 }
    ],
    xAxis: [
      { type: 'category', data: dates, boundaryGap: false,
        axisLabel: { ...TEXTCOLOR, fontSize: 9, interval: 11 },
        axisLine: { lineStyle: { color: COLORS.grayLight } },
        splitLine: { show: false }, gridIndex: 0 },
      { type: 'category', data: dates, boundaryGap: false,
        axisLabel: { ...TEXTCOLOR, fontSize: 9, interval: 11 },
        axisLine: { lineStyle: { color: COLORS.grayLight } },
        splitLine: { show: false }, gridIndex: 1 }
    ],
    yAxis: [
      { type: 'value', gridIndex: 0,
        axisLabel: { formatter: v => fmtUSD(v), ...TEXTCOLOR, fontSize: 9 },
        splitLine: { lineStyle: { color: COLORS.grayLight, type: 'dashed' } },
        axisLine: { show: false } },
      { type: 'value', gridIndex: 1, name: 'Drawdown %',
        axisLabel: { formatter: v => v+'%', ...TEXTCOLOR, fontSize: 9 },
        splitLine: { lineStyle: { color: COLORS.grayLight, type: 'dashed' } },
        axisLine: { show: false } }
    ],
    series: [
      {
        name: 'Portafolio Andrea',
        type: 'line',
        data: port,
        lineStyle: { color: COLORS.blue, width: 2.5 },
        symbol: 'none',
        smooth: false,
        areaStyle: { color: { type:'linear', x:0,y:0,x2:0,y2:1, colorStops:[{offset:0,color:'rgba(0,45,98,0.12)'},{offset:1,color:'rgba(0,45,98,0)'}] } },
        xAxisIndex: 0, yAxisIndex: 0,
        markPoint: {
          data: [
            { type: 'max', name: 'Máximo', label: { formatter: v => fmtUSD(v.value), fontSize: 9 } }
          ],
          symbolSize: 40,
          itemStyle: { color: COLORS.gold }
        }
      },
      {
        name: 'Benchmark (S&P 500)',
        type: 'line',
        data: bench,
        lineStyle: { color: COLORS.gray, width: 1.5, type: 'dashed' },
        symbol: 'none',
        smooth: false,
        xAxisIndex: 0, yAxisIndex: 0
      },
      {
        name: 'Drawdown',
        type: 'bar',
        data: ddPort.map(v => +v.toFixed(2)),
        itemStyle: { color: 'rgba(239,68,68,0.6)', borderRadius: [1,1,0,0] },
        barWidth: '80%',
        xAxisIndex: 1, yAxisIndex: 1
      }
    ],
    animationDuration: 1000
  };
  chart.setOption(option);
  window.addEventListener('resize', () => chart.resize());
  return chart;
}

// ─────────────────────────────────────────────
//  CHART 6: Proyección 30 años
// ─────────────────────────────────────────────
function initChartProjection(domId) {
  const el = document.getElementById(domId);
  if (!el) return;
  const chart = echarts.init(el, null, { renderer: 'canvas' });

  const años = Array.from({length: 31}, (_,i) => i);
  const cap  = PORTFOLIO.proyeccion.capital;
  const rBase = PORTFOLIO.proyeccion.rendAnual;
  const rOpt  = PORTFOLIO.proyeccion.rendOpt;
  const rPes  = PORTFOLIO.proyeccion.rendPes;

  const base = años.map(y => +(cap * Math.pow(1+rBase, y)).toFixed(0));
  const opt  = años.map(y => +(cap * Math.pow(1+rOpt,  y)).toFixed(0));
  const pes  = años.map(y => +(cap * Math.pow(1+rPes,  y)).toFixed(0));

  const fmtM = v => v >= 1e6 ? '$'+(v/1e6).toFixed(1)+'M' : '$'+(v/1000).toFixed(0)+'K';

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      ...TOOLTIP_STYLE,
      trigger: 'axis',
      formatter: params => {
        const y = params[0].dataIndex;
        return `<b>Año ${y}</b><br/>
          <span style="color:${COLORS.success}">↑ Optimista:</span> <b>${fmtM(opt[y])}</b><br/>
          <span style="color:${COLORS.gold}">● Base:</span> <b>${fmtM(base[y])}</b><br/>
          <span style="color:${COLORS.danger}">↓ Pesimista:</span> <b>${fmtM(pes[y])}</b>`;
      }
    },
    legend: {
      show: true, bottom: 4,
      textStyle: { ...TEXTCOLOR, fontSize: 10 },
      icon: 'roundRect', itemWidth: 12
    },
    grid: { top: 14, right: 28, bottom: 48, left: 64, containLabel: false },
    xAxis: {
      type: 'category',
      data: años.map(y => y === 0 ? 'Hoy' : `Año ${y}`),
      axisLabel: { ...TEXTCOLOR, fontSize: 9, interval: 4 },
      axisLine: { lineStyle: { color: COLORS.grayLight } },
      splitLine: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLabel: { formatter: v => fmtM(v), ...TEXTCOLOR, fontSize: 9 },
      splitLine: { lineStyle: { color: COLORS.grayLight, type: 'dashed' } },
      axisLine: { show: false }
    },
    series: [
      {
        name: 'Optimista (25.1%)',
        type: 'line',
        data: opt,
        lineStyle: { color: COLORS.success, width: 1.5, type: 'dashed' },
        symbol: 'none',
        smooth: true,
        areaStyle: { color: { type:'linear', x:0,y:0,x2:0,y2:1, colorStops:[{offset:0,color:'rgba(16,185,129,0.12)'},{offset:1,color:'transparent'}] } }
      },
      {
        name: 'Base (21.1%)',
        type: 'line',
        data: base,
        lineStyle: { color: COLORS.gold, width: 3 },
        symbol: 'circle',
        symbolSize: p => [0, 5, 10, 20, 30].includes(p) ? 8 : 0,
        smooth: true,
        areaStyle: { color: { type:'linear', x:0,y:0,x2:0,y2:1, colorStops:[{offset:0,color:'rgba(197,160,89,0.15)'},{offset:1,color:'transparent'}] } },
        markPoint: {
          data: [{ type:'max', label:{ formatter: p => fmtM(p.value), fontSize:10, fontWeight:700 } }],
          symbolSize: 48,
          itemStyle: { color: COLORS.gold }
        }
      },
      {
        name: 'Pesimista (13.1%)',
        type: 'line',
        data: pes,
        lineStyle: { color: COLORS.danger, width: 1.5, type: 'dashed' },
        symbol: 'none',
        smooth: true
      }
    ],
    animationDuration: 1200
  };
  chart.setOption(option);
  window.addEventListener('resize', () => chart.resize());
  return chart;
}

// ─────────────────────────────────────────────
//  CHART 7: Heatmap de Correlaciones
// ─────────────────────────────────────────────
function initChartCorrelacion(domId) {
  const el = document.getElementById(domId);
  if (!el) return;
  const chart = echarts.init(el, null, { renderer: 'canvas' });

  const tickers = PORTFOLIO.correlacion.tickers;
  const matrix  = PORTFOLIO.correlacion.matrix;

  const data = [];
  for (let i = 0; i < tickers.length; i++) {
    for (let j = 0; j < tickers.length; j++) {
      data.push([j, i, +matrix[i][j].toFixed(3)]);
    }
  }

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      ...TOOLTIP_STYLE,
      formatter: p => `<b>${tickers[p.data[1]]} / ${tickers[p.data[0]]}</b><br/>Correlación: <b style="color:${COLORS.gold}">${p.data[2]}</b>`
    },
    grid: { top: 16, right: 8, bottom: 56, left: 64 },
    xAxis: {
      type: 'category',
      data: tickers,
      axisLabel: { ...TEXTCOLOR, fontSize: 9, fontWeight: 700, rotate: 45 },
      splitArea: { show: true }
    },
    yAxis: {
      type: 'category',
      data: tickers,
      axisLabel: { ...TEXTCOLOR, fontSize: 9, fontWeight: 700 },
      splitArea: { show: true }
    },
    visualMap: {
      min: -1, max: 1,
      calculable: true,
      orient: 'horizontal',
      bottom: 4,
      left: 'center',
      inRange: {
        color: ['#ef4444', '#ffffff', COLORS.blue]
      },
      textStyle: { ...TEXTCOLOR, fontSize: 9 }
    },
    series: [{
      type: 'heatmap',
      data,
      label: {
        show: true,
        formatter: p => p.data[2] === 1 ? '' : p.data[2].toFixed(2),
        fontSize: 8,
        color: p => Math.abs(p.data[2]) > 0.5 ? '#fff' : COLORS.blue
      },
      emphasis: { itemStyle: { shadowBlur: 8, shadowColor: 'rgba(0,0,0,0.2)' } }
    }],
    animationDuration: 800
  };
  chart.setOption(option);
  window.addEventListener('resize', () => chart.resize());
  return chart;
}

// ─────────────────────────────────────────────
//  CHART 8: Executive Summary – Gauge Sharpe
// ─────────────────────────────────────────────
function initChartGauge(domId) {
  const el = document.getElementById(domId);
  if (!el) return;
  const chart = echarts.init(el, null, { renderer: 'canvas' });

  const option = {
    backgroundColor: 'transparent',
    series: [{
      type: 'gauge',
      startAngle: 200,
      endAngle: -20,
      min: 0, max: 3,
      radius: '90%',
      center: ['50%', '58%'],
      splitNumber: 6,
      axisLine: {
        lineStyle: {
          width: 14,
          color: [
            [0.33, '#ef4444'],
            [0.67, '#f59e0b'],
            [1.00, COLORS.success]
          ]
        }
      },
      pointer: {
        icon: 'path://M12.8,0.7l12.3,0c0,0,0,0,0,0 c4.1,0,7.5,3.4,7.5,7.5 c0,3.1-1.9,5.8-4.7,7L7.8,48.4c-0.3,0.1-0.5,0.1-0.7,0.1 c-1.5,0-2.6-1.2-2.6-2.6 c0-0.4,0.1-0.8,0.2-1.1 L7.5,7.7',
        length: '55%',
        width: 5,
        itemStyle: { color: COLORS.blue }
      },
      axisTick: { length: 6, lineStyle: { color: 'auto', width: 1 } },
      splitLine: { length: 10, lineStyle: { color: 'auto', width: 2 } },
      axisLabel: {
        color: COLORS.blue,
        fontSize: 9,
        distance: 20,
        formatter: v => v.toFixed(0)
      },
      anchor: { show: true, showAbove: true, size: 14, itemStyle: { color: COLORS.gold } },
      title: { show: false },
      detail: {
        valueAnimation: true,
        formatter: v => `{value|${v.toFixed(4)}}\n{label|Sharpe Ratio}`,
        rich: {
          value: { fontSize: 22, fontWeight: 800, color: COLORS.goldDark, fontFamily: 'Inter', lineHeight: 28 },
          label: { fontSize: 10, color: COLORS.gray, fontFamily: 'Inter', lineHeight: 16 }
        },
        offsetCenter: [0, '30%']
      },
      data: [{ value: PORTFOLIO.metricas.sharpe }]
    }]
  };
  chart.setOption(option);
  window.addEventListener('resize', () => chart.resize());
  return chart;
}

// ─────────────────────────────────────────────
//  CHART 9: Rendimientos individuales (bar horizontal)
// ─────────────────────────────────────────────
function initChartFundamentals(domId) {
  const el = document.getElementById(domId);
  if (!el) return;
  const chart = echarts.init(el, null, { renderer: 'canvas' });

  const tickData = PORTFOLIO.activos
    .filter(a => a.roa != null)
    .map(a => ({ name: a.ticker, roa: a.roa, roe: a.roe, gm: a.grossMargin, color: a.color }));

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      ...TOOLTIP_STYLE,
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: params => {
        const n = params[0].name;
        const a = PORTFOLIO.activos.find(x => x.ticker === n);
        if (!a) return '';
        return `<b>${n} – ${a.nombre}</b><br/>
          ROA: <b>${a.roa?.toFixed(1) ?? '–'}%</b><br/>
          ROE: <b>${a.roe?.toFixed(1) ?? '–'}%</b><br/>
          Gross Margin: <b>${a.grossMargin?.toFixed(1) ?? '–'}%</b>`;
      }
    },
    legend: {
      show: true, bottom: 4,
      textStyle: { ...TEXTCOLOR, fontSize: 10 },
      icon: 'roundRect', itemWidth: 12
    },
    grid: { top: 10, right: 16, bottom: 48, left: 60 },
    xAxis: {
      type: 'value',
      axisLabel: { formatter: v => v+'%', ...TEXTCOLOR, fontSize: 9 },
      splitLine: { lineStyle: { color: COLORS.grayLight } }
    },
    yAxis: {
      type: 'category',
      data: tickData.map(t => t.name),
      axisLabel: { ...TEXTCOLOR, fontSize: 10, fontWeight: 700 }
    },
    series: [
      {
        name: 'ROE (%)',
        type: 'bar',
        data: tickData.map((t,i) => ({ value: Math.min(t.roe ?? 0, 120), itemStyle:{ color: COLORS.blue, borderRadius:[0,3,3,0] } })),
        barGap: '10%',
        label: { show: false }
      },
      {
        name: 'Gross Margin (%)',
        type: 'bar',
        data: tickData.map(t => ({ value: t.gm ?? 0, itemStyle:{ color: COLORS.gold, borderRadius:[0,3,3,0] } })),
        label: { show: false }
      }
    ],
    animationDelay: i => i * 50
  };
  chart.setOption(option);
  window.addEventListener('resize', () => chart.resize());
  return chart;
}

// ─────────────────────────────────────────────
//  Contador animado
// ─────────────────────────────────────────────
function animateCounter(el, target, duration = 1200, prefix = '', suffix = '', decimals = 0) {
  if (!el) return;
  const start = 0;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = prefix + current.toFixed(decimals) + suffix;
  }, 16);
}

// ─────────────────────────────────────────────
//  Inicializar todos los charts de una slide
// ─────────────────────────────────────────────
const chartRegistry = {};

function initSlideCharts(slideIndex) {
  switch (slideIndex) {
    case 1:   // Executive Summary
      if (!chartRegistry['gauge']) chartRegistry['gauge'] = initChartGauge('chart-gauge');
      break;
    case 5:   // Distribución Sectorial
      if (!chartRegistry['donut'])   chartRegistry['donut']   = initChartSectorDonut('chart-donut');
      if (!chartRegistry['weights']) chartRegistry['weights'] = initChartWeights('chart-weights');
      break;
    case 6:   // Construcción portafolio – fundamentals
      if (!chartRegistry['fundamentals']) chartRegistry['fundamentals'] = initChartFundamentals('chart-fundamentals');
      break;
    case 8:   // Correlación
      if (!chartRegistry['corr']) chartRegistry['corr'] = initChartCorrelacion('chart-corr');
      break;
    case 9:   // Frontera Eficiente
      if (!chartRegistry['frontera']) chartRegistry['frontera'] = initChartFrontera('chart-frontera');
      break;
    case 10:  // Monte Carlo
      if (!chartRegistry['mc']) chartRegistry['mc'] = initChartMonteCarlo('chart-montecarlo');
      break;
    case 11:  // Backtesting
      if (!chartRegistry['bt']) chartRegistry['bt'] = initChartBacktesting('chart-backtesting');
      break;
    case 12:  // Proyección 30 años
      if (!chartRegistry['proj']) chartRegistry['proj'] = initChartProjection('chart-projection');
      break;
  }
}
