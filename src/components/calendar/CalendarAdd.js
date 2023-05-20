import React, { useState } from 'react';
import {
  MDBBtn,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { CommonPostAxios } from '../Common';
import ToastPop from '../Toast/ToastPop';
import ModalPop from '../modal/ModalPop';

export default function CalendarAdd(props, {isModalOpenYn}) {
  // 저장버튼 클릭 이벤트
  const [calendarName, setCalendarName] = useState('');
  const [calendarContent, setCalendarContent] = useState('');

  const modalForm = {
    title: '',
    message: '',
    open: false,
    callback: null
  };
  
  const [modalFormState, setModalFormState] = useState(modalForm);

  const modalOpen = (title, message, callback) =>{
    setModalFormState({
        title: title,
        message: message,
        open: true,
        callback: callback
    });

  }

  const formInit = () => {
    setCalendarName('');
    setCalendarContent('');
  }

  const handleCalendarInputName = (e) => {
    setCalendarName(e.target.value);
  }

  const handleCalendarInputContent = (e) => {
    setCalendarContent(e.target.value);
  }

  const calendarSave = () => {
    if(calendarName === '') {
      ToastPop({
        toastOpenYn: true,
        type: 'warning',
        message: "캘린더명을 입력해주세요.",
        options: {
            sec: 1500
        }
      });
      return;
    } else if(calendarContent === '') {
      ToastPop({
        toastOpenYn: true,
        type: 'warning',
        message: "내용을 입력해주세요.",
        options: {
            sec: 1500
        }
      });
      return;
    } else {
      modalOpen("캘린더 생성", "캘린더를 생성하시겠습니까?",(data) => {
        // 창을 닫을때("OK")
        if(data) {
          const param = {
            'calendarName' : calendarName,
            'calendarContent' : calendarContent,
          }
          CommonPostAxios("/calendar/add", param, callbackSave);
        }
        // 창을 닫을때("취소")
        else {
            // 모달 비활성
            setModalFormState(modalForm);
            return;
        }
      });
    }
  }

  const callbackSave = (data) => {
    ToastPop({
        toastOpenYn: true,
        type: 'success',
        message: "캘린더가 생성되었습니다.",
        options: {
            sec: 1500,
        },
        callback: () => {
            props.popEvent(true);
        }
    });
  }

  const modalOnKeyPress = (e) => {
    if (e.keyCode === 27) {
        // ESC 키를 눌렀을 때 실행할 로직 작성
        props.popEvent(true);
      }
  }

  return (
    <>
    <ModalPop open = {modalFormState.open}
                      setPopup = {setModalFormState}
                      message = {modalFormState.message}
                      title = {modalFormState.title}
                      callback = {modalFormState.callback}/>                 
    <MDBModalHeader>
        <MDBModalTitle>켈린더 생성</MDBModalTitle>
        <MDBBtn className='btn-close' color='none' onClick={() => {props.popEvent(true); formInit();}}></MDBBtn>
    </MDBModalHeader>
    <MDBModalBody>
            <div className="mb-3">
                <label htmlFor="inputCalendarName" className="form-label">캘린더명</label>
                <input type="text" className="form-control" id="inputCalendarName" aria-describedby="캘린더명" onChange={handleCalendarInputName} value={calendarName} onKeyDown={modalOnKeyPress}/>
            </div>
            <div className="mb-4">
                <label htmlFor="inputCalendarContent" className="form-label">내용</label>
                <textarea className="form-control" id="inputCalendarContent" style={{height:'150px',verticalAlign:'top'}} aria-describedby="캘린더명" onChange={handleCalendarInputContent} value={calendarContent} onKeyDown={modalOnKeyPress}>
            </textarea>
            </div>
        
    </MDBModalBody>
    <MDBModalFooter>
      <MDBBtn onClick={calendarSave}>저장</MDBBtn>
        <MDBBtn color='secondary' onClick={() => {props.popEvent(true); formInit();}}>
        닫기
        </MDBBtn>
    </MDBModalFooter>
          
    </>
  );
}