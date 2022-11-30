import React from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon,
    MDBCheckbox
}
    from 'mdb-react-ui-kit';
import './Login.css';

function Login() {
    return (
        <MDBContainer fluid>

            <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                <MDBCol col='12'>

                    <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
                        <MDBCardBody className='p-5 w-100 d-flex flex-column'>

                            <h2 className="fw-bold mb-2 text-center">Sign in</h2>
                            <p className="text-white-50 mb-3">Please enter your login and password!</p>

                            <MDBInput wrapperClass='mb-4 w-100' placeholder="이메일 주소를 입력해주세요." label='Email address' id='formControlLg' type='email' size="lg"/>
                            <MDBInput wrapperClass='mb-4 w-100' placeholder="비밀번호를 입력해주세요." label='Password' id='formControlLg' type='password' size="lg"/>

                            <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' />

                            <MDBBtn size='lg' style={{ backgroundColor: '#26B7E6' }}>
                                Login
                            </MDBBtn>

                            <hr className="my-4" />

                            <div className="find-btn">
                                <MDBBtn className='me-1' style={{ backgroundColor: '#26B7E6' }}>
                                    회원가입
                                </MDBBtn>
                                <MDBBtn className='me-1' color='secondary'>
                                    패스워드 찾기
                                </MDBBtn>
                                {/*<MDBBtn className='mx-2' color='tertiary' rippleColor='light'>*/}
                                {/*    Tertiary*/}
                                {/*</MDBBtn>*/}
                            </div>

                        </MDBCardBody>
                    </MDBCard>

                </MDBCol>
            </MDBRow>

        </MDBContainer>
    );
}

export default Login;
