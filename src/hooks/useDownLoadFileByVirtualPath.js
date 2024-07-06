import { useState, useCallback } from 'react';
import { API_ENDPOINT } from 'config/env';

export const useDownloadFileByVirtualPath = (servicesFunc) => {
  const [isLoading, setLoading] = useState(false);

  const getFile = (file) => `${API_ENDPOINT}api/Asset/DownloadFile/${file}`;

  const getVirtualPath = useCallback(async () => {
    try {
      if (!servicesFunc || typeof servicesFunc !== 'function') return;

      setLoading(true);
      const result = await servicesFunc();

      if (result.isSuccess) {
        return getFile(encodeURI(result?.data?.virtualPath));
      } else {
        return null;
      }
    } catch (err) {
      return null;
    } finally {
      setLoading(false);
    }
  }, [servicesFunc]);

  const handleGetFile = useCallback(async () => {
    const file = await getVirtualPath();
    return file;
  }, [getVirtualPath]);

  return { handleGetFile, isLoading };
};
