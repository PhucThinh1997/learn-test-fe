import { message } from 'antd';
import { useCallback, useState } from 'react';
import { createDegree } from 'services/degree';

export const useDegree = (callback) => {
  const [status, setStatus] = useState('idle');

  const updateDegreeData = useCallback(async (id, values) => {
    try {
      setStatus('loading');
      const result = await createDegree(values);
      if (result?.isSuccess) {
        setStatus('success');
        callback && callback();
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { updateDegreeData, status };
};

export const setDataNew = (list, values) => [...list, values];

export const setDataEdit = (list, values, index) => {
  const newList = [...list];
  newList.splice(index, 1, values);
  return newList;
};
