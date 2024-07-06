import PDFViewer from 'components/PdfViewer/pdfViewer';
import React from 'react';

import { useParams } from 'react-router-dom';
import './documentView.less';

const DocumentView = () => {
  const { id } = useParams();
  return <>{id && <PDFViewer fileId={id} />}</>;
};

export default DocumentView;
