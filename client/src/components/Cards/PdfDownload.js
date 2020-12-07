import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Invoice from './Invoice';

const PdfDownload = ({ order }) => (
  <PDFDownloadLink
    document={<Invoice order={order} />}
    fileName='invoice.pdf'
    className='btn btn-sm btn-primary btn-block btn-raised'
  >
    Download Pdf
  </PDFDownloadLink>
);

export default PdfDownload;
