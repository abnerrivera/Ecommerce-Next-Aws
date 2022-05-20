import React from 'react'

//UI
import { Modal, Icon } from 'semantic-ui-react'

const BasicModal = ({ show, setShow, title, children, ...rest }) => {

  const onClose = () => setShow(false)

  return (

      <Modal open={show} onClose={() => onClose()} {...rest}>

        <Modal.Header className='basicModal'>
          <span>{title}</span>
          <Icon
            style={{ cursor: 'pointer' }}
            name='close'
            onClick={() => onClose()}
          />
        </Modal.Header>


        <Modal.Content>
          {children}
        </Modal.Content>

      </Modal>
  )
}

export default BasicModal