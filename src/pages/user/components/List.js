import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Avatar } from 'antd'
import { DropOption } from 'components'
import { Trans, withI18n } from '@lingui/react'
import Link from 'umi/link'
import styles from './List.less'

const { confirm } = Modal

@withI18n()
class List extends PureComponent {
  handleMenuClick = (record, e) => {
    const { onDeleteItem, onEditItem, i18n } = this.props

    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: i18n.t`Are you sure delete this record?`,
        onOk() {
          onDeleteItem(record.id)
        },
      })
    }
  }

  showCabangInfo = content => {
    Modal.info({
      title: `BNI ${content.LOCATION}`,
      content: (
        <div>
          <p>Provinsi : {content.PROVINCE}</p>
          <p>Provinsi : {content.PROVINCE}</p>
        </div>
      ),
      onOk() {},
    })
  }

  render() {
    const { onDeleteItem, onEditItem, i18n, ...tableProps } = this.props
    const columns = [
      {
        title: 'Foto',
        dataIndex: 'avatar',
        key: 'avatar',
        width: 72,
        fixed: 'left',
        render: text => <Avatar style={{ marginLeft: 8 }} src={text} />,
      },
      {
        title: 'NPP',
        dataIndex: 'NPP',
        key: 'NPP',
      },
      {
        title: 'Nama JRM',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => <Link to={`user/${record.id}`}>{text}</Link>,
      },
      {
        title: 'Cabang Pemrosesan Kredit',
        dataIndex: 'cabang.LOCATION',
        key: 'cabang',
        render: (text, record) => (
          <span>BNI {text}</span>
        ),
      },
      {
        title: 'Provinsi',
        dataIndex: 'cabang.PROVINCE',
        key: 'cabang',
      },
      {
        title: 'Telepon',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: <Trans>Supervisor</Trans>,
        dataIndex: 'supervisor.Nama',
        key: 'supervisor',
      },
      {
        title: <Trans>Operation</Trans>,
        key: 'operation',
        fixed: 'right',
        render: (text, record) => {
          return (
            <DropOption
              onMenuClick={e => this.handleMenuClick(record, e)}
              menuOptions={[
                { key: '1', name: i18n.t`Update` },
                { key: '2', name: i18n.t`Delete` },
              ]}
            />
          )
        },
      },
    ]

    return (
      <Table
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
          showTotal: total => `Total ${total} JRM`,
        }}
        // dataSource={this.mockUser}
        className={styles.table}
        columns={columns}
        simple
        rowKey={record => record.id}
      />
    )
  }
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
