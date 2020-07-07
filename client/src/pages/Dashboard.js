import React, { useState } from 'react';
import MaterialIcon from 'material-icons-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row } from 'reactstrap';
import { Redirect } from 'react-router-dom';

import PageTitle from '../components/Layout/PageTitle';
import AlbumList from '../components/Album/AlbumList';
import AddAlbumForm from '../components/Album/AddAlbumForm';
import AddAlbumModal from '../components/Album/AddAlbumModal';
import ModalButton from '../components/Buttons/ModalButton';
import AlertDiv from '../components/Layout/AlertDiv';
import '../App.css';

const Dashboard = ({ isAuth, auth }) => {
     const addIcon = <MaterialIcon icon='add' color='#252525' size='large' />;

     const [modal, setModal] = useState(false);

     const toggle = () => {
          setModal(!modal);
     };

     return auth.isLoading ? (
          <h1>Loading your memories</h1>
     ) : !isAuth ? (
          <Redirect to='/' />
     ) : (
          <>
               <Container fluid={true}>
                    <PageTitle>
                         Welcome to your memory albums, {auth.user.firstName}{' '}
                         {auth.user.lastName}
                    </PageTitle>
                    <AlertDiv />
                    {/* {isOpen ? null : } */}
               </Container>
               <Row>
                    <AlbumList />
               </Row>

               <AddAlbumModal toggle={toggle} isOpen={modal}>
                    <AddAlbumForm toggle={toggle} />
               </AddAlbumModal>
               <div className='buttonContainer'>
                    <ModalButton
                         className='albumButton modalButton'
                         action={addIcon}
                         onClick={toggle}
                         style={{ padding: '15px' }}
                    />
               </div>
          </>
     );
};

AddAlbumForm.propTypes = {
     isAuth: PropTypes.bool.isRequired,
     auth: PropTypes.object.isRequired,
};

Container.propTypes = {
     fluid: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

const mapStateToProps = (state) => ({
     isAuth: state.auth.isAuthenticated,
     auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);
