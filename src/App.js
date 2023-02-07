import React from "react";
import {
  Document,
  Font,
  Page,
  Text,
  StyleSheet,
  PDFViewer,
  View,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  container: {
    flexDirection: "row",
    borderBottomColor: "#EDEFF5",
    backgroundColor: "#EDEFF5",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    textAlign: "center",
    fontStyle: "bold",
    flexGrow: 1,
    color: '#4A4C52',
    fontSize: '14px',
  },
  footer: { 
    flexDirection: "row",
    borderBottomColor: "#EDEFF5",
    backgroundColor: "#EDEFF5",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    textAlign: "center",
    fontStyle: "bold",
    flexGrow: 1,
    fontSize: '12px',
  },
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#EDEFF5",
  },
  row: {
    flexDirection: "row",
    borderBottomColor: "#EDEFF5",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontSize: '10px',
    fontStyle: "bold",
  },
  broker: {
    width: "40%",
    textAlign: "left",
    borderRightColor: "#EDEFF5",
    borderRightWidth: 1,
    paddingLeft: 8,
  },
  total: {
    width: "30%",
    borderRightColor: "#EDEFF5",
    borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8,
  },
  walletPerc: {
    width: "15%",
    borderRightColor: "#EDEFF5",
    borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8,
  },
  rentabilityPerc: {
    width: "15%",
    textAlign: "right",
    paddingRight: 8,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

Font.register({
  family: "Noto Sans",
  src: "https://fonts.googleapis.com/css2?family=Noto+Sans:wght@100;300;400;700&display=swap"
});

const tableData = {
  items: [
    {
      broker: "ITAU CORRETORA DE VALORES",
      total: "R$ 72.782,56",
      walletPerc: "63,40%",
      rentabilityPerc: "4,29%",
    },
    {
      broker: "BINANCE BRASIL",
      total: "R$ 12.265,40",
      walletPerc: "10,70%",
      rentabilityPerc: "1,26%",
    },
    {
      broker: "NU INVEST",
      total: "R$ 10.893,90",
      walletPerc: "9,40%",
      rentabilityPerc: "-0,99%",
    },
    {
      broker: "BTG PACTUAL ECON",
      total: "R$ 10.017,84",
      walletPerc: "8,70%",
      rentabilityPerc: "1.79%",
    },
    {
      broker: "AVENUE",
      total: "R$ 8.819,80",
      walletPerc: "7,80%",
      rentabilityPerc: "0,57%",
    },
  ],
  resume: {
    broker: "Total",
    total: "R$ 114.778,95",
    walletPerc: "100%",
    rentabilityPerc: "6,72%",
  },
};

const TableHeader = () => (
  <View style={styles.container}>
    <Text style={styles.broker}>Corretoras</Text>
    <Text style={styles.total}>Total</Text>
    <Text style={styles.walletPerc}>% carteira</Text>
    <Text style={styles.rentabilityPerc}>Rent. %</Text>
  </View>
);

const TableRow = ({ items }) => {
  const rows = items.map((item) => (
    <View style={styles.row} key={item.broker}>
      <Text style={styles.broker}>{item.broker}</Text>
      <Text style={styles.total}>{item.total}</Text>
      <Text style={styles.walletPerc}>{item.walletPerc}</Text>
      <Text style={styles.rentabilityPerc}>{item.rentabilityPerc}</Text>
    </View>
  ));
  return <>{rows}</>;
};

const TableFooterRow = ({ data }) => (
    <View style={styles.footer} key={data.broker}>
      <Text style={styles.broker}>{data.broker}</Text>
      <Text style={styles.total}>{data.total}</Text>
      <Text style={styles.walletPerc}>{data.walletPerc}</Text>
      <Text style={styles.rentabilityPerc}>{data.rentabilityPerc}</Text>
    </View>
);



const AlocationTable = ({ data }) => {
  return (
    <View style={styles.tableContainer}>
      <TableHeader />
      <TableRow items={data.items} />
      <TableFooterRow data={data.resume} />
    </View>
  );
};

const Header = () => (
  <View style={styles.header} fixed>
    <Text>Gorila</Text>
    <Text>Empresa</Text>
    <Text>Periodo xx/xx/2022 - yy/yy/2022 </Text>
  </View>
);

const PdfDocument = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.body} wrap orientation="landscape">
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
        <Header />
        <AlocationTable data={data} />
      </Page>
    </Document>
  );
};

const PDF = () => (
  <div>
    <PDFViewer
      style={{ position: "absolute", border: 0, height: "100%", width: "100%" }}
    >
      <PdfDocument data={tableData} />
    </PDFViewer>
  </div>
);

export default React.memo(PDF, () => {
  return false;
});
