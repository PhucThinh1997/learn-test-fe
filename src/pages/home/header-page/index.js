import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Input, Button, Typography } from 'antd';
import { PlusCircleOutlined, BarsOutlined, FilterOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonDelete, PrimaryButton } from 'common/components/Buttons';

import * as gridViewSelectors from 'components/Grid/controllers/selectors';
import { updateSearch } from 'redux/global/actions';
import './header.less';

const { Search } = Input;

const HeaderPage = ({
  title = '',
  actions = 'default',
  onCreate,
  handleDelete,
  labelPrimaryBtn = "",
  onPressPrimaryBtn = () => { },
  isFilter = false,
  onFilter,
  isHideAction = false,
  isShowActionDelete = true,
  isShowActionAdd = true,
}) => {
  const dispatch = useDispatch();
  const itemSelections = useSelector(gridViewSelectors.selectGridIdSelections());

  const onSearch = (text) => {
    dispatch(updateSearch(text));
  };


  return (
    <div className="header-page">
      <Row className="wrapper" justify="space-around" align="center">
        <Col className="header-page__title">
          <Typography.Title level={3}>{title}</Typography.Title>
        </Col>
        <Col flex={1} style={{ textAlign: 'right' }}>
          {actions === 'default' ? (
            <Row
              style={{
                display: 'flex',
                flexWrap: 'nowrap',
                gap: '16px',
                justifyContent: 'end',
              }}
            >
              <Search className="header-page__search" placeholder="Tìm kiếm..." onSearch={onSearch} enterButton />
              {isFilter &&
                (<Button type="primary" onClick={() => onFilter()} icon={<FilterOutlined />}>
                </Button>)
              }
              {isHideAction === false && (
                <>
                  {isShowActionAdd && (
                    <Button type="primary" onClick={() => onCreate()} icon={<PlusCircleOutlined />}>
                      Thêm mới
                    </Button>
                  )}
                  {!!labelPrimaryBtn && <PrimaryButton size="medium" icon={<BarsOutlined />} onClick={onPressPrimaryBtn}>
                    {labelPrimaryBtn}
                  </PrimaryButton>}
                  {isShowActionDelete && (
                    <ButtonDelete
                      size="medium"
                      onClick={() => handleDelete && handleDelete(itemSelections)}
                      disabled={!itemSelections.length}
                    >
                      Xóa
                    </ButtonDelete>
                  )}
                </>
              )}
            </Row>
          ) : typeof actions === 'function' ? (
            actions()
          ) : null}
        </Col>
      </Row>
    </div>
  );
};

HeaderPage.propTypes = {
  title: PropTypes.string,
  actions: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.bool]),
  onCreate: PropTypes.func,
  handleDelete: PropTypes.func,
  labelPrimaryBtn: PropTypes.string,
  onPressPrimaryBtn: PropTypes.func,
};

export default HeaderPage;
