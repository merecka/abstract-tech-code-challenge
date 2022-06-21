import React from 'react';
import {
  Card,
  CardAction,
  CardList,
  CardTable,
  CardText,
  ChartArea,
  ChartBar,
  ChartLine,
  ChartPie,
  Dashboard,
  Form,
  FormInline,
  Gauge,
  Kpi,
  KpiRow,
  ListPage,
  SectionHeader,
  Table
} from './components';

export default {
  form: (conf) => {
    const { rows = 10, rowHeight = 48, } = conf;
    return {
      width: 1600,
      height: (rows * rowHeight) + 70,
      rowHeight,
      rows,
      render: Form
    };
  },
  card: { component: ( <Card /> ), width: 388, height: 216 },
  cardAction: { component: ( <CardAction /> ), width: 388, height: 216 },
  cardList: { component: ( <CardList /> ), width: 388, height: 216 },
  cardTable: { component: ( <CardTable /> ), width: 388, height: 216 },
  cardText: { component: ( <CardText /> ), width: 388, height: 216 },
  chartArea: { component: ( <ChartArea /> ), width: 1196, height: 332 },
  chartBar: { component: ( <ChartBar /> ), width: 1196, height: 332 },
  chartLine: { component: ( <ChartLine /> ), width: 1196, height: 332 },
  chartPie: { component: ( <ChartPie /> ), width: 388, height: 332 },
  dashboard: { component: ( <Dashboard /> ), width: 1600, height: 1400 },
  formInline: { component: ( <FormInline /> ), width: 1600, height: 84, },
  gauge: { component: ( <Gauge /> ), width: 388, height: 216 },
  kpi: { component: ( <Kpi /> ), width: 388, height: 216 },
  kpiRow: { component: ( <KpiRow /> ), width: 1600, height: 216 },
  listPage: { component: ( <ListPage /> ), width: 1600, height: 600 },
  sectionHeader: { component: ( <SectionHeader /> ), width: 1600, height: 66 },
  table: (conf) => {
    const { rows = 10, rowHeight = 36, } = conf;
    return {
      width: 1600,
      height: 86 + (rowHeight * rows),
      rowHeight,
      rows,
      render: Table
    };
  },
};
