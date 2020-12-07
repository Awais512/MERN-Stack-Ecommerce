import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  PDFViewer,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const PdfDownload = ({ order }) => (
  <PDFDownloadLink
    document={
      <Document>
        <Page size='A4'>
          <View>
            <Text>Section #1</Text>
          </View>
          <View>
            <Text>Section #2</Text>
          </View>
        </Page>
      </Document>
    }
    fileName='invoice.pdf'
    className='btn btn-sm btn-primary btn-block btn-raised'
  >
    Download Pdf
  </PDFDownloadLink>
);

export default PdfDownload;
