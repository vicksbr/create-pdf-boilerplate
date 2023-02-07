import React from "react";
import {
  Document,
  Font,
  Page,
  Text,
  Image,
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
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Oswald",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: "Oswald",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  image: {
    flexBasis: "48%",
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
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "grey",
    padding: "10px",
    flexBasis: "48%",
  },
  chartContainer: {
    padding: "10px",
    flexBasis: "48%",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

});

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const Subtitle = ({ children, ...props }) => (
  <Text style={styles.subtitle} {...props}>
    {children}
  </Text>
);

const mockedData = {
  geral: {
    logo: "Gorila",
    nome: "Nome escritório",
    periodo: {
      start: "07/10/2021",
      end: "15/08/2022",
    },
  },
  resumo: {
    patrimonio: "1147778.95",
    ganho_perda: "+1368.5",
    rentabilidade: "6.92",
    volatibilidade: "20.27%",
    sharpe: "0.01",
  },
  eventosCarteira: {
    divididendos: "R$8.062,31",
    rendimentos: "60,04",
    bonificacoes: "-",
    juros: "",
    amortizacoes: "1051,57",
    total: "9173.92",
  },
  alocaçãoPatrimonial: {
    rendaVariavel: "41%",
    rendaFixa: "23%",
    multiMercado: "18%",
    moedas: "11%",
    exterior: "8%",
  },
  evoluçãoPatrimonial: {},
  resultadoFinanceiroRentabilidade: {},
  rendaBrutaAcumulada: {},
  alocacaoPorCustodia: {},
  atribuicaoResultado: {},
  acumuladoPorProduto: {},
};

const CardResume = ({ data }) => {
  return (
    <View style={styles.card}>
      <Text>Resumo</Text>
      <Text>{`Patrimônio Bruto ${data.patrimonio}`}</Text>
      <Text>{`Ganho/Perda no período ${data.ganho_perda}`}</Text>
      <Text>{`Rentabilidade no período ${data.rentabilidade}`}</Text>
      <Text>{`Volatilidade ${data.volatibilidade}`}</Text>
      <Text>{`Sharpe ${data.sharpe}`}</Text>
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

const PdfDocumentChart = ({ chartDataURL }) => {
  return (
    <Document>
      <Page size="A4" style={styles.body} wrap orientation="landscape">
        <Header />
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />

        <View style={styles.cardContainer}>
          <CardResume data={mockedData.resumo} />
          <CardResume data={mockedData.resumo} />
        </View>

        <View
          style={{ display: "flex", flexDirection: "row", padding: "10px" }}
        >
          <Image
            style={styles.image}
            src={chartDataURL}
            allowDangerousPaths="true"
          />
          <Image
            style={styles.image}
            src={chartDataURL}
            allowDangerousPaths="true"
          />
        </View>

        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          sagittis dictum lectus, quis consequat turpis maximus ut. Fusce vitae
          rhoncus neque. Nullam at molestie purus, non sodales metus. Integer
          lacinia, quam et aliquam tempor, purus odio auctor ipsum, sit amet
          vestibulum leo enim et mauris. Phasellus pretium tincidunt gravida.
          Donec velit nibh, lacinia eget ullamcorper in, suscipit vel dolor.
          Curabitur pulvinar ante elementum tellus luctus malesuada. Vestibulum
          ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
          curae; Sed nec lectus venenatis massa suscipit tincidunt et et nibh.
          Sed venenatis efficitur sollicitudin. Sed varius aliquam ante, a
          ullamcorper nunc pellentesque et. Cras scelerisque eleifend cursus.
          Aliquam erat volutpat.
        </Text>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          sagittis dictum lectus, quis consequat turpis maximus ut. Fusce vitae
          rhoncus neque. Nullam at molestie purus, non sodales metus. Integer
          lacinia, quam et aliquam tempor, purus odio auctor ipsum, sit amet
          vestibulum leo enim et mauris. Phasellus pretium tincidunt gravida.
          Donec velit nibh, lacinia eget ullamcorper in, suscipit vel dolor.
          Curabitur pulvinar ante elementum tellus luctus malesuada. Vestibulum
          ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
          curae; Sed nec lectus venenatis massa suscipit tincidunt et et nibh.
          Sed venenatis efficitur sollicitudin. Sed varius aliquam ante, a
          ullamcorper nunc pellentesque et. Cras scelerisque eleifend cursus.
          Aliquam erat volutpat.
        </Text>
      </Page>
    </Document>
  );
};

const PdfDocument = () => {
  return (
    <Document>
      <Page size="A4" style={styles.body} wrap orientation="landscape">
        <Header />
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />

        <View style={styles.cardContainer}>
          <CardResume data={mockedData.resumo} />
          <CardResume data={mockedData.resumo} />
        </View>

        <View
          style={{ display: "flex", flexDirection: "row", padding: "10px" }}
        >
        </View>

        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          sagittis dictum lectus, quis consequat turpis maximus ut. Fusce vitae
          rhoncus neque. Nullam at molestie purus, non sodales metus. Integer
          lacinia, quam et aliquam tempor, purus odio auctor ipsum, sit amet
          vestibulum leo enim et mauris. Phasellus pretium tincidunt gravida.
          Donec velit nibh, lacinia eget ullamcorper in, suscipit vel dolor.
          Curabitur pulvinar ante elementum tellus luctus malesuada. Vestibulum
          ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
          curae; Sed nec lectus venenatis massa suscipit tincidunt et et nibh.
          Sed venenatis efficitur sollicitudin. Sed varius aliquam ante, a
          ullamcorper nunc pellentesque et. Cras scelerisque eleifend cursus.
          Aliquam erat volutpat.
        </Text>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          sagittis dictum lectus, quis consequat turpis maximus ut. Fusce vitae
          rhoncus neque. Nullam at molestie purus, non sodales metus. Integer
          lacinia, quam et aliquam tempor, purus odio auctor ipsum, sit amet
          vestibulum leo enim et mauris. Phasellus pretium tincidunt gravida.
          Donec velit nibh, lacinia eget ullamcorper in, suscipit vel dolor.
          Curabitur pulvinar ante elementum tellus luctus malesuada. Vestibulum
          ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
          curae; Sed nec lectus venenatis massa suscipit tincidunt et et nibh.
          Sed venenatis efficitur sollicitudin. Sed varius aliquam ante, a
          ullamcorper nunc pellentesque et. Cras scelerisque eleifend cursus.
          Aliquam erat volutpat.
        </Text>
      </Page>
    </Document>
  );
};


const GorilaReportChart = ({ chartDataURL }) => {
  return <PdfDocument chartDataURL={chartDataURL} />;
};

const GorilaReport = () => {
  return <PdfDocument />;
};


const PDF = () => (
  <div>
    <PDFViewer
      style={{ position: "absolute", border: 0, height: "100%", width: "100%" }}
    >
      <GorilaReport />
    </PDFViewer>
  </div>
);

export default React.memo(PDF, () => {
  return false;
});
