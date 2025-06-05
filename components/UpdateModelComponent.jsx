import React, { useState } from 'react';
import {
  Modal,
  Button,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Row,
  Col,
} from 'react-bootstrap';
import PostService from '../services/postService';

function UpdateModelComponent(props) {
  const [isShow, invokeModel] = useState(false);

  const initModel = () => {
    return invokeModel(!isShow);
  };

  //form updation data
  const [title, setTitle] = useState(props.title);
  const [date, setDate] = useState(props.date);
  const [id, setId] = useState(props.id);
  const [selectedFile, setSelectedFile] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();


    formData.append('id', id);
    formData.append('title', title);
    formData.append('date', date);

    if(selectedFile !== ''  && selectedFile.length !== 0){
            formData.append('image', selectedFile); 
    }

    const response =  await PostService.update(formData);
    if(response.data.success === true){
    alert(response.data.message);
    }
    else{
        alert(response.data.message);
    }
    initModel();
  };
  return (
    <>
      <Button variant='success' onClick={initModel}>
        Edit
      </Button>

      <Modal show={isShow}>
        <ModalHeader closeButton onClick={initModel}>
          Edit Data PopUp
        </ModalHeader>
          <form onSubmit={handleSubmit}>
        <ModalBody>
            <Row>
              <Col lg={12}>
                <div>
                  <label htmlFor=''>Title</label>
                  <input
                    name='title'
                    type='text'
                    className='form-control'
                    placeholder='Enter Title'
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    required
                  />
                </div>
              </Col>
              <Col lg={12}>
                <div>
                  <label htmlFor=''>Date</label>
                  <input
                    name='date'
                    type='date'
                    className='form-control'
                    placeholder='Enter Date'
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    required
                  />
                </div>
              </Col>
              <Col lg={12}>
                <div>
                  <label htmlFor=''>Image</label>
                  <input
                    name='file'
                    type='file'
                    className='form-control'
                    onChange={(event) => setSelectedFile(event.target.files[0])}
                  />
                </div>
              </Col>
            </Row>
        </ModalBody>
        <ModalFooter>
          <Button variant='danger' onClick={initModel}>
            Close
          </Button>
          <Button type='submit' variant='dark'>
            Update
          </Button>
        </ModalFooter>
          </form>
      </Modal>

      {/* <Model show={isShow}>
       
        <Modal.Header closeButton onClick={initModel}>
          <Model.Title>Update Post</Model.Title>
        </Modal.Header>

       <Model.Body>
           This is my react bootstap Model
       </Model.Body>

        <Model.Footer>
          <Button variant='danger' onClick={initModel}>
            Close
          </Button>
          <Button variant='dark' onClick={initModel}>
            Update
          </Button>
        </Model.Footer>
      </Model> */}
    </>
  );
}

export default UpdateModelComponent;
