import React from 'react';
import { useEffect } from 'react';

import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';
import './documentView.less';
import { API_ENDPOINT } from '../../config/env';

const PDFViewer = (props) => {
  const [docs, setDocs] = React.useState(null);

  const reStructId = (id) => {
    let result = id.replaceAll('-', '');
    return result;
  };
  useEffect(() => {
    if (props.fileId) {
      let docs = [
        {
          uri: `${API_ENDPOINT}FileStorage/${reStructId(props.fileId)}.pdf`,
        },
      ];
      setDocs(docs);
    }
  },[]);

  return (
    <div className="pdf-viewer">
      {docs !== null && (
        <DocViewer
          pluginRenderers={DocViewerRenderers}
          documents={docs}
          config={{
            header: {
              disableHeader: true,
              disableFileName: false,
              retainURLParams: true,
            },
          }}
          style={{ height: '100%' }}
        />
      )}
    </div>
  );
};

export default PDFViewer;
