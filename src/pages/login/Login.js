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
import 'react-toastify/dist/ReactToastify.css';
import ToastPop from "../../common/component/toast/ToastPop";
import {useCookies} from "react-cookie";

/**
 * 로그인 기능
 * @returns {JSX.Element}
 * @constructor
 */
function Login() {

    // 쿠키 정보 셋팅
    const [cookies, setCookie] = useCookies(['rememberCheckBox', 'planE_id', 'planE_pw']);
    const [rememberCheckBox, setRememberCheckBox] = useState(cookies.rememberCheckBox === "true" ? true : false);


    // 쿠키 정보에 따라 초기화 값 변경
    const loginForm = {
        inputEmail: (cookies.rememberCheckBox === 'true' && cookies.planE_id !== undefined) ? cookies.planE_id : '',
        inputPw: (cookies.rememberCheckBox === 'true' && cookies.planE_pw !== undefined) ? cookies.planE_pw : '',
        userNm: '',
        userPw: '',
        userEmail: '',
        userPwCheck: '',
        checkNumber: ''
    };

    /**
     * 모달 처리 샘플
     * @type {{callback: null, message: string, title: string, open: boolean}}
     */
    const modalForm = {
        title: '',
        message: '',
        open: false,
        callback: null
    };
    const [modalFormState, setModalFormState] = useState(modalForm);

    // 모달 호출 함수 샘플
    function modalOpen(title, message, callback) {
        setModalFormState({
            open: true,
            title: title,
            message: message,
            callback: callback
        });

    }


    // 로그인 입력값
    const [loginInputValue, setLoginInputValue] = useState(loginForm);
    // 회원가입 입력값
    const [signUpInputValue, setSignUpInputValue] = useState(loginForm);

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
            ...signUpInputValue,
            [e.target.name]: e.target.value
        });
    }


    // 로그인 버튼 클릭 이벤트
    const loginClick = () => {

        // 현재 체크박스 상태 쿠키 저장
        setCookie('rememberCheckBox', rememberCheckBox);

        // 체크박스 활성시 계정 정보 저장
        if(rememberCheckBox) {
            setCookie('planE_id', loginInputValue.inputEmail);
            setCookie('planE_pw', loginInputValue.inputPw);
        }
        
        // 로그인 페이지 이메일 미입력
        if(loginInputValue.inputEmail === '') {
            ToastPop({
                toastOpenYn: true,
                type: 'warning',
                message: "이메일을 입력해주세요.",
                options: {
                    sec: 5000
                }
            });
            return;
        }

        // 로그인 페이지 패스워드 미입력
        if(loginInputValue.inputPw === '') {
            ToastPop({
                toastOpenYn: true,
                type: 'warning',
                message: "패스워드를 입력해주세요.",
                options: {
                    sec: 5000
                }
            });
            return;
        }
        
        console.log(loginInputValue);
        const headers = {
            'Content-Type' : 'application/json'
        }
        // setShowLoading(true);
        setLoading(true);

        /* request 파트 */ 
        axios.post('/api/user/login', {
                'inputEmail': loginInputValue.inputEmail,
                'inputPw': loginInputValue.inputPw
            },
            {
            headers: headers
            }
        )

        /* response 파트 */
        .then(res => {
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
            setLoading(false);
                if(res.data.sucesYn === 'N' && ( res.data.loginAthnType === '1'
                        || res.data.loginAthnType === '2' || res.data.loginAthnType === '4')) {
                ToastPop({
                    toastOpenYn: true,
                    type: 'error',
                    message: "아이디 또는 패스워드가 일치하지 않습니다.",
                    options: {
                        sec: 5000,
                    },
                });
            } else if(res.data.sucesYn === 'N' && res.data.loginAthnType === '3') {
                ToastPop({
                    toastOpenYn: true,
                    type: 'error',
                    message: "비밀번호 5회 오류로 사용이 제한된 계정입니다. 관리자에게 문의해주세요.",
                    options: {
                        sec: 5000,
                    },
                });
            } else if (res.data.sucesYn === 'Y' && res.data.loginAthnType === '5') {  
                document.location.href = '/main'
            }  
        })
        .catch()
    }

    // 회원가입 버튼 클릭
    const signUpClick = () => {
        setSignUpClickEv(true);
    }


        // 가입신청 버튼 클릭
        const requestSignUp = () => {

        setCheckNumberBox(false);
        if(signUpInputValue.userNm === '') {
            ToastPop({
                toastOpenYn: true,
                type: 'warning',
                message: "이름을 입력해주세요.",
                options: {
                    sec: 5000
                }
            });
            return;
        }

        // 회원가입 이메일 정규식
        const emailCheckSignUp = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

        if(signUpInputValue.userEmail === '') {
            ToastPop({
                toastOpenYn: true,
                type: 'warning',
                message: "이메일 주소를 입력해주세요.",
                options: {
                    sec: 5000
                }
            });
            return;
        }

        // 회원가입 이메일 형식 확인
        if(!emailCheckSignUp.test(signUpInputValue.userEmail)) {
            ToastPop({
                toastOpenYn: true,
                type: 'warning',
                message: "정확한 이메일 형식을 입력해주세요.",
                options: {
                    sec: 5000
                }
            });
            return;
        }
        
        // 패스워드 정규식 (최소8자, 최소 1개의 문자, 최소 1개의 숫자, 최소 1개의 특수문자)
        const pwCheckSignUp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/

        if(signUpInputValue.userPw === '') {
            ToastPop({
                toastOpenYn: true,
                type: 'warning',
                message: "비밀번호를 입력해주세요.",
                options: {
                    sec: 5000
                }
            });
            return;
        }

        if(!pwCheckSignUp.test(signUpInputValue.userPw)){
            ToastPop({
                toastOpenYn: true,
                type: 'warning',
                message: "패스워드는 8자 이상, 특수문자, 문자 숫자를 한 개 이상 포함해야 합니다.",
                options: {
                    sec: 5000
                }
            });
            return;
        }

        if(signUpInputValue.userPwCheck === '') {
            ToastPop({
                toastOpenYn: true,
                type: 'warning',
                message: "비밀번호 확인란을 입력해주세요.",
                options: {
                    sec: 5000
                }
            });
            return;
        }

        if(signUpInputValue.userPw !== signUpInputValue.userPwCheck) {
            ToastPop({
                toastOpenYn: true,
                type: 'warning',
                message: "비밀번호가 일치하지 않습니다.",
                options: {
                    sec: 5000
                }
            });
            return;
        }

        const headers = {
            'Content-Type' : 'application/json'
        }

        // setShowLoading(true);
        setLoading(true);
        axios.post('/api/user/signUp', {
                'userEmail': signUpInputValue.userEmail,
                'userNm' : signUpInputValue.userNm
            },
            {
                headers: headers
            }
        )
            .then(res => {
                setLoading(false);
                if (res.data) {
                    setCheckNumberBox(true);
                    ToastPop({
                        toastOpenYn: true,
                        type: 'info',
                        message: "입력하신 이메일로 인증번호가 발송되었습니다."
                    });
                }
            })
            .catch()
    }

    // 회원가입 인증번호 확인 요청
    const requestSignUpCheck = () => {
        const headers = {
            'Content-Type' : 'application/json'
        }

        setLoading(true);

            /* request 파트 */ 
            axios.post('/api/mail/emailCheck', {
                'email': signUpInputValue.userEmail,
                'emailAuthnNum': signUpInputValue.checkNumber
            },
            {
            headers: headers
            }
        )
            /* response 파트 */
            .then(res => {
                if(res.data.resCd === "4") {
                    ToastPop({
                        toastOpenYn: true,
                        type: 'success',
                        message: "회원가입이 완료되었습니다. 로그인 후 이용해 주세요.",
                        options: {
                            sec: 1500,
                        },
                        callback: () => {
                            setLoading(false);
                            document.location.href = '/login'
                        }
                    });
                } else if(res.data.resCd === "2") {
                    setLoading(false);
                        ToastPop({
                            toastOpenYn: true,
                            type: 'error',
                            message: "인증시간이 초과하였습니다. 인증번호를 재발급하세요.",
                            options: {
                                sec: 5000
                            }
                        }); 
                } else if(res.data.resCd === "3") {
                    setLoading(false);
                    ToastPop({
                        toastOpenYn: true,
                        type: 'error',
                        message: "입력하신 인증번호가 일치하지 않습니다.",
                        options: {
                            sec: 5000
                        }
                    }); 
                } else if(res.data.resCd === "1") {
                    setLoading(false);
                    ToastPop({
                        toastOpenYn: true,
                        type: 'error',
                        message: "오류가 발생했습니다. 인증번호를 재발급하세요.",
                        options: {
                            sec: 5000
                        }
                    }); 
                }
            })
            .catch()
    }

    // 패스워드 찾기 버튼 클릭
    const changePw = () => {
        setChangePwClickEv(true);
        setSignUpClickEv(false);
    }

    const requestChangePw = () => {

        const headers = {
            'Content-Type' : 'application/json'
        }

        setLoading(true);

            /* request 파트 */ 
            axios.post('/api/user/pwChg', {
                'inputEmail': signUpInputValue.userEmail,
                'userName': signUpInputValue.userNm
            },
            {
            headers: headers
            }
        )
            /* response 파트 */
            .then(res => {
                
                setLoading(false);
                
                if(res.data.resultYn === true) {
                    ToastPop({
                        toastOpenYn: true,
                        type: 'success',
                        message: "입력하신 이메일로 임시 비밀번호가 발급되었습니다.",
                        options: {
                            sec: 5000,
                        },
                        callback: () => document.location.href = '/login'
                    });
                    
                } else {
                        ToastPop({
                            toastOpenYn: true,
                            type: 'error',
                            message: "입력하신 정보를 확인해주세요.",
                            options: {
                                sec: 5000
                            }
                        }); 
                }
            })
            .catch()

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

    // 체크박스 클릭 이벤트
    const rememberCheckBoxClick = () => {
        setRememberCheckBox(rememberCheckBox ? false : true);
    }



    return (
        <MDBContainer fluid>
            {/*모달 호출 샘플*/}
            <ModalPop open = {modalFormState.open}
                      setPopup = {setModalFormState}
                      message = {modalFormState.message}
                      title = {modalFormState.title}
                      callback = {modalFormState.callback}/>

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
                                             onChange={rememberCheckBoxClick}
                                             checked={rememberCheckBox}
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
                                          value={ signUpInputValue.userNm }
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
                                          value={ signUpInputValue.userEmail }
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
                                          value={ signUpInputValue.userPw }
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
                                          value={ signUpInputValue.userPwCheck }
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
                                              value={ signUpInputValue.checkNumber }
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
                                    </MDBBtn>
                                    :
                                    <MDBBtn size='lg'
                                        style={{ backgroundColor: '#26B7E6' }}
                                        onClick={ requestSignUp }>
                                        가입신청
                                    </MDBBtn>
                                }

                                <hr className="my-4"/>

                                <div className="find-btn">
                                    <MDBBtn className='me-1'
                                            // style={{ backgroundColor: '#26B7E6' }}
                                            color="secondary"
                                            onClick={ cancelClick }>
                                        이전으로
                                    </MDBBtn>
                                    { checkNumberBox ?
                                        <MDBBtn className='me-1'
                                            // style={{ backgroundColor: '#26B7E6' }}
                                                color="secondary"
                                                onClick={ requestSignUp }>
                                            인증번호 재발송
                                        </MDBBtn> : null
                                    }
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
                                          value={ signUpInputValue.userNm }
                                          onChange={ handleSignUpInputValue }
                                          required/>

                                <MDBInput wrapperClass='mb-4 w-100'
                                          placeholder="이메일 주소를 입력해주세요."
                                          label='Email'
                                          id='formControlUserEmail'
                                          type='email'
                                          size="lg"
                                          name='userEmail'
                                          value={ signUpInputValue.userEmail }
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
