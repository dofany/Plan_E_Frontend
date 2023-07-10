import React, { useState, useEffect } from 'react';
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
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";
import { parse, format } from 'date-fns';
import ModernDatepicker from 'react-modern-datepicker';
import './PickerDate.css'
import icon from '../../assets/icons8.gif'
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import eventBus from '../../eventBus';

export default function CalendarContentAdd(props, {isModalOpenYn}) {
  // 저장버튼 클릭 이벤트
  const [calendarName, setCalendarName] = useState('');
  const [calendarContent, setCalendarContent] = useState('');

  const today = new Date();
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);
  const nowDay = `${year}년 ${month}월 ${day}일`;
  const [startDate, setStartDate] = useState(nowDay);
  const [endDate, setEndDate] = useState(nowDay);
  
  const [selectedValue, setSelectedValue] = useState("N");
  const [alarmTime, setAlarmTime] = useState('');
  const selectOptions = [
    {value: "N", label: "미사용"},
    {value: "Y", label: "사용"}
  ];

  
  const modalForm = {
    title: '',
    message: '',
    open: false,
    callback: null
  };

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const startTimeChange = (time) => {
    setStartTime(time);
    console.log("startTime : ",startTime);
  };

  const endTimeChange = (time) => {
    setEndTime(time);
    console.log("endTime : ",endTime);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    console.log("selectedTime : ",selectedTime);
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
  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  const datetoString = new Date().toLocaleDateString('ko-KR', options);

  const startDt = parse(startDate, 'yyyy년 MM월 dd일', new Date());
  const startDateFormat = format(startDt, 'yyyy-MM-dd');
  const endDt = parse(endDate, 'yyyy년 MM월 dd일', new Date());
  const endDateFormat = format(endDt, 'yyyy-MM-dd');

  const selectedhours = new Date(selectedTime).getHours();
  const selectedMinute = new Date(selectedTime).getMinutes();
  const startTimehours = new Date(startTime).getHours();
  const startTimeMinute = new Date(startTime).getMinutes();
  const endTimehours = new Date(endTime).getHours();
  const endTimeMinute = new Date(endTime).getMinutes();

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

  useEffect(() => {
    console.log("startDate : ", startDate);
    console.log("endDate : ", endDate);
  }, [startDate, endDate]);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const calendarSave = () => {
    if(calendarName === '') {
      ToastPop({
        toastOpenYn: true,
        type: 'warning',
        message: "일정명을 입력해주세요.",
        options: {
            sec: 1500
        }
      });
      return;

    } else if(startDateFormat > endDateFormat) {
      ToastPop({
        toastOpenYn: true,
        type: 'warning',
        message: "시작날짜가 종료날짜보다 먼저 일 수 없습니다.",
        options: {
            sec: 1500
        }
      });
      return;
      
    } else if(`${startTimehours}:${startTimeMinute}` > `${endTimehours}:${endTimeMinute}`) {
      ToastPop({
        toastOpenYn: true,
        type: 'warning',
        message: "시작시간보다 종료시간보다 먼저 일 수 없습니다.",
        options: {
            sec: 1500
        }
      });
      return;
      
    } else if(selectedTime === null && selectedValue === 'Y') {
      ToastPop({
        toastOpenYn: true,
        type: 'warning',
        message: "선택한 알람 시간이 없습니다.",
        options: {
            sec: 1500
        }
      });
      return;
      
    } else if(startTime === null || endTime === null) {
      ToastPop({
        toastOpenYn: true,
        type: 'warning',
        message: "선택한 시간이 없습니다.",
        options: {
            sec: 1500
        }
      });
      return;
      
    } else {
      modalOpen("일정 생성", "해당 일정을 생성하시겠습니까?",(data) => {

        console.log(selectedTime);

        if(selectedTime === null) {
          setAlarmTime(null);
        } else {
          setAlarmTime(selectedhours.toString().padStart(2, '0') + ':' + selectedMinute.toString().padStart(2, '0'));
        }

        console.log(alarmTime);

        if(data) {
          const param = {
            'calendarId' : props.calendarId,
            'title' : calendarName,
            'startDt' : startDateFormat,
            'endDt' : endDateFormat,
            'startTime' : startTimehours.toString().padStart(2, '0') + ':' + startTimeMinute.toString().padStart(2, '0'), 
            'endTime' : endTimehours.toString().padStart(2, '0') + ':' + endTimeMinute.toString().padStart(2, '0') ,
            'detailContent' : calendarContent,
            'alarmYn' : selectedValue,
            'alarmTime' : selectedTime === null ? null : selectedhours.toString().padStart(2, '0') + ':' + selectedMinute.toString().padStart(2, '0'),
          }
          CommonPostAxios("/calendar/content/add", param, callbackSave);
          props.popEvent(true);
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
        message: "일정이 생성되었습니다.",
        options: {
            sec: 1500,
        },
        callback: () => {
            props.popEvent(true);
            eventBus.emit('calendarId', props.calendarId);
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
        <MDBModalTitle>일정 등록</MDBModalTitle>
        <MDBBtn className='btn-close' color='none' onClick={() => {props.popEvent(true); formInit();}}></MDBBtn>
    </MDBModalHeader>
    <MDBModalBody>
    <label htmlFor="inputDetailName" className="form-label">일정명</label>
        <div className="mb-3">
            <input
            type="text"
            className="form-control"
            id="inputCalendarName"
            aria-describedby="일정명"
            onChange={handleCalendarInputName}
            value={calendarName}
            onKeyDown={modalOnKeyPress}
            />
            <i className="bi bi-pencil" style={{position: "relative",right: "-435px",
    top: "-30px", color: "#00B9F5"}}></i>
        </div>
            <div>
                <label htmlFor="inputDateName" className="form-label">날짜 선택</label>
            </div>
            <div className="mb-4" style={{display: "flex", alignItems: "center"}}>
                    <ModernDatepicker
                        locale={ko}
                        date={startDate} 
                        onChange={(date) => {handleStartDateChange(date);}}
                        format={'YYYY년 MM월 D일'}
                        showBorder
                        className="color"
                        id="startId"
                        placeholder={datetoString}
                        icon={icon}
                        iconClass='pointNone'
                    />
                    <div style={{display: "inline-block", margin: "0 0.5rem"}}> ~ </div>
                    <ModernDatepicker 
                        locale={ko}
                        date={endDate}
                        onChange={(date) => {handleEndDateChange(date);}}
                        format={'YYYY년 MM월 D일'}
                        showBorder
                        className="color"
                        id="endId"
                        placeholder={datetoString}
                        icon={icon}
                        iconClass='pointNone'
                    />
            </div>
            <div>
                <label htmlFor="inputTimeName" className="form-label">시간 선택</label>
            </div>
            <div className="mb-3" style={{display: "flex", alignItems: "center"}}>
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={ko}>
                  <div>
                  <TimePicker
                      id="startTime"
                      className='time-choice'
                      value={startTime}
                      onChange={startTimeChange}
                      onAccept={startTimeChange}
                      defaultValue= {new Date()}
                      format="HH시 mm분"
                      viewRenderers={{
                          hours: renderTimeViewClock,
                          minutes: renderTimeViewClock,
                          seconds: renderTimeViewClock,
                      }}
                  />
                  </div>
                </LocalizationProvider>
                <div style={{display: "inline-block", margin: "0 0.5rem"}}> ~ </div>
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={ko}>
                  <div>
                  <TimePicker
                      id="endTime"
                      className='time-choice'
                      value={endTime}
                      onChange={endTimeChange}
                      onAccept={endTimeChange}
                      defaultValue= {new Date()}
                      format="HH시 mm분"
                      viewRenderers={{
                          hours: renderTimeViewClock,
                          minutes: renderTimeViewClock,
                          seconds: renderTimeViewClock,
                      }}
                  />
                  </div>
                </LocalizationProvider>
            </div>
            <div className="mb-3">
                <div>
                <label htmlFor="inputAlarmName" className="form-label">알림 설정</label>
                </div>
                <div className="mb-4">
                    <select id="selectInput" 
                        className="form-control" 
                        value={selectedValue}
                        onChange={(e) => {
                            setSelectedValue(e.target.value);
                            console.log(e.target.value)
                        }}>
                        {selectOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <i className="bi bi-alarm" style={{position: "relative",right: "-435px",top: "-30px", color: "#00B9F5", zIndex:"0"}}></i>
                    {selectedValue === "Y" ?  
                        <div className="mb-3">
                            <LocalizationProvider dateAdapter={AdapterDateFns} locale={ko}>
                                <div>
                                <TimePicker
                                    id="timeChoise"
                                    className='alarm-choice'
                                    value={selectedTime}
                                    onChange={handleTimeChange}
                                    onAccept={handleTimeChange}
                                    defaultValue= {new Date()}
                                    format="HH시 mm분"
                                    viewRenderers={{
                                        hours: renderTimeViewClock,
                                        minutes: renderTimeViewClock,
                                        seconds: renderTimeViewClock,
                                    }}
                                />
                                </div>
                            </LocalizationProvider>
                        </div> 
                    : null} 
                </div>
            </div>
            <div className="mb-4">
                <label htmlFor="inputDetailContent" className="form-label">일정 상세 내용</label>
                <textarea className="form-control" id="inputDetailContent" style={{height:'100px',verticalAlign:'top'}} aria-describedby="캘린더명" onChange={handleCalendarInputContent} value={calendarContent} onKeyDown={modalOnKeyPress}></textarea>
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