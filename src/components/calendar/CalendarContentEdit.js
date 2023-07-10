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
import { AuthLoginErr, CommonPostAxios } from '../Common';
import ToastPop from '../Toast/ToastPop';
import ModalPop from '../modal/ModalPop';
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";
import { parse, format } from 'date-fns';
import ModernDatepicker from 'react-modern-datepicker';
import './PickerDate.css'
import icon from '../../assets/icons8.gif'
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { TimePicker as MuiTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import eventBus from '../../eventBus';

export default function CalendarContentEdit(props, {isModalOpenYn}) {

  const [calendarName, setCalendarName] = useState();
  const [calendarContent, setCalendarContent] = useState('');

  
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const [selectedValue, setSelectedValue] = useState('');
  const [alarmTime, setAlarmTime] = useState('');
  const selectOptions = [
    {value: "N", label: "미사용"},
    {value: "Y", label: "사용"}
  ];

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  
  const [flag, setFlag] = useState("");

  const modalForm = {
    title: '',
    message: '',
    open: false,
    callback: null
  };

  useEffect(() => {
    const object = {
      calendarContentId : props.calendarContentId
    }

    const postData = async () => {
      try {
        CommonPostAxios('/calendar/content/findOne', object, callbackContent);
      } catch (error) {
        AuthLoginErr(error);
      }
    };
    postData();
  }, [props.calendarContentId]);

  const callbackContent = (data) => {
    setCalendarName(data.title);
    setCalendarContent(data.detailContent);
    setStartDate(parse(data.startDt, 'yyyy-MM-dd', new Date()));
    setEndDate(parse(data.endDt, 'yyyy-MM-dd', new Date()));

    setStartTime(parse(data.startTime.substring(0,5), 'HH:mm', new Date()));
    setEndTime(parse(data.endTime.substring(0,5), 'HH:mm', new Date()));
    setSelectedTime(parse(data.alarmTime.substring(0,5), 'HH:mm', new Date()));
    setSelectedValue(data.alarmYn);
    
  }

  useEffect(() => {
    console.log("startTime : ", startTime);
  }, [startTime]);

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

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const formatDate = (dateString) => {
    if (typeof dateString === 'string') {
      const parts = dateString.split(' ');
      if (parts.length === 3) {
        const year = parts[0].slice(0, -1);
        const month = parts[1].slice(0, -1).padStart(2, '0');
        const day = parts[2].slice(0, -1).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }

    } else if (dateString instanceof Date) {
      const year = dateString.getFullYear();
      const month = String(dateString.getMonth() + 1).padStart(2, '0');
      const day = String(dateString.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  };

  const calendarSave = (check) => {

    setFlag(check);

    const startDateFormatted = new Date(startDate);
    const endDateFormatted = new Date(endDate);

    const startTimehours = new Date(startTime).getHours();
    const startTimeMinute = new Date(startTime).getMinutes();
    const endTimehours = new Date(endTime).getHours();
    const endTimeMinute = new Date(endTime).getMinutes();

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

    } else if(startDateFormatted > endDateFormatted) {
      ToastPop({
        toastOpenYn: true,
        type: 'warning',
        message: "시작날짜가 종료날짜보다 먼저 일 수 없습니다.",
        options: {
            sec: 1500
        }
      });
      return;
      
    } else if (`${startTimehours}:${startTimeMinute}` > `${endTimehours}:${endTimeMinute}`)  {
      ToastPop({
        toastOpenYn: true,
        type: 'warning',
        message: "시작시간보다 종료시간보다 먼저 일 수 없습니다.",
        options: {
            sec: 1500
        }
      });
      return;
      
    } else if(selectedValue === 'Y' && selectedTime === null) {
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

      console.log("flag : ", flag);
      let modalTitle = "";
      let modalContent = "";
      let url = "";

      if(check === "1") {
        
        modalTitle = "일정 삭제";
        modalContent = "해당 일정을 삭제하시겠습니까?";
        url = "/calendar/content/delete";

      } else if(check === "2") {

        modalTitle = "일정 복제";
        modalContent = "해당 일정을 복제하시겠습니까?";
        url = "/calendar/content/add";

      } else if(check === "3") {

        modalTitle = "일정 수정";
        modalContent = "해당 일정을 수정하시겠습니까?";
        url = "/calendar/content/update";

      }

      modalOpen(modalTitle, modalContent, (data) => {

        if(data) {
          const param = {
            'calendarId' : props.calendarId,
            'calendarContentId' : props.calendarContentId,
            'title' : calendarName,
            'startDt' : formatDate(startDate),
            'endDt' : formatDate(endDate),
            'startTime' : format(startTime,'HH:mm'),
            'endTime' : format(endTime, 'HH:mm'),
            'detailContent' : calendarContent,
            'alarmYn' : selectedValue,
            'alarmTime' : selectedTime === null ? null : format(selectedTime, 'HH:mm')
          }
          CommonPostAxios(url, param, callbackSave);
          props.popEvent(true);
        }

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
        message: "수행 성공하였습니다.",
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
        <MDBModalTitle>일정 상세</MDBModalTitle>
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
                        placeholder={startDate}
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
                        placeholder={endDate}
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
                  <MuiTimePicker
                      id="startTime"
                      className='time-choice'
                      value={startTime}
                      onChange={startTimeChange}
                      onAccept={startTimeChange}
                      defaultValue= {startTime}
                      format={"HH시 mm분"}
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
                  <MuiTimePicker
                      id="endTime"
                      className='time-choice'
                      value={endTime}
                      onChange={endTimeChange}
                      onAccept={endTimeChange}
                      defaultValue= {endTime}
                      format={"HH시 mm분"}
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
                                <MuiTimePicker
                                    id="timeChoise"
                                    className='alarm-choice'
                                    value={selectedTime}
                                    onChange={handleTimeChange}
                                    onAccept={handleTimeChange}
                                    defaultValue= {selectedTime}
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
      <MDBBtn color='danger' onClick={() => {calendarSave("1");}}>삭제</MDBBtn>
      <MDBBtn color='info' onClick={() => {calendarSave("2");}}>복제</MDBBtn>
      <MDBBtn onClick={() => {calendarSave("3");}}>수정</MDBBtn>
        <MDBBtn color='secondary' onClick={() => {props.popEvent(true); formInit();}}>
        닫기
        </MDBBtn>
    </MDBModalFooter>
    </>
  );
}