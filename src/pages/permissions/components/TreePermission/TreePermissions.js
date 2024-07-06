import React, { useEffect, useState } from 'react';
import { Button, Tree, Typography } from 'antd';

const TreePermissions = (props) => {
    const [checkedKeys, setCheckedKeys] = useState(props?.checkedData);
    const [expandedKeys, setExpandedKeys] = useState([]);

    const onCheck = (checkedKeys) => {
        props.savePermissionsIntoRole(checkedKeys)
        // setCheckedKeys(checkedKeys);

    };

    const handleExpandAll = () => {
        setExpandedKeys(getAllNodeKeys(props.treeData));
    };

    const handleCollapseAll = () => {
        setExpandedKeys([]);
    };

    const handleNodeExpand = (expandedKeys) => {
        setExpandedKeys(expandedKeys);
    };

    const getAllNodeKeys = (treeData) => {
        return treeData.flatMap((node) => {
            if (node.premissionChildren && node.premissionChildren.length > 0) {
                return [node.id, ...getAllNodeKeys(node.premissionChildren)];
            }
            return node.id;
        });
    };

    useEffect(() => {
        setCheckedKeys(props.checkedData)
    }, [props.checkedData])

    const renderTreeNodes = (data) =>
        data.map((item) => {
            if (item.premissionChildren) {
                return (
                    <Tree.TreeNode
                        key={item.id}
                        title={item.name}
                        selectable={false}
                        checkable
                    >
                        {renderTreeNodes(item.premissionChildren)}
                    </Tree.TreeNode>
                );
            }
            return (
                <Tree.TreeNode
                    key={item.id}
                    title={item.name}
                    selectable={false}
                    checkable
                />
            );
        });

    return (
        <div>
            <div style={{ paddingBottom: '15px', textAlign: 'left' }}>
                <Typography.Title level={4} style={{ paddingBottom: 7 }}>
                    Danh sách quyền
                </Typography.Title>
                <Button style={{ marginRight: '15px' }} type="primary" onClick={() => handleExpandAll()}>Mở tất cả </Button>
                <Button type="primary" onClick={() => handleCollapseAll()}>Đóng tất cả</Button>
            </div>
            <div style={{ maxHeight: 500, overflow: 'auto' }}>
                <Tree
                    expandedKeys={expandedKeys}
                    onExpand={handleNodeExpand}
                    showLine
                    // defaultExpandParent
                    checkable
                    checkedKeys={checkedKeys}
                    onCheck={onCheck}
                >
                    {renderTreeNodes(props.treeData)}
                </Tree>
            </div>
        </div>
    );
};

export default TreePermissions;
