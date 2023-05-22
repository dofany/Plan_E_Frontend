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
import ToastPop from '../Toast/ToastPop';
import { CommonPostAxios } from '../Common';
import ModalPop from '../modal/ModalPop';

export default function CalendarEdit(props) {
  // 수정 및 삭제 데이터 props로 받아옴
  const editId = useState(props.edit);
  const valuesArray = Array.from(editId[0]);
  const caranderIdValue = valuesArray[0];

  // 저장버튼 클릭 이벤트
  const [calendarName, setCalendarName] = useState(props.calName);
  const [calendarContent, setCalendarContent] = useState(props.calContent);
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

  // 이름 value 변경감지
  const handleCalendarInputName = (e) => {
    setCalendarName(e.target.value);
  }

  // 내용 value 변경감지
  const handleCalendarInputContent = (e) => {
    setCalendarContent(e.target.value);
  }

  // 수정 저장
  const calendarEditSave = () => {
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
      modalOpen("캘린더 수정", "캘린더를 수정하시겠습니까?",(data) => {
        // 창을 닫을때("OK")
        if(data) {
          const param = {
            'calendarName' : calendarName,
            'calendarContent' : calendarContent,
            'calendarId' : caranderIdValue
          }
          CommonPostAxios("/calendar/edit", param, callbackSave);
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
        message: "캘린더가 수정되었습니다.",
        options: {
            sec: 1500,
        },
        callback: () => {
            props.popEvent(true);
        }
    });
  }

  // 삭제
  const calendarDelete = () => {
    modalOpen("캘린더 삭제", "캘린더를 삭제하시겠습니까?",(data) => {
      // 창을 닫을때("OK")
      if(data) {
        const param = {
          'calendarId' : caranderIdValue
        }
        CommonPostAxios("/calendar/delete", param, callbackDelete);
      }
      // 창을 닫을때("취소")
      else {
          // 모달 비활성
          setModalFormState(modalForm);
          return;
      }
    });
  }

  const callbackDelete = (data) => {
    ToastPop({
        toastOpenYn: true,
        type: 'error',
        message: "캘린더가 삭제되었습니다.",
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
        <MDBModalTitle>켈린더 수정</MDBModalTitle>
        <MDBBtn className='btn-close' color='none' onClick={() => {props.popEvent(true);}}></MDBBtn>
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
      <MDBBtn onClick={calendarEditSave}>저장</MDBBtn>
      <MDBBtn color='danger' onClick={calendarDelete}>
        삭제
      </MDBBtn>
      <MDBBtn color='secondary' onClick={() => {props.popEvent(true);}}>
          닫기
        </MDBBtn>
    </MDBModalFooter>
    </>
  );
}