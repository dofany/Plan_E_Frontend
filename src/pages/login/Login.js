import React, {useState} from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox
}
    from 'mdb-react-ui-kit';
import './Login.css';
import axios from "axios";
import Loading from "../../common/component/Loading/Loading";
import Timer from "../../common/component/date/Timer";
import ModalPop from "../../common/component/modal/ModalPop";

/**
 * 로그인 기능
 * @returns {JSX.Element}
 * @constructor
 */
function Login() {
    const loginForm = {
        inputEmail: '',
        inputPw: '',
        userNm: '',
        userPw: '',
        userEmail: '',
        userPwCheck: '',
        checkNumber: ''
    };


    /**
     * 모달 처리 샘플
     * @type {{callback: null, text: string, title: string, open: boolean}}
     */
    const modalForm = {
        title: '',
        text: '',
        open: false,
        callback: null
    };
    const [modalFormState, setModalFormState] = useState(modalForm);

    // 모달 호출 함수 샘플
    function modalOpen(title, text, callback) {
        setModalFormState({
            ...modalFormState,
            title: title,
            text: text,
            open: true,
            callback: callback
        });

        // setModalFormState(modalForm);
    }


    // 로그인 입력값
    const [loginInputValue, setLoginInputValue] = useState(loginForm);
    // 회원가입 입력값
    const [singUpInputValue, setSignUpInputValue] = useState(loginForm);

    // 로딩바 표시 상태값
    const [loading, setLoading] = useState(false);

    // 회원가입 버튼 상태값
    const [signUpClickEv, setSignUpClickEv] = useState(false);
    const [checkNumberBox, setCheckNumberBox] = useState(false);

    // 패스워드 찾기_패스워드 변경 상태값
    const [changePwClickEv, setChangePwClickEv] = useState(false);



    // 입력 Form 초기화
    const formInit = () => {
        setLoginInputValue(loginForm);
        setSignUpInputValue(loginForm);
    }

    const stateInit = () => {
        setModalFormState(modalForm);
        setSignUpClickEv(false);
        setChangePwClickEv(false);
        setCheckNumberBox(false);
    }

    // 로그인 입력값 변경 감지
    const handleLoginInputValue = (e) => {
        setLoginInputValue({
            ...loginInputValue,
            [e.target.name]: e.target.value
        });
    }

    // 회원가입 입력값 변경 감지
    const handleSignUpInputValue = (e) => {
        setSignUpInputValue({
            ...singUpInputValue,
            [e.target.name]: e.target.value
        });
    }

    // 로그인 버튼 클릭 이벤트
    const loginClick = () => {
        console.log(loginInputValue);
        const headers = {
            'Content-Type' : 'application/json'
        }
        // setShowLoading(true);
        setLoading(true);
        axios.post('/api/user/login', {
                'userId': loginInputValue.inputEmail,
                'userPw': loginInputValue.inputPw
            },
            {
            headers: headers
            }
        )
        .then(res => {
            // setShowLoading(false);

            // setLoading(false);
            // if(res.data.userId === undefined){
            //     // id 일치하지 않는 경우 userId = undefined, msg = '입력하신 id 가 일치하지 않습니다.'
            //     console.log('======================',res.data.msg)
            //     alert('입력하신 id 가 일치하지 않습니다.')
            // } else if(res.data.userId === null){
            //     // id는 있지만, pw 는 다른 경우 userId = null , msg = undefined
            //     console.log('======================','입력하신 비밀번호 가 일치하지 않습니다.')
            //     alert('입력하신 비밀번호 가 일치하지 않습니다.')
            // } else if(res.data.userId === inputId) {
            //     // id, pw 모두 일치 userId = userId1, msg = undefined
            //     console.log('======================','로그인 성공')
            //     sessionStorage.setItem('user_id', inputId)
            // }
            // 작업 완료 되면 페이지 이동(새로고침)
            setLoading(false);
            if (res.data === 'Y') {
                document.location.href = '/main'
            }
        })
        .catch()

        // document.location.href = '/'

    }

    // 회원가입 버튼 클릭
    const signUpClick = () => {
        setSignUpClickEv(true);
    }


    // 가입신청 버튼 클릭
    const requestSignUp = () => {

        if(singUpInputValue.userNm === '') {
            modalOpen("주의", "이름을 입력해주세요.")
            return;
        }

        if(singUpInputValue.userEmail === '') {
            alert('이메일 주소를 입력해주세요.');
            return;
        }

        if(singUpInputValue.userPw === '') {
            alert('비밀번호를 입력해주세요.')
            return;
        }

        if(singUpInputValue.userPwCheck === '') {
            alert('비밀번호 확인란을 입력해주세요.')
        }

        if(singUpInputValue.userPw !== singUpInputValue.userPwCheck) {
            alert('비밀번호가 일치하지 않습니다.');
        }

        const headers = {
            'Content-Type' : 'application/json'
        }
        // setShowLoading(true);
        setLoading(true);
        axios.post('/api/user/signUp', {
                'userEmail': singUpInputValue.userEmail,
                'userNm' : singUpInputValue.userNm
            },
            {
                headers: headers
            }
        )
            .then(res => {
                setLoading(false);
                if (res.data) {
                    setCheckNumberBox(true);
                }
            })
            .catch()
    }

    // 회원가입 인증번호 확인 요청
    const requestSignUpCheck = () => {
        alert('인증키 입력값 : ' + singUpInputValue.checkNumber);
        // 요청 서비스 call

    }

    // 패스워드 찾기 버튼 클릭
    const changePw = () => {
        setChangePwClickEv(true);
        setSignUpClickEv(false);
    }

    const requestChangePw = () => {

    }


    // 이전 버튼
    const cancelClick = () => {
        modalOpen("주의", "이전으로 돌아가면 작업 내용이 삭제됩니다.",(data) => {
            // 창을 닫을때("OK")
            if(data) {
                // 모든 state, form 초기화
                stateInit();
                formInit();
            }
            // 창을 닫을때("취소")
            else {
                // 모달 비활성
                setModalFormState(modalForm);
                return;
            }
        });

    }



    return (
        <MDBContainer fluid>
            {/*모달 호출 샘플*/}
            { modalFormState.open ? <ModalPop modalForm = {modalFormState}/> : null}

            {/*로딩바 호출 샘플*/}
            <div>
                {loading ? <Loading /> : null}
            </div>

            <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                <MDBCol col='12'>

                    <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>

                        {/*------------ 로그인 입력 form start------------*/}
                        { signUpClickEv || changePwClickEv ? null :
                            <MDBCardBody className='p-5 w-100 d-flex flex-column'>
                                <h2 className="fw-bold mb-2 text-center">Sign in</h2>
                                {/*<p>Please enter your login and password!</p>*/}

                                <MDBInput wrapperClass='mb-4 w-100'
                                          placeholder="이메일 주소를 입력해주세요."
                                          label='Email address'
                                          id='formControlEmail'
                                          type='email'
                                          size="lg"
                                          name='inputEmail'
                                          value={ loginInputValue.inputEmail }
                                          onChange={ handleLoginInputValue }
                                          />

                                <MDBInput wrapperClass='mb-4 w-100'
                                          placeholder="비밀번호를 입력해주세요."
                                          label='Password'
                                          id='formControlPw'
                                          type='password'
                                          size="lg"
                                          name='inputPw'
                                          value={ loginInputValue.inputPw }
                                          onChange={ handleLoginInputValue }
                                          required/>

                                <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4'
                                             label='Remember password'/>

                                <MDBBtn size='lg'
                                        style={{ backgroundColor: '#26B7E6' }}
                                        onClick={ loginClick }>
                                    Login
                                </MDBBtn>


                                <hr className="my-4"/>

                                <div className="find-btn">
                                    <MDBBtn className='me-1'
                                            style={{ backgroundColor: '#26B7E6' }}
                                            onClick={ signUpClick }>
                                        회원가입
                                    </MDBBtn>

                                    <MDBBtn className='me-1'
                                            color='secondary'
                                            onClick={ changePw }>
                                        패스워드 찾기
                                    </MDBBtn>
                                    {/*<MDBBtn className='mx-2' color='tertiary' rippleColor='light'>*/}
                                    {/*    Tertiary*/}
                                    {/*</MDBBtn>*/}
                                </div>
                            </MDBCardBody>
                        }
                        {/*------------ 로그인 입력 form end------------*/}

                        {/*------------ 회원가입 입력 form start------------*/}
                        { signUpClickEv ?
                            <MDBCardBody className='p-5 w-100 d-flex flex-column'>
                                <h2 className="fw-bold mb-2 text-center">Sign Up</h2>

                                <MDBInput wrapperClass='mb-4 w-100'
                                          placeholder="이름을 입력해주세요."
                                          label='Name'
                                          id='formControlUserNm'
                                          type='name'
                                          size="lg"
                                          name='userNm'
                                          value={ singUpInputValue.userNm }
                                          onChange={ handleSignUpInputValue }
                                          disabled={ checkNumberBox }
                                          required/>

                                <MDBInput wrapperClass='mb-4 w-100'
                                          placeholder="아이디로 사용할 이메일 주소를 입력해주세요."
                                          label='Email'
                                          id='formControlUserEmail'
                                          type='email'
                                          size="lg"
                                          name='userEmail'
                                          value={ singUpInputValue.userEmail }
                                          onChange={ handleSignUpInputValue }
                                          disabled={ checkNumberBox }
                                          required/>

                                <MDBInput wrapperClass='mb-4 w-100'
                                          placeholder="비밀번호를 입력해주세요."
                                          label='비밀번호'
                                          id='formControlUserPw'
                                          type='password'
                                          size="lg"
                                          name='userPw'
                                          value={ singUpInputValue.userPw }
                                          onChange={ handleSignUpInputValue }
                                          disabled={ checkNumberBox }
                                          required/>

                                <MDBInput wrapperClass='mb-4 w-100'
                                          placeholder="비밀번호 확인"
                                          label='비밀번호 확인'
                                          id='formControlUserPwCheck'
                                          type='password'
                                          size="lg"
                                          name='userPwCheck'
                                          value={ singUpInputValue.userPwCheck }
                                          onChange={ handleSignUpInputValue }
                                          disabled={ checkNumberBox }
                                          required/>


                                { checkNumberBox ?
                                    <MDBCol size="auto">
                                      <span id='textExample2' className='form-text'>
                                        <Timer min={5}/>
                                      </span>
                                    </MDBCol>
                                : null}

                                { checkNumberBox ?
                                    <MDBInput wrapperClass='mb-4 w-100'
                                              placeholder="6자리 인증키를 입력해주세요"
                                              label='인증키'
                                              id='formControlCheckNumber'
                                              type='text'
                                              size="lg"
                                              maxLength="6"
                                              name='checkNumber'
                                              value={ singUpInputValue.checkNumber }
                                              onChange={ handleSignUpInputValue }
                                              autoFocus={true}
                                              required>
                                    </MDBInput>
                                    : null }


                                { checkNumberBox ?
                                    <MDBBtn size='lg'
                                            style={{ backgroundColor: '#26B7E6' }}
                                            onClick={ requestSignUpCheck }>
                                        인증확인
                                    </MDBBtn> :
                                    <MDBBtn size='lg'
                                        style={{ backgroundColor: '#26B7E6' }}
                                        onClick={ requestSignUp }>
                                        가입신청
                                    </MDBBtn>}

                                <hr className="my-4"/>

                                <div className="find-btn">
                                    <MDBBtn className='me-1'
                                            // style={{ backgroundColor: '#26B7E6' }}
                                            color="secondary"
                                            onClick={ cancelClick }>
                                        이전으로
                                    </MDBBtn>
                                </div>

                            </MDBCardBody> : null
                        }
                        {/*------------ 회원가입 입력 form end------------*/}


                        {/*------------ 패스워드 찾기 입력 form start------------*/}
                        { changePwClickEv ?
                            <MDBCardBody className='p-5 w-100 d-flex flex-column'>
                                <h2 className="fw-bold mb-2 text-center">Sign Up</h2>

                                <MDBInput wrapperClass='mb-4 w-100'
                                          placeholder="이름을 입력해주세요."
                                          label='Name'
                                          id='formControlUserNm'
                                          type='name'
                                          size="lg"
                                          name='userNm'
                                          value={ singUpInputValue.userNm }
                                          onChange={ handleSignUpInputValue }
                                          required/>

                                <MDBInput wrapperClass='mb-4 w-100'
                                          placeholder="이메일 주소를 입력해주세요."
                                          label='Email'
                                          id='formControlUserEmail'
                                          type='email'
                                          size="lg"
                                          name='userEmail'
                                          value={ singUpInputValue.userEmail }
                                          onChange={ handleSignUpInputValue }
                                          required/>


                                <MDBBtn size='lg'
                                        style={{ backgroundColor: '#26B7E6' }}
                                        onClick={ requestChangePw }>
                                    {/*{showLoading ? <MDBSpinner size='sm' role='status' tag='span' className='me-2' /> : null}*/}
                                    패스워드 찾기
                                </MDBBtn>

                                <hr className="my-4"/>

                                <div className="find-btn">
                                    <MDBBtn className='me-1'
                                        // style={{ backgroundColor: '#26B7E6' }}
                                            color="secondary"
                                            onClick={ cancelClick }>
                                        이전으로
                                    </MDBBtn>
                                    {/*<MDBBtn className='mx-2' color='tertiary' rippleColor='light'>*/}
                                    {/*    Tertiary*/}
                                    {/*</MDBBtn>*/}
                                </div>

                            </MDBCardBody> : null
                        }
                        {/*------------ 패스워드 찾기 입력 form end------------*/}
                        {/*{ modalOpenYn ? <ModalPop title={modalData.title} text={modalData.text} modalClose={cancelClick}/> : null }*/}
                    </MDBCard>

                </MDBCol>
            </MDBRow>

        </MDBContainer>
    );
}



export default Login;
